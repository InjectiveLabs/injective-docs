# Launch a token

Within this document, we'll explain how to launch a token on Injective.&#x20;

There are two options on how to launch a token on Injective

## Bridging  <a href="#id-3-via-tokenstation" id="id-3-via-tokenstation"></a>

The easiest way to launch a token on Injective is by bridging your existing assets from one of the supported networks that Injective is interoperable with. There are guides in the [bridge](bridge/ "mention")sections that you can reference to bridge assets from other networks to Injective.&#x20;

Once the briding process is completed, a token will be created on Injective which you can then use to [launch-a-market.md](launch-a-market.md "mention").&#x20;

## Creating new token

You can also create a new token on Injective using the `tokenFactory` module. There are multiple ways on how to achieve this.&#x20;

### Using the InjectiveHub <a href="#id-3-via-tokenstation" id="id-3-via-tokenstation"></a>

The [InjectiveHub](https://hub.injective.network/token-factory/) web app provides you the ability to create and manage tokens seamlessly, creating a market on Injective's [native orderbook](https://docs.injective.network/develop/modules/injective/exchange), etc.

### Using the TokenStation[​](https://docs.injective.network/develop/guides/token-launch/#3-via-tokenstation) <a href="#id-3-via-tokenstation" id="id-3-via-tokenstation"></a>

The [TokenStation](https://www.tokenstation.app/) web app provides you the ability to create and manage tokens seamlessly, creating a market on Injective's [native orderbook](https://docs.injective.network/develop/modules/injective/exchange), launching an airdrop, and much more.

### Using the DojoSwap[​](https://docs.injective.network/develop/guides/token-launch/#4-via-dojoswap) <a href="#id-4-via-dojoswap" id="id-4-via-dojoswap"></a>

Similar to above, you can utilize [DojoSwap's Market Creation module](https://docs.dojo.trading/introduction/market-creation) to create, manage, and list your token, along with several other useful features.

### Programmatically

#### Using TypeScript

You can learn more about Launching a token on the [TypeScript Documentation](https://docs.ts.injective.network/readme/assets/creating-tokens).

#### Using Injective CLI

{% hint style="info" %}
You have to have `injectived` installed locally before proceeding with this tutorial. You cal learn more about it on the [getting-started](../getting-started/ "mention")page in the Nodes section.&#x20;
{% endhint %}

Once you have `injectived` installed and a key added, you can use the CLI to launch your token:

1. **Create a tokenfactory denom**

The fee for creating a factory denom is `0.1 INJ`.

```bash
injectived tx tokenfactory create-denom ak --from=YOUR_KEY --chain-id=injective-888 --node=https://testnet.tm.injective.network:443 --gas-prices=500000000inj --gas 1000000
```

Tokens are namespaced by the creator address to be permissionless and avoid name collision. In the example above, the subdenom is `ak` but the denom naming will be `factory/{creator address}/{subdenom}`.&#x20;

2. **Submit token metadata**

To get your token visible on Injective dApps, you have to submit it's metadata.&#x20;

```bash
injectived tx tokenfactory set-denom-metadata "My Token Description" 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/ak' AKK AKCoin AK '' '' '[
{"denom":"factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/ak","exponent":0,"aliases":[]},
{"denom":"AKK","exponent":6,"aliases":[]}
]' 6 --from=YOUR_KEY --chain-id=injective-888 --node=https://sentry.testnet.tm.injective.network:443 --gas-prices=500000000inj --gas 1000000
```

This command expects the following arguments:

<pre class="language-bash"><code class="lang-bash"><strong>injectived tx tokenfactory set-denom-metadata [description] [base] [display] [name] [symbol] [uri] [uri-hash] [denom-unit (json)] [decimals]
</strong></code></pre>

3. #### Mint tokens <a href="#id-5-mint-tokens" id="id-5-mint-tokens"></a>

Once you have created your token and submitted the token metadata, it's time to mint your tokens.&#x20;

```bash
injectived tx tokenfactory mint 1000000factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/ak --from=gov --chain-id=injective-888 --node=https://sentry.testnet.tm.injective.network:443 --gas-prices=500000000inj --gas 1000000
```

This command will mint 1 token, assuming your token has 6 decimals.&#x20;

4. **Burn tokens**

The admin of the token, can also burn the tokens.&#x20;

```bash
injectived tx tokenfactory burn 1000000factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/ak --from=gov --chain-id=injective-888 --node=https://sentry.testnet.tm.injective.network:443 --gas-prices=500000000inj --gas 1000000
```

5. **Change admin**

It's recommended once you have minted the initial supply to change admin to the `null` address to make sure that the supply of the token cannot be manipulated. Once again, the admin of the token can mint and burn supply anytime. The `NEW_ADDRESS`, as explained above in most of the cases should be set to `inj1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqe2hm49`.&#x20;

```bash
injectived tx tokenfactory change-admin factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/ak NEW_ADDRESS --from=gov --chain-id=injective-888 --node=https://sentry.testnet.tm.injective.network:443 --gas-prices=500000000inj --gas 1000000
```

{% hint style="info" %}
The examples above are for testnet. If you want to run them on mainnet, do the following changes:

`injective-888` > `injective-1`

`https://sentry.testnet.tm.injective.network:443` > `http://sentry.tm.injective.network:443`
{% endhint %}

#### Using Cosmwasm

To create and manage a bank token programmatically via a smart contract, one can use the following messages found in the [`injective-cosmwasm`](https://github.com/InjectiveLabs/cw-injective/blob/6b2d549ff99912b9b16dbf91a06c83db99b5dace/packages/injective-cosmwasm/src/msg.rs#L399-L434) package:

\
`create_new_denom_msg`

```rust
pub fn create_new_denom_msg(sender: String, subdenom: String) -> CosmosMsg<InjectiveMsgWrapper> {
    InjectiveMsgWrapper {
        route: InjectiveRoute::Tokenfactory,
        msg_data: InjectiveMsg::CreateDenom { sender, subdenom },
    }
    .into()
}
```

Purpose: Creates a message to create a new token denomination using the tokenfactory module.

Parameters:

* `sender`: The address of the account initiating the creation.
* `subdenom`: The sub-denomination identifier for the new token.

Returns: A `CosmosMsg` wrapped in an `InjectiveMsgWrapper`, ready to be sent to the Injective blockchain.

Example:

```rust
let new_denom_message = create_new_denom_msg(
    env.contract.address,  // Sender's address
    "mytoken".to_string(), // Sub-denomination identifier
);
```

#### `create_set_token_metadata_msg`

```rust
pub fn create_set_token_metadata_msg(denom: String, name: String, symbol: String, decimals: u8) -> CosmosMsg<InjectiveMsgWrapper> {
    InjectiveMsgWrapper {
        route: InjectiveRoute::Tokenfactory,
        msg_data: InjectiveMsg::SetTokenMetadata {
            denom,
            name,
            symbol,
            decimals,
        },
    }
    .into()
}
```

Purpose: Creates a message to set or update metadata for a token.

Parameters:

* `denom`: The denomination identifier of the token.
* `name`: The full name of the token.
* `symbol`: The symbol of the token.
* `decimals`: The number of decimal places the token uses.

Returns: A `CosmosMsg` wrapped in an `InjectiveMsgWrapper`, ready to be sent to the Injective blockchain.

Example:

```rust
let metadata_message = create_set_token_metadata_msg(
    "mytoken".to_string(),         // Denomination identifier
    "My Custom Token".to_string(), // Full name
    "MYT".to_string(),             // Symbol
    18,                            // Number of decimals
);
```

#### `create_mint_tokens_msg`

```rust
pub fn create_mint_tokens_msg(sender: Addr, amount: Coin, mint_to: String) -> CosmosMsg<InjectiveMsgWrapper> {
    InjectiveMsgWrapper {
        route: InjectiveRoute::Tokenfactory,
        msg_data: InjectiveMsg::Mint { sender, amount, mint_to },
    }
    .into()
}
```

Purpose: Creates a message to mint new tokens. The token must be a tokenfactory token and the sender must be the token admin.

Parameters:

* `sender`: The address of the account initiating the mint operation.
* `amount`: The amount of tokens to mint.
* `mint_to`: The recipient address where the newly minted tokens should be sent.

Returns: A `CosmosMsg` wrapped in an `InjectiveMsgWrapper`, ready to be sent to the Injective blockchain.

Example:

```rust
let mint_message = create_mint_tokens_msg(
    env.contract.address,                                   // Sender's address
    Coin::new(1000, "factory/<creator-address>/mytoken"),   // Amount to mint
    "inj1...".to_string(),                                  // Recipient's address
);
```

#### `create_burn_tokens_msg`

```rust
pub fn create_burn_tokens_msg(sender: Addr, amount: Coin) -> CosmosMsg<InjectiveMsgWrapper> {
    InjectiveMsgWrapper {
        route: InjectiveRoute::Tokenfactory,
        msg_data: InjectiveMsg::Burn { sender, amount },
    }
    .into()
}
```

Purpose: Creates a message to burn tokens. The token must be a tokenfactory token and the sender must be the token admin.

Parameters:

* `sender`: The address of the account initiating the burn operation.
* `amount`: The amount of tokens to burn.

Returns: A `CosmosMsg` wrapped in an `InjectiveMsgWrapper`, ready to be sent to the Injective blockchain.

Example:

```rust
let burn_message = create_burn_tokens_msg(
    env.contract.address,                                    // Sender's address
    Coin::new(500, "factory/<creator-address>/mytoken"),     // Amount to burn
);
```
