# Staking

Example code snippets to query the chain's staking module

## Using gRPC

### Fetch parameters related to the staking module such as the unbonding time or bond denom

```ts
import { ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const moduleParams = await chainGrpcStakingApi.fetchModuleParams()

console.log(moduleParams)
```

### Fetch unbonded and bonded tokens for a pool

```ts
import { ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const pool = await chainGrpcStakingApi.fetchPool()

console.log(pool)
```

### Fetch validators and associated metadata

```ts
import { ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const validators = await chainGrpcStakingApi.fetchValidators()

console.log(validators)
```

### Fetch validator and associated metadata from a validator address

```ts
import { ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const validatorAddress = 'injvaloper...'

const validator = await chainGrpcStakingApi.fetchValidator(validatorAddress)

console.log(validator)
```

### Fetch delegations associated with a validator

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const validatorAddress = 'injvaloper...'
const pagination = {...} as PaginationOption

const delegations = await chainGrpcStakingApi.fetchValidatorDelegationsNoThrow({
  validatorAddress,
  pagination /* optional pagination options */
})

console.log(delegations)
```

### Fetch unbonding delegations associated with a validator

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const validatorAddress = 'injvaloper...'
const pagination = {...} as PaginationOption

const unbondingDelegations = await chainGrpcStakingApi.fetchValidatorUnbondingDelegationsNoThrow({
  validatorAddress,
  pagination /* optional pagination options */
})

console.log(unbondingDelegations)
```

### Fetch delegations associated with an injective address for a specific validator

```ts
import { ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const injectiveAddress = 'inj...'
const validatorAddress = 'injvaloper...'

const delegation = await chainGrpcStakingApi.fetchDelegation({
  injectiveAddress,
  validatorAddress,
})

console.log(delegation)
```

### Fetch delegations for an injective address

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const injectiveAddress = 'inj...'
const pagination = {...} as PaginationOption

const delegations = await chainGrpcStakingApi.fetchDelegationsNoThrow({
  injectiveAddress,
  pagination /* optional pagination options */
})

console.log(delegations)
```

### Fetch delegators for a validator

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const validatorAddress = 'injvaloper...'
const pagination = {...} as PaginationOption

const delegators = await chainGrpcStakingApi.fetchDelegatorsNoThrow({
  validatorAddress,
  pagination /* optional pagination options */
})

console.log(delegators)
```

### Fetch unbonding delegations for an injective address

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const injectiveAddress = 'inj...'
const pagination = {...} as PaginationOption

const unbondingDelegations = await chainGrpcStakingApi.fetchUnbondingDelegationsNoThrow({
  injectiveAddress,
  pagination /* optional pagination options */
})

console.log(unbondingDelegations)
```

### Fetch redelegations for an injective address

```ts
import { PaginationOption, ChainGrpcStakingApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcStakingApi = new ChainGrpcStakingApi(endpoints.grpc)

const injectiveAddress = 'inj...'
const pagination = {...} as PaginationOption

const unbondingDelegations = await chainGrpcStakingApi.fetchReDelegationsNoThrow({
  injectiveAddress,
  pagination /* optional pagination options */
})

console.log(unbondingDelegations)
```
