# Exchange Integrations Cheatsheet

If you are an exchange (either CEX or DEX), itegrating with Injective Mainnet, this page is for you!

## Injective's MultiVM architecture

Injective supports **both** Cosmos and EVM transactions.
There are, therefore two different ways to perform several operations.
As an exchange, most likely you are primarily concerned about how this impacts the following activity:

- Transfers of cryptocurrency
- Transfers of fungible tokens
- Transfers of non-fungible tokens

## Cosmos and EVM transactions

When can you use Cosmos transactions?
When can you use EVM transactions?
The answer varies depending on the asset that is being transferred.

When transferring INJ, the cryptocurrency of the Injective network:

- All all cases, you may use **either** Cosmos transactions or EVM transactions, they are equivalent.

When transferring fungible tokens, you must first check what type of fungible token it is:

- If it implements the [MultiVM Token Standard (MTS)](./multivm-token-standard.md),
  you may use **either** Cosmos transactions or EVM transactions, they are equivalent.
  - This is because MTS tokens are simultaneously both a Denom and an ERC20.
- If it is a Denom (and not MTS), you may only use Cosmos transactions.
- If it is an ERC20 (and not MTS), you may only use EVM transactions.

When transferring non-fungible tokens:

- If it is a Cosmos NFT (`x/nft`), you may only use Cosmos transactions.
- If it is an ERC721, you may only use EVM transactions.

## Designing for optimal user experience

In an exchange, you cannot expect all, but the most technically adept of,
retail users to comprehend/ navigate the above.
Thus, we strongly recommend that you build the logic for the above
directly into your exchange application.

### Withdrawals

- If user enters a Cosmos address (`inj...`):
  - Use this directly, perform the transfer.
- If user enters an EVM address (`0x...`):
  - Convert this to a Cosmos address (`inj...`).
    - See [convert addresses](../developers/convert-addresses.md)
  - Perform the transfer to the converted address

### Deposits

- If user deposits using a Cosmos address (`inj...`):
  - Listen for `MsgSend` transactions, including `memo` field.
  - Listen for `MsgMultiSend` transactions, including `memo` field.
- If user enters an EVM address (`0x...`):
  - Listen for JSON-RPC events to monitor for deposits.
