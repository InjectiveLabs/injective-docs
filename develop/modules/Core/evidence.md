# evidence

## Abstract

`x/evidence` is an implementation of a Cosmos SDK module, per [ADR 009](https://github.com/cosmos/cosmos-sdk/blob/v0.45.11/docs/architecture/adr-009-evidence-module.md), that allows for the submission and handling of arbitrary evidence of misbehavior such as equivocation and counterfactual signing.

The evidence module differs from standard evidence handling which typically expects the underlying consensus engine, e.g. Tendermint, to automatically submit evidence when it is discovered by allowing clients and foreign chains to submit more complex evidence directly.

All concrete evidence types must implement the `Evidence` interface contract. Submitted `Evidence` is first routed through the evidence module's `Router` in which it attempts to find a corresponding registered `Handler` for that specific `Evidence` type. Each `Evidence` type must have a `Handler` registered with the evidence module's keeper in order for it to be successfully routed and executed.

Each corresponding handler must also fulfill the `Handler` interface contract. The `Handler` for a given `Evidence` type can perform any arbitrary state transitions such as slashing, jailing, and tombstoning.

## Contents

1. [**Concepts**](../../../docs/develop/modules/Core/evidence/01\_concepts.md)
2. [**State**](../../../docs/develop/modules/Core/evidence/02\_state.md)
3. [**Messages**](../../../docs/develop/modules/Core/evidence/03\_messages.md)
4. [**Events**](../../../docs/develop/modules/Core/evidence/04\_events.md)
5. [**Params**](../../../docs/develop/modules/Core/evidence/05\_params.md)
6. [**BeginBlock**](../../../docs/develop/modules/Core/evidence/06\_begin\_block.md)
