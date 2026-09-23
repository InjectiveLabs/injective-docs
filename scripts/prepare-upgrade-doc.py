#!/usr/bin/env python3
"""Draft the canonical chain upgrade doc when a new injective-core release is cut.

Run by .github/workflows/prepare-upgrade-docs.yaml (also runnable locally).
Detects the newest stable release of InjectiveFoundation/injective-core; if
.gitbook/infra/validator-mainnet/canonical-chain-upgrade-<version>.mdx does not
exist yet, it generates a draft from live chain + GitHub data, inserts the page
into the docs.json navigation, and moves the previous upgrade page into the
"Historical Upgrades" group.

Fields that cannot be derived automatically (libwasmvm checksum, binary version
command outputs, Indexer API version) are left as `TBD` for human review.
"""

import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(REPO_ROOT, ".gitbook", "infra", "validator-mainnet")
DOCS_JSON = os.path.join(REPO_ROOT, ".gitbook", "docs.json")

LCD = "https://lcd.injective.network"
TM_RPC = "https://sentry.tm.injective.network"
CORE_RELEASES = (
    "https://api.github.com/repos/InjectiveFoundation/injective-core/releases?per_page=30"
)
NAV_ANCHOR = "infra/validator-mainnet/canonical-chain-upgrade"

# Tags that are not mainnet canonical releases
NON_STABLE = re.compile(r"-(rc|beta|alpha|dev)", re.IGNORECASE)
# Release tags look like v1.20.4-1789748350 (base version + build id)
TAG_RE = re.compile(r"^(?P<base>v.+?)-(?P<build>\d{9,})$")


def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "injective-docs-bot"})
    token = os.environ.get("GITHUB_TOKEN")
    if token and "api.github.com" in url:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def gh_output(key, value):
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a") as f:
            f.write(f"{key}={value}\n")
    print(f"{key}={value}")


def ordinal(n):
    if 11 <= n % 100 <= 13:
        return f"{n}th"
    return f"{n}{ {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th') }"


def latest_stable_release(releases):
    for r in releases:
        if r.get("draft") or r.get("prerelease"):
            continue
        m = TAG_RE.match(r["tag_name"])
        if not m or NON_STABLE.search(m.group("base")):
            continue
        return m.group("base"), m.group("build"), r["html_url"]
    return None, None, None


def find_release_for(releases, base_version):
    for r in releases:
        m = TAG_RE.match(r["tag_name"])
        if m and m.group("base") == base_version:
            return r["tag_name"], r["html_url"]
    return None, None


def find_upgrade_proposal(plan_name):
    data = fetch_json(
        f"{LCD}/cosmos/gov/v1/proposals?pagination.limit=50&pagination.reverse=true"
    )
    for p in data.get("proposals", []):
        for msg in p.get("messages", []):
            if "SoftwareUpgrade" not in msg.get("@type", ""):
                continue
            plan = msg.get("plan", {})
            if plan.get("name") == plan_name and "REJECTED" not in p.get("status", ""):
                return p["id"], plan.get("height")
    return None, None


def estimate_halt_time(halt_height):
    """Estimate the halt timestamp from measured average block time."""
    status = fetch_json(f"{TM_RPC}/status")
    now_height = int(status["result"]["sync_info"]["latest_block_height"])
    now_time = datetime.now(timezone.utc)
    sample = 100_000
    old = fetch_json(f"{TM_RPC}/block?height={now_height - sample}")
    old_time = datetime.fromisoformat(
        re.sub(r"(\.\d{6})\d*Z$", r"\1+00:00", old["result"]["block"]["header"]["time"])
    )
    block_time = (now_time - old_time).total_seconds() / sample
    eta = now_time + timedelta(seconds=(int(halt_height) - now_height) * block_time)
    return eta


def format_day(dt):
    return f"{dt.strftime('%A, %B')} {ordinal(dt.day)}, {dt.year}"


def build_doc(ctx):
    return f"""---
title: Upgrade to {ctx['version']}
description: How to upgrade Injective Mainnet Validator node to {ctx['version']}
updatedAt: "{ctx['today']}"
---

{ctx['halt_day']}

Following [IIP-{ctx['proposal_id']}](https://injhub.com/proposal/{ctx['proposal_id']}/), the upgrade procedure should be performed at block height **{ctx['halt_height']}**.

* [Summary](#summary)
* [Compatibility for Integrators](#compatibility-for-integrators)
* [Recovery](#recovery)
* [Upgrade Procedure](#upgrade-procedure)
* [Notes for Validators](#notes-for-validators)

## Summary

The Injective Chain will undergo a scheduled enhancement upgrade at approximately **{ctx['halt_day']}, {ctx['halt_time_utc']} UTC**.

The following is a short summary of the upgrade steps:

1. Vote and wait till the node panics at block height **{ctx['halt_height']}**.
2. Backing up configs, data, and keys used for running the Injective Chain.
3. Install the [{ctx['version']}]({ctx['release_url']}) binaries.
4. Start your node with the new injectived binary to fulfill the upgrade.

Upgrade coordination and support for validators will be available on the `#validators` private channel of the [Injective Discord](https://discord.gg/injective).

The network upgrade can take the following potential pathways:

1. **Happy path**:\\
   Validators successfully upgrade the chain without purging the blockchain history, and all validators are up within 5-10 minutes of the upgrade.
2. **Not-so-happy path**:\\
   Validators have trouble upgrading to the latest Canonical chain.
3. **Abort path**:\\
   In the rare event that the team becomes aware of unnoticed critical issues, the Injective team will attempt to patch all the breaking states and provide another official binary within 36 hours.\\
   If the chain is not successfully resumed within 36 hours, the upgrade will be announced as aborted on the `#validators` channel in [Injective's Discord](https://discord.gg/injective), and validators will need to resume running the chain without any updates or changes.

## Compatibility for Integrators

Component versions verified against Injective Mainnet {ctx['version']}. The official SDK releases are identical to the `-rc` versions published during the testnet cycle — if you are already running the `-rc` build, no migration is required.

| Component                     | Compatible Version                                                       |
| ----------------------------- | ------------------------------------------------------------------------ |
| `injective-core` (injectived) | [{ctx['version']}]({ctx['release_url']})                                 |
| Indexer API                   | {ctx['indexer_version']}                                                 |
| `sdk-go`                      | [{ctx['sdk_go']}](https://github.com/InjectiveLabs/sdk-go/releases/tag/{ctx['sdk_go']}) |
| `sdk-python`                  | [{ctx['sdk_python']}](https://github.com/InjectiveLabs/sdk-python/releases/tag/{ctx['sdk_python']}) |

## Recovery

Prior to exporting chain state, validators are encouraged to take a full data snapshot at the export height before proceeding. Snapshotting depends heavily on infrastructure, but generally this can be done by backing up the `.injectived` directory.

It is critically important to backup the `.injectived/data/priv_validator_state.json` file after stopping your injectived process. This file is updated every block as your validator participates in consensus rounds. It is a critical file needed to prevent double-signing in case the upgrade fails and the previous chain needs to be restarted.

In the event that the upgrade does not succeed, validators and operators must restore the snapshot and downgrade back to Injective Chain release [{ctx['prev_version']}]({ctx['prev_release_url']}) and continue this earlier chain until the next upgrade announcement.

## Upgrade Procedure

### Notes for Validators

You must remove the wasm cache before upgrading to the new version:

```shell
rm -rf .injectived/wasm/wasm/cache/
```

### Steps

1.  Verify you are currently running the correct version (`{ctx['prev_version']}`) of `injectived`:

    ```bash
    $ injectived version
    TBD
    ```

2.  Make a backup of your `.injectived` directory:

    ```bash
    cp -r ~/.injectived ./injectived-backup
    ```

3. Download and install the `injective-chain` release for {ctx['version']}:

    ```bash
    wget https://github.com/InjectiveFoundation/injective-core/releases/download/{ctx['version']}-{ctx['build_id']}/linux-amd64.zip
    unzip linux-amd64.zip
    sudo mv injectived peggo /usr/bin
    sudo mv libwasmvm.x86_64.so /usr/lib
    sudo ldconfig
    ```

4.  Verify the checksum of the installed `libwasmvm` library:

    ```bash
    $ sha256sum /usr/lib/libwasmvm.x86_64.so
    TBD  /usr/lib/libwasmvm.x86_64.so
    ```

    <Warning>
      Any other checksum can lead to consensus issues.
    </Warning>

5.  Verify you are currently running the correct version ({ctx['version']}) of `injectived` after downloading the {ctx['version']} release:

    ```bash
    $ injectived version
    TBD
    ```

6.  Start `injectived`:

    ```bash
    injectived start
    ```

7.  Verify you are currently running the correct version ({ctx['version']}) of `peggo` after downloading the {ctx['version']} release:

    ```bash
    $ peggo version
    TBD
    ```

8.  Start peggo:

    ```bash
    peggo orchestrator
    ```
"""


def update_nav(new_page):
    with open(DOCS_JSON) as f:
        docs = json.load(f)

    def walk(node):
        if isinstance(node, dict):
            pages = node.get("pages")
            if isinstance(pages, list) and NAV_ANCHOR in pages:
                return node
            for v in node.values():
                found = walk(v)
                if found:
                    return found
        elif isinstance(node, list):
            for v in node:
                found = walk(v)
                if found:
                    return found
        return None

    group = walk(docs)
    if not group:
        print("WARNING: could not locate the Upgrades group in docs.json; add the page manually")
        return False

    pages = group["pages"]
    historical = next(
        (p for p in pages if isinstance(p, dict) and p.get("group") == "Historical Upgrades"),
        None,
    )
    # Demote the currently featured upgrade page(s) into Historical Upgrades
    current = [
        p for p in pages
        if isinstance(p, str) and p.startswith(NAV_ANCHOR + "-") and p != new_page
    ]
    for p in current:
        pages.remove(p)
        if historical:
            historical["pages"].insert(0, p)

    if new_page not in pages:
        pages.insert(pages.index(NAV_ANCHOR) + 1, new_page)

    with open(DOCS_JSON, "w") as f:
        json.dump(docs, f, indent=2, ensure_ascii=False)
        f.write("\n")
    return True


def main():
    releases = fetch_json(CORE_RELEASES)
    version, build_id, release_url = latest_stable_release(releases)
    if not version:
        print("No stable release found")
        gh_output("has_new", "false")
        return

    doc_path = os.path.join(DOCS_DIR, f"canonical-chain-upgrade-{version}.mdx")
    if os.path.exists(doc_path):
        print(f"Doc already exists for {version}: {doc_path}")
        gh_output("has_new", "false")
        return

    # Version currently running on mainnet = the rollback target
    node_info = fetch_json(f"{LCD}/cosmos/base/tendermint/v1beta1/node_info")
    prev_version = node_info.get("application_version", {}).get("version", "TBD")
    _, prev_release_url = find_release_for(releases, prev_version)

    proposal_id, halt_height = find_upgrade_proposal(version)

    halt_day = "TBD"
    halt_time_utc = "TBD"
    if halt_height:
        try:
            eta = estimate_halt_time(halt_height)
            halt_day = format_day(eta)
            halt_time_utc = eta.strftime("%H:%M")
        except Exception as e:  # ETA is best-effort; the doc ships with TBD
            print(f"Could not estimate halt time: {e}")

    def latest_tag(repo):
        try:
            return fetch_json(
                f"https://api.github.com/repos/InjectiveLabs/{repo}/releases/latest"
            )["tag_name"]
        except Exception:
            return "TBD"

    ctx = {
        "version": version,
        "build_id": build_id,
        "release_url": release_url,
        "prev_version": prev_version,
        "prev_release_url": prev_release_url or
            "https://github.com/InjectiveFoundation/injective-core/releases",
        "proposal_id": proposal_id or "TBD",
        "halt_height": halt_height or "TBD",
        "halt_day": halt_day,
        "halt_time_utc": halt_time_utc,
        "today": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "indexer_version": "TBD",
        "sdk_go": latest_tag("sdk-go"),
        "sdk_python": latest_tag("sdk-python"),
    }

    with open(doc_path, "w") as f:
        f.write(build_doc(ctx))
    print(f"Wrote {doc_path}")

    update_nav(f"infra/validator-mainnet/canonical-chain-upgrade-{version}")

    gh_output("has_new", "true")
    gh_output("version", version)
    gh_output("tag", f"{version}-{build_id}")
    gh_output("release_url", release_url)
    gh_output("proposal_id", ctx["proposal_id"])
    gh_output("halt_height", ctx["halt_height"])
    gh_output("doc_path", os.path.relpath(doc_path, REPO_ROOT))


if __name__ == "__main__":
    sys.exit(main())
