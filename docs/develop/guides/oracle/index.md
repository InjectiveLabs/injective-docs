# Oracle

Prerequisite: [Injective Oracle Module](../../../develop/modules/injective/oracle/).

## Oracle Provider

The goal of this section is to provide users a guide on how to launch and maintain a oracle provider on Injective. These oracles can be used for various purposes, like Perpetual Markets, Expiry Futures Markets, [Binary Options markets](../../../develop/modules/injective/exchange/02_binary_options_markets.md), etc. 

First, what is an oracle provider? It's an oracle **TYPE** which allows external parties to relay price feed to the Injective chain. These external parties are called providers. Each external party is identified by a provider and all of the price feeds provided on the chain are stored under that particular provider. This allows custom price feed to be created on Injective which can power creative and advanced markets being launched on Injective. 

The first thing developers need to do is register their provider under the Oracle Provider type. You can do that by submitting a `GrantProviderPrivilegeProposal` governance proposal. Once the proposal passes, your provider will be registered and you'll be able to relay price feeds. You can do it in a CLI environment using `injectived` (`grant-provider-privilege-proposal [providerName] [relayers] --title [title] --description [desc] [flags]`) or using any of our SDKs to create the message and broadcast it to the chain. 

Note: the `relayers` of the `GrantProviderPrivilegeProposal` are addresses which will be whitelisted to submit the price feeds to Injective.

Once the proposal passes, the `relayers` can use the `MsgRelayProviderPrices` to submit prices for a base/quote pair within their provider namespace of the Oracle Provider Type oracle on Injective. You can do it in a CLI environment using `injectived` (`relay-provider-prices [providerName] [symbol:prices] [flags]`) or using any of our SDKs to create the message and broadcast it to the chain. 

Finally, you can use these price feeds to create your Derivative Markets. 
