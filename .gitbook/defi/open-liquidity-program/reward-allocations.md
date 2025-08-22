---
description: OLP Reward Allocations (Epoch 43 Onwards)
---

# Reward Allocations

## Market Reward Allocations

Rewards are allocated to [eligible markets](eligible-markets.md) in three different methods :

1. Static allocations
2. Minimum allocation with a dynamic component
3. Flexible reward allocations

### Static Market Reward Allocations (Preallocations)

12.5% of INJ rewards will be preallocated to each of the BTC/USDT PERP market, ETH/USDT PERP market, and INJ/USDT PERP market. The remaining INJ for the epoch will be allocated to each remaining eligible market with a minimum allocation of 100 INJ:&#x20;

| Market                 | Total Allocation                     |
| ---------------------- | ------------------------------------ |
| BTC/USDT Perp          | 12.5%                                |
| ETH/USDT Perp          | 12.5%                                |
| INJ/USDT Perp          | 12.5%                                |
| Other Eligible Markets | Formula based allocation (see below) |

{% hint style="info" %}
Static allocations may change over time as more markets are added to the eligible list
{% endhint %}

### Dynamic Market Reward Allocations

As of epoch 43, the remaining rewards are allocated to eligible markets (excluding BTC/ETH/INJ Perps) based on the following schematic.

First, each epoch starts fresh, such that every pair has an equal chance of earning the maximum total available reward for that epoch, regardless of trading volume and liquidity from the prior epoch. Each pair starts day 1 of the epoch with a range of possibility, from a minimum of 100 INJ for the epoch.

Prior to this change, minimum rewards were 400 INJ, maximum rewards were around 900 INJ, and there was insufficient variation in reward accrual between pairs with low volume and pairs with substantially more volume. With this change, liquidity providers are rewarded for volume in popular markets.

The range for each market's rewards will progress throughout the epoch, converging on the final day of the epoch to the true reward for that market. The range $$[Rewards_{min};Rewards_{max}]$$ will be defined per market as follows :&#x20;

$$
MinVolume=Min(Market\ traded\ volume\ since\ beginning\ of\ epoch) \\
MaxVolume=Max(Market\ traded\ volume\ since\ beginning\ of\ epoch)
$$

where

$$
Rewards_{min_{market\ i}}=100+\frac{Volume_{market_{i}}-MinVolume}{MaxVolume-MinVolume}(Rewards_{max}-100)
$$

and $$Rewards_{max}$$ is still calculated as on the bottom of this page. Ergo, the highest traded volume market will receive $$Rewards_{max}$$ and the lowest traded market by volume will have a minimum reward of 100 INJ.

It must be noted that $$Rewards_{min}$$ is just the floor for the rewards range, it will never be equivalent to the reward except in the case of the highest traded volume market where range will be trivial $$[Rewards_{max};Rewards_{max}]$$, in which case rewards will be equal to $$Rewards_{max}$$. This is a linear function that goes from 100 INJ to $$Rewards_{max}$$.

With this range defined, the steps to calculate the reward for a market are :&#x20;

1\) Start with $$Rewards_{Market_{i}}=Rewards_{min_{market\ i}}$$&#x20;

2\) Distribute the remaining rewards, _RR_, with $$RR=TAR-\sum_{i}Rewards_{min_{market\ i}}$$using the formulas above.

3\) For any calculated rewards that exceed $$Rewards_{max}$$, redistribute this across all markets again following the formula above.

4\) Iterate until there are no remaining rewards.

**Markets Added Partway Through an Epoch**

For markets added to the eligible list midway through an epoch, the preallocation will be prorated. For example, if ARB/USDT is added on the 15th day of the epoch, then the market will receive half of the rewards for the epoch (as there are 14 full days remaining out of 28).

### Market Allocation Cap

For each market that has dynamic reward allocations, a hard cap will be applied according to the following formula, where $$n$$ is the number of eligible markets excluding BTC, ETH, and INJ perps:

$$
Rewards_{max} = TAR\ *\ \frac{1 - TPR}{n}*2
$$

where _TPR_ is equal to the percentage (expressed as a decimal) of total preallocated rewards (currently 0.375) and _n_ is the number of non-preallocated pairs.

Any reward allocations that exceed the cap will be redistributed amongst the other eligible markets according to the [dynamic allocation formula](reward-allocations.md#dynamic-market-reward-allocations).

## Reward Allocations

Rewards to individual institutional liquidity providers will be allocated based on the following equation:

$$
Rewards_{MM_i} = \sum_{Market}\left(Rewards_{Market} * \frac {TS_{MM_i, \ Market}} {\sum_{MM} TS_{MM,\ Market}} \right)
$$

**Each institutional liquidity provider** **will receive rewards based on their proportional**[ $$TS$$ ](./scoring.md#total-score)**within the market, subject to governance approval.**&#x20;

{% hint style="info" %}
Rewards for addresses totaling < 1 INJ at the end of each epoch will be disregarded to reduce the overhead of the disbursement process.&#x20;
{% endhint %}

For the reward allocation process up through epoch 42, please see [reward-allocations-legacy.md](reward-allocations-legacy.md "mention").
