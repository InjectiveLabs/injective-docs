# Index Perpetual Futures

An index perpetual futures contract, often referred to as an "index perp," is a type of derivative financial instrument commonly used in cryptocurrency markets. An index perp is a perpetual futures contract that tracks the price of an index, rather than a single asset. In the context of cryptocurrencies, this index typically represents a basket of cryptocurrencies or instead - as in the case of the BUIDL/USDT Index Perp - the total supply of a product on chain, as dictated by the token's smart contract.

Unlike traditional futures, these contracts don't have an expiry date. They can be held indefinitely. Trades are settled in USDT. LIke other perps, index perps use a funding rate mechanism to keep the contract price close to the underlying index price.

### How do Index Perpetual Futures Work?

* The contract tracks an index (e.g., the total supply of Blackrock's BUIDL fund).
* Traders can go long (buy) or short (sell) the index, with up to 5x leverage.
* Periodic funding payments occur between long and short holders to align the contract price with the index.

Futures contracts require mark prices to track liquidation and settlement prices. Because mark prices are typically based on the spot prices of the underlying assets, regular oracle price feeds cannot be used for index perps as the index price typically does not exist in popular oracle feeds. However, a mark price is still needed prior to this time to inform liquidation prices. To solve this, index perps will use a proprietary oracle feed as the mark price.

### Mark Price Mechanism

The mark price for index perps on Injective is based on a proprietary oracle feed provided by Stork. In the example of the BUIDL/USDT Index Perp - which is a NAV (net asset value) Index Perp - Stork queries the total supply of the BUIDL fund according to the [smart contract](https://etherscan.io/token/0x7712c34205737192402172409a8f7ccef8aa2aec) on Ethereum. They then apply a one-hour time weighted average price (TWAP) to prevent drastic swings in the mark price. That price is then scaled down to a more human readable format (the actual NAV is divided in this case by 10^5, for example, if the supply of the BUIDL fund is 500 million, the price of the BUIDL/USDT Index PERP will be 5000), and used as the mark price.
