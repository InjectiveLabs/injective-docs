# Volatility Response Modifications (VRMs)

Volatility Response Modifications (VRMs) are part of our dynamic rewards system designed to optimise liquidity efficiency across the protocol. These modifications allow us to reallocate rewards when market conditions require adjustment, ensuring that incentives align with the protocol's needs during periods of high volatility.

Our system continuously monitors market conditions using specific threshold criteria :

**Triggering Conditions**

A Volatility Response Modification may be triggered when :

1. The overall market experiences a change of more than 5% in a 24-hour period, **AND**
2. Available liquidity fails to meet at least 50% of the established 30-day threshold, which is typically as follows for major trading pairs :
   * BTC/USDT PERP : $750,000 within 50 bps on each side
   * ETH/USDT PERP : $500K within 50 bps on each side
   * INJ/USDT PERP : $200K within 50 bps on each side

When these conditions are detected, our system automatically initiates the VRM process. Unlike subjective assessments, these clear thresholds ensure transparency and predictability for all liquidity providers.

#### Communication Process

When triggering conditions are met, we follow a clear, time-sensitive communication process :

1. **Immediate Alert** : All subscribed OLP participants will receive an immediate notification through Notifi alerting them that a VRM is now in effect. The 60-minute response window begins at this point.
2. **Response Window** : LPs have a 60-minute window to react to the VRM and restore liquidity to the required thresholds.
3. **Confirmation Notice** : At the conclusion of the 60-minute window, another notification will be sent announcing the outcome of the VRM, as detailed below. Note that a maximum of one VRM can be implemented in a 24-hour period.
4. **Transparency Report** : A summary of the market conditions and liquidity levels that triggered the modification will be included in the Commonwealth thread accompanying the OLP rewards governance proposal at the end of the epoch.

#### Epoch Reward Adjustments

When a VRM event occurs, the following adjustments apply to the total INJ rewards for the current epoch :

* **Liquidity Restoration** : If liquidity is sized up to meet the required thresholds within the 60-minute response window, the overall epoch rewards will be **boosted by 2,500 INJ** (e.g. 42,500 INJ for the epoch instead of 40,000).
* **Liquidity Shortfall** : If liquidity thresholds are not met after the response window :
  * First VRM in an epoch: 2,500 INJ reduction in overall epoch rewards
  * Second or subsequent VRMs in the same epoch: 5,000 INJ reduction per occurrence

In the event there is a liquidity shortfall after the 60-minute response window, these adjusted rewards are redirected to support more efficient liquidity provision strategies, ensuring that the protocol remains resilient during volatile market conditions.

Our goal is to create a fair system that rewards participants who help maintain market quality, particularly when it matters most. These modifications help us build a more resilient protocol that better serves all stakeholders in our ecosystem.
