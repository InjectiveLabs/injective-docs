# Creating UIs

{% hint style="info" %}
More comprehensive docs about creating UIs as well as bootstraping options can be found on the [TypeScript docs](https://docs.ts.injective.network/building-dapps/dapps-examples). &#x20;
{% endhint %}

We've interacted with our contract through the Injective CLI, but this is not ideal for most dApp users. A web UI can provide a much better experience! Rather than sending transaction messages through `injectived`, we can abstract away the complexity and provide the user with two buttons—one to increment the count, and one to reset the count.

![](https://docs.injective.network/img/Counter\_website.png)

For example, see the [counter website](https://injective-simple-cosmwasm-sc.netlify.app/). A high level guide on developing the frontend using Vue and the [Injective TS SDK](https://github.com/InjectiveLabs/injective-ts/tree/master/packages/sdk-ts) can be found in the [website repo here](https://github.com/InjectiveLabs/injective-simple-sc-counter-ui/tree/master/nuxt). For a React implementation, see [here](https://github.com/InjectiveLabs/injective-simple-sc-counter-ui/tree/master/next).

Now, interacting with the contract is as simple as clicking a button and signing with MetaMask (make sure the account is set to Ethereum Goerli Testnet or you will receive a chain ID mismatch error).

![](https://docs.injective.network/img/metamask\_select\_testnet.png)

{% hint style="info" %}
You may notice that you get an "Unauthorized" error message when attempting to reset the count. This is expected behavior! Recall from the [contract logic for reset](https://docs.injective.network/develop/guides/injective-101/your-first-contract#reset) that only the contract owner is permitted to reset the count. Since you did not instantiate the exact contract that the frontend is interacting with, you don't have the required permissions to reset the count.
{% endhint %}
