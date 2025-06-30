# Launch a Market

{% hint style="info" %}
The prerequisite for launching a market is to [launch-a-token.md](launch-a-token.md "mention")
{% endhint %}

Launching a trading pair on Injective is quick, easy, and best of all, permissionless!&#x20;

The following tutorial assumes the pair is listed with an ERC-20 token bridged from Ethereum as the base asset, paired with INJ as the quote asset.&#x20;

For an Injective-native token, skip the bridging portion and head straight to step 6.

1. Navigate to the [Injective Bridge](http://bridge.injective.network/) to begin the process of bridging your chosen ERC-20 token from Ethereum to Injective using the Peggy bridge.

![Injective Bridge](<../.gitbook/assets/Docs - Deposit Peggy.png>)

2. Click the dropdown, scroll to the bottom, and click "add" next to the advanced tool to add a custom ERC-20 token using the token address, which you may want to verify on a trusted source like CoinGecko.

![Add Custom ERC-20 Token](<../.gitbook/assets/Docs - Deposit From.png>)

3. Copy and paste the correct contract address, and click "add."

![Add Smart Contract Address](<../.gitbook/assets/Docs - Add and Bridge ERC20.png>)

4. Now enter the desired amount of the ERC-20 token you wish to bridge, click "approve," confirm the transaction, then click "review," confirm the transaction, and wait.

![Launch trading Pair](https://docs.injective.network/assets/images/ltp4-f8f97c3328c04389962ac3deb9b137a9.png) ![Launch trading Pair](https://docs.injective.network/assets/images/ltp6-7812b6fe19b088c68b8d2a9bda8df05c.png) ![Launch trading Pair](https://docs.injective.network/assets/images/ltp7-d83a52c9fc794a2934ea8f2a5371595a.png) ![Launch trading Pair](https://docs.injective.network/assets/images/ltp8-da76aaaa5ee9f233ea47bbcb1f5b53bf.png)

5. Once the approve spend and deposit transactions are confirmed on the Ethereum blockchain, you will see the progress of the bridging transaction. Once the transaction is confirmed on Injective, your bridged ERC-20 token will be available in your Injective wallet. (Note, if you used MetaMask with the source chain, by default your bridged tokens will be sent to the inj address linked to your MetaMask. This can be changed by clicking the lock icon next to the recipient address at the beginning of step 4.)

![Bridging Completion](<../.gitbook/assets/Docs - Transaction Submitted.png>)

6. After the bridging transaction is complete, you're able to list the token permissionlessly on Injective by navigating to the [Injective Hub](http://hub.injective.network/proposal/create).

![List on Injective](<../.gitbook/assets/Docs - New Proposal.png>)

7. Choose "instant spot market launch" from the first dropdown, and specify a ticker. In this example, let's use PEPE/INJ. Now pick the base token from the dropdown. However, beware, several tokens might exist under the same ticker. Always match the correct token address. In this case, as the token was bridged using the Peggy bridge, the address will be peggy followed by the ERC-20 contract address.

![Specify Ticker](<../.gitbook/assets/Docs - Select Ticker.png>)

8. Now select the correct quote denom, in this case, inj. (Note, if you wish to pair the token with USDT, make sure to select the "correct" USDT address, which is peggy followed by the ERC-20 contract address for USDT.) Finally, specify a minimum price tick size and minimum quantity tick size. Because PEPE/INJ would trade at a fraction of a penny, the minimum ticks are set accordingly.

![Select Quote Denom](<../.gitbook/assets/Docs - Quote Denom.png>)
