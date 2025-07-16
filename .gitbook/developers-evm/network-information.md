---
description: Essential information about the Injective EVM network
---

# EVM Network Information

## Injective EVM Testnet Details

* Chain ID: `1439`
* JSON-RPC Endpoint: [`https://k8s.testnet.json-rpc.injective.network/`](https://k8s.testnet.json-rpc.injective.network/)
* WS Endpoint: [`https://k8s.testnet.ws.injective.network/`](https://k8s.testnet.ws.injective.network/)
* Faucet: [`https://testnet.faucet.injective.network/`](https://testnet.faucet.injective.network/)
* Explorer: [`https://testnet.blockscout.injective.network/`](https://testnet.blockscout.injective.network/) ([Mirror](https://testnet-injective.cloud.blockscout.com/) by BlockScout)
* Explorer API: [`https://testnet.blockscout-api.injective.network/api`](https://testnet.blockscout-api.injective.network/api)

{% hint style="info" %}
Note that the Injective Chain ID is natively `injective-888`.
However, EVM uses a numeric chain ID of `1439`.
While these are different, they map to the **same** network.

See [network information](../developers/network-information.md) for more details.
{% endhint %}

### Tokens

* wINJ (wrapped INJ) - [`0x0000000088827d2d103ee2d9A6b781773AE03FfB`](https://testnet.blockscout.injective.network/address/0x0000000088827d2d103ee2d9A6b781773AE03FfB)
* USDT (MTS USDT) - [`0xaDC7bcB5d8fe053Ef19b4E0C861c262Af6e0db60`](https://testnet.blockscout.injective.network/address/0xaDC7bcB5d8fe053Ef19b4E0C861c262Af6e0db60)
  * Note that this follows the [MultiVM Token Standard](https://docs.injective.network/developers-evm/multivm-token-standard), which means the same token can be used in all Injective modules (EVM, Cosmos) without using a bridge. 

For more information about Injective EVM Testnet see the following pages:

* [Testnet Deployment](../testnet-deployment.md)
* [EVM Equivalence](evm-equivalence.md)
* [MultiVM Token Standard](multivm-token-standard.md)
* [Start Building on EVM](./)

## Injective EVM Mainnet

Coming soon.
