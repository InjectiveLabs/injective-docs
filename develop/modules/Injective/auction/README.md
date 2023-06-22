# Auction

## Abstract

The `auction` module periodically obtains a basket of tokens accumulated from trading fees from the `exchange` module and auctions the basket to the highest bidder in an open English auction for INJ. The winner of this auction receives the basket of tokens and the winning INJ bid amount from this auction is burned.

## Contents

1. [**State**](01\_state.md)
2. [**Messages**](02\_messages.md)
3. [**End Block**](03\_end\_block.md)
4. [**Events**](04\_events.md)
5. [**Params**](05\_params.md)
