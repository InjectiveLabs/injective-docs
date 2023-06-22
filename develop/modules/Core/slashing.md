# slashing

## Abstract

This section specifies the slashing module of the Cosmos SDK, which implements functionality first outlined in the [Cosmos Whitepaper](https://cosmos.network/about/whitepaper) in June 2016.

The slashing module enables Cosmos SDK-based blockchains to disincentivize any attributable action by a protocol-recognized actor with value at stake by penalizing them ("slashing").

Penalties may include, but are not limited to:

* Burning some amount of their stake
* Removing their ability to vote on future blocks for a period of time.

This module will be used by the Cosmos Hub, the first hub in the Cosmos ecosystem.

## Contents

1. [**Concepts**](../../../docs/develop/modules/Core/slashing/01\_concepts.md)
   * [States](../../../docs/develop/modules/Core/slashing/01\_concepts.md#states)
   * [Tombstone Caps](../../../docs/develop/modules/Core/slashing/01\_concepts.md#tombstone-caps)
   * [ASCII timelines](../../../docs/develop/modules/Core/slashing/01\_concepts.md#ascii-timelines)
2. [**State**](../../../docs/develop/modules/Core/slashing/02\_state.md)
   * [Signing Info](../../../docs/develop/modules/Core/slashing/02\_state.md#signing-info)
3. [**Messages**](../../../docs/develop/modules/Core/slashing/03\_messages.md)
   * [Unjail](../../../docs/develop/modules/Core/slashing/03\_messages.md#unjail)
4. [**Begin-Block**](../../../docs/develop/modules/Core/slashing/04\_begin\_block.md)
   * [Evidence handling](../../../docs/develop/modules/Core/slashing/04\_begin\_block.md#evidence-handling)
   * [Uptime tracking](../../../docs/develop/modules/Core/slashing/04\_begin\_block.md#uptime-tracking)
5. [**05\_hooks.md**](../../../docs/develop/modules/Core/slashing/05\_hooks.md)
   * [Hooks](../../../docs/develop/modules/Core/slashing/05\_hooks.md#hooks)
6. [**Events**](../../../docs/develop/modules/Core/slashing/06\_events.md)
   * [BeginBlocker](../../../docs/develop/modules/Core/slashing/06\_events.md#beginblocker)
   * [Handlers](../../../docs/develop/modules/Core/slashing/06\_events.md#handlers)
7. [**Staking Tombstone**](../../../docs/develop/modules/Core/slashing/07\_tombstone.md)
   * [Abstract](../../../docs/develop/modules/Core/slashing/07\_tombstone.md#abstract)
8. [**Parameters**](../../../docs/develop/modules/Core/slashing/08\_params.md)
9. [**Client**](../../../docs/develop/modules/Core/slashing/09\_client.md)
   * [CLI](../../../docs/develop/modules/Core/slashing/09\_client.md#cli)
   * [gRPC](../../../docs/develop/modules/Core/slashing/09\_client.md#grpc)
   * [REST](../../../docs/develop/modules/Core/slashing/09\_client.md#rest)
