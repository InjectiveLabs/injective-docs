---
description: Scoring a Market Maker's Epoch Performance in a Single Market
---

# Scoring Formula/Methodology

## Total Score

For any given market, an MM's (Market Maker's) $$TS$$ (Total Score) in an epoch is calculated as:

$$
TS_{Market} = (LS_{Epoch})^a \cdot (Uptime_{Epoch})^b \cdot (Volume_{epoch})^c
$$

where $$LS_{epoch}$$ is the MM's [Liquidity Score](scoring-formula-methodology.md#liquidity-score) in the market in the epoch, $$Uptime_{Epoch}$$is the MM's [Uptime score](scoring-formula-methodology.md#uptime-score) in the market in the epoch, and $$Volume_{epoch}$$ is the MM's total volume (maker and taker) in the market in the epoch.

{% hint style="info" %}
$$a$$, $$b$$, and $$c$$ are exponent [parameters](formula-parameters.md) that weight the different components of the formula.
{% endhint %}

## Liquidity Score

$$
LS_{Epoch} =  \sum \limits_{N=1}^{40,320}  \min(LS_{N_{Bid}}, LS_{N_{Ask}})
$$

The MM[^1]’s Liquidity Score for a market in an epoch, $$LS_{Epoch}$$, is the sum of the minimum between the Bid and Ask Liquidity Scores (see below) across all order book snapshots in the epoch for the relevant market. This promotes dual-sided liquidity since single-sided liquidity will earn a Liquidity Score of 0 under the $$\min()$$ function.&#x20;

A snapshot of the order book is taken randomly every 10-100 blocks. This is approximately every minute on average, which means there are approximately 40,320 snapshots in an epoch $$(60 \cdot 24 \cdot 28 = 40,320).$$ In practice, the upper bound of the summation will vary depending on the actual number of snapshots in the epoch. For the purposes of this guide, we will assume that there were exactly 40,320 snapshots in the epoch.

$$
LS_{N_{Bid}} = \frac{BidDepth_1}{Spread_1} + \frac{BidDepth_2}{Spread_2} + … \newline  \forall \ BidDepth_i \geq MinDepth \text{ and } Spread_i \leq MaxSpread
$$

$$
LS_{N_{Ask}} = \frac{AskDepth_1}{Spread_1} + \frac{AskDepth_2}{Spread_2} + … \newline  \forall \ AskDepth_i \geq MinDepth \text{ and } Spread_i \leq MaxSpread
$$

$$LS_{N_{Bid}}$$ is the sum of all bid order depths divided by the spread of the order for all limit orders placed by the MM[^2] in snapshot $$N$$ that exceed $$MinDepth$$ in size and are within the $$MaxSpread.$$&#x20;

$$LS_{N_{Ask}}$$ follows the same logic as $$LS_{N_{Bid}}$$, but on the ask side of the order book.

$$Spread$$ is calculated from the mid-price[^3] (distance from mid-price divided by mid-price).

{% hint style="info" %}
For the current values of $$MinDepth$$ and $$MaxSpread$$, see the [Formula Parameters page](formula-parameters.md).
{% endhint %}

## Uptime Score

$$
Uptime_{Epoch} = \sum \limits_{N=1}^{40,320} \begin{cases}1&\text{if } \min(LS_{N_{Bid}}, LS_{N_{Ask}}) > 0\\ 0&\text{otherwise} \\\end{cases}
$$

$$Uptime_{Epoch}$$ is the number of order book snapshots throughout the epoch in which the MM[^4] had a [positive Bid Liquidity Score _**and**_ a positive Ask Liquidity Score](scoring-formula-methodology.md#liquidity-score) in the market of interest. This means  the MM[^5] quoted on both sides of the order book with order sizes greater than or equal to $$MinDepth$$ with spreads less than or equal to $$MaxSpread$$ in the snapshot.

For MMs[^6] who qualify for OLP rewards (for the first time ever) partway through an epoch, $$Uptime_{Epoch}$$ is scaled based on the total number of snapshots from the moment of qualification to the end of the epoch.&#x20;

For example, suppose there are exactly 40,320 snapshots in an epoch and an MM[^7] qualifies for the first time with exactly 20,000 snapshots remaining. Also suppose the MM[^8] had an $$Uptime_{Epoch}$$ of 18,0000 as defined by the scoring formula above during the remainder of the epoch. In this case, $$Uptime_{Epoch}$$ would be scaled to $$\frac{18000}{20000}*40320 = 36288$$.

{% hint style="warning" %}
For MM[^9] addresses that qualify partway through an epoch but have qualified in the past (the address failed to maintain eligibility at some point), $$Uptime_{Epoch}$$ will not be scaled. This is to disincentivize addresses from losing their eligibility from epoch to epoch.
{% endhint %}

## Volume

$$Volume$$ is a MM[^10]'s cumulative eligible maker and taker volume in the market during the epoch.

## Fully Expanded Formula

The fully expanded formula is:

$$TS_{Market} =$$

$$
\left(\sum \limits_{N=1}^{40,320}  \min(LS_{N_{Bid}}, LS_{N_{Ask}})\right)^a \cdot \left(\sum \limits_{N=1}^{40,320} \begin{cases}1&\text{if } \min(LS_{N_{Bid}}, LS_{N_{Ask}}) > 0\\ 0&\text{otherwise} \\\end{cases} \right)^b \cdot Volume^c
$$

$$
\text {where}
$$

$$
LS_{N_{Bid}} = \frac{BidDepth_1}{Spread_1} + \frac{BidDepth_2}{Spread_2} + … \newline  \forall \ BidDepth_i \geq MinDepth \text{ and } Spread_i \leq MaxSpread
$$

$$
LS_{N_{Ask}} = \frac{AskDepth_1}{Spread_1} + \frac{AskDepth_2}{Spread_2} + … \newline  \forall \ AskDepth_i \geq MinDepth \text{ and } Spread_i \leq MaxSpread
$$

{% hint style="info" %}
For information on individual reward calculations each epoch, see the [Reward Allocations page](reward-allocations.md).
{% endhint %}

[^1]: Market Maker

[^2]: Market Maker

[^3]: Average between best bid price and best ask price in the order book

[^4]: Market Maker

[^5]: Market Maker

[^6]: Market Makers

[^7]: Market Maker

[^8]: Market Maker

[^9]: Market Maker



[^10]: Market Maker
