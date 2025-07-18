# Interact with a smart contract using Hardhat

## Prerequisites

You should already have a Hardhat project set up, and have deployed your smart contract successfully.
See the [deploy a smart contract using Hardhat](./deploy-hardhat.md) tutorial for how to do so.

Optionally, but strongly recommended: You should also have successfully verified your smart contract.
See the [verify a smart contract using Hardhat](./verify-hardhat.md) tutorial for how to do so.

## Start the Hardhat console

Use the following command to start an interactive Javascript REPL.

```shell
npx hardhat console --network inj_testnet
```

Now the shell will be a NodeJs REPL instead of your regular shell (bash, zsh, et cetera).
In this REPL, we will create an instance of the `Counter` smart contract.
To do so, use `ethers.getContractFactory(...)` and `contract.attach('0x...');`.
For example, if the smart contract was deployed to `0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b`, the commands should look like this:

```js
const Counter = await ethers.getContractFactory('Counter');
const counter = await Counter.attach('0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b');
```

Note that in this REPL, you will see `> ` as the shell prompt.
The results of each prompt are output without this prefix.
The contents of your terminal will therefore look similar to this:

```js
> const Counter = await ethers.getContractFactory('Counter');
undefined
> const counter = await Counter.attach('0x98798cc92651B1876e9Cc91EcBcfe64cac720a1b');
undefined
```

Now you can interact with the smart contract using `counter`.

## Invoke function - query

Queries are read-only operations.
So smart contract state **is not updated**.
As *no state change* is needed, no wallets, signatures, or transaction fees (gas) are required.

Use the following command to query the `value()` function.

```js
await counter.value();
```

This should output the following.

```js
0n
```

{% hint style="info" %}
Note that `0n` means `0`, the `n` suffix indicates that it is
a [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
and not a [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

This is because Solidity's `uint256` (the return type of the `value()` function in the smart contract),
is not possible to be represented with `Number`,
as the largest possible integer value for that is `2^53 - 1`.
Thus `BigInt` needs to be used instead.
{% endhint %}

## Invoke function - transaction

Transactions are write operations.
So smart contract **state is updated**.
As *state change* can occur, the transaction must be signed by a wallet, and transaction fees (gas) need to be paid.

Use the following command to transact the `increment(num)` function.

```js
await counter.increment(1, { gasPrice: 160e6, gasLimit: 2e6 });
```
{% hint style="info" %}
Note that gas price is stated in *wei*.
1 wei = 10^-18 INJ.
{% endhint %}

If successful, this should produce a result similar to the following:

```js
ContractTransactionResponse { ...
```

After updating the state, you can query the new state.
The result will reflect the state change.

```js
await counter.value();
```

This time the result should be `1n` because `0 + 1 = 1`.

```js
1n
```

## Stop the Hardhat console

Press `Ctrl+C` twice in a row, or enter the `.exit` command.

## Next steps

Congratulations, you have completed this entire guide for developing EVM smart contracts on Injective using Hardhat!

Smart contracts do not provide a user experience for non-technical users.
To cater to them, you will need to build a decentralised application.
To do so, check out the [your first dApp](../dapps/README.md) guides!
