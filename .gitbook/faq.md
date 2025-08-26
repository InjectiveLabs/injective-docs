# Injective FAQ

## Fundamentals

Q: What account address types are supported in Injective?

A: There are 2 address types supported:
- Bech32 (`inj...`), which is primarily used when interacting via Cosmos wallets/ tools
- Hexadecimal (`0x...`), which is primarily used when interacting via EVM wallets/ tools

----

Q: Is there a way to find which Injective Cosmos address is mapped to which Injective EVM address?

A: The mapping between these address types is done through a mathematical operation,
which is 1 to 1, and bidirectional.
- Live example: [Injective Testnet Faucet](https://testnet.faucet.injective.network/)
- Docs: [TS code examples](https://docs.injective.network/developers/convert-addresses)

----

## Infrastructure

Q: When maintaining a private node:

- Should we store 2.5 Ti archival data (event provider)?
- Can we skip that part and make indexer work?

A: Event provider can be pruned. One can use the public event provider endpoint for the initial sync.  Then resort to local deployment, but only from the latest height. Therefore, yes can be skipped.

----

## EVM

Q: Does Injective have a deployment of the [`multicall3`](https://www.multicall3.com/) smart contract? <!-- tachida2k -->

A: Yes.

- Injective Testnet `multicall3`: [`0xcA11bde05977b3631167028862bE2a173976CA11`](https://testnet.blockscout.injective.network/address/0xcA11bde05977b3631167028862bE2a173976CA11?tab=contract)
- Injective Mainnet `multicall3`: [`0xcA11bde05977b3631167028862bE2a173976CA11`](https://blockscout.injective.network/address/0xcA11bde05977b3631167028862bE2a173976CA11?tab=contract)

----
