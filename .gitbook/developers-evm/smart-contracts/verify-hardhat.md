# Verify a smart contract using Hardhat

## Prerequisites

You should already have a Hardhat project set up, and have deployed your smart contract successfully.
See the [deploy a smart contract using Hardhat](./deploy-hardhat.md) tutorial for how to do so.

## What is smart contract verification?

The process of verification does not have any effect on the smart contract itself, or any other state of the network.

Instead, it is a standardised process through which network explorers are provided with the original source code of the smart contract deployed at a particular address. The network explorer **independently compiles** that source code, and verifies that the resultant bytecode is indeed a **match** with the bytecode present from the smart contract's deployment transaction.

If verification passes (there is a match), the block explorer "unlocks" an enhanced mode within for that particular smart contract's page.
More smart contract details are now displayed, including:
* Full source code (Solidity)
* ABI (JSON)
* Transactions and events are shown with higher detail (parsed using ABI)

Additionally, if the user connects their wallet, they can invoke functions within the network explorer itself to query the smart contract, and even send transactions to update its state.

<!-- TODO consider moving this section to FAQs -->

## Edit smart contract verification configuration

Open `hardhat.config.js`, and look at the `etherscan` and `sourcify` elements.

```js
  etherscan: {
    apiKey: {
      inj_testnet: 'nil',
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

Sourcify and Etherscan are two popular block explorers, each with a different API for verification.
Injective uses Blockscout, which is compatible with the Etherscan API.
Hence, Sourcify is disabled in the configuration.
Within the Etherscan configuration, the `apiKey` value is not needed, so any non-empty value is OK.
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
Visit the network explorer URL from the verification output.
Then select the "Contract" tab.
Then select the "Code" sub-tab.
Previously, there was only "ByteCode" available, and now "Code", "Compiler", and "ABI" are also available.

Still within the "Contract" tab,
select the "Read/Write contract" sub-tab.
Previously, this did not exist,
but now you can interact with every smart contract function directly from the block explorer.

## Next steps

Now that you have deployed and verified your smart contract, you are ready to interact with that smart contract!
Check out the [interact with a smart contract using Hardhat](./interact-hardhat.md) tutorial next.
