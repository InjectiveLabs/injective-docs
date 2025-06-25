# Your First Smart Contract

{% hint style="info" %}
* You can find the chain details on the [evm-developers.md](../evm-developers.md "mention") page
* You can find an example of a simple Counter contract and deployment instructions within the [injective-foundry-example](https://github.com/InjectiveLabs/injective-foundry-example).
* You can also read our general-purpose [testnet-deployment.md](guides/testnet-deployment.md "mention") guides.
{% endhint %}

Building and Deploying smart contracts on Injective should be quite simple. As your first example, we'll take a look at a simple Counter smart contract example.

1. We'll develop the smart contract,
2. Do a [testnet-deployment.md](guides/testnet-deployment.md "mention") on the Injective's EVM Testnet,
3. Query the smart contract using [Cast](https://book.getfoundry.sh/reference/cast/),
4. Send a transaction to change the smart contract state using [Cast](https://book.getfoundry.sh/reference/cast/),

## Requirements

{% hint style="info" %}
You can request EVM testnet funds from the official Testnet faucet [here](https://testnet.faucet.injective.network/).
{% endhint %}

1. The guide uses [foundry](https://book.getfoundry.sh/) for deployments. Install it by running:

```
curl -L https://foundry.paradigm.xyz | bash
```

To verify the installation:

```shell
forge --version
```

Note that the version used in this tutorial was `1.2.3-stable`. Be sure to use this version or later when following along.

2. Add Injective EVM to your `foundry.toml`

{% hint style="info" %}
If you are starting a new project from scratch:

- Create a new directory for the project
- Create a new `foundry.toml` file inside it
- Create an `src` subdirectory

```shell
mkdir my-first-smart-contract-inj
cd my-first-smart-contract-inj
touch foundry.toml
mkdir src
```
{% endhint %}

```toml
[rpc_endpoints]
injectiveEvm = "https://k8s.testnet.json-rpc.injective.network/"
```

## Development

We can build a simple **Counter** example and then do a transaction/query the smart contract state.

### Smart Contract Code

Next, create a simple Counter smart contract written in Solidity.

```shell
touch src/counter.sol
```

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Counter {
    uint256 public number;

    event ValueSet(address indexed sender, uint256 newValue);
    event UserRevert(address indexed sender, string reason);

    function setNumber(uint256 newNumber) public {
        number = newNumber;
        emit ValueSet(msg.sender, number);
    }

    function increment() public {
        number++;
        emit ValueSet(msg.sender, number);
    }

    function userRevert(string memory reason) public {
        emit UserRevert(msg.sender, reason);
        revert("user requested a revert; see event for details");
    }
}
```

### Deployment

You can read more about the process of [testnet-deployment.md](guides/testnet-deployment.md "mention") in the page referenced in the link.

### Querying the Smart Contract

#### Using Injective

```
// WiP
```

#### Using Foundry

Let's query the smart contract state using [Cast](https://book.getfoundry.sh/reference/cast/)

```bash
cast sig "function number() returns (uint256)" 0x8381f58a

cast call --rpc-url injectiveEvm {SmartContractAddress} 0x8381f58a
```

### Transactions against the Smart Contract

#### Using Injective

```
// WiP
```

#### Using Foundry

Let's make a transaction and change the smart contract state using [Cast](https://book.getfoundry.sh/reference/cast/)

```bash
cast sig "function increment()" 0xd09de08a

cast send --legacy --rpc-url injectiveEvm --private-key {YourPrivateKey} {SmartContractAddress} 0xd09de08a
```

<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>← Previous</td><td><a href="../evm-developers.md">evm-developers.md</a></td><td><a href="../evm-developers.md">evm-developers.md</a></td></tr><tr><td>Next →</td><td><a href="guides/">guides</a></td><td><a href="guides/">guides</a></td></tr></tbody></table>
