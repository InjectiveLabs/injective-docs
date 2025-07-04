# Verify a smart contract using Hardhat

## Prerequisites

You should already have a hardhat project set up, and have deployed your smart contract successfully.
See the [deploy Hardhat and compile a smart contract](./deploy-hardhat.md) tutorial for how to do so.

## What is smart contract verification?

The process of verification does not have any effect on the smart contract itself, or any other state of the network.

Instead it is a standardised process through which network explorers are provided with the original source code of the smart contract deployed at a particular address. The network explorer **independently compiles** that source code, and verifies that the resultant bytecode it is indeed a **match** with the bytecode present from the smart contract's deployment transaction.

If verification passes (there is a match), then that "unlocks" a new mode within the block explorer for that particular smart contract's page.
The full source code of is shown, the ABI is shown, transactions (and events) are displayed with higher levels of detail as they are able to be parsed using the ABI.
Additionally, if the user connects their wallet on the network explorer they can invoke functions to query thae smart contract, and even send transactions to update the state of the smart contract.

## Edit smart contract verification configuration

Open `hardhat.config.js`, and look at the `etherscan` and `sourcify` elements.

```js
  etherscan: {
    apiKey: {
      inj_testnet: 'foo',
    },
    customChains: [
      {
        network: 'inj_testnet',
        chainId: 1439,
        urls: {
          apiURL: 'https://testnet.blockscout-api.injective.network/api',
          browserURL: 'https://testnet.blockscout.injective.network/',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
```

Sourcify and Etherscan are 2 different popular blockexplorer, each with a different API for verfication.
Injective uses Blockscout, which is compatible with the Etherscan API, hence Sourcify is disabled.
The `api_key` is not needed, so any non-empty value is OK.
The `inj_testnet` network within `customChains` is already configured with the appropriate values for Injective Testnet.

## Run the verification command

Enter the following command:

```shell
npx hardhat verify --network inj_testnet ${SC_ADDRESS}
```

Replace `${SC_ADDRESS}` with the address at which you deployed your smart contract.

For example, if the smart contract address is `0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b`, the command is:

```shell
npx hardhat verify --network inj_testnet 0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b
```

## Check the verification outcome

You should see output similar to this in the terminal:

```text
Successfully submitted source code for contract
contracts/Counter.sol:Counter at 0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Counter on the block explorer.
https://testnet.blockscout.injective.network/address/0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b#code
```

The more interesting outcome is visiting the network explorer.
Visit the the network explorer URL from the verification output.
Then select the "Contract" tab.
Then select the "Code" sub-tab.
Previously there was only "ByteCode" available, and now "Code", "Compiler", and "ABI" are also avilable.

Still within the "Contract" tab,
select the "Read/Write contract" sub-tab.
Previously this did not exist,
but now you can interact with all of the functions in the smart contract right within the block explorer.

## Next steps

Now that you have deployed and verified your smart contract, you are ready to interact that smart contract!
Check out the [interact with a smart contract using Hardhat](./interact-hardhat.md) tutorial next.
