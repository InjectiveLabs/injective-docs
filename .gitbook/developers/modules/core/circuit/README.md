# Circuit

## Concepts

Circuit Breaker is a module that is meant to avoid a chain needing to halt/shut down in the presence of a vulnerability, instead the module will allow specific messages or all messages to be disabled. When operating a chain, if it is app specific then a halt of the chain is less detrimental, but if there are applications built on top of the chain then halting is expensive due to the disturbance to applications.

Circuit Breaker works with the idea that an address or set of addresses have the right to block messages from being executed and/or included in the mempool. Any address with a permission is able to reset the circuit breaker for the message.

The transactions are checked and can be rejected at two points:

* In `CircuitBreakerDecorator` [ante handler](https://docs.cosmos.network/main/learn/advanced/baseapp#antehandler):

```go
https://github.com/cosmos/cosmos-sdk/blob/x/circuit/v0.1.0/x/circuit/ante/circuit.go#L27-L41
```

* With a [message router check](https://docs.cosmos.network/main/learn/advanced/baseapp#msg-service-router):

```go
https://github.com/cosmos/cosmos-sdk/blob/v0.50.1/baseapp/msg_service_router.go#L104-L115
```

:::note The `CircuitBreakerDecorator` works for most use cases, but [does not check the inner messages of a transaction](https://docs.cosmos.network/main/learn/beginner/tx-lifecycle#antehandler). This some transactions (such as `x/authz` transactions or some `x/gov` transactions) may pass the ante handler. **This does not affect the circuit breaker** as the message router check will still fail the transaction. This tradeoff is to avoid introducing more dependencies in the `x/circuit` module. Chains can re-define the `CircuitBreakerDecorator` to check for inner messages if they wish to do so. :::

## State

### Accounts

* AccountPermissions `0x1 | account_address -> ProtocolBuffer(CircuitBreakerPermissions)`

```go
type level int32

const (
    // LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
    // breaker permissions.
    LEVEL_NONE_UNSPECIFIED = iota
    // LEVEL_SOME_MSGS indicates that the account will have permission to
    // trip or reset the circuit breaker for some Msg type URLs. If this level
    // is chosen, a non-empty list of Msg type URLs must be provided in
    // limit_type_urls.
    LEVEL_SOME_MSGS
    // LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
    // breaker for Msg's of all type URLs.
    LEVEL_ALL_MSGS 
    // LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
    // actions and can grant permissions to other accounts.
    LEVEL_SUPER_ADMIN
)

type Access struct {
	level int32 
	msgs []string // if full permission, msgs can be empty
}
```

### Disable List

List of type urls that are disabled.

* DisableList `0x2 | msg_type_url -> []byte{}`

## State Transitions

### Authorize

Authorize, is called by the module authority (default governance module account) or any account with `LEVEL_SUPER_ADMIN` to give permission to disable/enable messages to another account. There are three levels of permissions that can be granted. `LEVEL_SOME_MSGS` limits the number of messages that can be disabled. `LEVEL_ALL_MSGS` permits all messages to be disabled. `LEVEL_SUPER_ADMIN` allows an account to take all circuit breaker actions including authorizing and deauthorizing other accounts.

```protobuf
  // AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
  // account's circuit breaker permissions.
  rpc AuthorizeCircuitBreaker(MsgAuthorizeCircuitBreaker) returns (MsgAuthorizeCircuitBreakerResponse);
```

### Trip

Trip, is called by an authorized account to disable message execution for a specific msgURL. If empty, all the msgs will be disabled.

```protobuf
  // TripCircuitBreaker pauses processing of Msg's in the state machine.
  rpc TripCircuitBreaker(MsgTripCircuitBreaker) returns (MsgTripCircuitBreakerResponse);
```

### Reset

Reset is called by an authorized account to enable execution for a specific msgURL of previously disabled message. If empty, all the disabled messages will be enabled.

```protobuf
  // ResetCircuitBreaker resumes processing of Msg's in the state machine that
  // have been been paused using TripCircuitBreaker.
  rpc ResetCircuitBreaker(MsgResetCircuitBreaker) returns (MsgResetCircuitBreakerResponse);
```

## Messages

### MsgAuthorizeCircuitBreaker

```protobuf
https://github.com/cosmos/cosmos-sdk/blob/main/proto/cosmos/circuit/v1/tx.proto#L25-L75
```

This message is expected to fail if:

* the granter is not an account with permission level `LEVEL_SUPER_ADMIN` or the module authority

### MsgTripCircuitBreaker

```protobuf
https://github.com/cosmos/cosmos-sdk/blob/main/proto/cosmos/circuit/v1/tx.proto#L77-L93
```

This message is expected to fail if:

* if the signer does not have a permission level with the ability to disable the specified type url message

### MsgResetCircuitBreaker

```protobuf
https://github.com/cosmos/cosmos-sdk/blob/main/proto/cosmos/circuit/v1/tx.proto#L95-109
```

This message is expected to fail if:

* if the type url is not disabled

## Events - list and describe event tags

The circuit module emits the following events:

### Message Events

#### MsgAuthorizeCircuitBreaker

| Type    | Attribute Key | Attribute Value             |
| ------- | ------------- | --------------------------- |
| string  | granter       | {granterAddress}            |
| string  | grantee       | {granteeAddress}            |
| string  | permission    | {granteePermissions}        |
| message | module        | circuit                     |
| message | action        | authorize\_circuit\_breaker |

#### MsgTripCircuitBreaker

| Type      | Attribute Key | Attribute Value        |
| --------- | ------------- | ---------------------- |
| string    | authority     | {authorityAddress}     |
| \[]string | msg\_urls     | \[]string{msg\_urls}   |
| message   | module        | circuit                |
| message   | action        | trip\_circuit\_breaker |

#### ResetCircuitBreaker

| Type      | Attribute Key | Attribute Value         |
| --------- | ------------- | ----------------------- |
| string    | authority     | {authorityAddress}      |
| \[]string | msg\_urls     | \[]string{msg\_urls}    |
| message   | module        | circuit                 |
| message   | action        | reset\_circuit\_breaker |

## Keys - list of key prefixes used by the circuit module

* `AccountPermissionPrefix` - `0x01`
* `DisableListPrefix` - `0x02`

## Client - list and describe CLI commands and gRPC and REST endpoints
