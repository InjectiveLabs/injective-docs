---
description: Understanding token representation in Injective's multi-VM architecture
---

# MultiVM Token Standard

## What is MultiVM Token Standard (MTS)?

MTS (MultiVM Token Standard) ensures that every token on Injective—whether deployed using Cosmos modules or via the Ethereum Virtual Machine (EVM)—has one canonical balance and identity. This unified approach prevents fragmentation and eliminates the need for bridging or wrapping tokens, thereby enabling seamless interoperability and unified liquidity for decentralized finance (DeFi) and dApp interactions.

## Why is MTS Important?

* **Seamless Interoperability:** Tokens remain consistent across Cosmos and EVM environments.
* **Unified Liquidity:** A single source of truth avoids liquidity fragmentation.
* **Enhanced Developer Experience:** Standard tools like Hardhat, Foundry, and MetaMask work out of the box.
* **Security & Efficiency:** All token state is maintained centrally in the bank module, ensuring robust security.

## Architecture

The system comprises two main components:

* [**Bank Precompile**](precompiles/bank-precompile.md)**:**
  * Developed in Go, this precompile is embedded directly in the Injective EVM.
  * It provides a Solidity interface that proxies ERC20 operations—such as mint, burn, and transfer—to the bank module.
* [**ERC20 Module**](erc20-module.md)**:**
  * This module maps native bank denoms (e.g., INJ, IBC tokens, Peggy assets) to an ERC20 contract within the EVM.
  * It deploys MTS-compliant ERC20 contracts that always reflect the canonical token balance as maintained by the bank module.

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption><p>Single Token Representation Architecture</p></figcaption></figure>

### **Creating an** MT&#x53;**-Compliant Token**

1. [**Using Our Prebuilt Templates**](https://github.com/InjectiveLabs/solidity-contracts/tree/master/src)**:**
   * Start with the provided Solidity templates, such as `BankERC20.sol`, `MintBurnBankERC20.sol`, or `FixedSupplyBankERC20.sol`.
2. [**Deploying the Contract**](../guides/testnet-deployment.md)**:**
   * Deploy your MTS token contract on the Injective EVM network.
   * The contract automatically interacts with the Bank Precompile to update the canonical state.

### **Interoperability and Cross-Chain Integration**

#### **Native Interoperability**

Injective’s EVM is integrated directly into the Cosmos-based chain.

* EVM smart contracts, when using MTS, perform operations that reflect immediately on native modules (such as the exchange, staking, and governance modules).
* [JSON-RPC endpoints](network-information.md) provided within the Injective binary are compatible with Ethereum, ensuring smooth developer integration.

#### **Cross-Chain Operations**

* **IBC Compatibility:** Existing native tokens (e.g., those created via a [Token Factory](../../modules/injective/tokenfactory/) or pegged via Peggy) are accessible from the EVM once an MTS pairing is established.
* **Bridging Alternatives:** While many blockchains require separate bridge operations (lock, mint, unlock), MTS avoids these steps by natively synchronizing states.

#### **Allowances & Extended ERC20 Functions**

* MTS contracts maintain standard ERC20 functionalities such as allowances (approve/transferFrom).
* Note that while the allowance mechanism is maintained within the EVM contract for convenience, the ultimate balance is managed by the bank module, preserving integrity.

### **Performance, Gas, and Security Considerations**

#### **Gas Costs and Efficiency**

* Gas fees are paid in INJ. While MTS operations via the EVM introduce an abstraction layer that may slightly increase gas usage compared to native transactions, the overall cost remains lower than comparable operations on Ethereum.
* The gas model is designed to reflect a balance between EVM-style opcode costs and native module interactions.

#### **Security**

* The [bank module](../../modules/core/bank/), as the single source of truth, underpins MTS’s security by ensuring that token balances are consistent and verifiable.
* The use of [precompiles](precompiles/) prevents common pitfalls like state desynchronization, ensuring that all operations—no matter where initiated—update the same canonical ledger.
* Advanced security guidelines and best practices for smart contract development are provided in our security section and external resources.

**ℹ️ Note:**

To prevent denom spam, deploying an ERC20 contract via the ERC20 module is a **payable operation** and requires a deployment fee of **1 INJ**. Make sure your ERC20 contract deployment transaction includes this amount, or the operation will be rejected.

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>← Previous</td><td><a href="evm-equivalence.md">evm-equivalence.md</a></td><td><a href="evm-equivalence.md">evm-equivalence.md</a></td></tr><tr><td>Precompiles</td><td><a href="precompiles/">precompiles</a></td><td><a href="../../evm-developers.md">evm-developers.md</a></td></tr></tbody></table>
