# Upgrade to v1.16.0

Thursday, July 31st, 2025

Following [Proposal 541](https://injhub.com/proposal/541/) This indicates that the upgrade procedure should be performed on block number **127250000**

* [Summary](#summary)
* [Recovery](#recovery)
* [Upgrade Procedure](#upgrade-procedure)
* [Notes for Validators](#notes-for-validators)

## Summary

The Injective Chain will undergo a scheduled enhancement upgrade on **Thursday, July 31st, 2025, 16:00 UTC**.

The following is a short summary of the upgrade steps:

1. Vote and wait till the node panics at block height **127250000**.
2. Backing up configs, data, and keys used for running the Injective Chain.
3. Install the [v1.16.0](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.16.0-1753404855) binaries.
4. Start your node with the new injectived binary to fulfill the upgrade.

Upgrade coordination and support for validators will be available on the `#validators` private channel of the [Injective Discord](https://discord.gg/injective).

The network upgrade can take the following potential pathways:

1. **Happy path**:\
   Validators successfully upgrade the chain without purging the blockchain history, and all validators are up within 5-10 minutes of the upgrade.
2. **Not-so-happy path**:\
   Validators have trouble upgrading to the latest Canonical chain.
3. **Abort path**:\
   In the rare event that the team becomes aware of unnoticed critical issues, the Injective team will attempt to patch all the breaking states and provide another official binary within 36 hours.\
   If the chain is not successfully resumed within 36 hours, the upgrade will be announced as aborted on the `#validators` channel in [Injective's Discord](https://discord.gg/injective), and validators will need to resume running the chain without any updates or changes.

## Recovery

Prior to exporting chain state, validators are encouraged to take a full data snapshot at the export height before proceeding. Snapshotting depends heavily on infrastructure, but generally this can be done by backing up the `.injectived` directory.

It is critically important to backup the `.injectived/data/priv_validator_state.json` file after stopping your injectived process. This file is updated every block as your validator participates in a consensus rounds. It is a critical file needed to prevent double-signing, in case the upgrade fails and the previous chain needs to be restarted.

In the event that the upgrade does not succeed, validators and operators must restore the snapshot and downgrade back to Injective Chain release [v1.15.0-1744722790](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.15.0-1744722790) and continue this earlier chain until next upgrade announcement.

### Upgrade Procedure

## Notes for Validators

You must remove the wasm cache before upgrading to the new version:

```shell
rm -rf .injectived/wasm/wasm/cache/
```

1.  Verify you are currently running the correct version (`v1.15.0`) of `injectived`:

    ```bash
    $ injectived version
    Version v1.15.0 (013606f41)
    Compiled at 20250528-1843 using Go go1.24.0 (amd64)
    ```

2.  Make a backup of your `.injectived` directory:

    ```bash
    cp ~/.injectived ./injectived-backup
    ```

3. Download and install the `injective-chain` release for `v1.16.0`:

    ```bash
    wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.16.0-1753404855/linux-amd64.zip
    unzip linux-amd64.zip
    sudo mv injectived peggo /usr/bin
    sudo mv libwasmvm.x86_64.so /usr/lib
    ```

4.  Verify you are currently running the correct version (`v1.16.0`) of `injectived` after downloading the`v1.16.0` release:

    ```bash
    Version v1.16.0 (95706035d)
    Compiled at 20250725-0055 using Go go1.23.9 (amd64)
    ```

5.  Start `injectived`:

    ```bash
    injectived start
    ```

6.  Verify you are currently running the correct version (`v1.16.0-peggofix`) of `peggo` after downloading the `v1.16.0` release:

    ```bash
    Version v1.16.0-peggofix (3b346ece0)
    Compiled at 20250730-2027 using Go go1.23.9 (amd64)
    ```

7.  Start peggo:

    ```bash
    peggo orchestrator
    ```
