# Set up Hardhat and compile a smart contract

## Prerequisites

Ensure that you have a recent version of NodeJs installed.
You can check this using the following command:

```shell
node -v
```

This guide was written using the following version:

```text
v22.16.0
```

If you do not have NodeJs installed yet, do so using:

- Linux or Mac: [NVM](https://github.com/nvm-sh/nvm)
- Windows: [NVM for Windows](https://github.com/coreybutler/nvm-windows)

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

## Set up a new Hardhat project

Use git to clone the demo repo, which already has the project completely set up for you.

```shell
git clone https://github.com/injective-dev/hardhat-inj
```

Install dependencies from npm:

```shell
npm install
```

## Orientation

While waiting for npm to download and install, open the repo in your code editor/ IDE, and take a look at the directory structure.

```text
hardhat-inj/
  contracts/
    Counter.sol --> smart contract Solidity code
  script/
    deploy.js --> deployment script
  test/
    Counter.test.js --> test cases
  hardhat.config.js --> configuration
  .example.env
```

The `hardhat.config.js` file is already pre-configured to connect to the Injective EVM Testnet.
All you need to do before proceeding is to provide it with a private key of your Injective Testnet account.

```shell
cp .example.env .env
```

Edit the `.env` file to add the private key.
Optionally, you may wish to update to any alternative JSON-RPC endpoints.

```shell
PRIVATE_KEY=your private key without 0x prefix
INJ_TESTNET_RPC_URL=https://k8s.testnet.json-rpc.injective.network/

```

## Edit the smart contract

The smart contract that is included in this demo is very basic. It:

- Stores one `value` which is a number.
- Exposes a `value()` query method.
- Exposes an `increment(num)` transaction method.

Open the file: `contracts/Counter.sol`

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
npx hardhat compile
```

Hardhat will automatically download and run the version of the Solidity compiler (`solc`) that was configured in the `hardhat.config.js` file.

## Check the compilation output

After the compiler completes, you should see additional directories in the project directory:

```text
hardhat-inj/
  artifacts/
    build-info/
      ...
    contracts/
      Counter.sol/
        Counter.json --> open this file
        ...
  cache/
    ...
```

Open the `Counter.json` file (`artifacts/contracts/Counter.sol/Counter.json`).
In it, you should see the compiler outputs, including the `abi` and `bytecode` fields.
These artifacts are used in all later steps (test, deploy, verify, and interact).

## Next steps

Now that you have set up a Hardhat project and compiled a smart contract, you are ready to test that smart contract!
Check out the [test a smart contract using Hardhat](./test-hardhat.md) tutorial next.
