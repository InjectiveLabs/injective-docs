# Test a smart contract using Hardhat

## Prerequisites

You should already have a Hardhat project set up, and have compiled your smart contract successfully.
See the [set up Hardhat and compile a smart contract](./compile-hardhat.md) tutorial for how to do so.

## Edit the test specifications

As the smart contract we are testing is minimal, so are the test cases that it needs.

Before testing, we need to deploy the smart contract.
This happens in the `before` block.
This is because smart contracts cannot execute in isolation, they must be within the EVM to execute.
In Hardhat, by default, the tests will execute in an emulated in-memory EVM instance, which is transient, so the deployment is perfunctory.

Open the file: `test/Counter.test.js`

```js
const { expect } = require('chai');

describe('Counter', function () {
  let counter;

  before(async function () {
    Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy();
    await counter.waitForDeployment();
  });

  it('should start with a count of 0', async function () {
    expect(await counter.value()).to.equal(0);
  });

  it('should increment the count starting from zero', async function () {
    await counter.increment(100);
    expect(await counter.value()).to.equal(100);
  });

  it('should increment the count starting from non-zero', async function () {
    await counter.increment(23);
    expect(await counter.value()).to.equal(123);
  });
});

```

We see that there are 3 test cases:

- Check the initial `value()`.
- Invoke `increment(num)` and then check that the `value()` has updated.
- Invoke `increment(num)` again, and then check that the `value()` has updated again.

## Execute tests against the smart contract

The following command runs the tests we just looked at.

```shell
npx hardhat test
```

The following command runs the test, but **not** within the emulated EVM instance.
Instead, the smart contract is deployed to the Injective Testnet (a public network), and then tests are run against it.
This is **not recommended** in most cases, and is only needed in select/ advanced use cases.

```shell
npx hardhat test --network inj_testnet
```

## Check the test output

If all the tests work as planned, you should see some output similar to the following:

```text
  Counter
    ✔ should start with a count of 0
    ✔ should increment the count starting from zero
    ✔ should increment the count starting from non-zero
  3 passing (41ms)
```

This is followed by a table which includes additional reporting on gas, which is a measure of the complexity and transaction costs.

## Next steps

Now that you have tested your smart contract, you are ready to deploy that smart contract!
Check out the [deploy a smart contract using Hardhat](./deploy-hardhat.md) tutorial next.
