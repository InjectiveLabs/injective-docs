# Denom

A denom is how assets are represented within the Bank module of Injective. These assets can be used for trading, creating new markets on the exchange module, participating in auctions, transferring to another address, etc.

Depending on the origin of the denom and how it was created on Injective we have different types of denoms:

* **Native denoms** - there is only one denom of this type, the `inj` denom which represented the native coin of Injective,
* **Peggy denoms** - these denoms represent assets bridged over from Ethereum to Injective using the Peggy bridge. They have the following format `peggy{ERC20_CONTRACT_ADDRESS}`
* **IBC denoms** - these denoms represent assets bridged over from other Cosmos chains through IBC. They have the following format `ibc/{hash}`.
* **Insurance Fund Denoms** - these denoms represent token shares of the insurance funds created on Injective. They have the following format `share{id}`
* **Factory Denoms** - these denoms are a representation of a CW20 token from Cosmwasm on the Injective native bank module. They have the following format `factory/{OWNER}/{SUBDENOM}` where the `OWNER` is the owner who created the factory denom. One example is the CW20 token factory denom `factory/{CW20_ADAPTER_CONTRACT}/{CW20_CONTRACT_ADDRESS}` where the `CW20_ADAPTER_CONTRACT` is the adapter contract address which does the conversion between CW20 and the native Bank module.

## Token

Token is simply a denom on the Injective chain with some meta information. The metadata includes information like symbol, name, decimals, logo for the particular denom, etc. The metadata of the denom is quite important for a dApp developer as information on the chain is stored in its raw form (for example `1inj` on the chain is represented as `1*10^18inj`) so we need to have a way to show the user human-readable information (numbers, logo, symbol, etc).