# Token Standards

Injective provides a variety of different token standards one can use when creating a dApp. In this document, we will cover the different types of tokens, as well as recommendations and guidance for using each.

## Denom

A denom is how assets are represented within the Bank module of Injective. These assets can be used for trading, creating new markets on the exchange module, participating in auctions, transferring to another address, etc.

Depending on the origin of the denom and how it was created on Injective we have different types of denoms:

* **Native denoms** - there is only one denom of this type, the `inj` denom which represented the native coin of Injective,
* **Peggy denoms** - these denoms represent assets bridged over from Ethereum to Injective using the Peggy bridge. They have the following format `peggy{ERC20_CONTRACT_ADDRESS}`
* **IBC denoms** - these denoms represent assets bridged over from other Cosmos chains through IBC. They have the following format `ibc/{hash}`.
* **Insurance Fund Denoms** - these denoms represent token shares of the insurance funds created on Injective. They have the following format `share{id}`
* **Factory Denoms** - these `tokenfactory` denoms allows any account to create a new token with the name `factory/{creator address}/{subdenom}`. Because tokens are namespaced by creator address, this allows token minting to be permissionless, due to not needing to resolve name collisions. Special usecase for these denoms is representing a CW20 token from Cosmwasm on the Injective native bank module. They have the following format `factory/{CW20_ADAPTER_CONTRACT}/{CW20_CONTRACT_ADDRESS}` where the `CW20_ADAPTER_CONTRACT` is the adapter contract address that converts CW20 and the native Bank module.

We'll share more details about these denom types later on in this document.&#x20;

### **Token**

Token is simply a denom on the Injective chain with some meta information. The metadata includes information like symbol, name, decimals, logo for the particular denom, etc. The metadata of the denom is quite important for a dApp developer as information on the chain is stored in its raw form (for example `1inj` on the chain is represented as `1*10^18inj`) so we need to have a way to show the user human-readable information (numbers, logo, symbol, etc).

### Token Metadata <a href="#token-metadata" id="token-metadata"></a>

Assets on Injective are represented as denoms. Denoms (and the amounts) are not human readable and this is why we need to have a way to "attach" token metadata information for a particular denom.

Let's recap the types of denoms we have in the Getting Started section:

* **Native denoms** - there is only one denom of this type, the `inj` denom which represented the native coin of Injective,
* **Peggy denoms** - these denoms represent assets bridged over from Ethereum to Injective using the Peggy bridge. They have the following format `peggy{ERC20_CONTRACT_ADDRESS}`
* **IBC denoms** - these denoms represent assets bridged over from other Cosmos chains through IBC. They have the following format `ibc/{hash}`.
* **Insurance Fund Denoms** - these denoms represent token shares of the insurance funds created on Injective. The have the following format `share{id}`
* **Factory Denoms** -&#x20;

We maintain our token metadata list off-chain for faster access to the[ injective-lists](https://github.com/InjectiveLabs/injective-lists/tree/master/tokens) repository.
