# EVM Integrations Cheat Sheet

If you have an existing EVM dApp, and are looking to build/ deploy/ integrate it on Injective Mainnet, this guide is for you!

# Network Config

- Chain ID: 1776

Reference: [EVM Network Information](https://docs.injective.network/developers-evm/network-information#injective-evm-mainnet-details)

Note: **Do not use** InEVM, as that has been deprecated.

# Explorers

Explorer GUIs

- [https://blockscout.injective.network/](https://blockscout.injective.network/) → Can only see EVM transactions
- [https://injscan.com/](https://injscan.com/) → Can see both EVM and Cosmos transactions

Explorer APIs:

- [https://blockscout-api.injective.network/api](https://blockscout-api.injective.network/api)

Reference: [EVM Network Information](https://docs.injective.network/developers-evm/network-information#injective-evm-mainnet-details)

# RPC Endpoints

- **Recommended** for integrations
	- Customisable for needs of applications
	- Customisable rate limits, and no cut off for historical data queries
	- Freemium or paid options
	- How to connect:
		- QuickNode: [Injective RPC Node Endpoints, APIs & Tools | QuickNode](https://www.quicknode.com/chains/inj)
		- ThirdWeb: [Injective | ThirdWeb](https://thirdweb.com/injective)
- **Not** recommended for integrations
	- Not customisable for needs of applications
	- Heavy rate limiting, and cut off for historical data queries
	- Free option
	- How to connect:
		- JSON-RPC Endpoint: `https://sentry.evm-rpc.injective.network/`
		- WS Endpoint: `wss://sentry.evm-ws.injective.network`

Reference: [EVM Network Information](https://docs.injective.network/developers-evm/network-information#injective-evm-mainnet-details)

Note: **Do not use** InEVM, as that has been deprecated.

# Contract Addresses

| Name | Description | Address |
|---|---|---|
|USDT| USDT (MTS)|`0x88f7F2b685F9692caf8c478f5BADF09eE9B1Cc13`|
|wETH| wrapped ETH |`0x83A15000b753AC0EeE06D2Cb41a69e76D0D5c7F7`|
|wINJ| wrapped INJ |`0x0000000088827d2d103ee2d9A6b781773AE03FfB`|
|USDC| USDC (MTS) |`0x2a25fbD67b3aE485e461fe55d9DbeF302B7D3989`|
|MultiCall|  |`0xcA11bde05977b3631167028862bE2a173976CA11`|

Please use the reference page below as the canonical source.

Reference: [EVM Network Information](https://docs.injective.network/developers-evm/network-information) 

# Bridges

[Injective Bridge](https://bridge.injective.network)

Guides:

- [How To Bridge From Ethereum To Injective Using Metamask](https://injective.com/blog/how-to-bridge-from-ethereum-to-injective-using-metamask/)
- [How To Bridge From Solana To Injective Using Phantom](https://injective.com/blog/how-to-bridge-from-solana-to-injective-using-phantom/)
- [How to Bridge To Injective Using Wormhole](https://injective.com/blog/how-to-bridge-to-injective-using-wormhole/)
- [How To Bridge From Cosmos To Injective Using Keplr](https://injective.com/blog/how-to-bridge-from-cosmos-to-injective-using-keplr/)

# Wallets

## `injectived`

Suitable for programmatic control, e.g. application/ DApp operated accounts.

Installation quick start:

```shell
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.14.1-1740773301/linux-amd64.zip
unzip linux-amd64.zip
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib
injectived version
```

More options, including installation via Docker or compiling from source, are available in the reference page below.

Reference: [injectived](https://docs.injective.network/developers/injectived) 

## MetaMask

Suitable for retail users who need to interact with EVM DApps.

Installation:

- Get browser extension from [https://metamask.io/en-GB](https://metamask.io/en-GB) for your specific browser.
- Visit [https://blockscout.injective.network/](https://blockscout.injective.network/), scroll to the bottom of the page
- Click on the “Add Injective” button: <!-- TODO img -->
## MetaMask

Suitable for retail users who need to interact with EVM DApps.

Installation:

- Get browser extension from [https://metamask.io/en-GB](https://metamask.io/en-GB) for your specific browser.
- Visit [https://blockscout.injective.network/](https://blockscout.injective.network/), scroll to the bottom of the page
- Click on the “Add Injective” button: <!-- TODO image -->
- Follow the prompts in MetaMask’s user interface

Reference: [How to Create an Injective Wallet](https://injective.com/blog/how-to-create-an-injective-wallet-2/#to-connect-to-injective-with-metamask)#metamask

## Keplr

Keplr : [https://www.keplr.app](https://www.keplr.app)

Keplr API Docs for Integration: [https://docs.keplr.app/api/intro](https://docs.keplr.app/api/intro)

# Oracles

## API3

Price feeds: [Api3 Market | Injective EVM](https://market.api3.org/injective)

## Pyth

Announcement: [Pyth Mainnet Launches on Injective](https://injective.com/blog/pyth-mainnet-launches-on-injective/) 

## Chainlink

Reference repo: [Repo with Chainlink <> Injective OCR2 integration components and oracle](https://github.com/InjectiveLabs/chainlink-injective)
