# ERC20 Module

### ERC20 Module

The ERC20 module enables **existing** bank denoms (e.g., IBC-bridged tokens, USDC, tokenfactory, and Peggy) to integrate with the Injective EVM. It maintains a mapping between token pairs within its storage, creating an association between ERC20 tokens and their corresponding bank denoms. When a new token pair is generated for an existing bank denom, the module deploys an ERC20 contract that interacts with the Bank precompile, which then references the storage mapping to align the ERC20 address with the respective bank denom. This module serves several essential purposes:

1. **Storage**: Maps between bank denom ↔ ERC20 address
2. **New Message Type**: Enables users to establish new token pair mappings by issuing a chain message

#### Creating a New Token Pair

Currently, three types of bank denoms can have associated token pairs, each with specific rules:

* **Tokenfactory (`factory/...`)**\
  Only the denom admin or governance can create a token pair. The sender can specify an existing ERC20 contract address as a custom implementation. If omitted, a new instance of `MintBurnBankERC20.sol` is deployed, with `msg.sender` as the owner, allowing minting and burning through the contract.
* **IBC (`ibc/...`)**\
  IBC denoms can be integrated into the EVM by any user through token pair creation, though without the option for custom ERC20 addresses. These will always deploy a new, ownerless instance of `FixedSupplyBankERC20.sol`.
* **Peggy (`peggy0x...`)**\
  Peggy denoms can be integrated into the EVM by any user through token pair creation, though without the option for custom ERC20 addresses. These will always deploy a new, ownerless instance of `FixedSupplyBankERC20.sol`.
