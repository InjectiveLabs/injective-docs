# Verify a smart contract using Foundry

## Prerequisites

You should already have a Foundry project set up, and have deployed your smart contract successfully.
See the [deploy a smart contract using Foundry](./deploy-foundry.md) tutorial for how to do so.

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

## Run the verification command

Enter the following command:

```shell
forge verify-contract \
  --rpc-url injectiveEvm \
  --verifier blockscout \
  --verifier-url 'https://testnet.blockscout-api.injective.network/api/' \
  ${SC_ADDRESS} \
  src/Counter.sol:Counter
```

Replace `${SC_ADDRESS}` with the address at which you deployed your smart contract.

For example, if the smart contract address is `0x213bA803265386C10CE04a2cAa0f31FF3440b9cF`, the command is:

```shell
forge verify-contract \
  --rpc-url injectiveEvm \
  --verifier blockscout \
  --verifier-url 'https://testnet.blockscout-api.injective.network/api/' \
  0x213bA803265386C10CE04a2cAa0f31FF3440b9cF \
  src/Counter.sol:Counter
```

## Check the verification outcome

You should see output similar to this in the terminal:

```text
Start verifying contract `0x213bA803265386C10CE04a2cAa0f31FF3440b9cF` deployed on 1439
Submitting verification for [src/Counter.sol:Counter] 0x213bA803265386C10CE04a2cAa0f31FF3440b9cF.
Submitted contract for verification:
        Response: `OK`
        GUID: `213ba803265386c10ce04a2caa0f31ff3440b9cf686b778c`
        URL: https://testnet.blockscout-api.injective.network/address/0x213ba803265386c10ce04a2caa0f31ff3440b9cf
```

The more interesting outcome is visiting the network explorer.
Visit the network explorer URL from the verification output.
Then select the "Contract" tab.
Then select the "Code" sub-tab.
Previously, there was only "ByteCode" available,
and now "Code", "Compiler", and "ABI" are also available.

Still within the "Contract" tab,
select the "Read/Write contract" sub-tab.
Previously, this did not exist,
but now you can interact with every smart contract function directly from the block explorer.

## Next steps

Now that you have deployed and verified your smart contract, you are ready to interact with that smart contract!
Check out the [interact with a smart contract using Foundry](./interact-foundry.md) tutorial next.
