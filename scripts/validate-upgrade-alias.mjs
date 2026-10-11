#!/usr/bin/env node
/**
 * Validate the "Latest Upgrade" navbar shortcut.
 *
 * The navbar links to the fixed path /upgrade/latest, which docs.json redirects
 * to whichever upgrade guide is currently featured. prepare-upgrade-doc.py keeps
 * the two in step for scheduled releases, but emergency guides are added by hand
 * (there is no published injective-core release for builds like v1.20.4-bl.2, so
 * the drafting workflow never runs for them). This guard catches those PRs.
 *
 * Enforced:
 *   1. Exactly one group in the navigation holds the upgrade guides.
 *   2. Exactly one guide sits at the top level of it. Older ones belong in
 *      "Historical Upgrades".
 *   3. The featured guide is not also listed under Historical Upgrades.
 *   4. The featured guide's .mdx exists on disk.
 *   5. /upgrade/latest is defined and points at the featured guide.
 *
 * Run: npm run validate:upgrade-alias
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const GITBOOK = join(REPO_ROOT, ".gitbook");
const DOCS_JSON = join(GITBOOK, "docs.json");

const NAV_ANCHOR = "infra/validator-mainnet/canonical-chain-upgrade";
const LATEST_ALIAS = "/upgrade/latest";
const HISTORICAL = "Historical Upgrades";

const errors = [];
const fail = (msg) => errors.push(msg);

const docs = JSON.parse(readFileSync(DOCS_JSON, "utf8"));

// The upgrade guides live in whichever group lists the NAV_ANCHOR page.
const groups = [];
(function walk(node) {
  if (Array.isArray(node)) return node.forEach(walk);
  if (node && typeof node === "object") {
    if (Array.isArray(node.pages) && node.pages.includes(NAV_ANCHOR)) groups.push(node);
    Object.values(node).forEach(walk);
  }
})(docs.navigation);

if (groups.length !== 1) {
  fail(
    `Expected exactly 1 navigation group containing "${NAV_ANCHOR}", found ${groups.length}. ` +
      `Both prepare-upgrade-doc.py and this check assume a single group.`
  );
}

const group = groups[0];
let featured = [];

if (group) {
  featured = group.pages.filter(
    (p) => typeof p === "string" && p.startsWith(`${NAV_ANCHOR}-`)
  );

  if (featured.length === 0) {
    fail(
      `No upgrade guide is featured at the top level of the "${group.group}" group. ` +
        `The newest guide belongs directly after "${NAV_ANCHOR}".`
    );
  } else if (featured.length > 1) {
    fail(
      `${featured.length} upgrade guides are at the top level of the "${group.group}" group, ` +
        `expected 1. Move all but the newest into "${HISTORICAL}":\n` +
        featured.map((p) => `    - ${p}`).join("\n")
    );
  }

  const historical = group.pages.find(
    (p) => p && typeof p === "object" && p.group === HISTORICAL
  );
  if (!historical) {
    fail(`No "${HISTORICAL}" group found inside "${group.group}".`);
  } else {
    for (const page of featured) {
      if (historical.pages.includes(page)) {
        fail(`"${page}" is featured and also listed under "${HISTORICAL}". Remove one.`);
      }
    }
  }
}

for (const page of featured) {
  if (!existsSync(join(GITBOOK, `${page}.mdx`))) {
    fail(`Navigation references "${page}" but .gitbook/${page}.mdx does not exist.`);
  }
}

// The navbar shortcut must resolve to the featured guide.
const alias = (docs.redirects ?? []).find((r) => r.source === LATEST_ALIAS);
if (!alias) {
  fail(
    `No redirect defined for "${LATEST_ALIAS}". The navbar "Latest Upgrade" link depends on it.`
  );
} else if (featured.length === 1) {
  const expected = `/${featured[0]}`;
  if (alias.destination !== expected) {
    fail(
      `"${LATEST_ALIAS}" points at "${alias.destination}" but the featured guide is "${expected}". ` +
        `Update the redirect destination in .gitbook/docs.json.`
    );
  }
}

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`::error file=.gitbook/docs.json::${e.replace(/\n/g, "%0A")}`);
    console.error(`\n  ${e}\n`);
  }
  console.error(
    `${errors.length} problem(s) with the Latest Upgrade shortcut. See scripts/validate-upgrade-alias.mjs.`
  );
  process.exit(1);
}

console.log(`Latest Upgrade shortcut is consistent.`);
console.log(`  featured guide : ${featured[0]}`);
console.log(`  ${LATEST_ALIAS} -> ${alias.destination}`);
