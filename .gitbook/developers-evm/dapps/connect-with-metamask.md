# Connect with MetaMask

## Connect MetaMask to Injective EVM Testnet

MetaMask is a browser wallet extension that lets you connect to any EVM-compatible network, including **Injective EVM**.

### How to Install MetaMask

Install the official MetaMask extension from the [MetaMask download page](https://metamask.io/download).

### Add Injective EVM Testnet to MetaMask

1. Click the **MetaMask icon** in your browser and unlock your wallet.
2. Click the **network selector** at the top (the default is _"Ethereum Mainnet"_).
3. Select **“Add Network”** or **“Add a network manually”** to open the custom network form.

#### Injective EVM Testnet Parameters

Fill in the following details:

```json
Network Name: Injective EVM Testnet
Chain ID: 1439
RPC URL: https://k8s.testnet.json-rpc.injective.network/
Currency Symbol: INJ
Block Explorer URL: https://testnet.blockscout.injective.network/blocks
```

> _Note: Block Explorer URL is optional, powered by BlockScout._

### Switch to Injective EVM Testnet

Once the network is added, use the network selector to switch to **Injective EVM Testnet**.

### Fund Your Wallet (Optional)

Need Testnet INJ? Visit the [Injective Testnet faucet](https://testnet.faucet.injective.network).

Funds will appear once included in a Testnet block.

***

### You're All Set!

MetaMask is now connected to the **Injective EVM Testnet**. You can:

* Deploy smart contracts using tools like **Foundry**, **Hardhat**, or **Remix**.
* Interact with Testnet dApps and contracts.
* Inspect transactions via the Blockscout explorer.

> **Tip:** Always double-check RPC URLs and Chain IDs - accuracy is crucial to avoid misconfiguration.

***

### Connect MetaMask via `ethers.js`

You can also connect MetaMask programmatically using [`ethers`](https://docs.ethers.org/).

#### Sample Code

```ts
import { ethers } from 'ethers';

export const INJECTIVE_EVM_PARAMS = {
  chainId: '0x59f', // 1439 in hexadecimal
  chainName: 'Injective EVM',
  rpcUrls: ['https://k8s.testnet.json-rpc.injective.network/'],
  nativeCurrency: {
    name: 'Injective',
    symbol: 'INJ',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.blockscout.injective.network/blocks'],
};

export async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask not installed!');
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [INJECTIVE_EVM_PARAMS],
    });

    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log('Connected address:', address);
    return { provider, signer, address };
  } catch (err) {
    console.error('MetaMask connection failed:', err);
  }
}
```

### Using `ethers.js` to interact with your smart contract

Sample code

[counter contract](broken-reference) ABI:

```tsx
// abi/counterAbi.ts
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "UserRevert",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newValue",
				"type": "uint256"
			}
		],
		"name": "ValueSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "number",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newNumber",
				"type": "uint256"
			}
		],
		"name": "setNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "userRevert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```

```javascript
import { ethers } from 'ethers'
import { INJECTIVE_EVM_PARAMS } from './config' // From separate file
import { counterAbi } from './abi/counterAbi'

// Replace with your deployed contract address
const contractAddress = '0xYourContractAddressHere'

async function connectAndInteract() {
  if (!window.ethereum) {
    alert('MetaMask is not installed!')
    return
  }

  // Request Injective EVM Network be added to MetaMask
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: INJECTIVE_EVM_PARAMS.chainHex,
        chainName: INJECTIVE_EVM_PARAMS.chainName,
        rpcUrls: [INJECTIVE_EVM_PARAMS.rpcUrl],
        nativeCurrency: INJECTIVE_EVM_PARAMS.nativeCurrency,
        blockExplorerUrls: [INJECTIVE_EVM_PARAMS.blockExplorer],
      },
    ],
  })

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  const userAddress = await signer.getAddress()
  console.log('Connected as:', userAddress)

  // Contract instance
  const contract = new ethers.Contract(contractAddress, counterAbi, signer)

  // Send transaction to increment
  const tx = await contract.increment()
  console.log('Transaction sent:', tx.hash)

  const receipt = await tx.wait()
  console.log('Transaction mined in block:', receipt.blockNumber)
}

connectAndInteract().catch(console.error)
```

### Using `viem` to interact with your smart contract

Sample code

```javascript
import { createWalletClient, custom, defineChain, formatEther } from 'viem'
import { INJECTIVE_EVM_PARAMS } from './config'
import { counterAbi } from './abi/counterAbi'
import { createPublicClient, http } from 'viem'

// Replace with your deployed contract address
const contractAddress = '0xYourContractAddressHere'

async function connectAndInteract() {
  if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed!')
    return
  }

  const client = createWalletClient({
    chain: INJECTIVE_EVM_PARAMS,
    transport: custom(window.ethereum),
  })

  // Create a PublicClient for reading contract state
  const publicClient = createPublicClient({
    chain: injectiveEvm,
    transport: http(),
  })

  const [account] = await client.requestAddresses()
  console.log('Connected account:', account)

  // Send transaction to increment using wallet client
  const hash = await client.writeContract({
    address: contractAddress,
    abi: counterAbi,
    functionName: 'increment',
    account,
  })

  console.log('Transaction sent with hash:', hash)
}

connectAndInteract().catch(console.error)
```
