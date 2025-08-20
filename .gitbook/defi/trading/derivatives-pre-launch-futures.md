---
description: Asset speculation before release
---

# Pre-Launch Futures

Many assets generate large amounts of trading activity when they are publicly launched but are generally unavailable to be traded prior to public release. To capture escalating interest and allow investors to speculate on assets prior to their public release dates, Injective has created Pre-Launch Futures (PLF). The first Pre-Launch Futures market on Injective will be based on an expiry futures contract, though PLFs[^1] can also take the form of a perpetual futures contract.

### How do Pre-Launch Futures Work?

Expiry futures require mark prices to track liquidation and settlement prices. Because mark prices are typically based on the spot prices of the underlying assets, regular oracle price feeds cannot be used for Pre-Launch Futures as the spot price does not exist before the token has launched. Expiry futures based PLFs[^2] are designed to be traded near the public launch date so a spot price exists prior to the market expiry date (not applicable to perpetual futures based PLFs[^3]). This is so that upon the asset being publicly traded, the mark price can be set to the public spot price and the market can eventually settle at the spot price upon expiry. However, an mark price is still needed prior to this time to inform liquidation prices.

To solve this, Pre-Launch Futures will initially use an 24-hour exponentially weighted moving average of the last day's minutely last traded price as the mark price.

### Mark Price Mechanism

The mark price is based on two price feeds: 1) EWMA (Exponentially Weighted Moving Average) price feed and 2) CEX API price feed. The CEX used is one of Binance, OKX or Bybit, whichever lists the underlying asset first.

And during the various phases of the timeline, a different price feed would be used.

* Before asset is listed on CEX -> EWMA price feed
* Within 24 hours of asset is listed on CEX -> EWMA price feed
* 24 hours after asset is listed on CEX -> CEX API price feed

This design is used to prevent a sudden distortion in mark price if the difference between EWMA price feed and CEX API price feed is great.&#x20;

**The following formula is used to calculate the EWMA price:**

$$\mathrm{Price_t = \sum \limits_{i=0}^{1439} [(t-i_{minutes} < t_{init} ?\ assumed\ price : last\ traded\ price _{t-i_{minutes}}) \cdot e^{-i/1440} ] \cdot \frac{1-e^{-1/1440} }{ 1-e^{-1}}}$$

Where:

* `t_init` is the time of the first trade in the underlying market.
* `assumed price` is the price assumption of the underlying asset. This price is used when there is no `last traded price` 24 hours prior the first trade in the underlying market. In other words, after the first 24 hours, if the underlying market has traded already, then the assumed price would no longer have an impact to the mark price.&#x20;
  * Assumed price used for TIA/USDT Pre Launch Futures is `2.5`.
  * Assumed price used for PYTH/USDT PLF is `0.3`.
  * Assumed price used for JUP/USDT PLF is `0.55`.
  * Assumed price used for ZRO/USDT PLF is `5`.
  * Assumed price used for W/USDT PLF is `2`.
  * Assumed price used for OMNI/USDT PLF is `40`.
* `last traded price` is the last price traded in the underlying market.&#x20;

[^1]: Pre-Launch Futures

[^2]: Pre-Launch Futures

[^3]: Pre-Launch Futures
