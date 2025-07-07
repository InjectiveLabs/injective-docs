# Setup Foundry and compile a smart contract

## Prerequsites

Ensure that you have foundry installed, by running the following command:

```shell
forge --version
```

Note that the version used in this tutorial was `1.2.3-stable`. Be sure to use this version or later when following along.

If you do not have foundry yet, run the following command to install it:

```
curl -L https://foundry.paradigm.xyz | bash
```

{% hint style="info" %}
There are other options for how to install Foundry.
See the [the Foundry installation docs](https://getfoundry.sh/introduction/installation).
{% endhint %}

You will need a wallet, and an account that has been funded with some Testnet INJ.
After creating your account, be sure to copy your private key somewhere accessible, as you will need it to complete this tutorial.

{% hint style="info" %}
You can request EVM testnet funds from the [Injective Testnet faucet](https://testnet.faucet.injective.network/).
{% endhint %}

## Set up a new Foundry project

Use git to clone the demo repo, which already has the project completely set up for you.

```shell
git clone https://github.com/injective-dev/foundry-inj
cd foundry-inj
```

## Orientation

Open the repo in your code editor/ IDE, and take a look at the directory structure.

```text
foundry-inj/
  src/
    Counter.sol --> smart contract Solidity code
  test/
    Counter.t.sol --> test cases
  foundry.toml --> configuration
```

The `foundry.toml` file is already pre-configured to connect to the Injective EVM Testnet.
All you need to do before proceeding is to provide it with a private key of your Injective Testnet account.

TODO keystore and cast walet import 

## Edit the smart contract

The smart contract that is included in this demo is very basic. It:

- Stores one `value` which is a number.
- Exposes a `value()` query method.
- Exposes an `increment(num)` transaction method.

Open the file: `contracts/Counter.sol`

```solidity
//SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Counter {
    uint256 public value = 0;

    function increment(uint256 num) external {
        value += num;
    }
}

```

## Compile the smart contract

Run the following command:

```shell
forge build
```

Foundry will automatically download and run the version of the Solidity compiler (`solc`) that was configured in the `foundry.toml` file.

## Check the compilation output

After the compiler completes, you should see additional directories in the project directory:

```text
foundry-inj/
  cache/
    ...
  out/
    build-info/
      ...
    Counter.sol/
        Counter.json --> open this file
```

Open the `Counter.json` file (`out/Counter.sol/Counter.json`).
In it, you should see the compiler outputs, including the `abi` and `bytecode` fields.
These artifacts are used in all later steps (test, deploy, verify, and interact).

## Next steps

Now that you have set up a Hardhat project and compiled a smart contract, you are ready to test that smart contract!
Check out the [test a smart contract using Foundry](./test-foundry.md) tutorial next.
