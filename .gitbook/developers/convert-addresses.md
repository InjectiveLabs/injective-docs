# Convert addresses

Within this document, we'll outline some examples on how to convert addresses between different formats and derivation paths.

### Convert Hex <> Bech32 address

As we've mentioned in the [wallet](../defi/wallet/README.md "mention") section, Injective addresses are compatible with Ethereum addresses. You can convert between the two formats easily.

### Using TypeScript

You can easily convert between an Injective address and Ethereum address by using our utility functions in the `@injectivelabs/sdk-ts` package:

```typescript
import { getInjectiveAddress, getEthereumAddress } from '@injectivelabs/sdk-ts'

const injectiveAddress = 'inj1...'
const ethereumAddress = '0x..'

console.log('Injective address from Ethereum address => ', getInjectiveAddress(ethereumAddress))
console.log('Ethereum address from Injective address => ', getEthereumAddress(injectiveAddress))
```

### **Convert Cosmos address to Injective Address**

As Injective has a different derivation path than the default Cosmos one, you need the `publicKey` of the account to convert a Cosmos `publicAddress` to Injective one.

### Using TypeScript

```typescript
import { config } from "dotenv";
import { ChainRestAuthApi, PublicKey } from "@injectivelabs/sdk-ts";

config();

(async () => {
  const chainApi = new ChainRestAuthApi(
    "https://rest.cosmos.directory/cosmoshub"
  );

  const cosmosAddress = "cosmos1..";
  const account = await chainApi.fetchCosmosAccount(cosmosAddress);

  if (!account.pub_key?.key) {
    console.log("No public key found");
    return;
  }

  console.log(
    "injectiveAddress",
    PublicKey.fromBase64(account.pub_key.key || "")
      .toAddress()
      .toBech32()
  );
})();
```

{% hint style="info" %}
More examples can be found in [wallet accounts](../defi/wallet/accounts.md).
{% endhint %}
