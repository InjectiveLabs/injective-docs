# Injective documentation style review

## Summary

- 4 issues found
- Breakdown:
  - Formatting: 1 issue
  - Grammar and spelling: 2 issues
  - Clarity: 1 issue
- Files processed:
  - `.gitbook/faq.mdx`

## Issues

### I-001 - `.gitbook/faq.mdx`

Spurious space before slash in `wallets/ tools` (lines 11–12). A slash used as a conjunction between two words should have no surrounding spaces.

```diff
- Bech32 (`inj...`), which is primarily used when interacting via Cosmos wallets/ tools
+ Bech32 (`inj...`), which is primarily used when interacting via Cosmos wallets/tools
```

```diff
- Hexadecimal (`0x...`), which is primarily used when interacting via EVM wallets/ tools
+ Hexadecimal (`0x...`), which is primarily used when interacting via EVM wallets/tools
```

---

### I-002 - `.gitbook/faq.mdx`

The abbreviation "EVM" is used on first occurrence (line 12) without being spelled out. Per the abbreviations rule, spell out on first use and place the abbreviation in parentheses immediately after.

```diff
- which is primarily used when interacting via EVM wallets/tools
+ which is primarily used when interacting via Ethereum Virtual Machine (EVM) wallets/tools
```

Subsequent uses of "EVM" (lines 16, 35) can remain abbreviated.

---

### I-003 - `.gitbook/faq.mdx`

The abbreviation "TiB" (line 28) is used without being spelled out on first use.

```diff
- Should you store 2.5 TiB of archival data (event provider)?
+ Should you store 2.5 tebibytes (TiB) of archival data (event provider)?
```

---

### I-004 - `.gitbook/faq.mdx`

The pronoun "it" in "Yes, you can skip it." (line 31) has an ambiguous antecedent. The question mentions both the archival-data storage step and the indexer; the answer should make clear which one can be skipped.

```diff
- A: You can prune the event provider. Use the public event provider endpoint for the initial sync, then switch to local deployment from the latest height. Yes, you can skip it.
+ A: You can prune the event provider. Use the public event provider endpoint for the initial sync, then switch to local deployment from the latest height. Yes, you can skip the archival-data storage step.
```

---

## Reproducing this report

This report was generated using:

```text
/devrel-dev-docs-style for @.gitbook/faq.mdx
```

From git commit: `fix/audit-20260326 60b7b64 2026-03-25`

Using agent: `2.1.84 (Claude Code) claude-sonnet-4-6 devrel-dev-docs-style@0.0.0`
