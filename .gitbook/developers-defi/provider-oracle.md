# Provider Oracle

{% hint style="info" %}
Prerequisite reading [Injective Oracle Module](../modules/injective/oracle/)
{% endhint %}

The goal of this section is to provide users a guide on how to launch and maintain an oracle provider on Injective. These oracles can be used for various purposes, like Perpetual Markets, Expiry Futures Markets, [Binary Options markets](../modules/injective/exchange/02_binary_options_markets.md), etc.

First, what is an oracle provider? It's an oracle **TYPE** that allows external parties to relay price feeds to the Injective chain. These external parties are called providers. A provider identifies each external party, and all the price feeds provided on the chain are stored under that particular provider. This allows custom price feeds to be created on Injective, which can power creative and advanced markets being launched on Injective.

The first thing developers need to do is register their provider under the Oracle Provider type. You can do that by submitting a `GrantProviderPrivilegeProposal` governance proposal. Once the proposal passes, your provider will be registered, and you can relay price feeds. You can do it in a CLI environment using `injectived` (`grant-provider-privilege-proposal [providerName] [relayers] --title [title] --description [desc] [flags]`) or using any of our SDKs to create the message and broadcast it to the chain.

{% hint style="info" %}
You can see an example on how to submit this proposal in the Oracle Module Proposals Section
{% endhint %}

_Note: the `relayers` of the `GrantProviderPrivilegeProposal` are addresses that will be whitelisted to submit the price feeds to Injective._

Once the proposal passes, the `relayers` can use the `MsgRelayProviderPrices` to submit prices for a base/quote pair within their provider namespace of the Oracle Provider Type oracle on Injective. You can do it in a CLI environment using `injectived` (`relay-provider-prices [providerName] [symbol:prices] [flags]`) or using any of our SDKs to create the message and broadcast it to the chain.

Finally, you can use these price feeds to create your Derivative Markets.
