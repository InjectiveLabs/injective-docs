# Interact with a smart contract using Hardhat

## Prerequisites

You should already have a Hardhat project set up, and have deployed your smart contract successfully.
See the [deploy a smart contract using Hardhat](./deploy-hardhat.md) tutorial for how to do so.

Optionally, but strongly recommended: You should also have verified your smart contract successfully.
See the [verify a smart contract using Hardhat](./verify-hardhat.md) tutorial for how to do so.

## Start the Hardhat console

Use the following command to start an interactive Javascript REPL.

```shell
npx hardhat console --network inj_testnet
```

Now the shell will be a NodeJs REPL instead of your regular shell (bash, zsh, et cetera).
In this REPL, we will create an instance of the `Counter` smart contract.
To do so, use `ethers.getContractFactory(...)` and `contract.attach('0x...');`.
For example, if the smart contract was deployed to `0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b`, the command should look like this:

```js
> const Counter = await ethers.getContractFactory('Counter');
undefined
> const counter = await Counter.attach('0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b');
undefined
```

Now you can interact with the smart contract using `counter`.

## Invoke function - query

Queries do not modify state, and are read-only operations.
Thus smart contract state is not updated.
This means that there is no need for a wallet, signatures, or transaction fees (gas).
Use the following command to query the `value()` function.

```js
> await counter.value()
0n
```

## Invoke function - transaction

Transactions modify state, and are write operations.
Thus smart contract state is updated.
This means that the transaction needs to be signed by the wallet, and transaction fees (gas) need to be paid.
Use the following command to transact the `increment(num)` function.

```js
> await counter.increment(1, { gasPrice: 30e9, gasLimit: 2e6 })
ContractTransactionResponse { ...
```

After updating the state, you can query the new state.
This time, the result will reflect the state change.

```js
> await counter.value()
1n
```

## Stop the Hardhat console

Press `Ctrl+C` twice in a row, or enter the `.exit` command.

## Next steps

Congratulations, you have completed this entire guide for developing EVM smart contracts on Injective using Hardhat!
