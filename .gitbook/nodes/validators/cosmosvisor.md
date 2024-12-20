---
hidden: true
---

# Cosmosvisor

`Cosmovisor` is a small process manager around Cosmos SDK binaries that monitors the governance module via `stdout` to see if there's a chain upgrade proposal coming in. If it sees a proposal that gets approved, it can be run manually or automatically to download the new code, stop the node, run the migration script, replace the node binary, and start with the new genesis file.

### Installation

Run:

`go get github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor`

### Command Line Arguments And Environment Variables

All arguments passed to the `cosmovisor` program will be passed to the current daemon binary (as a subprocess). It will return `/dev/stdout` and `/dev/stderr` of the subprocess as its own. Because of that, it cannot accept any command line arguments, nor print anything to output (unless it terminates unexpectedly before executing a binary).

`cosmovisor` reads its configuration from environment variables:

* `DAEMON_HOME` is the location where upgrade binaries should be kept (e.g. `$HOME/.injectived`).
* `DAEMON_NAME` is the name of the binary itself (eg. `injectived`).
* `DAEMON_ALLOW_DOWNLOAD_BINARIES` (_optional_) if set to `true` will enable auto-downloading of new binaries (for security reasons, this is intended for full nodes rather than validators).
* `DAEMON_RESTART_AFTER_UPGRADE` (_optional_) if set to `true` it will restart the sub-process with the same command line arguments and flags (but new binary) after a successful upgrade. By default, `cosmovisor` dies afterwards and allows the supervisor to restart it if needed. Note that this will not auto-restart the child if there was an error.
* `DAEMON_LOG_BUFFER_SIZE` (_optional_) is the buffer size for cosmovisor to scan log. If not set, it will use the default [64](https://github.com/golang/go/blob/2217e89ba326875470a856cd0da79f3ec9a896b8/src/bufio/scan.go#L80). (e.g. set to `256` or `512`) It is to avoid scanning stuck in case of long line of the log.

### Data Folder Layout

`$DAEMON_HOME/cosmovisor` is expected to belong completely to `cosmovisor` and subprocesses that are controlled by it. The folder content is organised as follows:

```
.
├── current -> genesis or upgrades/<name>
├── genesis
│   └── bin
│       └── $DAEMON_NAME
└── upgrades
    └── <name>
        └── bin
            └── $DAEMON_NAME
```

Each version of the Cosmos SDK application is stored under either `genesis` or `upgrades/<name>`, which holds `bin/$DAEMON_NAME` along with any other needed files such as auxiliary client programs or libraries. `current` is a symbolic link to the currently active folder (so `current/bin/$DAEMON_NAME` is the currently active binary).

_Note: the `name` variable in `upgrades/<name>` holds the URI-encoded name of the upgrade as specified in the upgrade module plan._

Please note that `$DAEMON_HOME/cosmovisor` just stores the _binaries_ and associated _program code_. The `cosmovisor` binary can be stored in any typical location (eg `/usr/local/bin`). The actual blockchain program will store it's data under their default data directory (e.g. `$HOME/.injectived`) which is independent of the `$DAEMON_HOME`. You can choose to set `$DAEMON_HOME` to the actual binary's home directory and then end up with a configuation like the following, but this is left as a choice to the system admininstrator for best directory layout:

```
.injectived
├── config
├── data
└── cosmovisor
```

### Usage

The system administrator admin is responsible for:

* installing the `cosmovisor` binary and configure the host's init system (e.g. `systemd`, `launchd`, etc) along with the environmental variables appropriately;
* installing the `genesis` folder manually;
* installing the `upgrades/<name>` folders manually.

`cosmovisor` will set the `current` link to point to `genesis` at first start (when no `current` link exists) and handles binaries switch overs at the correct points in time, so that the system administrator can prepare days in advance and relax at upgrade time.

Note that blockchain applications that wish to support upgrades may package up a genesis `cosmovisor` tarball with this information, just as they prepare the genesis binary tarball. In fact, they may offer a tarball will all upgrades up to current point for easy download for those who wish to sync a fullnode from start.

The `DAEMON` specific code and operations (e.g. tendermint config, the application db, syncing blocks, etc) are performed as normal. Application binaries' directives such as command-line flags and environment variables work normally.

### Auto-Download

Generally, the system requires that the system administrator place all relevant binaries on the disk before the upgrade happens. However, for people who don't need such control and want an easier setup (maybe they are syncing a non-validating fullnode and want to do little maintenance), there is another option.

If you set `DAEMON_ALLOW_DOWNLOAD_BINARIES=on` then when an upgrade is triggered and no local binary can be found, the `cosmovisor` will attempt to download and install the binary itself. The plan stored in the upgrade module has an info field for arbitrary json. This info is expected to be outputed on the halt log message. There are two valid format to specify a download in such a message:

1. Store an os/architecture -> binary URI map in the upgrade plan info field as JSON under the `"binaries"` key, eg:

```json
{
  "binaries": {
    "linux/amd64":"https://example.com/gaia.zip?checksum=sha256:aec070645fe53ee3b3763059376134f058cc337247c978add178b6ccdfb0019f"
  }
}
```

2. Store a link to a file that contains all information in the above format (eg. if you want to specify lots of binaries, changelog info, etc without filling up the blockchain).

e.g. `https://example.com/testnet-1001-info.json?checksum=sha256:deaaa99fda9407c4dbe1d04bd49bab0cc3c1dd76fa392cd55a9425be074af01e`

This file contained in the link will be retrieved by [go-getter](https://github.com/hashicorp/go-getter) and the `"binaries"` field will be parsed as above.

If there is no local binary, `DAEMON_ALLOW_DOWNLOAD_BINARIES=on`, and we can access a canonical url for the new binary, then the `cosmovisor` will download it with [go-getter](https://github.com/hashicorp/go-getter) and unpack it into the `upgrades/<name>` folder to be run as if we installed it manually.

Note that for this mechanism to provide strong security guarantees, all URLS should include a sha{256,512} checksum. This ensures that no false binary is run, even if someone hacks the server or hijacks the DNS. go-getter will always ensure the downloaded file matches the checksum if it is provided. go-getter will also handle unpacking archives into directories (so these download links should be a zip of all data in the `bin` directory).

To properly create a checksum on linux, you can use the `sha256sum` utility. e.g. `sha256sum ./testdata/repo/zip_directory/autod.zip` which should return `29139e1381b8177aec909fab9a75d11381cab5adf7d3af0c05ff1c9c117743a7`. You can also use `sha512sum` if you like longer hashes, or `md5sum` if you like to use broken hashes. Make sure to set the hash algorithm properly in the checksum argument to the url.

### Example: injectived

The following instructions provide a demonstration of `cosmovisor`'s integration with the `injectived` application shipped along the Cosmos SDK's source code.

First compile `injectived`:

```
cd injective-core/
make build
```

Create a new key and setup the `injectived` node:

```
rm -rf $HOME/.injectived
./build/injectived keys --keyring-backend=file add validator
./build/injectived init testing --chain-id=injective-1
./build/injectived add-genesis-account --keyring-backend=file $(./build/injectived keys --keyring-backend=file show validator -a) 1000000000inj
./build/injectived gentx --keyring-backend=file --chain-id=injective-1 validator 100000inj
./build/injectived collect-gentxs
```

Set the required environment variables:

```
export DAEMON_NAME=injectived         # binary name
export DAEMON_HOME=$HOME/.injectived  # daemon's home directory
```

Create the `cosmovisor`’s genesis folders and deploy the binary:

```
mkdir -p $DAEMON_HOME/cosmovisor/genesis/bin
cp ./build/injectived $DAEMON_HOME/cosmovisor/genesis/bin
```

For the sake of this demonstration, we would amend `voting_params.voting_period` in `.injectived/config/genesis.json` to a reduced time \~5 minutes (300s) and eventually launch `cosmosvisor`:

```
cosmovisor start
```

Submit a software upgrade proposal:

```
./build/injectived tx gov submit-proposal software-upgrade test1 --title="upgrade-demo" --description="upgrade"  --from=validator --upgrade-height=100 --deposit=10000000inj --chain-id=injective-1 --keyring-backend=test -y
```

Query the proposal to ensure it was correctly broadcast and added to a block:

```
./build/injectived query gov proposal 1
```

Submit a `Yes` vote for the upgrade proposal:

```
./build/injectived tx gov vote 1 yes --from=validator --keyring-backend=file --chain-id=injective-1 -y
```
