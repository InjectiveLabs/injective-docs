# Token Standards

Injective provides a variety of different token standards one can use when creating a dApp. In this document, we will cover the different types of tokens, as well as recommendations and guidance for using each.

## Denom

A denom is how assets are represented within the Bank module of Injective. These assets can be used for trading, creating new markets on the exchange module, participating in auctions, transferring to another address, etc.

Depending on the origin of the denom and how it was created on Injective, we have different types of denoms:

* **Native denoms** - there is only one denom of this type, the `inj` denom which represented the native coin of Injective,
* **Peggy denoms** - these denoms represent assets bridged over from Ethereum to Injective using the Peggy bridge. They have the following format `peggy{ERC20_CONTRACT_ADDRESS}`
* **IBC denoms** - these denoms represent assets bridged over from other IBC compatible chains through IBC. They have the following format `ibc/{hash}`.
* **Insurance Fund Denoms** - these denoms represent token shares of the insurance funds created on Injective. They have the following format `share{id}`
* **Factory Denoms** - these `tokenfactory` denoms allows any account to create a new token with the name `factory/{creator address}/{subdenom}`. Because tokens are namespaced by creator address, this allows token minting to be permissionless, due to not needing to resolve name collisions. A special use case for these denoms is representing a CW20 token from Cosmwasm on the Injective native bank module. They have the following format `factory/{CW20_ADAPTER_CONTRACT}/{CW20_CONTRACT_ADDRESS}` where the `CW20_ADAPTER_CONTRACT` is the adapter contract address that converts CW20 and the native Bank module.

We'll share more details about these denom types later on in this document.&#x20;

Learn how to get denom metadata [here](https://docs.ts.injective.network/readme/assets#token-metadata).
