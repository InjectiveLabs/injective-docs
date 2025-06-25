# Testnet Deployment

## Testnet permissionless contract deployment guide

This guide will walk you through deploying a smart contract on the Injective EVM Testnet network.

{% hint style="info" %}
You can request EVM testnet funds [here](https://testnet.faucet.injective.network/)
{% endhint %}

## Requirements

1. The guide uses [foundry](https://book.getfoundry.sh/) for deployments. Install it by running:

```
curl -L https://foundry.paradigm.xyz | bash
```

To verify the installation:

```
forge --version
```

2. Add Injective EVM to your `foundry.toml`

```
[rpc_endpoints]
injectiveEvm = "https://k8s.testnet.json-rpc.injective.network/"
```

## Deploying

Due to the EVM-equivalence of _Injective_, foundry commands should work as expected. The major difference is the network URL. In most cases, using `--rpc-url injectiveEvm` is sufficient.

### Navigate to your smart contract project

```
cd path/to/your/project
```

### Deploying a smart contract <a href="#deploying-a-smart-contract" id="deploying-a-smart-contract"></a>

{% hint style="info" %}
Your private key should have INJ on the Injective network. A transaction will be created which requires a gas fee. You can request EVM testnet funds [here](https://testnet.faucet.injective.network/)
{% endhint %}

This command creates a transaction, but simply displays it without submitting it to the network. Therefore the smart contract does not get deployed.

```shell
# Simulating
forge create \
  src/{YourContract}.sol:{ContractName} \
  --rpc-url injectiveEvm \
  --legacy \
  --private-key \
  {YourPrivateKey}
```

This command does the same as above, but submits it to the network. Therefore the smart contract should get deployed.

```shell
# Broadcasting
forge create \
  src/{YourContract}.sol:{ContractName} \
  --rpc-url injectiveEvm \
  --legacy \
  --private-key {YourPrivateKey} \
  --broadcast
```

Be sure to copy the address at which the smart contract was deployed, as you will need to use it in subsequent commands.


### Verifying on Blockscout

After the deployment is completed, if you visit a network explorer, such as Blockscout, and search for the address of the smart contract, you will see that it has bytecode.

However, to add more details you need to verify the contract.

```bash
forge verify-contract \
  --rpc-url injectiveEvm \
  --verifier blockscout \
  --verifier-url 'https://testnet.blockscout-api.injective.network/api/' \
  {SmartContractAddress} \
  src/{YourContract}.sol:{ContractName}
```

After that, you can navigate to the contract address in Explorer to see the code, the ABI, parsed logs, and callable methods ([example](https://k8s.testnet.evm.blockscout.injective.network/address/0x2f9f80b89ef4C9AaBcd630E62B740d6a2f3065E4)).

{% hint style="info" %}
You can read more about foundry deploying [here](https://book.getfoundry.sh/forge/deploying), or you can check other deployment options [here](https://book.getfoundry.sh/reference/forge/forge-create). You can also read more about forge verify-contract [here](https://book.getfoundry.sh/reference/forge/forge-verify-contract).
{% endhint %}

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>← Previous</td><td><a href="../../../guides/">guides</a></td><td><a href="./">.</a></td></tr><tr><td>Next →</td><td><a href="../technical-information/">technical-information</a></td><td><a href="../technical-information/">technical-information</a></td></tr></tbody></table>
