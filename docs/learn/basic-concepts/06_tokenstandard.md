---
sidebar_position: 6
title: Token Standards
---

# Tokens Standards

Injective provides a variety of different token standards one can use when creating a dApp. In this document, we will cover the different types of tokens, as well as recommendations and guidance for using each.

## TokenFactory Standard

TokenFactory tokens are tokens that are natively integrated into the bank module of the Cosmos SDK. Their name takes on the format `factory/{creator address}/{subdenom}`. Because tokens are namespaced by the creator address, this allows for permissionless token minting, due to not needing to resolve name collisions. This integration provides support for tracking and querying the total supply of all assets, unlike the CW20 standard, which requires querying the smart contract directly. For this reason, using the TokenFactory standard is recommended. Products such as Helix or Mito, for example, are built on the Injective exchange module, which exclusively uses bank tokens. TokenFactory tokens can be created via the injectived CLI, as well as via smart contract. Tokens bridged into Injective via Wormhole are also TokenFactory tokens. To learn more about creating your own token on Injective, see [here](../../develop/guides/token-launch/index.md). To read more about the TokenFactory standard, see [here](../../develop/modules/injective/tokenfactory/).

## CW20 Token Standard

The CW20 token standard provides a framework for the permissionless creation and management of fungible tokens that more closely resembles the [ERC20 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). As stated above, the TokenFactory is encouraged due its native integration with the Cosmos SDK, but should you wish to use the CW20 standard for any reason, you are able to convert CW20 tokens to TokenFactory tokens and vice versa using the [CW20 Adapter](https://github.com/CosmWasm/cw-plus/blob/main/packages/cw20/README.md). For more information regarding the CW20 standard, see its formal specification [here](https://github.com/CosmWasm/cw-plus/blob/main/packages/cw20/README.md).

## Peggy Token Standard

The Peggy token standard includes ERC20 tokens that are bridged over from the Ethereum network via the Injective peggy module. Once on Injective, these tokens are integrated into the bank module, functioning identically to that of TokenFactory tokens (native IBC compatibility, native compatibility with the exchange module, etc). To learn more about the peggy module see [here](../../develop/modules/injective/peggy/README.md), and to learn more about the Injective bridge, which powers bridging tokens both to and from IBC-enabled chains, Ethereum via peggy, and Wormhole, see [here](../../learn/injective-hub/bridge/).
