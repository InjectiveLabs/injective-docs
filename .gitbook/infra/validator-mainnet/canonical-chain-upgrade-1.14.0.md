---
sidebar_position: 19
---

# Upgrade to v1.14.0

Monday, February 17th, 2025

Following [Proposal 494](https://injhub.com/proposals/494/) This indicates that the upgrade procedure should be performed on block number **106315000**

* [Summary](#summary)
* [Risks](#risks)
* [Recovery](#recovery)
* [Upgrade Procedure](#upgrade-procedure)
* [Notes for Validator Operators](#notes-for-validators)

## Summary

The Injective Chain will undergo a scheduled enhancement upgrade on **Monday, February 17th, 2025, 14:00 UTC**.

The following is a short summary of the upgrade steps:

1. Vote and wait till the node panics at block height **106315000**.
2. Backing up configs, data, and keys used for running the Injective Chain.
3. Install the [v1.14.0-1739303348](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.14.0-1739303348)
4. Start your node with the new injectived binary to fulfill the upgrade.

Upgrade coordination and support for validators will be available on the `#validators` private channel of the [Injective Discord](https://discord.gg/injective).

The network upgrade can take the following potential pathways:

1. **Happy path**\
   Validators successfully upgrade chain without purging the blockchain history, and all validators are up within 5-10 minutes of the upgrade.
2. **Not-so-happy path**\
   Validators have trouble upgrading to the latest Canonical chain.
3. **Abort path**\
   In the rare event that the team becomes aware of unnoticed critical issues, the Injective team will attempt to patch all the breaking states and provide another official binary within 36 hours.\
   If the chain is not successfully resumed within 36 hours, the upgrade will be announced as aborted on the #validators channel of [Discord](https://discord.gg/injective), and validators will need to resume running the chain without any updates or changes.

## Recovery

Prior to exporting chain state, validators are encouraged to take a full data snapshot at the export height before proceeding. Snapshotting depends heavily on infrastructure, but generally this can be done by backing up the `.injectived` directory.

It is critically important to backup the `.injectived/data/priv_validator_state.json` file after stopping your injectived process. This file is updated every block as your validator participates in a consensus rounds. It is a critical file needed to prevent double-signing, in case the upgrade fails and the previous chain needs to be restarted.

In the event that the upgrade does not succeed, validators and operators must restore the snapshot and downgrade back to [Injective Chain v1.13.3 release](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/release-prod-1734610315) and continue the chain until next upgrade announcement.

### Upgrade Procedure

## Notes for Validators

You must remove the wasm cache before upgrading to the new version (rm -rf .injectived/wasm/wasm/cache/).

1.  Verify you are currently running the correct version (`d92e96087`) of `injectived`:

    ```bash
    injectived version
    Version v1.13.3 (d92e96087)
    Compiled at 20241219-1212 using Go go1.22.5 (amd64)
    ```
2.  Make a backup of your `.injectived` directory

    ```bash
    cp ~/.injectived ./injectived-backup
    ```

    3. Download and install the injective-chain `v1.14.0 release`

    ```bash
    wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.14.0-1739303348/linux-amd64.zip
    unzip linux-amd64.zip
    sudo mv injectived peggo /usr/bin
    sudo mv libwasmvm.x86_64.so /usr/lib
    ```
3.  Verify you are currently running the correct version (`4139d7dcd`) of `injectived` after downloading the v1.14.0 release:

    ```bash
    injectived version
    Version v1.14.0 (4139d7dcd)
    Compiled at 20250211-1725 using Go go1.23.1 (amd64)
    ```
4.  Start injectived

    ```bash
    injectived start
    ```
5.  Verify you are currently running the correct version (`5317d5c`) of `peggo` after downloading the v1.14.0 release:

    ```bash
    peggo version
    Version dev (5317d5c)
    Compiled at 20250211-1726 using Go go1.22.5 (amd64)
    ```
6.  Start peggo

    ```bash
    peggo orchestrator
    ```
