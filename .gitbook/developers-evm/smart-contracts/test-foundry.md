# Test a smart contract using Foundry

## Prerequisites

You should already have a Foundry project set up, and have compiled your smart contract successfully.
See the [setup Foundry and compile a smart contract](./compile-foundry.md) tutorial for how to do so.

## Edit the test specifications

As the smart contract we are testing is minimal, so are the test cases that it needs.

Before testing, we need to deploy the smart contract.
This happens in the `before` block.
This is because smart contracts cannot execute in isolation, they must be within the EVM to execute.
In Foundry, by default, the tests will execute in an emulated in-memory EVM instance, which is transient, so the deployment is perfunctory.

Open the file: `test/Counter.t.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { Counter } from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function test_InitialValue() public view {
        assertEq(counter.value(), 0);
    }

    function test_IncrementValueFromZero() public {
        counter.increment(100);
        assertEq(counter.value(), 100);
    }

    function test_IncrementValueFromNonZero() public {
        counter.increment(100);
        counter.increment(23);
        assertEq(counter.value(), 123);
    }
}

```

We see that there are 3 test cases:

- Check the initial `value()`.
- Invoke `increment(num)` and then check that the `value()` has updated.
- Invoke `increment(num)` again, and then check that the `value()` has updated again.

## Execute tests against the smart contract

The following command runs the tests we just looked at.

```shell
forge test
```

<!-- include comamnd to run tests in public network instead of emulated EVM -->

## Check the test output

If all the tests work as planned, you should see some output similar to the following:

```text
Ran 3 tests for test/Counter.t.sol:CounterTest
[PASS] test_IncrementValueFromNonZero() (gas: 32298)
[PASS] test_IncrementValueFromZero() (gas: 31329)
[PASS] test_InitialValue() (gas: 10392)
Suite result: ok. 3 passed; 0 failed; 0 skipped; finished in 5.35ms (3.16ms CPU time)

Ran 1 test suite in 171.04ms (5.35ms CPU time): 3 tests passed, 0 failed, 0 skipped (3 total tests)
```

## Next steps

Now that you have tested your smart contract, you are ready to deploy that smart contract!
Check out the [deploy a smart contract using Foundry](./deploy-foundry.md) tutorial next.

