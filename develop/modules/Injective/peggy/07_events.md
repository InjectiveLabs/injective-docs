# Events

The peggy module emits the following events:

## EndBlocker

### EventAttestationObserved

| Type        | Attribute Key     | Attribute Value     |
| ----------- | ----------------- | ------------------- |
| observation | module            | peggy               |
| observation | attestation\_type | {attestation\_type} |
| observation | bridge\_contract  | {bridge\_contract}  |
| observation | bridge\_chain\_id | {bridge\_chain\_id} |
| observation | attestation\_id   | {attestation\_id}   |
| observation | nonce             | {nonce}             |

## Handler

### EventSetOrchestratorAddresses

| Type    | Attribute Key          | Attribute Value     |
| ------- | ---------------------- | ------------------- |
| message | module                 | peggy               |
| message | set\_operator\_address | {operator\_address} |

### EventSendToEth

| Type    | Attribute Key    | Attribute Value |
| ------- | ---------------- | --------------- |
| message | module           | peggy           |
| message | outgoing\_tx\_id | {tx\_id}        |

### EventBridgeWithdrawalReceived

| Type                 | Attribute Key     | Attribute Value     |
| -------------------- | ----------------- | ------------------- |
| withdrawal\_received | module            | peggy               |
| withdrawal\_received | bridge\_contract  | {bridge\_contract}  |
| withdrawal\_received | bridge\_chain\_id | {bridge\_chain\_id} |
| withdrawal\_received | outgoing\_tx\_id  | {outgoing\_tx\_id}  |
| withdrawal\_received | nonce             | {nonce}             |

### EventBridgeWithdrawCanceled

| Type                  | Attribute Key     | Attribute Value     |
| --------------------- | ----------------- | ------------------- |
| withdrawal\_cancelled | module            | peggy               |
| withdrawal\_cancelled | bridge\_contract  | {bridge\_contract}  |
| withdrawal\_cancelled | bridge\_chain\_id | {bridge\_chain\_id} |

### EventOutgoingBatch

| Type            | Attribute Key       | Attribute Value       |
| --------------- | ------------------- | --------------------- |
| outgoing\_batch | module              | peggy                 |
| outgoing\_batch | bridge\_contract    | {bridge\_contract}    |
| outgoing\_batch | bridge\_chain\_id   | {bridge\_chain\_id}   |
| outgoing\_batch | outgoing\_batch\_id | {outgoing\_batch\_id} |
| outgoing\_batch | nonce               | {nonce}               |

### EventOutgoingBatchCanceled

| Type                       | Attribute Key       | Attribute Value       |
| -------------------------- | ------------------- | --------------------- |
| outgoing\_batch\_cancelled | module              | peggy                 |
| outgoing\_batch\_cancelled | bridge\_contract    | {bridge\_contract}    |
| outgoing\_batch\_cancelled | bridge\_chain\_id   | {bridge\_chain\_id}   |
| outgoing\_batch\_cancelled | outgoing\_batch\_id | {outgoing\_batch\_id} |
| outgoing\_batch\_cancelled | nonce               | {nonce}               |

### EventValsetConfirm

| Type    | Attribute Key        | Attribute Value        |
| ------- | -------------------- | ---------------------- |
| message | module               | peggy                  |
| message | valset\_confirm\_key | {valset\_confirm\_key} |

### EventConfirmBatch

| Type    | Attribute Key       | Attribute Value       |
| ------- | ------------------- | --------------------- |
| message | module              | peggy                 |
| message | batch\_confirm\_key | {batch\_confirm\_key} |

### EventDepositClaim

| Type    | Attribute Key   | Attribute Value    |
| ------- | --------------- | ------------------ |
| message | module          | peggy              |
| message | attestation\_id | {attestation\_key} |

### EventWithdrawClaim

| Type    | Attribute Key   | Attribute Value    |
| ------- | --------------- | ------------------ |
| message | module          | peggy              |
| message | attestation\_id | {attestation\_key} |

### EventERC20DeployedClaim

| Type    | Attribute Key   | Attribute Value    |
| ------- | --------------- | ------------------ |
| message | module          | peggy              |
| message | attestation\_id | {attestation\_key} |

### EventValsetUpdateClaim

| Type    | Attribute Key   | Attribute Value    |
| ------- | --------------- | ------------------ |
| message | module          | peggy              |
| message | attestation\_id | {attestation\_key} |
