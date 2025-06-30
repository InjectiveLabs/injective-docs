# Using Injective Modules and Queries in CosmWasm

This guide provides a comprehensive overview of how to interact with Injective's modules and queries in CosmWasm using `Any` messages and queries. The older [injective-cosmwasm](https://github.com/InjectiveLabs/cw-injective/tree/dev/packages/injective-cosmwasm) package, which relied on JSON-encoded messages, is no longer maintained and may become outdated. This guide focuses on the recommended approach using protobuf-encoded `Any` messages and queries, which is more efficient and aligned with modern CosmWasm standards.

## What are `Any` Messages in CosmWasm?

In CosmWasm, `Any` messages are part of the `CosmosMsg` enum, allowing you to send messages wrapped in a protobuf `Any` type supported by the chain. They replace the deprecated `Stargate` messages (still available under the `stargate` feature flag) with improved naming and syntax. `Any` messages are feature-gated with `cosmwasm_2_0`, meaning they require a chain running CosmWasm 2.0 which is supported by Injective. Here’s a snippet of the `CosmosMsg` definition:

```rust
pub enum CosmosMsg<T = Empty> {
    // ...
    #[cfg(feature = "cosmwasm_2_0")]
    Any(AnyMsg),
    // ...
}

pub struct AnyMsg {
    pub type_url: String,
    pub value: Binary,
}
```

The `type_url` specifies the protobuf message type, and `value` contains the serialized message data.

## Why Use This Method?

The `injective-cosmwasm` package used JSON-based messages, which are less efficient and may not remain compatible with future updates. The new `Any` message approach uses protobuf encoding, offering better performance, type safety, and compatibility with CosmWasm 2.0+. This is now the recommended method for interacting with Injective's modules and queries.

## Sending Messages

To send messages, you create a protobuf message, encode it, and wrap it in an `Any` message. Below is an example of creating a spot market order on Injective's exchange module.

### Example: Creating a Spot Market Order

```rust
use cosmwasm_std::{AnyMsg, CosmosMsg, StdResult};
use injective_cosmwasm::{InjectiveMsgWrapper, OrderType, SpotMarket};
use injective_math::{round_to_min_tick, round_to_nearest_tick, FPDecimal};
use injective_std::types::injective::exchange::v1beta1 as Exchange;
use prost::Message;

pub fn create_spot_market_order_message(
    price: FPDecimal,
    quantity: FPDecimal,
    order_type: OrderType,
    sender: &str,
    subaccount_id: &str,
    fee_recipient: &str,
    market: &SpotMarket,
) -> StdResult<CosmosMsg<InjectiveMsgWrapper>> {
    let msg = create_spot_market_order(price, quantity, order_type, sender, subaccount_id, fee_recipient, market);

    let mut order_bytes = vec![];
    Exchange::MsgCreateSpotMarketOrder::encode(&msg, &mut order_bytes).unwrap();

    Ok(CosmosMsg::Any(AnyMsg {
        type_url: Exchange::MsgCreateSpotMarketOrder::TYPE_URL.to_string(),
        value: order_bytes.into(),
    }))
}

fn create_spot_market_order(
    price: FPDecimal,
    quantity: FPDecimal,
    order_type: OrderType,
    sender: &str,
    subaccount_id: &str,
    fee_recipient: &str,
    market: &SpotMarket,
) -> Exchange::MsgCreateSpotMarketOrder {
    let rounded_quantity = round_to_min_tick(quantity, market.min_quantity_tick_size);
    let rounded_price = round_to_nearest_tick(price, market.min_price_tick_size);

    Exchange::MsgCreateSpotMarketOrder {
        sender: sender.to_string(),
        order: Some(Exchange::SpotOrder {
            market_id: market.market_id.as_str().into(),
            order_info: Some(Exchange::OrderInfo {
                subaccount_id: subaccount_id.to_string(),
                fee_recipient: fee_recipient.to_string(),
                price: rounded_price.to_string(),
                quantity: rounded_quantity.to_string(),
                cid: "".to_string(),
            }),
            order_type: order_type as i32,
            trigger_price: "".to_string(),
        }),
    }
}
```

**Steps:**

1. Construct the `MsgCreateSpotMarketOrder` protobuf message with order details.
2. Encode it into bytes using `prost::Message::encode`.
3. Wrap it in an `AnyMsg` with the correct `type_url`.
4. Return it as a `CosmosMsg::Any`.

This approach can be adapted for other modules (e.g., auction, tokenfactory) by using the appropriate protobuf message and `type_url`.

## Performing Queries

Queries are performed using `QuerierWrapper` with `InjectiveQueryWrapper`. You can use pre-built queriers from `injective_std` or send raw queries. Below are examples covering different modules.

### Example: Querying a Spot Market (Exchange Module)

```rust
use cosmwasm_std::{to_json_binary, Binary, Deps, StdResult};
use injective_cosmwasm::InjectiveQueryWrapper;
use injective_std::types::injective::exchange::v1beta1::ExchangeQuerier;

pub fn handle_query_spot_market(deps: Deps<InjectiveQueryWrapper>, market_id: &str) -> StdResult<Binary> {
    let querier = ExchangeQuerier::new(&deps.querier);
    to_json_binary(&querier.spot_market(market_id.to_string())?)
}
```

**Steps:**

1. Create an `ExchangeQuerier` from `deps.querier`.
2. Call `spot_market` with the `market_id`.
3. Serialize the response to JSON and return it as a `Binary`.

### Example: Querying Bank Parameters (Bank Module)

```rust
use cosmwasm_std::{to_json_binary, Binary, Deps, StdResult};
use injective_cosmwasm::InjectiveQueryWrapper;
use injective_std::types::cosmos::bank::v1beta1::BankQuerier;

pub fn handle_query_bank_params(deps: Deps<InjectiveQueryWrapper>) -> StdResult<Binary> {
    let querier = BankQuerier::new(&deps.querier);
    to_json_binary(&querier.params()?)
}
```

**Steps:**

1. Create a `BankQuerier` from `deps.querier`.
2. Call `params` to fetch bank module parameters.
3. Serialize and return the result.

## Working with Other Modules

The same principles apply to other Injective modules like auction, insurance, oracle, permissions, and tokenfactory, as well as the Cosmos native modules. For example:

- **Auction Module**: Use `AuctionQuerier` for queries or encode `MsgBid` as an `Any` message.
- **Tokenfactory Module**: Encode `MsgCreateDenom` or use `TokenFactoryQuerier`.

Refer to [injective_std](https://github.com/InjectiveLabs/injective-rust/tree/dev/packages/injective-std) for specific message types and queriers.
