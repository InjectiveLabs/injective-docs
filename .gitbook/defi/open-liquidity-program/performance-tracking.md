---
description: OLP Dashboard
---

# Performance Tracking

Current and historical information on market allocations, expected/earned rewards, scores per market, and eligibility can be found on the [OLP Dashboard](https://trading.injective.network/program/liquidity) in the [Injective Trading Portal](https://trading.injective.network/).&#x20;

Snapshot data can be found under the [Scores tab](https://trading.injective.network/program/liquidity/scores). CSV files can also be downloaded in the [Scores tab](https://trading.injective.network/program/liquidity/scores) to view scores for all addresses and all markets at the same time—this information may be helpful for market participants that wish to view data on a broad level.

OLP data for current and previous epochs can also be queried programmatically:&#x20;

{% code title="Epochs and Markets:" overflow="wrap" fullWidth="false" %}
```
curl -s -X POST https://glp.rest.injective.network/injective_dmm_v2_rpc.InjectiveDmmV2RPC/GetEpochs
```
{% endcode %}

{% code title="Rewards per Address:" overflow="wrap" fullWidth="false" %}
```
curl -s -d '{"epochId":"epoch_231128_231225"}' -X POST https://glp.rest.injective.network/injective_dmm_v2_rpc.InjectiveDmmV2RPC/GetEpochScores
```
{% endcode %}

{% code title="Rewards in a Market:" overflow="wrap" %}
```
curl -X POST -d '{"epochId": "epoch_240123_240219", "marketId":"0x4ca0f92fc28be0c9761326016b5a1a2177dd6375558365116b5bdda9abc229ce", "page": {"perPage": 200}}' https://glp.rest.injective.network/injective_dmm_v2_rpc.InjectiveDmmV2RPC/GetTotalScores
```
{% endcode %}

{% code title="Snapshots for Address:" overflow="wrap" %}
```
curl -X POST -d '{"epochId": "epoch_240123_240219", "accountAddress": "<INSERT MM ADDRESS>", "marketId":"0x4ca0f92fc28be0c9761326016b5a1a2177dd6375558365116b5bdda9abc229ce", "page": {"perPage": 200}}' https://glp.rest.injective.network/injective_dmm_v2_rpc.InjectiveDmmV2RPC/GetTotalScoresHistory
```
{% endcode %}
