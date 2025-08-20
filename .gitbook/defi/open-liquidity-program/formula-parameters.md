---
description: Values for OLP Formula Parameters
---

# Formula Parameters

<table><thead><tr><th width="166.11067708333334" align="center">Parameter</th><th align="center">Definition</th><th align="center">Value (Subject to Change)</th></tr></thead><tbody><tr><td align="center"><span class="math">a</span></td><td align="center"><a href="scoring-formula-methodology.md#liquidity-score">Liquidity Score</a> exponent</td><td align="center">0.4</td></tr><tr><td align="center"><span class="math">b</span></td><td align="center"><a href="scoring-formula-methodology.md#uptime-score">Uptime Score</a> exponent</td><td align="center">3</td></tr><tr><td align="center"><span class="math">c</span></td><td align="center"><a href="scoring-formula-methodology.md#volume">Volume</a> exponent</td><td align="center">0.8</td></tr><tr><td align="center"><span class="math">MinDepth</span></td><td align="center">Minimum <a data-footnote-ref href="#user-content-fn-1">notional order size</a> needed to generate points for <a href="scoring-formula-methodology.md#total-score">Total Score</a></td><td align="center">$1000 through epoch 48<br>$4000 from epoch 49</td></tr><tr><td align="center"><span class="math">MaxSpread</span></td><td align="center">Maximum allowable spread against <a data-footnote-ref href="#user-content-fn-2">mid-price</a> in an order to generate points for <a href="scoring-formula-methodology.md#total-score">Total Score</a></td><td align="center">50 <a data-footnote-ref href="#user-content-fn-3">bps</a> for BTC and ETH perp markets, 100 bps for all other eligible markets</td></tr></tbody></table>



[^1]: Total underlying amount (position size) on which a derivatives trade is based, or the order size for spot markets

[^2]: Average between best bid price and best ask price in the order book

[^3]: basis points (1 basis point = 1% of 1%, or 0.0001)
