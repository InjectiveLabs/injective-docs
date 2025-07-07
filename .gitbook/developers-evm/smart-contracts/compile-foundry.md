# Setup Foundry and compile a smart contract

## Prerequisites

Ensure that you have Foundry installed, by running the following command:

```shell
forge --version
```

Note that the version used in this tutorial was `1.2.3-stable`. Be sure to use this version or later when following along.

If you do not have foundry yet, run the following command to install it:

```shell
curl -L https://foundry.paradigm.xyz | bash
```

{% hint style="info" %}
There are other options for how to install Foundry.
See the [the Foundry installation docs](https://getfoundry.sh/introduction/installation).
{% endhint %}

You will need a wallet, and an account that has been funded with some Testnet INJ.

{% hint style="info" %}
You can request EVM testnet funds from the [Injective Testnet faucet](https://testnet.faucet.injective.network/).
{% endhint %}

After creating your account, be sure to copy your private key somewhere accessible, as you will need it to complete this tutorial.

{% hint style="info" %}
Note that private keys should be handled with caution.
The instructions here should be considered sufficient for local development and Testnet.
However, these are **not** secure enough for private keys used on Mainnet.
Please ensure that you follow best practices for key security on Mainnet, and do not re-use the same keys/ accounts between Mainnet and other networks.
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

Enter the following command to import a private key, and save it against an account named `injTest`:

```shell
cast wallet import injTest --interactive
```

This will prompt you for the private key, and also a password that you need to enter each time you wish to use this account.
Use the private key of the account which you have just created and funded earlier (e.g. via the Injective Testnet faucet).
Note that when you type or paste text for the private key and password, nothing is shown in the terminal.
The output should look similar to this:

```
Enter private key:
Enter password:
`injTest` keystore was saved successfully. Address: 0x58f936cb685bd6a7dc9a21fa83e8aaaf8edd5724
```

{% hint style="info" %}
This saves an encrypted version of the private key in `~/.foundry/keystores`,
and in subsequent commands can be accessed using the `--account` CLI flag.
{% endhint %}

## Edit the smart contract

The smart contract that is included in this demo is very basic. It:

- Stores one `value` which is a number.
- Exposes a `value()` query method.
- Exposes an `increment(num)` transaction method.

Open the file: `src/Counter.sol`

```solidity
// SPDX-License-Identifier: MIT
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

Now that you have set up a Foundry project and compiled a smart contract, you are ready to test that smart contract!
Check out the [test a smart contract using Foundry](./test-foundry.md) tutorial next.
