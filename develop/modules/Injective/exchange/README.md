# Exchange

## Abstract

The `exchange` module is the heart of the Injective Chain which enables fully decentralized spot and derivative exchange.\
It is the _sine qua non_ module of the chain and integrates tightly with the `auction`, `insurance`, `oracle`, and `peggy` modules.

The exchange protocol enables traders to create and trade on arbitrary spot and derivative markets. The entire process of orderbook management, trade execution, order matching and settlement occurs on chain through the logic codified by the exchange module.

The `exchange` module enables the exchange of tokens on two types of markets:

1. `Derivative Market`: Either a `Perpetual Swap Market` or a `Futures Market`.
2. `Spot Market`

## Contents

1. [**Derivative Market Concepts**](00\_derivative\_market\_concepts.md)
2. [**Spot Market Concepts**](01\_spot\_market\_concepts.md)
3. [**Other Concepts**](02\_other\_concepts.md)
4. [**State**](03\_state.md)
5. [**State Transitions**](04\_state\_transitions.md)
6. [**Messages**](05\_messages.md)
7. [**Proposals**](06\_proposals.md)
8. [**Begin Block**](07\_begin\_block.md)
9. [**End Block**](08\_end\_block.md)
10. [**Events**](09\_events.md)
11. [**Params**](10\_params.md)
12. [**MsgPrivilegedExecuteContract**](../../../../docs/develop/modules/Injective/exchange/11\_msg\_privileged\_execute\_contract.md)
