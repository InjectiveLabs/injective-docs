# Injective List

We have moved the on-chain denoms token metadata to the [injective-list](https://github.com/InjectiveLabs/injective-lists) repository. This repository will aggregate data from several sources and produce a comprehensive token metadata master list.

Here is an example of how to integrate injective-list with the TokenFactoryStatic class:

1. Download the [Injective list JSON file](https://github.com/InjectiveLabs/injective-lists?tab=readme-ov-file#-usage) from GitHub

2. Use the `TokenStaticFactory` class from the `sdk-ts` package

```ts
import { TokenType, TokenStatic, TokenStaticFactory } from '@injectivelabs/sdk-ts'
import { tokens } from '../data/tokens.json' // json file downloaded from step 1

export const tokenStaticFactory = new TokenStaticFactory(tokens as TokenStatic[])

// After instantiating, we can start using it in our dApp
const denom = 'peggy0x...'
const token = tokenStaticFactory.toToken(denom)

console.log(token)
```

There are few edge cases that we have to consider while using the `TokenFactory`:

- If you are trying to query token metadata for a denom that doesn't exist in the [list of tokens](https://github.com/InjectiveLabs/injective-lists) the `TokenFactory` will return undefined. If so, you should follow our [CONTRIBUTION guide](https://github.com/InjectiveLabs/injective-lists/blob/master/CONTRIBUTING.md) to add the token metadata information in the package.
