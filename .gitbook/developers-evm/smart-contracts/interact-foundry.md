# Interact with a smart contract using Foundry

## Prerequisites

You should already have a Foundry project set up, and have deployed your smart contract successfully.
See the [deploy a smart contract using Foundry](./deploy-foundry.md) tutorial for how to do so.

Optionally, but strongly recommended: You should also have successfully verified your smart contract.
See the [verify a smart contract using Foundry](./verify-foundry.md) tutorial for how to do so.

## Invoke function - query

Queries are read-only operations.
So smart contract state **is not updated**.
As *no state change* is needed, no wallets, signatures, or transaction fees (gas) are required.

Use the following command to query the `value()` function:

```shell
cast call \
  --rpc-url injectiveEvm \
  ${SC_ADDRESS} \
  "value()"
```

Replace `${SC_ADDRESS}` with the address at which you deployed your smart contract.

For example, if the smart contract address is `0x213ba803265386c10ce04a2caa0f31ff3440b9cf`, the command is:

```shell
cast call \
  --rpc-url injectiveEvm \
  0x213ba803265386c10ce04a2caa0f31ff3440b9cf \
  "value()"
```

This should output the following.

```text
0x0000000000000000000000000000000000000000000000000000000000000000
```

{% hint style="info" %}
Note that `0x0000000000000000000000000000000000000000000000000000000000000000` means `0`.
It is the raw representation in hexadecimal for Solidity's `uint256` (the return type of the `value()` function in the smart contract).
{% endhint %}

## Invoke function - transaction

Transactions are write operations.
So smart contract **state is updated**.
As *state change* can occur, the transaction must be signed by a wallet, and transaction fees (gas) need to be paid.

Use the following command to transact the `increment(num)` function.

```shell
cast send \
  --legacy \
  --rpc-url injectiveEvm \
  --gas-price 160000000 \
  --gas-limit 2000000 \
  --account injTest \
  ${SC_ADDRESS} \
  "increment(uint256)" \
  1
```

{% hint style="info" %}
Note that gas price is stated in *wei*.
1 wei = 10^-18 INJ.
{% endhint %}

Replace `${SC_ADDRESS}` with the address at which you deployed your smart contract.

For example, if the smart contract address is `0x213ba803265386c10ce04a2caa0f31ff3440b9cf`, the command is:

```shell
cast send \
  --legacy \
  --rpc-url injectiveEvm \
  --gas-price 160000000 \
  --gas-limit 2000000 \
  --account injTest \
  0x213ba803265386c10ce04a2caa0f31ff3440b9cf \
  "increment(uint256)" \
  1
```

If successful, this should produce a result similar to the following:

```text
Enter keystore password:
blockHash            0xe4c1f5faafc5365c43678135d6adc87104f0e288cddfcdffeb2f5aa08282ca22
blockNumber          83078201
contractAddress
cumulativeGasUsed    43623
effectiveGasPrice    160000000
from                 0x58f936cb685Bd6a7dC9a21Fa83E8aaaF8EDD5724
gasUsed              43623
logs                 []
logsBloom            0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root
status               1 (success)
transactionHash      0x3c95e15ba24074301323e09d09d5967cc2858e255d1fdfd912758fd8bbd353b4
transactionIndex     0
type                 0
blobGasPrice
blobGasUsed
to                   0x213bA803265386C10CE04a2cAa0f31FF3440b9cF
```

After updating the state, you can query the new state.
The result will reflect the state change.

```shell
cast call \
  --rpc-url injectiveEvm \
  ${SC_ADDRESS} \
  "value()"
```

This time the result should be `0x0000000000000000000000000000000000000000000000000000000000000001` because `0 + 1 = 1`.

```js
0x0000000000000000000000000000000000000000000000000000000000000001
```

## Next steps

Congratulations, you have completed this entire guide for developing EVM smart contracts on Injective using Foundry!

<!-- TODO add link to building a dapp when that is available -->
