# auth

## Abstract

This document specifies the auth module of the Cosmos SDK.

The auth module is responsible for specifying the base transaction and account types for an application, since the SDK itself is agnostic to these particulars. It contains the ante handler, where all basic transaction validity checks (signatures, nonces, auxiliary fields) are performed, and exposes the account keeper, which allows other modules to read, write, and modify accounts.

This module will be used in the Cosmos Hub.

## Contents

1. [**Concepts**](../../../docs/develop/modules/Core/auth/01\_concepts.md)
   * [Gas & Fees](../../../docs/develop/modules/Core/auth/01\_concepts.md#gas-&-fees)
2. [**State**](../../../docs/develop/modules/Core/auth/02\_state.md)
   * [Accounts](../../../docs/develop/modules/Core/auth/02\_state.md#accounts)
3. [**AnteHandlers**](../../../docs/develop/modules/Core/auth/03\_antehandlers.md)
   * [Handlers](../../../docs/develop/modules/Core/auth/03\_antehandlers.md#handlers)
4. [**Keepers**](../../../docs/develop/modules/Core/auth/04\_keepers.md)
   * [Account Keeper](../../../docs/develop/modules/Core/auth/04\_keepers.md#account-keeper)
5. [**Vesting**](../../../docs/develop/modules/Core/auth/05\_vesting.md)
   * [Intro and Requirements](../../../docs/develop/modules/Core/auth/05\_vesting.md#intro-and-requirements)
   * [Vesting Account Types](../../../docs/develop/modules/Core/auth/05\_vesting.md#vesting-account-types)
   * [Vesting Account Specification](../../../docs/develop/modules/Core/auth/05\_vesting.md#vesting-account-specification)
   * [Keepers & Handlers](../../../docs/develop/modules/Core/auth/05\_vesting.md#keepers-&-handlers)
   * [Genesis Initialization](../../../docs/develop/modules/Core/auth/05\_vesting.md#genesis-initialization)
   * [Examples](../../../docs/develop/modules/Core/auth/05\_vesting.md#examples)
   * [Glossary](../../../docs/develop/modules/Core/auth/05\_vesting.md#glossary)
6. [**Parameters**](../../../docs/develop/modules/Core/auth/07\_params.md)
