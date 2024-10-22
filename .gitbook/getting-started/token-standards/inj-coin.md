# INJ coin

INJ is the native asset powering Injective and its broader ecosystem. Each component of INJ is deliberately engineered to cultivate a thriving Web3 ecosystem. As the native asset of the blockchain, INJ plays a central role in facilitating various operations on Injective. Integral to Injective’s custom implementation of the Tendermint Proof-of-Stake (PoS) consensus framework, INJ is crucial for securing the network through staking. Additionally, INJ functions as Injective’s governance token and serves as a means of exchange within the broader Injective ecosystem. Notably, INJ distinguishes itself from other native assets on PoS chains by leveraging core Injective modules to engineer deflationary characteristics through an innovative burn and a dynamic supply mechanism.

### Base Denomination

INJ uses [Atto](https://en.wikipedia.org/wiki/Atto-) as the base denomination to maintain parity with Ethereum.

```
1 inj = 1×10⁻¹⁸ INJ
```

This matches Ethereum's denomination:

```
1 wei = 1x10⁻¹⁸ ETH
```

### Injective Tokenomics and Utility

#### 1. Security and Staking

Injective is secured via staking, which is an essential use case for INJ. Validators and delegators can freely participate in the Injective network via staking. Validators operate nodes on Injective, and delegators can assign INJ to a particular node of choice. Staked INJ enables a robust decentralized environment in which security is ensured via penalty and reward systems.

A validator’s staked INJ is subject to slashing in the event of malicious behavior or failure to effectively fulfill responsibilities. Additionally, INJ is used to reward validators for participation in transaction validation and block creation. Rewards for validators comprise newly minted INJ (block rewards) and a portion of the associated transaction fees.

Holders of INJ may also participate in staking without necessarily having to operate a node to earn a share of validator rewards. To do so, users delegate INJ to validator(s), which can be done through supported browser wallets, or directly through the Injective Hub. In return for locking up INJ, users earn a share of the validator’s INJ rewards, less the fee charged by the selected validator (commission), distributed pro rata. A user’s staked INJ is also subject to slashing in the event the validator delegated to incurs a slashing event. This ensures that both validators and delegators are aligned in contributing to the overall security of the network.

Beyond securing the Injective chain, INJ also extends its security serviceability to the broader ecosystem through Electro Chains. These Injective-based rollups offer a myriad of technical advantages, such as supporting multiple virtual ma- chines as seen with inEVM.5 Since these rollups settle to Injective, INJ powers the foundational security layer for these networks. This interconnected security framework underscores the pivotal role of INJ in maintaining the integrity and robustness of not only the Injective network, but also the diverse ecosystem of Electro Chains.

#### 2. Governance

INJ is utilized for community led governance across all parameters of the chain. Injective uniquely has a permissioning layer for smart contract uploads as well, meaning that the community of stakers must vote in order to instantiate a smart contract on mainnet. This empowers the community to directly govern all parameters of Injective as a whole.

For governance, INJ is used for proposal creation and token-weighted voting on active proposals. As a spam deterrent, Injective requires a minimum deposit, made in INJ, for the proposal to move on to the voting stage. This deposit threshold can either be met entirely by the proposer, or cumulatively by other users contributing INJ to the proposal deposit. If the minimum deposit amount is not reached by the time the maximum deposit period elapses, the proposal will be automatically rejected, and the deposit(s) burned. Additionally, if the proposal does not pass upon voting period expiry, the proposal deposit is burned.

Proposal voting occurs during a preset voting period, which is set via gover- nance and invariably applied to all governance votes. During the voting process, only staked INJ is eligible to participate in voting. Hence, only validators and delegators can vote on active proposals. Voting power is token-weighted, meaning that 1 INJ equals 1 vote. Delegators are not required to actively participate in governance to maintain their status. However, they have the option to vote directly on proposals. If a delegator does not vote, their voting power will automatically be inherited by the validator to whom they have delegated, for that specific voting event.

INJ is used to govern all aspects of the chain, including:

* Auction Module Parameters
* Exchange Module Custom proposals and Parameters
* Insurance Module Parameters
* Oracle Module Custom proposals
* Peggy Module Parameters
* Wasmx Module Parameters
* Software upgrades
* Cosmos-SDK module parameters for the [auth](https://docs.cosmos.network/main/modules/auth#parameters), [bank](https://docs.cosmos.network/main/modules/bank), [crisis](https://docs.cosmos.network/main/modules/crisis), [distribution](https://docs.cosmos.network/main/modules/distribution), [gov](https://docs.cosmos.network/main/modules/gov), [mint](https://docs.cosmos.network/main/modules/mint), [slashing](https://docs.cosmos.network/main/modules/slashing), and [staking](https://docs.cosmos.network/main/modules/staking) modules.

Full details on the governance process can be found [here](https://blog.injectiveprotocol.com/injective-governance-proposal-procedure).

#### 3. Medium of Exchange

INJ is used as the default asset to facilitate the purchase and sale of goods and services between parties on the blockchain. Common examples of this are paying for transaction fees (gas), buying/selling NFTs, paying for trading fees, or depositing the asset as collateral. While most goods and services can be denominated in any asset, all transaction fees incurred on Injective are paid in INJ. Additionally, all protocol revenue generated by applications leveraging Injective’s shared liquidity layer via the exchange module is accumulated in INJ.

#### 4. Exchange dApps Incentives

The exchange protocol implements a global minimum trading fee of $r\_m=0.1%$ for makers and $r\_t=0.2%$ for takers. As an incentive mechanism to encourage exchange dApps to source trading activity on the exchange protocol, exchange dApps that originate orders into the shared orderbook are rewarded with $\beta = 40%$ of the trading fees arising from all orders that they source.

#### 5. Exchange Fee Value Accrual

The remaining $60%$ of the exchange fee will undergo an on-chain buy-back-and-burn event where the aggregate exchange fee basket is auctioned off to the highest bidder in exchange for INJ. The INJ proceeds of this auction are then burned, thus deflating the total INJ supply.

More details on the auction mechanism can be found here.

#### 6. Backing Collateral for Derivatives

INJ can be utilized as an alternative to stablecoins as margin and collateral for Injective's derivatives markets. In some derivative markets, INJ can also be used as backing collateral for insurance pool staking, where stakers can earn interest on their locked tokens.
