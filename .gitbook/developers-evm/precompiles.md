# Precompiles

### **What are Precompiles on Injective?**

On Injective, precompiles are special, highly-optimized smart contracts embedded directly into our EVM (Ethereum Virtual Machine) layer at the protocol level. Unlike standard Solidity smart contracts that are deployed by users, precompiles are part of the chain's core logic. They are written in Go instead of Solidity and are exposed to the EVM with fixed addresses, making them callable from your Solidity smart contracts just like any other smart contract.

Think of them as native functions of the Injective chain that have been given an Ethereum-style interface.

### **Why are they necessary? (Bridging EVM & Native Modules)**

The Injective EVM doesn't operate in a silo. It's deeply integrated with Injective's powerful native Cosmos SDK modules, such as the Bank module (for token management), the Exchange module (for the on-chain order book), the Staking module, and more.

Precompiles serve as the crucial **bridge** between the EVM world (where your Solidity contracts live) and these native Injective functionalities. Without precompiles, your EVM smart contracts would be isolated, unable to tap into the rich features and liquidity of the broader Injective ecosystem.

For example, our [MultiVM Token Standard (MTS)](../multivm-token-standard.md) model, which ensures unified token balances across native and EVM environments, is heavily reliant on the **Bank Precompile**.

### **Benefits for Developers**

* **Access to Native Features:** Directly interact with Injective's unique modules like the on-chain order book, native staking, governance, and the bank module for MTS.
* **Enhanced Performance:** Operations executed via precompiles can be significantly faster and more gas-efficient than trying to replicate complex native logic purely in Solidity, as they run as optimized native code.
* **Seamless Interoperability:** Build truly integrated applications that leverage the strengths of both the EVM and Injective's Cosmos-native capabilities.
* **Simplified Development:** Interact with complex native functionalities through familiar Solidity interfaces, abstracting away much of the underlying Cosmos complexity.

A range of ERC-20 implementations backed by the Bank precompile, alongside precompile interfaces and abstract contracts, are available at [Injective’s Solidity Contracts Repository](https://github.com/InjectiveLabs/solidity-contracts). Key contracts include:

* [**Bank.sol**](https://github.com/InjectiveLabs/solidity-contracts/blob/master/src/Bank.sol) – precompile interface
* [**BankERC20.sol**](https://github.com/InjectiveLabs/solidity-contracts/blob/master/src/BankERC20.sol) – abstract ERC20 implementation backed by the Bank precompile
* [**FixedSupplyBankERC20.sol**](https://github.com/InjectiveLabs/solidity-contracts/blob/master/src/FixedSupplyBankERC20.sol) – decentralized ERC20 with fixed supply (no owner, no minting or burning)
* [**MintBurnBankERC20.sol**](https://github.com/InjectiveLabs/solidity-contracts/blob/master/src/MintBurnBankERC20.sol) – ERC20 with an owner authorized to mint and burn tokens

These implementations are based on OpenZeppelin’s ERC20 contracts. Developers can freely create custom ERC20 contracts utilizing the Bank precompile.

### Demos to get you started

We've prepared a handful of demos that show how to build contracts using the Bank, Exchange, and Staking precompiles. These examples also demonstrate how to interact with the Injective EVM using the most common Ethereum development framework — **Foundry**.

By leveraging Foundry's `cast` tool, you can easily deploy contracts and interact with the Injective chain directly from your terminal. This enables builders to quickly experiment, test, and deploy powerful applications that tap into Injective's native modules.

Explore the demos below to see:

- How to write Solidity contracts that call precompiles for token management, trading, and staking.
- How to use Foundry scripts and `cast` commands to deploy and interact with these contracts on Injective EVM.
- Best practices for bridging EVM logic with Injective's native features.

Jumpstart your development by cloning the [Injective Solidity Contracts Repository](https://github.com/InjectiveLabs/solidity-contracts/tree/master/demos) and following the step-by-step guides in each demo directory.

* [Bank Precompile Demo](https://github.com/InjectiveLabs/solidity-contracts/tree/master/demos/erc20)
* [Exchange Precompile Demo](https://github.com/InjectiveLabs/solidity-contracts/tree/master/demos/exchange)
* [Staking Precompile Demo](https://github.com/InjectiveLabs/solidity-contracts/tree/master/demos/staking)

### Precompile Addresses

| Name                               | Purpose                       | EVM address |
| ---------------------------------- | ----------------------------- | ----------- |
| [Bank](bank-precompile.md)         | Token Management              | 0x64        |
| [Exchange](exchange-precompile.md) | On-chain Order Book           | 0x65        |
| Staking                            | Native staking token on-chain | 0x66        |
