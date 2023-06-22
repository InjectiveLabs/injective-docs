# feegrant

## Abstract

This document specifies the feegrant module. For the full ADR, please see [Fee Grant ADR-029](https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/docs/architecture/adr-029-fee-grant-module.md).

This module allows accounts to grant fee allowances and to use fees from their accounts. Grantees can execute any transaction without the need to maintain sufficient fees.

## Contents

1. [**Concepts**](../../../docs/develop/modules/Core/feegrant/01\_concepts.md)
   * [Grant](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#grant)
   * [Fee Allowance types](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#fee-allowance-types)
   * [BasicAllowance](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#basicallowance)
   * [PeriodicAllowance](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#periodicallowance)
   * [FeeAccount flag](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#feeaccount-flag)
   * [Granted Fee Deductions](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#granted-fee-deductions)
   * [Gas](../../../docs/develop/modules/Core/feegrant/01\_concepts.md#gas)
2. [**State**](../../../docs/develop/modules/Core/feegrant/02\_state.md)
   * [FeeAllowance](../../../docs/develop/modules/Core/feegrant/02\_state.md#feeallowance)
3. [**Messages**](../../../docs/develop/modules/Core/feegrant/03\_messages.md)
   * [Msg/GrantAllowance](../../../docs/develop/modules/Core/feegrant/03\_messages.md#msggrantallowance)
   * [Msg/RevokeAllowance](../../../docs/develop/modules/Core/feegrant/03\_messages.md#msgrevokeallowance)
4. [**Events**](../../../docs/develop/modules/Core/feegrant/04\_events.md)
   * [MsgGrantAllowance](../../../docs/develop/modules/Core/feegrant/04\_events.md#msggrantallowance)
   * [MsgRevokeAllowance](../../../docs/develop/modules/Core/feegrant/04\_events.md#msgrevokeallowance)
   * [Exec fee allowance](../../../docs/develop/modules/Core/feegrant/04\_events.md#exec-fee-allowance)
