---
description: Read about order types on Injective
---

# Order Types

The following list describes the supported order types on Injective:

* **BUY (1):** A standard buy order to purchase an asset at either the current market price or a set limit price. Market orders in Injective also have a price to stablish a limit to the market price the order will be executed with.
* **SELL (2):** A standard sell order to sell an asset at either the current market price or a set limit price. Market orders in Injective also have a price to stablish a limit to the market price the order will be executed with.
* **STOP\_BUY (3):** A stop-loss buy order converts into a regular buy order once the oracle price reaches or surpasses a specified trigger price.
* **STOP\_SELL (4):** A stop-loss sell order becomes a regular sell order once the oracle price drops to or below a specified trigger price.
* **TAKE\_BUY (5):** A take-profit buy order converts into a regular buy order once the oracle price reaches or surpasses a specified trigger price.
* **TAKE\_SELL (6):** A take-profit sell order becomes a regular sell order once the oracle price drops to or below a specified trigger price.
* **BUY\_PO (7):** Post-Only Buy. This order type ensures that the order will only be added to the order book and not match with a pre-existing order. It guarantees that you will be the market "maker" and not the "taker".
* **SELL\_PO (8):** Post-Only Sell. Similar to BUY\_PO, this ensures that your sell order will only add liquidity to the order book and not match with a pre-existing order.
* **BUY\_ATOMIC (9):** An atomic buy order is a market order that gets executed instantly, bypassing the Frequent Batch Auctions (FBA). It's intended for smart contracts that need to execute a trade instantly. A higher fee is paid defined in the global exchange parameters (currently it is two times the normal trading fee).
* **SELL\_ATOMIC (10):** An atomic sell order is similar to a BUY\_ATOMIC, and it gets executed instantly at the current market price, bypassing the FBA.

Additional notes:

* **Immediate-Or-Cancel (IOC):** IOC orders are not yet supported. The closest order type is a market order (**BUY**).
* The worst price for a market order is the "price" parameter.
