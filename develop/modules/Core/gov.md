# gov

## Abstract

This paper specifies the Governance module of the Cosmos-SDK, which was first described in the [Cosmos Whitepaper](https://cosmos.network/about/whitepaper) in June 2016.

The module enables Cosmos-SDK based blockchain to support an on-chain governance system. In this system, holders of the native staking token of the chain can vote on proposals on a 1 token 1 vote basis. Next is a list of features the module currently supports:

* **Proposal submission:** Users can submit proposals with a deposit. Once the minimum deposit is reached, proposal enters voting period
* **Vote:** Participants can vote on proposals that reached MinDeposit
* **Inheritance and penalties:** Delegators inherit their validator's vote if they don't vote themselves.
* **Claiming deposit:** Users that deposited on proposals can recover their deposits if the proposal was accepted OR if the proposal never entered voting period.

This module will be used in the Cosmos Hub, the first Hub in the Cosmos network. Features that may be added in the future are described in [Future Improvements](../../../docs/develop/modules/Core/gov/05\_future\_improvements.md).

## Contents

The following specification uses _ATOM_ as the native staking token. The module can be adapted to any Proof-Of-Stake blockchain by replacing _ATOM_ with the native staking token of the chain.

1. [**Concepts**](../../../docs/develop/modules/Core/gov/01\_concepts.md)
   * [Proposal submission](../../../docs/develop/modules/Core/gov/01\_concepts.md#proposal-submission)
   * [Vote](../../../docs/develop/modules/Core/gov/01\_concepts.md#vote)
   * [Software Upgrade](../../../docs/develop/modules/Core/gov/01\_concepts.md#software-upgrade)
2. [**State**](../../../docs/develop/modules/Core/gov/02\_state.md)
   * [Parameters and base types](../../../docs/develop/modules/Core/gov/02\_state.md#parameters-and-base-types)
   * [Deposit](../../../docs/develop/modules/Core/gov/02\_state.md#deposit)
   * [ValidatorGovInfo](../../../docs/develop/modules/Core/gov/02\_state.md#validatorgovinfo)
   * [Proposals](../../../docs/develop/modules/Core/gov/02\_state.md#proposals)
   * [Stores](../../../docs/develop/modules/Core/gov/02\_state.md#stores)
   * [Proposal Processing Queue](../../../docs/develop/modules/Core/gov/02\_state.md#proposal-processing-queue)
3. [**Messages**](../../../docs/develop/modules/Core/gov/03\_messages.md)
   * [Proposal Submission](../../../docs/develop/modules/Core/gov/03\_messages.md#proposal-submission)
   * [Deposit](../../../docs/develop/modules/Core/gov/03\_messages.md#deposit)
   * [Vote](../../../docs/develop/modules/Core/gov/03\_messages.md#vote)
4. [**Events**](../../../docs/develop/modules/Core/gov/04\_events.md)
   * [EndBlocker](../../../docs/develop/modules/Core/gov/04\_events.md#endblocker)
   * [Handlers](../../../docs/develop/modules/Core/gov/04\_events.md#handlers)
5. [**Future Improvements**](../../../docs/develop/modules/Core/gov/05\_future\_improvements.md)
6. [**Parameters**](../../../docs/develop/modules/Core/gov/06\_params.md)
