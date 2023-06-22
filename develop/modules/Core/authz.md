# authz

## Abstract

`x/authz` is an implementation of a Cosmos SDK module, per [ADR 30](https://github.com/cosmos/cosmos-sdk/blob/v0.45.11/docs/architecture/adr-030-authz-module.md), that allows granting arbitrary privileges from one account (the granter) to another account (the grantee). Authorizations must be granted for a particular Msg service method one by one using an implementation of the `Authorization` interface.

1. [**Concept**](../../../docs/develop/modules/Core/authz/01\_concepts.md)
   * [Authorization](../../../docs/develop/modules/Core/authz/01\_concepts.md#Authorization)
   * [Built-in Authorizations](../../../docs/develop/modules/Core/authz/01\_concepts.md#Built-in-Authorization)
   * [Gas](../../../docs/develop/modules/Core/authz/01\_concepts.md#gas)
2. [**State**](../../../docs/develop/modules/Core/authz/02\_state.md)
3. [**Messages**](../../../docs/develop/modules/Core/authz/03\_messages.md)
   * [MsgGrant](../../../docs/develop/modules/Core/authz/03\_messages.md#MsgGrant)
   * [MsgRevoke](../../../docs/develop/modules/Core/authz/03\_messages.md#MsgRevoke)
   * [MsgExec](../../../docs/develop/modules/Core/authz/03\_messages.md#MsgExec)
4. [**Events**](../../../docs/develop/modules/Core/authz/04\_events.md)
   * [Keeper](../../../docs/develop/modules/Core/authz/04\_events.md#Keeper)
