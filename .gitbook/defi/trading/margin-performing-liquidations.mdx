# Performing Liquidations

This guide details how traders on Injective can utilize the `MsgLiquidatePosition` function to liquidate underwater positions.

**Before proceeding, ensure you understand the following:**

* **Liquidation Mechanics:** Injective employs a dynamic liquidation mechanism where positions exceeding a specific collateralization ratio (i.e. below threshold) become eligible for liquidation by any market participant. There are benefits for performing liquidations, which requires substantial upfront capital.
* **MsgLiquidatePosition Function:** This function allows traders to initiate liquidations on eligible positions, offering them an opportunity to capture a liquidation fee.

**Different Cases for Liquidations:**

There are two different cases depending on the state of the position. In both cases, it is required that the entire position is liquidated.

#### 1) Position has Positive or Zero Equity

The position will be sold using a market order with a worst price equal to the bankruptcy price. The liquidator only needs to submit a limit order if the entire position cannot be liquidated using the bankruptcy price as the worst price.

**Benefits**

* Guaranteed zero loss to the insurance fund when position is not bankrupt.
* Existing orderbook liquidity is used and the liquidator still has an incentive to liquidate by getting a potential discount on the position up to bankruptcy (arbitrage).

**Downsides**

* Taking over at bankruptcy price may not be attractive enough for liquidators, especially when the mark price is very close to the bankruptcy price.
  * This concern is mitigated if one assumes there will always be at least one “white knight” liquidator, as there currently is on Injective.

**Example**

Consider the following long position in a market with a 5% maintenance margin ratio.

<table><thead><tr><th width="120">Quantity</th><th>Entry Price</th><th>Margin</th><th>Liquidation Price</th><th>Bankruptcy Price</th></tr></thead><tbody><tr><td>1</td><td>10</td><td>2</td><td>8.42</td><td>8</td></tr></tbody></table>

The position is liquidateable and has non-negative equity when $8 <= Oracle Price <= $8.42

The liquidator can liquidate the position if the position can be sold on the orderbook using a market order with a worst price of $8.

The liquidator can choose to submit their own order as well, if they desire to participate in the liquidation, but this is not necessary if the orderbook already has sufficient liquidity. If the orderbook does not have sufficient liquidity, then it is required that the liquidator submit their own order (which must have a price ≥ $8) to be used as a part of the liquidation.

#### 2) Position has Negative Equity

The position will be sold using a market order with a worst price equal to the oracle price. The liquidator only needs to submit a limit order if the entire position cannot be liquidated using the oracle price as the worst price.

**Benefits**

* The insurance fund will never suffer an uncontrollable loss from market selling the position at an extreme price. Instead the insurance fund only loses capital based on the oracle price movements.

**Downsides**

* Similar to the positive equity case (but even worse), taking over the position at oracle price may not be attractive at all for liquidators, especially now since there is no implicit arbitrage. This can result in liquidations being delayed.

**Example**

Consider the following long position.

<table><thead><tr><th width="115">Quantity</th><th>Entry Price</th><th>Margin</th><th>Liquidation Price</th><th>Bankruptcy Price</th></tr></thead><tbody><tr><td>1</td><td>10</td><td>2</td><td>8.42</td><td>8</td></tr></tbody></table>

The position has negative equity when Oracle Price < $8. Assume the oracle price is $7.50.

The liquidator can liquidate the position if the position can be sold on the orderbook using a market order with a worst price of $7.50.

Similar to the case above, the liquidator can choose to submit their own order as well, if they desire to participate in the liquidation, but this is not necessary if the orderbook already has sufficient liquidity. If the orderbook does NOT have sufficient liquidity, then it is required that the liquidator submit their own order (which must have a price ≥ $7.50) to be used as a part of the liquidation.

**Steps to Liquidate Positions:**

1.  **Identify Liquidatable Positions:** Utilize Injective's `LiquidablePositions` endpoint to identify positions with a collateralization ratio below the liquidation threshold. Relevant data points include:

    * **Collateral:** Total value of tokens deposited as collateral for the position.
    * **Liabilities:** Total value of borrowed tokens in the position.
    * **Liquidation Threshold:** Minimum collateralization ratio required to avoid liquidation.

    An example can be found [here for Go ](https://github.com/InjectiveLabs/sdk-go/blob/master/examples/exchange/derivatives/20\_LiquidablePositions/example.go)and [here for Python](https://github.com/InjectiveLabs/sdk-python/blob/master/examples/exchange\_client/derivative\_exchange\_rpc/23\_LiquidablePositions.py).
2. **Prepare Liquidation Transaction:** Construct an order transaction using the `MsgLiquidatePosition` function, specifying the parameters listed in the [API docs](https://api.injective.exchange/?python#derivatives-msgliquidateposition). While not compulsory, a limit transaction is highly recommended over a market transaction.

Note, performing a liquidation requires a limit order. By following these steps and considering the outlined factors, market makers can effectively utilize the `MsgLiquidatePosition` function to participate in Injective's liquidation mechanism and capture potential profit opportunities.
