# Join a network

This guide will walk you through the process of setting up a standalone network locally as well as running a node on Mainnet or Testnet.&#x20;

You can also find the hardware requirements for each network in the respective tabs.&#x20;

{% tabs %}
{% tab title="Local Network" %}
To easily set up a local node, download and run the `setup.sh` script. This will initialize your local Injective network.

```bash
wget https://raw.githubusercontent.com/InjectiveLabs/injective-chain-releases/master/scripts/setup.sh
chmod +x ./setup.sh # Make the script executable
./setup.sh
```

Start the node by running:

```bash
injectived start # Blocks should start coming in after running this
```

For further explanation on what the script is doing and more fine-grained control over the setup process, continue reading below.

### Initialize the Chain

Before running Injective node, we need to initialize the chain as well as the node's genesis file:

```bash
# The <moniker> argument is the custom username of your node. It should be human-readable.
injectived init <moniker> --chain-id=injective-1
```

The command above creates all the configuration files needed for your node to run as well as a default genesis file, which defines the initial state of the network. All these configuration files are in `~/.injectived` by default, but you can overwrite the location of this folder by passing the `--home` flag. Note that if you choose to use a different directory other than `~/.injectived`, you must specify the location with the `--home` flag each time an `injectived` command is run. If you already have a genesis file, you can overwrite it with the `--overwrite` or `-o` flag.

The `~/.injectived` folder has the following structure:

```bash
.                                   # ~/.injectived
  |- data                           # Contains the databases used by the node.
  |- config/
      |- app.toml                   # Application-related configuration file.
      |- config.toml                # Tendermint-related configuration file.
      |- genesis.json               # The genesis file.
      |- node_key.json              # Private key to use for node authentication in the p2p protocol.
      |- priv_validator_key.json    # Private key to use as a validator in the consensus protocol.
```

### Modify the `genesis.json` File

At this point, a modification is required in the `genesis.json` file:

* Change the staking `bond_denom`, crisis `denom`, gov `denom`, and mint `denom` values to `"inj"`, since that is the native token of Injective.

This can easily be done by running the following commands:

```bash
cat $HOME/.injectived/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="inj"' > $HOME/.injectived/config/tmp_genesis.json && mv $HOME/.injectived/config/tmp_genesis.json $HOME/.injectived/config/genesis.json
cat $HOME/.injectived/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="inj"' > $HOME/.injectived/config/tmp_genesis.json && mv $HOME/.injectived/config/tmp_genesis.json $HOME/.injectived/config/genesis.json
cat $HOME/.injectived/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="inj"' > $HOME/.injectived/config/tmp_genesis.json && mv $HOME/.injectived/config/tmp_genesis.json $HOME/.injectived/config/genesis.json
cat $HOME/.injectived/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="inj"' > $HOME/.injectived/config/tmp_genesis.json && mv $HOME/.injectived/config/tmp_genesis.json $HOME/.injectived/config/genesis.json
```

{% hint style="info" %}
The commands above will only work if the default `.injectived` directory is used. For a specific directory, either modify the commands above or manually edit the `genesis.json` file to reflect the changes.
{% endhint %}

### Create Keys for the Validator Account

Before starting the chain, you need to populate the state with at least one account. To do so, first create a new account in the keyring named `my_validator` under the `test` keyring backend (feel free to choose another name and another backend):

```bash
injectived keys add my_validator --keyring-backend=test

# Put the generated address in a variable for later use.
MY_VALIDATOR_ADDRESS=$(injectived keys show my_validator -a --keyring-backend=test)
```

Now that you have created a local account, go ahead and grant it some `inj` tokens in your chain's genesis file. Doing so will also make sure your chain is aware of this account's existence from the genesis of the chain:

```bash
injectived add-genesis-account $MY_VALIDATOR_ADDRESS 100000000000000000000000000inj --chain-id=injective-1
```

`$MY_VALIDATOR_ADDRESS` is the variable that holds the address of the `my_validator` key in the keyring. Tokens in Injective have the `{amount}{denom}` format: `amount` is an 18-digit-precision decimal number, and `denom` is the unique token identifier with its denomination key (e.g. `inj`). Here, we are granting `inj` tokens, as `inj` is the token identifier used for staking in `injectived`.

### Add the Validator to the Chain

Now that your account has some tokens, you need to add a validator to your chain. Validators are special full-nodes that participate in the consensus process in order to add new blocks to the chain. Any account can declare its intention to become a validator operator, but only those with sufficient delegation get to enter the active set. For this guide, you will add your local node (created via the `init` command above) as a validator of your chain. Validators can be declared before a chain is first started via a special transaction included in the genesis file called a `gentx`:

```bash
# Create a gentx.
injectived gentx my_validator 1000000000000000000000inj --chain-id=injective-1 --keyring-backend=test

# Add the gentx to the genesis file.
injectived collect-gentxs
```

A `gentx` does three things:

1. Registers the `validator` account you created as a validator operator account (i.e. the account that controls the validator).
2. Self-delegates the provided `amount` of staking tokens.
3. Link the operator account with a Tendermint node pubkey that will be used for signing blocks. If no `--pubkey` flag is provided, it defaults to the local node pubkey created via the `injectived init` command above.

For more information on `gentx`, use the following command:

```bash
injectived gentx --help
```

### Configuring the Node Using `app.toml` and `config.toml`

Two configuration files are automatically generated inside `~/.injectived/config`:

* `config.toml`: used to configure Tendermint (learn more on [Tendermint's documentation](https://docs.tendermint.com/v0.34/tendermint-core/configuration.html)), and
* `app.toml`: generated by the Cosmos SDK (which Injective is built on), and used for configurations such as state pruning strategies, telemetry, gRPC and REST server configurations, state sync, and more.

Both files are heavily commented—please refer to them directly to tweak your node.

One example config to tweak is the `minimum-gas-prices` field inside `app.toml`, which defines the minimum gas prices the validator node is willing to accept for processing a transaction. If it's empty, make sure to edit the field with some value, for example `10inj`, or else the node will halt on startup. For this tutorial, let's set the minimum gas price to 0:

```toml
 # The minimum gas prices a validator is willing to accept for processing a
 # transaction. A transaction's fees must meet the minimum of any denomination
 # specified in this config (e.g. 0.25token1;0.0001token2).
 minimum-gas-prices = "0inj"
```

### Run a Localnet

Now that everything is set up, you can finally start your node:

```bash
injectived start # Blocks should start coming in after running this
```

This command allows you to run a single node, which is is enough to interact with the chain through the node, but you may wish to run multiple nodes at the same time to see how consensus occurs between them.
{% endtab %}

{% tab title="Testnet Network" %}
### Hardware Specification

Node operators should expect to provision one or more data center locations with redundant power, networking, firewalls, HSMs and servers.

The minimum hardware specifications are as follows, though they might rise as network usage increases:

```
6+ vCPU x64
32+ GB RAM
500 GB+ SSD
```

### Install `injectived` and `peggo`

See the [Injective releases repo](https://github.com/InjectiveLabs/testnet/releases) for the most recent releases. Non-validator node operators do not need to install `peggo`.

```bash
wget https://github.com/InjectiveLabs/testnet/releases/download/v1.12.9-testnet-1703762556/linux-amd64.zip
unzip linux-amd64.zip
sudo mv peggo /usr/bin
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib 
```

### Initialize a New Injective Chain Node

Before running Injective node, we need to initialize the chain as well as the node's genesis file:

```bash
# The argument <moniker> is the custom username of your node, it should be human-readable.
export MONIKER=<moniker>
# Injective Testnet has a chain-id of "injective-888"
injectived init $MONIKER --chain-id injective-888
```

Running the `init` command will create `injectived` default configuration files at `~/.injectived`.

### Prepare Configuration to Join Testnet

You should now update the default configuration with the Testnet's genesis file and application config file, as well as configure your persistent peers with seed nodes.

```bash
git clone https://github.com/InjectiveLabs/testnet.git

# copy genesis file to config directory
aws s3 cp --no-sign-request s3://injective-snapshots/testnet/genesis.json .
mv genesis.json ~/.injectived/config/

# copy config file to config directory
cp testnet/corfu/70001/app.toml  ~/.injectived/config/app.toml
cp testnet/corfu/70001/config.toml ~/.injectived/config/config.toml
```

You can also run verify the checksum of the genesis checksum - a4abe4e1f5511d4c2f821c1c05ecb44b493eec185c0eec13b1dcd03d36e1a779

```bash
sha256sum ~/.injectived/config/genesis.json
```

### Configure `systemd` Service for `injectived`

Edit the config at `/etc/systemd/system/injectived.service`:

```bash
[Unit]
  Description=injectived

[Service]
  WorkingDirectory=/usr/bin
  ExecStart=/bin/bash -c '/usr/bin/injectived --log-level=error start'
  Type=simple
  Restart=always
  RestartSec=5
  User=root

[Install]
  WantedBy=multi-user.target
```

Starting and restarting the systemd service

```bash
sudo systemctl daemon-reload
sudo systemctl restart injectived
sudo systemctl status injectived

# enable start on system boot
sudo systemctl enable injectived

# To check Logs
journalctl -u injectived -f
```

### Sync with the network

Refer to the Polkachu guide [here](https://polkachu.com/testnets/injective/snapshots) to download a snapshot and sync with the network.

#### Support

For any further questions, you can always connect with the Injective Team via [Discord](https://discord.gg/injective), [Telegram](https://t.me/joininjective), or [email](mailto:contact@injectivelabs.org).
{% endtab %}

{% tab title="Mainnet Network" %}
### Hardware Specification

Node operators should expect to provision one or more data center locations with redundant power, networking, firewalls, HSMs and servers.

The minimum hardware specifications are as follows, though they might rise as network usage increases:

```
(AWS r6i.2xlarge Instance)
8+ vCPU x64
64+ GB RAM
1+ TB SSD storage
1+ Gbps Network Bandwidth
```

For a more performant node, the following configuration is recommended:

```
(AWS r6i.4xlarge Instance or higher)
16+ vCPU
128+ GB RAM
2+ TB SSD storage
5+ Gbps Network Bandwidth
```

The more storage allocated, the less frequently data must be pruned from the node.

### Install `injectived` and `peggo`

See the [Injective chain releases repo](https://github.com/InjectiveLabs/injective-chain-releases/releases/) for the most recent releases. Non-validator node operators do not need to install `peggo`.

```bash
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.13.0-1722157491/linux-amd64.zip
unzip linux-amd64.zip
sudo mv peggo /usr/bin
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib 
```

### Initialize a New Injective Node

Before running Injective node, we need to initialize the chain as well as the node's genesis file:

```bash
# The argument <moniker> is the custom username of your node. It should be human-readable.
export MONIKER=<moniker>
# Injective Mainnet has a chain-id of "injective-1"
injectived init $MONIKER --chain-id injective-1
```

Running the `init` command will create `injectived` default configuration files at `~/.injectived`.

### Prepare Configuration to Join Mainnet

You should now update the default configuration with the Mainnet's genesis file and application config file, as well as configure your persistent peers with seed nodes.

```bash
git clone https://github.com/InjectiveLabs/mainnet-config

# copy genesis file to config directory
cp mainnet-config/10001/genesis.json ~/.injectived/config/genesis.json

# copy config file to config directory
cp mainnet-config/10001/app.toml  ~/.injectived/config/app.toml
```

You can also run verify the checksum of the genesis checksum - 573b89727e42b41d43156cd6605c0c8ad4a1ce16d9aad1e1604b02864015d528

```bash
sha256sum ~/.injectived/config/genesis.json
```

Then update the `seeds` field in `~/.injectived/config/config.toml` with the contents of `mainnet-config/10001/seeds.txt` and update the `timeout_commit` to `300ms`.

```bash
cat mainnet-config/10001/seeds.txt
nano ~/.injectived/config/config.toml
```

### Configure `systemd` Service for `injectived`

Edit the config at `/etc/systemd/system/injectived.service`:

```bash
[Unit]
  Description=injectived

[Service]
  WorkingDirectory=/usr/bin
  ExecStart=/bin/bash -c '/usr/bin/injectived --log-level=error start'
  Type=simple
  Restart=always
  RestartSec=5
  User=root

[Install]
  WantedBy=multi-user.target
```

Starting and restarting the systemd service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart injectived
sudo systemctl status injectived

# enable start on system boot
sudo systemctl enable injectived

# To check Logs
journalctl -u injectived -f
```

The service should be stopped before and started after the snapshot data has been loaded into the correct directory.

```bash
# to stop the node
sudo systemctl stop injectived

# to start the node
sudo systemctl start injectived
```

### Sync with the network

#### Option 1. State-Sync

_To be added soon_

#### Option 2. Snapshots

**Pruned**

1. [Polkachu](https://polkachu.com/tendermint\_snapshots/injective).
2. [HighStakes](https://tools.highstakes.ch/files/injective.tar.gz).
3. [AutoStake](http://snapshots.autostake.net/injective-1/).
4. [Imperator](https://www.imperator.co/services/chain-services/mainnets/injective).
5. [Bware Labs](https://bwarelabs.com/snapshots).

Alternatively, you can use the pruned snapshots from Injective Labs on AWS S3.

```bash
systemctl stop injectived
injectived tendermint unsafe-reset-all --home $HOME/.injectived
SNAP=$(aws s3 ls --no-sign-request s3://injective-snapshots/mainnet/pruned/ | grep ".tar.lz4" | sort | tail -n 1 | awk '{print $4}')
aws s3 cp --no-sign-request s3://injective-snapshots/mainnet/pruned/$SNAP .
lz4 -c -d $SNAP  | tar -x -C $HOME/.injectived/
rm $SNAP
systemctl start injectived
```

Should the Injective `mainnet-config seeds.txt` list not work (the node fails to sync blocks), ChainLayer, Polkachu, and Autostake maintain peer lists (can be used in the `persistent_peers` field in `config.toml`) or addressbooks (for faster peer discovery).

**Archival** (>20TB)

```bash
systemctl stop injectived
injectived tendermint unsafe-reset-all --home $HOME/.injectived
aws s3 sync --no-sign-request --delete s3://injective-snapshots/mainnet/injectived/data $HOME/.injectived/data
aws s3 sync --no-sign-request --delete s3://injective-snapshots/mainnet/injectived/wasm $HOME/.injectived/wasm
systemctl start injectived
```

At this point, [GEX](https://github.com/cosmos/gex) can be used to monitor the node's sync status. If the snapshot has been correcly loaded, the number of connected peers should increase from 0 and the latest block should steadily increase, signalling the node syncing with its peers. Note that it may take a few or several hours for the node to catch up to the network's block height depending on the age of the snapshot.

In the case where the latest block does not increase and the number of connected peers is 0 or remains low, the seed list in `seeds.txt` may be outdated, and the `seeds` or `persistent_peers` fields can be updated using a validator's seed or peer list respectively, before the node is started again.

```bash
go install github.com/cosmos/gex@latest
gex
```

#### Support

For any further questions, you can always connect with the Injective Team via [Discord](https://discord.gg/injective), [Telegram](https://t.me/joininjective), or [email](mailto:contact@injectivelabs.org)
{% endtab %}
{% endtabs %}

