# Denom Metadata

A `denom` is how tokens are represented within the `Bank` module of Injective. These assets can be used for trading, creating new markets on the exchange module, participating in auctions, transferring to another address, etc.

One of the biggest pain points for developers and traders is getting the metadata of these `denoms`. This metadata includes `decimals`, `symbol`, `name`, etc.&#x20;

This guide shows how to fetch `denom` metadata directly from the `injective-lists` repository and map it to your `denom`. You can also use this approach to map `denoms`'s metadata for Spot and Derivative Markets.&#x20;

## Injective Lists

`injective-lists` is a public repository that holds metadata information for all tokens on Injective. It's the most up-to-date and reliable source of this particular information. You can submit your token information by creating a PR for this repo. Be sure to correctly specify the fields. In particular,  `"denom"` field (read about [token standards](../getting-started/token-standards/)) should have respective `ibc`, `peggy` and `factory` prefixes depending on the token standard.

The metadata is fetched automatically for new `denoms` on chain every 30 minutes and the `json` files are regenerated.&#x20;

You can head to the [https://github.com/InjectiveLabs/injective-lists/tree/master/json/tokens](https://github.com/InjectiveLabs/injective-lists/tree/master/json/tokens) folder and download the metadata based on the environment:

1. [Mainnet Raw JSON](https://raw.githubusercontent.com/InjectiveLabs/injective-lists/refs/heads/master/json/tokens/mainnet.json)
2. [Testnet Raw JSON](https://github.com/InjectiveLabs/injective-lists/blob/master/json/tokens/testnet.json)

Once you have the JSON, you have to map the metadata with the particular `denom`.&#x20;

The interface that this metadata information has is

```typescript
export interface Token {
  name: string
  logo: string
  symbol: string
  decimals: number
  coinGeckoId: string
  denom: string
  address: string
  tokenType: string
  tokenVerification: string
}
```

### Bank Balance

Let's say you fetch the bank balance of a particular address (as shown on the example below using TypeScript), you can easily map it to the metadata information from the JSON files above

```typescript
import { config } from "dotenv";
import {
  ChainGrpcBankApi,
  IndexerGrpcAccountPortfolioApi,
} from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

config();

/** Querying Example */
(async () => {
  const endpoints = getNetworkEndpoints(Network.MainnetSentry);
  const chainGrpcBankApi = new ChainGrpcBankApi(endpoints.grpc);

  const injectiveAddress = "inj...";
  const { balances } = chainGrpcBankApi.fetchBalances(injectiveAddress);

  console.log(bankBalances);

 const metadata = JSON.parse(await readFile("./mainnet.json", "utf8")) as {
    denom: string;
    address: string;
    decimals: string;
    logo: string;
    name: string;
    tokenType: string;
    coinGeckoId: string
  }[];
  const balances = bankBalances.map((balance) => {
    const meta = metadata.find((m) => m.denom === balance.denom);

    return {
      ...balance,
      ...meta,
    };
  }
  
  console.log(balances)
})();
```

Now, your bank balance has all of the metadata information that you need (including `decimals`, `symbol`, `name`, `logo`, etc).

### Spot Market

Similar to the Bank balances, you can use the same approach to map the `denoms` within a Spot market with it's metadata.

```typescript
import { config } from "dotenv";
import { IndexerGrpcSpotApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { readFile } from "fs/promises";

config();

/** Querying Example */
(async () => {
  const endpoints = getNetworkEndpoints(Network.Testnet);
  const indexerGrpcSpotApi = new IndexerGrpcSpotApi(endpoints.indexer);

  const markets = await indexerGrpcSpotApi.fetchMarkets();

  console.log(markets);

  const metadata = JSON.parse(await readFile("./mainnet.json", "utf8")) as {
    denom: string;
    address: string;
    decimals: string;
    logo: string;
    name: string;
    tokenType: string;
    coinGeckoId: string;
  }[];
  const marketsWithMetadata = markets.map((market) => {
    const baseTokenMetadata = metadata.find(
      (m) => m.denom === market.baseDenom
    );
    const quoteTokenMetadata = metadata.find(
      (m) => m.denom === market.quoteDenom
    );

    return {
      ...market,
      baseTokenMetadata,
      quoteTokenMetadata,
    };
  });

  console.log(marketsWithMetadata);
})();
```

### Derivative Market

Similar to the Bank balances, you can use the same approach to map the `denom` within a Derivative market with it's metadata.

```typescript
import { config } from "dotenv";
import { IndexerGrpcDerivativeApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { readFile } from "fs/promises";

config();

/** Querying Example */
(async () => {
  const endpoints = getNetworkEndpoints(Network.Testnet);
  const indexerGrpcDerivativeApi = new IndexerGrpcDerivativeApi(endpoints.indexer);

  const markets = await indexerGrpcDerivativeApi.fetchMarkets();

  console.log(markets);

  const metadata = JSON.parse(await readFile("./mainnet.json", "utf8")) as {
    denom: string;
    address: string;
    decimals: string;
    logo: string;
    name: string;
    tokenType: string;
    coinGeckoId: string;
  }[];
  const marketsWithMetadata = markets.map((market) => {
    const baseTokenMetadata = metadata.find(
      (m) => m.denom === market.baseDenom
    );

    return {
      ...market,
      quoteTokenMetadata,
    };
  });

  console.log(marketsWithMetadata);
})();
```
