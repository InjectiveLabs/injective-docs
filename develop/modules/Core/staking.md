# staking

## Abstract

This paper specifies the Staking module of the Cosmos-SDK, which was first described in the [Cosmos Whitepaper](https://cosmos.network/about/whitepaper) in June 2016.

The module enables Cosmos-SDK based blockchain to support an advanced Proof-of-Stake system. In this system, holders of the native staking token of the chain can become validators and can delegate tokens to validators, ultimately determining the effective validator set for the system.

This module will be used in the Cosmos Hub, the first Hub in the Cosmos network.

## Contents

1. [**State**](../../../docs/develop/modules/Core/staking/01\_state.md)
   * [Pool](../../../docs/develop/modules/Core/staking/01\_state.md#pool)
   * [LastTotalPower](../../../docs/develop/modules/Core/staking/01\_state.md#lasttotalpower)
   * [Params](../../../docs/develop/modules/Core/staking/01\_state.md#params)
   * [Validator](../../../docs/develop/modules/Core/staking/01\_state.md#validator)
   * [Delegation](../../../docs/develop/modules/Core/staking/01\_state.md#delegation)
   * [UnbondingDelegation](../../../docs/develop/modules/Core/staking/01\_state.md#unbondingdelegation)
   * [Redelegation](../../../docs/develop/modules/Core/staking/01\_state.md#redelegation)
   * [Queues](../../../docs/develop/modules/Core/staking/01\_state.md#queues)
   * [HistoricalInfo](../../../docs/develop/modules/Core/staking/01\_state.md#historicalinfo)
2. [**State Transitions**](../../../docs/develop/modules/Core/staking/02\_state\_transitions.md)
   * [Validators](../../../docs/develop/modules/Core/staking/02\_state\_transitions.md#validators)
   * [Delegations](../../../docs/develop/modules/Core/staking/02\_state\_transitions.md#delegations)
   * [Slashing](../../../docs/develop/modules/Core/staking/02\_state\_transitions.md#slashing)
3. [**Messages**](../../../docs/develop/modules/Core/staking/03\_messages.md)
   * [MsgCreateValidator](../../../docs/develop/modules/Core/staking/03\_messages.md#msgcreatevalidator)
   * [MsgEditValidator](../../../docs/develop/modules/Core/staking/03\_messages.md#msgeditvalidator)
   * [MsgDelegate](../../../docs/develop/modules/Core/staking/03\_messages.md#msgdelegate)
   * [MsgUndelegate](../../../docs/develop/modules/Core/staking/03\_messages.md#msgundelegate)
   * [MsgBeginRedelegate](../../../docs/develop/modules/Core/staking/03\_messages.md#msgbeginredelegate)
4. [**Begin-Block**](../../../docs/develop/modules/Core/staking/04\_begin\_block.md)
   * [Historical Info Tracking](../../../docs/develop/modules/Core/staking/04\_begin\_block.md#historical-info-tracking)
5. [**End-Block**](../../../docs/develop/modules/Core/staking/05\_end\_block.md)
   * [Validator Set Changes](../../../docs/develop/modules/Core/staking/05\_end\_block.md#validator-set-changes)
   * [Queues](../../../docs/develop/modules/Core/staking/05\_end\_block.md#queues-)
6. [**Hooks**](../../../docs/develop/modules/Core/staking/06\_hooks.md)
7. [**Events**](../../../docs/develop/modules/Core/staking/07\_events.md)
   * [EndBlocker](../../../docs/develop/modules/Core/staking/07\_events.md#endblocker)
   * [Msg's](../../../docs/develop/modules/Core/staking/07\_events.md#msg's)
8. [**Parameters**](../../../docs/develop/modules/Core/staking/08\_params.md)
