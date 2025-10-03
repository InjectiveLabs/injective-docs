---
description: Learn about perpetual futures on Injective
---

# Perpetuals

We've already established that an expiry futures contract is an agreement requiring two parties to transact an asset at a predetermined price at a specified time in the future, allowing traders to lock in a future price of the underlying asset to hedge or speculate on price movements. Injective offers a completely decentralized form of not only expiry futures, but perpetual futures as well.

Perpetual futures on Injective are traded with margin, allowing traders to access leverage. Unlike expiry futures, perpetual futures have no specific expiry date. As such, they require funding payments. In addition, liquidations may occur if the maintenance margin threshold is not met. Perpetual futures are cash-setled, which means the contract is settled in cash rather than delivery of the underlying asset. This makes them more flexible than traditional expiry futures contracts, which have a predetermined expiry date and must be settled by delivering the underlying asset.

On Injective, perpetual futures contracts are margined with stablecoins such as USDT. As such, traders do not need to own or store the underlying asset in order to trade the contract. Perpetual futures are also more liquid than traditional futures contracts, typically resulting in less slippage.

Perpetual futures also use a funding mechanism to encure that the price of the contract remains close to the price of the underlying asset. This can lead to funding fees, which are paid by traders who are on the wrong side of the funding rate. If the price of the perpetual futures contract deviates significantly from the price of the underlying, a funding gap emerges. The funding rate is calculated based on the gap, with positive rates paid by long positions to short positions, and vice-versa for negative rates. Funding payments are typically exchanged every few hours, and they are settled directly between long and short positions.

The purpose of funding payments is to incentivise traders to keep the price of the perpetual futures contract aligned with the underlying asset (spot). This prevents the contract from being artificially overpriced or underpriced.

An interesting use of perpetual futures on Injective are Pre-Launch Perpetual Futures. Read on for more information.
