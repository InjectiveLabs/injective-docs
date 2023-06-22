# Join Injective Mainnet

## Hardware Specification

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

## Install `injectived` and `peggo`

See the [Injective chain releases repo](https://github.com/InjectiveLabs/injective-chain-releases/releases/) for the most recent releases. Non-validator node operators do not need to install `peggo`.

```bash
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.11.3-1686246472/linux-amd64.zip
unzip linux-amd64.zip
sudo mv peggo /usr/bin
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib 
```

## Initialize a New Injective Chain Node

Before running the Injective Chain node, we need to initialize the chain as well as the node's genesis file:

```bash
# The argument <moniker> is the custom username of your node. It should be human-readable.
export MONIKER=<moniker>
# Injective Mainnet has a chain-id of "injective-1"
injectived init $MONIKER --chain-id injective-1
```

Running the `init` command will create `injectived` default configuration files at `~/.injectived`.

## Prepare Configuration to Join Mainnet

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

## Configure `systemd` Service for `injectived`

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

## Sync with the network

### Option 1. State-Sync

_To be added soon_

### Option 2. Snapshots

**Pruned**

1. [Polkachu](https://polkachu.com/tendermint\_snapshots/injective).
2. [HighStakes](https://tools.highstakes.ch/files/injective.tar.gz).
3. [AutoStake](http://snapshots.autostake.net/injective-1/).
4. [Imperator](https://imperator.co/services/injective).
5. [Bware Labs](https://bwarelabs.com/snapshots).

Alternatively, you can use the pruned snapshots from Injective Labs on AWS S3.

```bash
systemctl stop injectived
injectived tendermint unsafe-reset-all --home $HOME/.injectived
nohup sudo aws s3 sync --no-sign-request --delete s3://injective-snapshots/mainnet/pruned/injectived/data $HOME/.injectived/data &
nohup sudo aws s3 sync --no-sign-request --delete s3://injective-snapshots/mainnet/pruned/injectived/wasm $HOME/.injectived/wasm &
systemctl start injectived
```

Should the Injective `mainnet-config seeds.txt` list not work (the node fails to sync blocks), ChainLayer, Polkachu, and Autostake maintain peer lists (can be used in the `persistent_peers` field in `config.toml`) or addressbooks (for faster peer discovery).

**Archival** (>8TB)

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

### Support

For any further questions, you can always connect with the Injective Team via [Discord](https://discord.gg/injective), [Telegram](https://t.me/joininjective), or [email](mailto:contact@injectivelabs.org)
