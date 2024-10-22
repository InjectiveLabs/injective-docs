# CW20 Adapter

In this document, we'll explain the CW20 Adapter Contract that allows exchanging CW-20 tokens for Injective issued native tokens (using the TokenFactory module) and vice-versa. For the CW-20 Adapter GitHub repository, see [here](https://github.com/InjectiveLabs/cw20-adapter/tree/master/contracts/cw20-adapter).

## Background

CW-20 is a specification for fungible tokens in CosmWasm, loosely based on ERC-20 specification. It allows creating and handling of arbitrary fungible tokens within CosmWasm, specifying methods for creating, minting and burning and transferring those tokens between accounts. The adapter contract will ensure that only authorized source CW-20 contracts can mint tokens (to avoid creating “counterfeit” tokens).

While the CW-20 standard is relatively mature and complete, the tokens exist purely within the CosmWasm context and are entirely managed by the issuing contract (including keeping track of account balances). That means that they cannot interact directly with any Injective/Cosmos chain functionality (for example, it’s not possible to trade them via the Injective exchange module, or to transfer without involving issuing contracts).

Considering the above, it’s necessary to provide a solution that would work as a bridge between CW20 and the Injective bank module.

The workflow of the contract is

* Register a new CW-20 token
* Exchange amount of X CW-20 tokens for Y TokenFactory tokens (original CW-20 tokens will be held by the contract)
* Exchange Y TF tokens back for X CW-20 tokens (CW-20 tokens are released and TokenFactory tokens are burned)

### Messages

#### `RegisterCw20Contract { addr: Addr }`

Registers a new CW-20 contract (`addr`) that will be handled by the adapter and creates a new TokenFactory token in format `factory/{adapter_contract}/{cw20_contract}`.

```rust
ExecuteMsg::RegisterCw20Contract { addr } => execute_register::handle_register_msg(deps, env, info, addr)

pub fn handle_register_msg(
    deps: DepsMut<InjectiveQueryWrapper>,
    env: Env,
    info: MessageInfo,
    addr: Addr,
) -> Result<Response<InjectiveMsgWrapper>, ContractError> {
    if is_contract_registered(&deps, &addr) {
        return Err(ContractError::ContractAlreadyRegistered);
    }
    let required_funds = query_denom_creation_fee(&deps.querier)?;
    if info.funds.len() > required_funds.len() {
        return Err(ContractError::SuperfluousFundsProvided);
    }

    let mut provided_funds = info.funds.iter();

    for required_coin in &required_funds {
        let pf = provided_funds
           .find(|c| -> bool { c.denom == required_coin.denom })
           .ok_or(ContractError::NotEnoughBalanceToPayDenomCreationFee)?;

        match pf.amount.cmp(&required_coin.amount) {
            Ordering::Greater => return Err(ContractError::SuperfluousFundsProvided),
            Ordering::Less => return Err(ContractError::NotEnoughBalanceToPayDenomCreationFee),
            Ordering::Equal => {}
        }
    }

    let create_denom_msg = register_contract_and_get_message(deps, &env, &addr)?;
    Ok(Response::new().add_message(create_denom_msg))
}
```

#### `Receive { sender: String, amount: Uint128, msg: Binary }`

Implementation of the Receiver CW-20 interface.

{% hint style="danger" %}
Must be called by the CW-20 contract only.
{% endhint %}

```rust
ExecuteMsg::Receive { sender, amount, msg: _ } => execute_receive::handle_on_received_cw20_funds_msg(deps, env, info, sender, amount)

pub fn handle_on_received_cw20_funds_msg(
    deps: DepsMut<InjectiveQueryWrapper>,
    env: Env,
    info: MessageInfo,
    recipient: String,
    amount: Uint128,
) -> Result<Response<InjectiveMsgWrapper>, ContractError> {
    if!info.funds.is_empty() {
        return Err(ContractError::SuperfluousFundsProvided);
    }
    let mut response = Response::new();
    let token_contract = info.sender;
    if!is_contract_registered(&deps, &token_contract) {
        ensure_sufficient_create_denom_balance(&deps, &env)?;
        response = response.add_message(register_contract_and_get_message(deps, &env, &token_contract)?);
    }
    let master = env.contract.address;

    let denom = get_denom(&master, &token_contract);
    let coins_to_mint = Coin::new(amount.u128(), denom);
    let mint_tf_tokens_message = create_mint_tokens_msg(master, coins_to_mint, recipient);

    Ok(response.add_message(mint_tf_tokens_message))
}
```

#### `RedeemAndTransfer { recipient: Option<String> }`

Redeem attached TokenFactory tokens and transfer CW-20 tokens to the recipient. If the recipient is not provided, they will be sent to the message sender.

#### `RedeemAndSend { recipient: String, submessage: Binary }`

Redeem attached TokenFactory tokens and send CW-20 tokens to the recipient contract. Caller may provide optional submessage.

```rust
ExecuteMsg::RedeemAndTransfer { recipient } => execute_redeem::handle_redeem_msg(deps, env, info, recipient, None)

ExecuteMsg::RedeemAndSend { recipient, submsg } => execute_redeem::handle_redeem_msg(deps, env, info, Some(recipient), Some(submsg))

pub fn handle_redeem_msg(
    deps: DepsMut<InjectiveQueryWrapper>,
    env: Env,
    info: MessageInfo,
    recipient: Option<String>,
    submessage: Option<Binary>,
) -> Result<Response<InjectiveMsgWrapper>, ContractError> {
    let recipient = recipient.unwrap_or_else(|| info.sender.to_string());

    if info.funds.len() > 1 {
        return Err(ContractError::SuperfluousFundsProvided);
    }
    let tokens_to_exchange = info
       .funds
       .iter()
       .find_map(|c| -> Option<AdapterCoin> {
            match AdapterDenom::new(&c.denom) {
                Ok(denom) => Some(AdapterCoin { amount: c.amount, denom }),
                Err(_) => None,
            }
        })
       .ok_or(ContractError::NoRegisteredTokensProvided)?;

    let cw20_addr = tokens_to_exchange.denom.cw20_addr.clone();
    let is_contract_registered = CW20_CONTRACTS.contains(deps.storage, &tokens_to_exchange.denom.cw20_addr);
    if!is_contract_registered {
        return Err(ContractError::NoRegisteredTokensProvided);
    }

    let burn_tf_tokens_message = create_burn_tokens_msg(env.contract.address, tokens_to_exchange.as_coin());

    let cw20_message: WasmMsg = match submessage {
        None => WasmMsg::Execute {
            contract_addr: cw20_addr,
            msg: to_binary(&Cw20ExecuteMsg::Transfer {
                recipient,
                amount: tokens_to_exchange.amount,
            })?,
            funds: vec![],
        },
        Some(msg) => WasmMsg::Execute {
            contract_addr: cw20_addr,
            msg: to_binary(&Cw20ExecuteMsg::Send {
                contract: recipient,
                amount: tokens_to_exchange.amount,
                msg,
            })?,
            funds: vec![],
        },
    };
    Ok(Response::new().add_message(cw20_message).add_message(burn_tf_tokens_message))
}
```

#### `UpdateMetadata { addr : Addr}`

Will query the CW-20 address (if registered) for metadata and will call setMetadata in the bank module (using TokenFactory access method).

```rust
ExecuteMsg::UpdateMetadata { addr } => execute_metadata::handle_update_metadata(deps, env, addr)

pub fn handle_update_metadata(
    deps: DepsMut<InjectiveQueryWrapper>,
    env: Env,
    cw20_addr: Addr,
) -> Result<Response<InjectiveMsgWrapper>, ContractError> {
    let is_contract_registered = CW20_CONTRACTS.contains(deps.storage, cw20_addr.as_str());
    if!is_contract_registered {
        return Err(ContractError::ContractNotRegistered);
    }
    let token_metadata = fetch_cw20_metadata(&deps, cw20_addr.as_str())?;

    let denom = get_denom(&env.contract.address, &cw20_addr);
    let set_metadata_message = create_set_token_metadata_msg(denom, token_metadata.name, token_metadata.symbol, token_metadata.decimals);

    Ok(Response::new().add_message(set_metadata_message))
}

Queries
RegisteredContracts {}
Return a list of registered CW-20 contracts.

QueryMsg::RegisteredContracts {} => to_binary(&query::registered_contracts(deps)?)

pub fn registered_contracts(deps: Deps<InjectiveQueryWrapper>) -> StdResult<Vec<Addr>> {}

NewDenomFee {}
Returns a fee required to register a new tokenFactory denom.

QueryMsg::NewDenomFee {} => to_binary(&query::new_denom_fee(deps)?)

pub fn new_denom_fee(deps: Deps<InjectiveQueryWrapper>) -> StdResult<Uint128> {}
```
