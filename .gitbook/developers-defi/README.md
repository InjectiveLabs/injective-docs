# Exchange Developers

Injective marks the forefront of exchange-focused layer-1 blockchains offering decentralized perpetual swaps, futures, and spot trading. It fully taps into the possibilities of decentralized derivatives and borderless DeFi. Every component is designed to embody complete trustlessness, resistance to censorship, public verifiability, and resilience against front-running.

Injective enables traders to create and trade arbitrary spot and derivatives markets. Injective also enables on-chain limit orderbook management, on-chain trade execution, on-chain order matching, on-chain transaction settlement, and on-chain trading incentive distribution through the logic codified by the Injective Chain's [Exchange Module](../modules/injective/exchange/).

### Build an Orderbook DEX on Injective

As an incentive mechanism to encourage exchanges to build on Injective and source trading activity, exchanges that originate orders into the shared orderbook of Injective's exchange protocol [(](../modules/injective/exchange/)[read more](#user-content-fn-1)[^1]) are rewarded with $$β=40%β=40%$$ of the trading fee from orders that they source. The exchange protocol implements a global minimum trading fee of $$rm=0.1%rm​=0.1%$$ for makers and $$rt=0.2%rt​=0.2%$$ for takers.

The goal of Injective's incentive mechanism is to allow exchanges competing amongst each other to provide a better user experience and to better serve users, broadening access to DeFi for users all around the world.

An exchange can easily set up a client (such as a UI on web or mobile) and an API provider.

Head to our TypeScript documentation to [bootstrap your DEX ](https://docs.ts.injective.network/building-dapps/dapps-examples/dex)with few clicks!&#x20;

[^1]: Exchange
