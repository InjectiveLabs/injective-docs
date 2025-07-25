# Governance

Example code snippets to query the governance module on the chain.

## Using gRPC

### Fetch parameters such as the voting period, max depositing period, or tallying details

```ts
import { ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const moduleParams = await chainGrpcGovApi.fetchModuleParams()

console.log(moduleParams)
```

### Fetch proposals based on the status

```ts
import { PaginationOption, ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import { ProposalStatusMap } from '@injectivelabs/chain-api'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const status = 3 as ProposalStatusMap[keyof ProposalStatusMap]
const pagination = {...} as PaginationOption

const proposals = await chainGrpcGovApi.fetchProposals({
  status,
  pagination /* optional pagination params */
})

console.log(proposals)
```

### Fetch proposal details based on a proposal's id

```ts
import { ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123

const proposalDetails = await chainGrpcGovApi.fetchProposal(proposalId)

console.log(proposalDetails)
```

### Fetch proposal deposits based on a proposal's id.

```ts
import { PaginationOption, ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123
const pagination = {...} as PaginationOption

const proposalDeposits = await chainGrpcGovApi.fetchProposalDeposits({
  proposalId,
  pagination /* optiona pagination parameter */
})

console.log(proposalDeposits)
```

### Fetch proposal details based on a proposal's id

```ts
import { ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123

const proposalDetails = await chainGrpcGovApi.fetchProposal(proposalId)

console.log(proposalDetails)
```

### Fetch proposal deposits based on a proposal's id

```ts
import { PaginationOption, ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123
const pagination = {...} as PaginationOption

const proposalDeposits = await chainGrpcGovApi.fetchProposalDeposits({
  proposalId,
  pagination /* optional pagination param */
})

console.log(proposalDeposits)
```

### Fetch proposal votes based on a proposal's id

```ts
import { PaginationOption, ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123

const proposalVotes = await chainGrpcGovApi.fetchProposalVotes({
  proposalId,
  pagination: /* optional pagination Options */
})

console.log(proposalVotes)
```

### Fetch proposal tally based on a proposal's id

```ts
import { PaginationOption, ChainGrpcGovApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

const endpoints = getNetworkEndpoints(Network.Testnet)
const chainGrpcGovApi = new ChainGrpcGovApi(endpoints.grpc)

const proposalId = 123
const pagination = {...} as PaginationOption

const proposalTally = await chainGrpcGovApi.fetchProposalTally({
  proposalId,
  pagination /* optional pagination Options */
})

console.log(proposalTally)
```
