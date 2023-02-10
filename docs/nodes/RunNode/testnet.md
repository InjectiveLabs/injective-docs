---
sidebar_position: 3
title: Join Testnet
---

# Join the Network

## Hardware Specification
Validators should expect to provision one or more data center locations with redundant power, networking, firewalls, HSMs and servers.

We initially recommend this minimum hardware specifications and they might rise as network usage increases.

```
4+ vCPU x64 2.0+ GHz
32+ GB RAM
1TB+ SSD
```

## Install injectived and peggo

```bash
wget https://github.com/InjectiveLabs/testnet/releases/download/v0.4.19-1672847099/linux-amd64.zip
unzip linux-amd64.zip
sudo mv peggo /usr/bin
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib 
```

## Initialize a new Injective Chain node

Before actually running the Injective Chain node, we need to initialize the chain, and most importantly its genesis file.

```
# The argument <moniker> is the custom username of your node, it should be human-readable.
export MONIKER=<moniker>
# the Injective Chain has a chain-id of "injective-888"
injectived init $MONIKER --chain-id injective-888
```

Running this command will create `injectived` default configuration files at `~/.injectived`.

## Prepare configuration to join Testnet

You should now update the default configuration with the Testnet's genesis file and application config file, as well as configure your persistent peers with a seed node.  

```bash
git clone https://github.com/InjectiveLabs/testnet.git

# copy genesis file to config directory
aws s3 cp s3://injective-snapshots/testnet/genesis.json . --no-sign-request
mv genesis.json ~/.injectived/config/

# copy config file to config directory
cp testnet/corfu/70001/app.toml  ~/.injectived/config/app.toml
cp testnet/corfu/70001/config.toml ~/.injectived/config/config.toml
```

You can also run verify the checksum of the genesis checksum - a4abe4e1f5511d4c2f821c1c05ecb44b493eec185c0eec13b1dcd03d36e1a779
```bash
sha256sum ~/.injectived/config/genesis.json
```

## Configure systemd service for injectived

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

## Sync with the network

```bash
sudo systemctl stop injectived
aws s3 sync --acl public-read --no-sign-request --delete s3://injective-snapshots/testnet/injectived/data $HOME/.injectived/data
aws s3 sync --acl public-read --no-sign-request --delete s3://injective-snapshots/testnet/injectived/wasm $HOME/.injectived/wasm
sudo systemctl start injectived
```


### Support

For any further questions, you can always connect with the Injective Team via Discord, Telegram, and email.

[Discord](https://discord.gg/injective)
[Telegram](https://t.me/joininjective)
[E-mail](mailto:contact@injectivelabs.org)
