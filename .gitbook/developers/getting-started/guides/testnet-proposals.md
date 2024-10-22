# Testnet Proposals

Let's say that you want to submit a proposal on `testnet`. Because there is a short period of voting time for the proposals, we recommend lowering the deposit on the proposal to not make the proposal go into voting stage directly. Basically, it should be slightly less than `min_deposit` value.&#x20;

Once you submit the proposal, you should teach out to the team:

1. Join the [Injective Discord server](https://discord.gg/injective) and find the relevant channel.
2. Join the [Injective Developer Telegram channel](https://t.me/+8Y\_0HOFLhnRlZDU9).

Here is an example for the `GrantProviderPrivilegeProposal`

```bash
injectived tx oracle grant-provider-privilege-proposal YOUR_PROVIDER \
  YOUR_ADDRESS_HERE \
  --title="TITLE OF THE PROPOSAL" \
  --description="Registering PROVIDER as an oracle provider" \
  --chain-id=injective-888 \
  --from=local_key \
  --node=https://testnet.sentry.tm.injective.network:443 \
  --gas-prices=160000000inj \
  --gas=20000000 \
  --deposit="40000000000000000000inj" <-- use this amount
```
