---
description: OLP Reward Allocations to Markets and Institutional Liquidity Providers
---

# Flexible Reward Allocations

Part of the changes implemented for epoch 43 include a fully discretionary dynamic reward to bootstrap liquidity for certain markets at specific times. Following the exact same calculations detailed in [reward-allocations.md](reward-allocations.md "mention"), and the classic formula/scoring methodology to determine a liquidity provider's share of the total reward for a market, this will be accomplished through the concept of Mini Epochs.

Mini Epochs are flexible in that they are not constrained by the typical 00:00 UTC starting/ending point for a pair to exist in a Primary Epoch. Mini Epochs can begin or end at any time within a Primary Epoch, though they cannot span across multiple epochs.

Rewards for Mini Epochs will be clearly defined. All eligible OLP participants can accrue pair-specific rewards for Mini Epochs, even if they are not otherwise earning rewards for that pair. Of course, a liquidity provider's participation in the Mini Epoch implies participation in the Primary Epoch, even if just opportunistically for that specific time period. Rewards for Mini Epochs are visible on the OLP dashboard just below the overall rewards for the Primary Epoch.
