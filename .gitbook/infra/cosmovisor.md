# Cosmovisor Setup Guide for the Injective Network

Cosmovisor is a process manager designed for Cosmos SDK–based blockchains that simplifies the management of binary (chain) upgrades. This guide provides step‐by‐step instructions to set up Cosmovisor for your Injective Network node.

> **Note:** These instructions assume you already have an existing chain binary (e.g., `injectived`) and a working Go environment if you choose to install Cosmovisor from source. Adjust the names and paths as needed for your specific setup.

---

## Table of Contents

1. [Installation](#installation)
   - [Installing via Go](#installing-via-go)
2. [Environment Variables](#environment-variables)
3. [Directory Structure](#directory-structure)
4. [Running Cosmovisor](#running-cosmovisor)
5. [Handling Chain Upgrades](#handling-chain-upgrades)
6. [Running Cosmovisor as a Systemd Service](#running-cosmovisor-as-a-systemd-service)

---

## Installation

### Installing via Go

If you have Go installed, you can install Cosmovisor with the following command:

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.5.0
```

> **Tip:** Ensure that your Go binary installation path (commonly `$GOPATH/bin` or `$HOME/go/bin`) is added to your system’s `PATH`. You can verify the installation by running:
>
> ```bash
> which cosmovisor
> ```

## Environment Variables

Set up the following environment variables so that Cosmovisor knows which binary to run and where to locate it:

- **`DAEMON_NAME`**  
  The name of your chain’s binary (e.g., `injectived`).

- **`DAEMON_HOME`**  
  The home directory for your node (e.g., `~/.injectived`).

You can set these variables in your shell’s profile (like `~/.bashrc` or `~/.profile`) or export them directly in your terminal session:

```bash
export DAEMON_NAME=injectived
export DAEMON_HOME=~/.injectived
```

---

## Directory Structure

Cosmovisor expects a specific folder structure in your node’s home directory:

1. **Create the Genesis Directory**

   This directory holds the initial (genesis) binary.

   ```bash
   mkdir -p $DAEMON_HOME/cosmovisor/genesis/bin
   ```

2. **Copy Your Current Binary**

   Place your current chain binary (e.g., `injectived`) into the genesis folder. Make sure the file name matches the `DAEMON_NAME` value (see next section).

   ```bash
   cp $(which injectived) $DAEMON_HOME/cosmovisor/genesis/bin/injectived
   ```

---

## Running Cosmovisor

Instead of running your chain’s binary directly, start your node with Cosmovisor by executing:

```bash
cosmovisor run start
```

Cosmovisor will:

- Look for the binary in `$DAEMON_HOME/cosmovisor/genesis/bin` (or the appropriate upgrade folder).
- Start your node using that binary.
- Monitor for any on-chain upgrade signals and automatically switch binaries when needed.

---

## Handling Chain Upgrades

When an upgrade is announced on-chain, prepare the new binary so Cosmovisor can switch to it automatically:

1. **Create an Upgrade Directory**

   Use the upgrade name provided on-chain (e.g., `v1.14.0`):

   ```bash
   mkdir -p $DAEMON_HOME/cosmovisor/upgrades/<upgrade_name>/bin
   ```

2. **Place the New Binary**

   Compile or download the new binary, then copy it into the upgrade directory. Ensure the binary name matches `DAEMON_NAME`.

   ```bash
   cp /path/to/new/injectived $DAEMON_HOME/cosmovisor/upgrades/<upgrade_name>/bin
   cp /path/to/new/libwasmvm.x86_64.so $DAEMON_HOME/cosmovisor/upgrades/<upgrade_name>/bin
   ```

> **TIP:** If you have downloaded the `injectived` binary package from GitHub, we copy `libwasmvm.x86_64.so` to the upgrade `bin` directory. An environment variable will be later added to the systemd service to add this directory to `LD_LIBRARY_PATH`.

3. **Upgrade Process**

   When the upgrade height is reached, Cosmovisor will detect the scheduled upgrade and automatically switch to the binary located in the corresponding upgrade folder.

---

## Running Cosmovisor as a Systemd Service

For production environments, it is common to run your node as a systemd service. Below is an example service file.

1. **Create the Service File**

   Create a file (e.g., `/etc/systemd/system/injectived.service`) with the following content. Adjust the paths and `<your_username>` accordingly:

   ```ini
   [Unit]
   Description=Injective Daemon managed by Cosmovisor
   After=network-online.target

   [Service]
   User=<your_username>
   ExecStart=/home/<your_username>/go/bin/cosmovisor run start
   Restart=always
   RestartSec=3
   Environment="DAEMON_NAME=injectived"
   Environment="DAEMON_HOME=/home/<your_username>/.injectived"
   Environment="PATH=/usr/local/bin:/home/<your_username>/go/bin:$PATH"
   Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
   Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
   Environment="UNSAFE_SKIP_BACKUP=true"
   Environment="LD_LIBRARY_PATH=/home/<your_username>/.injectived/cosmovisor/current/bin"

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and Start the Service**

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable injectived.service
   sudo systemctl start injectived.service
   ```

3. **Check Logs**

   Verify that your service is running smoothly:

   ```bash
   journalctl -u injectived.service -f
   ```

---
