# Liquidation

Leveraging the power of margin trading comes with the risk of liquidation. This mechanism acts as a failsafe for both the trader and the DEX, automatically closing your position when your equity dips below a critical threshold. This is done to prevent further losses and protect the system's stability.

Liquidation is triggered when your account's maintenance margin drops below a certain level. This maintenance margin is a percentage of the total contract value, typically lower than the initial margin you deposited. It acts as a buffer against price movements.

**Maintenance Margin Requirement**

The margin must fulfill _Margin >= InitialMarginRatio \* Price \* Quantity_, e.g. in a market with maximally 20x leverage, the initial margin ratio would be 0.05. Any new position will have a margin which is at least 5% of its notional.

The margin must fulfill the mark price requirement:

_Margin >= Quantity \* (InitialMarginRatio \* MarkPrice - PNL)_

PNL is the expected profit and loss of the position if it was closed at the current MarkPrice. Solved for MarkPrice this results in:

* For Buys: _MarkPrice >= (Margin - Price \* Quantity) / ((InitialMarginRatio - 1) \* Quantity)_
* For Sells: _MarkPrice <= (Margin + Price \* Quantity) / ((InitialMarginRatio + 1) \* Quantity)_

Throughout the lifecycle of an active position, if the following margin requirement is not met, the position is subject to liquidation. (Note: For simplicity of notation but without loss of generality, we assume the position considered does not have any funding.)

* For Longs: _Margin >= Quantity \* MaintenanceMarginRatio \* Mark Price - (MarkPrice - EntryPrice)_
* For Shorts : _Margin >= Quantity \* MaintenanceMarginRatio \* Mark Price - (EntryPrice - MarkPrice)_

For example, let's say you use 10% margin for a Bitcoin futures contract worth $100,000. Your initial margin would be $10,000, and your maintenance margin might be 5% ($5,000). If the price of Bitcoin falls significantly, causing your equity in the contract to drop below $5,000, your position will be automatically liquidated.

**How Does Liquidation Work?**

When liquidation is triggered:

1. **The exchange will force-close your position.** This means selling your futures contract, regardless of the current market price.
2. **The proceeds from the sale will be used to cover your outstanding debt to the platform.** This includes the initial margin, any unpaid funding fees, and the loss incurred on the position.
3. **Any remaining funds will be credited back to your account.** However, it's crucial to remember that liquidation can potentially wipe out your entire initial margin deposit.

To avoid the painful sting of liquidation:

* **Monitor your margin:** Keep a close eye on your account's margin level and the market movements affecting your positions.
* **Use stop-loss orders:** These pre-set orders automatically sell your position when the price reaches a certain point, potentially minimizing losses and preventing liquidation.
* **Maintain adequate margins:** Avoid over-leveraging your positions. Higher margins provide a larger buffer against price fluctuations.
* **Understand funding rates:** Factor potential funding costs into your risk management calculations, especially in volatile markets.
