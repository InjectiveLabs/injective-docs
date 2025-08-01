# Auction

## Burn Auction

The complete versatility of INJ is realized through a combination of mechanisms that operate in tandem. Building on Injective’s innovative approach to supply dynamics, the asset is positioned to exhibit deflationary properties through a well-engineered system designed to remove INJ from circulation. This process is facilitated by Injective’s novel Burn Auction system, which effectively reduces the total supply.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcoU3ZEtvL328l94crrvGcsgOVRVe1nd1WeRKvumzwivCgmsfI-E0oQ4aGxUK-NsJ12nIwsAspfurBU3nqi9ON7VizZMoWVxK-3f7ROSaBTd16dPwL77el0JyUeWcErIfYZ1q1RAxZ-bLVYvizc4uduSF1v?key=SrpUIxF4ydd4ZLyJCcX74Q" alt="" width="563"><figcaption></figcaption></figure>

Held regularly, the Burn Auction invites participants to bid on a basket of tokens accumulated from a portion of the revenue generated by participating applications and direct contributions from individual users. The auction operates as an English Auction, where bids are placed using INJ. The highest bidder receives the entire basket of assets at the auction’s expiry. The winning INJ bid is then burned, removing it from the total token supply.

The Burn Auction is made possible by two modules that are native to Injective, `exchange` and `auction`. These modules are available out-of-the-box for anyone building on Injective, as part of Injective’s core offering of plug-and-play financial primitives.

#### Historical Enhancements and Participation

INJ 2.0, released in 2023, made it possible for any application to contribute to the Auction Fund, not just those using the exchange module. Injective’s April 2024 INJ Burn Upgrade expanded access to this feature, allowing for individual users to make contributions. As a result, any project or user can directly contribute to the Injective Burn Auction, which in turn can boost the overall value and effectiveness of the Burn Auction.

The Burn Auction occurs weekly, ending at 9:00 UTC-4:00. Participation can be conducted via the Injective Hub or direct interaction with the chain itself. The [Injective Hub](https://injhub.com/auction) and [Injective Explorer](https://explorer.injective.network/) provide real-time tracking of the total INJ burned via the Burn Auction to date.

### Exchange Module

The exchange module is one of Injective’s central differentiators from other blockchains. This technical instrument is what powers the shared liquidity environment on Injective and fuels the Burn Auction. The entire process of orderbook management, trade execution, order matching, and settlement occurs on-chain through the logic codified by the module.

The design feature that is key to the Burn Auction is the built-in revenue-sharing structure for applications employing the exchange module. Herein, a portion of the accrued revenue is allocated to the auction module for inclusion in the current Burn Auction event, while the remaining portion is retained by the application utilizing the module to power its exchange services.

### Auction Module

The auction module provides two essential services for the operation of the Burn Auction: token collection and auction orchestration. For token collection, the module periodically gathers tokens from the exchange module, pooling them into an Auction Fund. Importantly, the Auction Fund also receives tokens from applications that do not utilize the exchange module but have opted into participation, as well as from individual user contributions. The auction process itself involves several tasks managed by the auction module, including coordination of the bidding process, determining the winner, delivering the won assets, and burning the winning INJ bid.
