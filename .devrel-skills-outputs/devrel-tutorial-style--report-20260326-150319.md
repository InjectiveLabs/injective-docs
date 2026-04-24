# Injective tutorial style review

## Summary

- 13 issues found
- Breakdown:
  - Section layout: 4 issues
  - Components: 2 issues
  - Developer friction: 1 issue
  - Voice and tone: 3 issues
  - Grammar and spelling: 1 issue
  - Word choice: 2 issues
- Files processed:
  - `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

## Documentation style summary

- 6 issues found
- Breakdown:
  - Voice and tone: 3 issues
  - Grammar and spelling: 1 issue
  - Word choice: 2 issues

## Issues

### I-001 - Section layout — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

Missing intro section (before "Prerequisites") with a "what we will learn" bullet list.
Every tutorial should open with 3–5 bullet points telling the reader what they will gain,
so they can decide whether this tutorial is relevant to them before diving in.

```diff
+ ## What we will learn
+
+ - How to write test cases for a Solidity smart contract
+ - How to deploy a smart contract into Hardhat's in-memory EVM for testing
+ - How to run tests locally with `npx hardhat test`
+ - How to interpret test output including gas reporting
+
  ## Prerequisites
```

### I-002 - Section layout — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

The "Next steps" section is missing both a congratulatory statement and a "what we have learnt" bullet list that mirrors the intro.
These are required by the tutorial style guide.

```diff
  ## Next steps

+ Congratulations on testing your first smart contract on Injective!
+
+ Here is what we covered in this tutorial:
+
+ - Writing test cases for a Solidity smart contract using Chai and Hardhat
+ - Deploying a contract into Hardhat's in-memory EVM before tests run
+ - Running tests locally with `npx hardhat test`
+ - Reading test output and the accompanying gas report
+
  Now that you have tested your smart contract, you are ready to deploy that smart contract!
```

### I-003 - Section layout — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

The tutorial has only two instruction steps ("Edit the test specifications" and "Execute tests against the smart contract") before the info step ("Check the test output").
The style guide requires at least three instruction steps.

Consider splitting "Edit the test specifications" into two separate steps, for example:

1. **"Create the test file"** — instruct the reader to create `test/Counter.test.js` (resolves the ambiguity in I-006 below).
2. **"Add the test cases"** — walk through each test case added to the file.

This would give three instruction steps followed by one info step, satisfying the minimum.

### I-004 - Section layout — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

The "Next steps" section links to the next tutorial in the series but does not link to any other tutorials that this one "unlocks".
If completing this tutorial enables the reader to proceed to other (non-series) tutorials (e.g. testing with a fork, writing fuzz tests), those should be linked here.

This is a low-priority / informational issue — only apply if such related tutorials exist.

### I-005 - Components — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

No accompanying code repository is linked in this tutorial.
A link to the repo (or to the relevant branch/tag that represents the starting and/or ending state) helps readers who get stuck or want to compare their work.

```diff
+ > The finished code for this tutorial is available in the
+ > [injective-hardhat-example](https://github.com/InjectiveLabs/...) repository.
+
  ## Prerequisites
```

### I-006 - Components — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

No demo video is linked.
A short screencast showing the test run and output lowers the barrier for readers who are visual learners or who are stuck.
This is a strong recommendation for all tutorials in this series.

### I-007 - Developer friction — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"Open the file: `test/Counter.test.js`" is ambiguous — it implies the file already exists, but the tutorial has not instructed the reader to create it.
If the file is expected to be pre-created (e.g. by Hardhat's init scaffold), state that explicitly.
If the reader must create it themselves, replace "Open" with an instruction to create the file first.

```diff
- Open the file: `test/Counter.test.js`
+ Create the file `test/Counter.test.js` and add the following content:
```

### I-008 - Voice and tone — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"We see that there are 3 test cases" uses first-person plural ("we"), which the style guide says to use sparingly.
Rewrite in second-person or neutral voice.

```diff
- We see that there are 3 test cases:
+ There are three test cases:
```

### I-009 - Voice and tone — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"we need to deploy the smart contract" uses first-person plural.
Rewrite in second-person.

```diff
- Before testing, we need to deploy the smart contract.
+ Before testing, deploy the smart contract.
```

### I-010 - Voice and tone — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"the tests we just looked at" uses first-person plural.
Rewrite in second-person or neutral voice.

```diff
- The following command runs the tests we just looked at.
+ The following command runs the tests defined above.
```

### I-011 - Grammar and spelling — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

The number "3" appears in prose ("3 test cases") but the style guide requires numbers one through nine to be spelled out.
(The same numeral inside the code output block is fine.)

```diff
- We see that there are 3 test cases:
+ There are three test cases:
```

(Combined fix with I-008 above.)

### I-012 - Word choice — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"See the [set up Hardhat and compile a smart contract] tutorial" uses "see", which the style guide replaces with "view" or "look at".

```diff
- See the [set up Hardhat and compile a smart contract](./compile-hardhat/) tutorial for how to do so.
+ Refer to the [set up Hardhat and compile a smart contract](./compile-hardhat/) tutorial for instructions.
```

### I-013 - Word choice — `.gitbook/developers-evm/smart-contracts/test-hardhat.mdx`

"Check out the [deploy a smart contract using Hardhat] tutorial next" uses the informal phrase "check out".
Replace with a more neutral phrasing.

```diff
- Check out the [deploy a smart contract using Hardhat](./deploy-hardhat/) tutorial next.
+ Continue with the [deploy a smart contract using Hardhat](./deploy-hardhat/) tutorial.
```

## Reproducing this report

This report was generated using:

```text
/devrel-dev-tutorial-style for @.gitbook/developers-evm/smart-contracts/test-hardhat.mdx
```

From git commit: `fix/audit-20260326 60b7b64 2026-03-25`

Using agent: `2.1.84 (Claude Code) claude-sonnet-4-6 devrel-dev-tutorial-style@0.0.0`
