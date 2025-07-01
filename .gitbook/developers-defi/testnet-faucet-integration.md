# Testnet Faucet Integration

If you want to have a testnet faucet integration within your dApp, the only thing you need to do is do a `POST` request to `` `https://jsbqfdd4yk.execute-api.us-east-1.amazonaws.com/v1/faucet` `` and pass an `{ address: inj1...}` as the body of the `POST` request. The address is then stored within the queue ,which is processed every 5 to 10 minutes.&#x20;

Here is an example code snippet:\


```typescript
import { HttpClient } from "@injectivelabs/utils"

const LAMBDA_API = "https://jsbqfdd4yk.execute-api.us-east-1.amazonaws.com/v1"
const client = new HttpClient(LAMBDA_API);

client
  .post("faucet", { address: "inj1...." })
  .then((response: any) => {
    alert("success, your address is in the queue");
  })
  .catch((e: any) => {
    alert("Something happened - " + e.message);
  })
  .finally(() => {
    //
  });
```
