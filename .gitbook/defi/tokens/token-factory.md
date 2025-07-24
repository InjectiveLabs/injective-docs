# Token Factory

TokenFactory tokens are tokens that are natively integrated into the bank module of the Cosmos SDK. Their name takes on the format `factory/{creatorAddress}/{subdenom}`. Because tokens are namespaced by the creator address, this allows for permissionless token minting, due to not needing to resolve name collisions.

This integration provides support for tracking and querying the total supply of all assets, unlike the CW20 standard, which requires querying the smart contract directly. For this reason, using the TokenFactory standard is recommended. Products such as Helix or Mito, for example, are built on the Injective exchange module, which exclusively uses bank tokens. TokenFactory tokens can be created via the injectived CLI, as well as via smart contract. Tokens bridged into Injective via Wormhole are also TokenFactory tokens.

To learn more about creating your token on Injective, see [token launch](../../developers-defi/token-launch.md).
To read more about the TokenFactory standard, see [token factory module](../../developers-native/injective/tokenfactory/).
