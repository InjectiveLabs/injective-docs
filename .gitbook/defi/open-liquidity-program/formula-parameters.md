---
description: Values for OLP Formula Parameters
---

# Formula Parameters

<table><thead><tr><th width="166.11067708333334" align="center">Parameter</th><th align="center">Definition</th><th align="center">Value (Subject to Change)</th></tr></thead><tbody><tr><td align="center"><span class="math">a</span></td><td align="center"><a href="scoring.md#liquidity-score">Liquidity Score</a> exponent</td><td align="center">0.4</td></tr><tr><td align="center"><span class="math">b</span></td><td align="center"><a href="scoring.md#uptime-score">Uptime Score</a> exponent</td><td align="center">3</td></tr><tr><td align="center"><span class="math">c</span></td><td align="center"><a href="scoring.md#volume">Volume</a> exponent</td><td align="center">0.8</td></tr><tr><td align="center"><span class="math">MinDepth</span></td><td align="center">Minimum notional order size needed to generate points for <a href="scoring.md#total-score">Total Score</a></td><td align="center">$4000</td></tr><tr><td align="center"><span class="math">MaxSpread</span></td><td align="center">Maximum allowable spread against mid-price in an order to generate points for <a href="scoring.md#total-score">Total Score</a></td><td align="center">50 <a data-footnote-ref href="#user-content-fn-1">bps</a> (BTC/ETH perp markets), 100 bps (other eligible markets)</td></tr></tbody></table>



[^1]: basis points (1 basis point = 1% of 1%, or 0.0001)
