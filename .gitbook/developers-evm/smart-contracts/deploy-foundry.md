# Deploy a smart contract using Foundry

## Prerequisites

You should already have a Foundry project set up, and have compiled your smart contract successfully.
See the [setup Foundry and compile a smart contract](./compile-foundry.md) tutorial for how to do so.

Optionally, but strongly recommended: You should also have tested your smart contract successfully.
See the [test a smart contract using Foundry](./test-foundry.md) tutorial for how to do so.

## Run the deployment

Run the following command to deploy the smart contract:

```shell
forge create \
  src/Counter.sol:Counter \
  --rpc-url injectiveEvm \
  --legacy \
  --account injTest \
  --gas-price 160000000 \
  --gas-limit 2000000 \
  --broadcast
```

{% hint style="info" %}
Note that we're using the `injTest` account saved to the keystore,
which was previously set up in [setup Foundry and compile a smart contract](./compile-foundry.md).
{% endhint %}

The output should look similar to:

```text
Enter keystore password:
Deployer: 0x58f936cb685Bd6a7dC9a21Fa83E8aaaF8EDD5724
Deployed to: 0x213bA803265386C10CE04a2cAa0f31FF3440b9cF
Transaction hash: 0x6aa9022f593083c7779da014a3032efd40f3faa2cf3473f4252a8fbd2a80db6c
```

Copy the deployed address, visit [`https://testnet.blockscout.injective.network`](https://testnet.blockscout.injective.network/), and paste the address in the search field.
You'll visit the smart contract page in the block explorer for the smart contract that you have just deployed.

If you click on the "Contract" tab, you should see the EVM bytecode for that contract, and it will match the EVM bytecode found in your artifacts directory after compilation.

## Next steps

Now that you have deployed your smart contract, you are ready to verify that smart contract!
Check out the [verify a smart contract using Foundry](./verify-foundry.md) tutorial next.
