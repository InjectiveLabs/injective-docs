# Building dApps

Injective is a Layer-1 blockchain built for finance. Injective offers developers out-of-the-box primitives for building decentralized financial applications in addition to an open and permissionless smart contracts layer providing advanced capabilities in building robust Web3 applications.

Injective is natively interoperable with several well-known blockchain networks, including Ethereum, Solana, and all IBC-enabled cosmos chains like CosmosHub, Osmosis, etc. The interoperability not only allows Injective to enable users to bridge assets from multiple chains but also allows for transferring arbitrary data - like oracle prices, etc.

Within this section we are going to explore configuring different UI frameworks to work with the `@injectivelabs` packages so you can start building decentralized applications on top of Injective. We are also going to showcase example (simple) dApps built on top of Injective.

{% hint style="info" %}
If you are looking for how to build a dApp on Injective EVM,
you should check out the guides in [your first EVM dApp](../../developers-evm/dapps/README.md).
{% endhint %}

### Create Injective dApp CLI tool

The simplest way to start your journey on Injective is using our CLI tool. To do this, simply write this command and follow the instructions in your terminal!

```bash
$ npx @injectivelabs/create-injective-app
```

### Configuration

| Topic                                     | Description                 |
| ----------------------------------------- | --------------------------- |
| [Configuring Nuxt](configure-nuxt.md)     | Configuring Nuxt 3.x + Vite |
| [Configuring React](configure-react.md)   | Configuring React 18 + Vite |

### dApps

| Topic                                      | Description                                              |
| ------------------------------------------ | -------------------------------------------------------- |
| [DEX](example-dex.md)                              | Building a decentralized exchange on top of Injective    |
| [Simple Smart Contract](example-smart-contract.md) | Building a simple smart contract app on top of Injective |
| [Webpack](example-webpack.md) | Simple HTML example with Webpack and Injective |

<!--
| [Bridge](example-bridge.md)                        | Building a simple bridge between Injective and Ethereum  |
-->

