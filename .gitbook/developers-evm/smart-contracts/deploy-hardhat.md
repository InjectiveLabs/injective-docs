# Deploy a smart contract using Hardhat

## Prerequisites

You should already have a hardhat project set up, and have compiled your smart contract successfully.
See the [setup Hardhat and compile a smart contract](./compile-hardhat.md) tutorial for how to do so.

Optionally, but strong recommended: You should also have tested your smart contract successfully.
See the [test a smart contract using Hardhat](./test-hardhat.md) tutorial for how to do so.

## Edit the deployment script

In order for the smart contract that you have compiled on your computer to exist on the Injective Testnet, it needs to be deployed onto the network.

To do so, we'll make use a of a script that uses an `ethers` instance that is pre-configured and injected by hardhat using the values specified in `hardhat.config.js`.

Open the file:  `script/deploy.js`

```js
async function main() {
    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy({
        gasPrice: 30e9,
        gasLimit: 2e6,
    });
    await counter.waitForDeployment();
    const address = await counter.getAddress();

    console.log('Counter smart contract deployed to:', address);
}
```

Recall that after compiling the smart contracts, we looked at `artifacts/contracts/Counter.sol/Counter.json`? In this script `ethers.getContractFactory('Counter')` retrieves that file, and extracts ABI and EVM bytecode from it.
The following lines use that information to constrauct a deployment transaction and submit it to the network.
If successful, the address at which your smart contract was deployed will be output, for example:
[`0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b`](https://testnet.blockscout.injective.network/address/0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b)

Note that on other EVM networks, transactions (including deployment transacrtions), do not need to specify a gas price and a gas limit. Currently, however, this is necessary on Injective.

## Run the deployment script

```shell
npx hardhat run script/deploy.js --network inj_testnet
```

Copy the deployed address, visit [`https://testnet.blockscout.injective.network`](https://testnet.blockscout.injective.network/), and paste the address in the search field.
You'll visit the smart contract page in the block explorer for the smart contract that you have just deployed.

If you click on the "Contract" tab, you should see the EVM bytecode for that contract, and it will match the EVM bytecode found in your artifacts directory after compilation.


## Next steps

Now that you have deployed your smart contract, you are ready to verify that smart contract!
Check out the [verify a smart contract using Hardhat](./verify-hardhat.md) tutorial next.
