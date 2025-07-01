---
description: Understanding EVM equivalence on Injective
---

# EVM Equivalence

## Injective EVM vs. Ethereum Mainnet

Injective's native EVM us a fully embedded execution environment that has been integrated into the core architecture of the chain. It is designed to be a 1:1 equivalent to Ethereum in terms of development experience.&#x20;

Native EVM on Injective supports the latest version of `geth`, ensuring that developers have access to the latest features, tooling, security patches, and improvements. In addition, Injective’s EVM enhances performance and expands capabilities, granting access to Injective's sophisticated financial infrastructure that extends beyond what’s available on Ethereum.

## Gas Fee Estimates for Transactions

<table data-full-width="false"><thead><tr><th width="131"> </th><th width="162">Gas Price Range</th><th width="121">Token Price</th><th width="234">Create ERC-4337 Account</th><th width="157">Simple Transfer</th><th>ERC-20 Transfer</th></tr></thead><tbody><tr><td>Ethereum¹</td><td>30.5 ± 10.6 gwei</td><td>$3000</td><td>$35.25 ± $12.25</td><td>$1.9215 ± $0.6678</td><td>$5.9475 ± $2.067</td></tr><tr><td>Polygon²</td><td>224 ± 108 gwei</td><td>$0.4</td><td>$0.0345 ± $0.0166</td><td>$0.0018 ± $0.0009</td><td>$0.0058 ± $0.0028</td></tr><tr><td>Optimism³</td><td>0.30 ± 0.15 gwei</td><td>$3000</td><td>$0.3467 ± $0.1733</td><td>$0.0189 ± $0.0094</td><td>$0.0585 ± $0.0292</td></tr><tr><td><p>Avalanche⁴</p><p><br></p></td><td>36.4 ± 4.5 nAVAX</td><td>$28</td><td>$0.3926 ± $0.0485</td><td>$0.0214 ± $0.0026</td><td>$0.0662 ± $0.0081</td></tr><tr><td>BnB Smart Chain⁵</td><td>7.05 ± 0.53 gwei</td><td>$600</td><td>$1.6296 ± $0.1225</td><td>$0.0888 ± $0.0066</td><td>$0.2749 ± $0.0206</td></tr><tr><td>Sei⁶</td><td>0.02 usei</td><td>$0.40</td><td>$0.0030</td><td>$0.00017</td><td>$0.0005</td></tr><tr><td><strong>Injective⁷</strong></td><td><strong>0.16 nINJ</strong></td><td><strong>$23</strong></td><td><strong>$0.0014</strong></td><td><strong>$0.00008</strong></td><td><strong>$0.0002</strong></td></tr></tbody></table>

### Note: Gas per Action <a href="#note-gas-per-action" id="note-gas-per-action"></a>

* Create Account ERC-4337: `385266`
* Simple Transfer: `21000`
* ERC-20 Token Transfer: `65000`

### Gas Price Sources

1. [Ethereum Gas Price Source](https://etherscan.io/chart/gasprice) ↩︎
2. [Polygon Gas Price Source](https://polygonscan.com/chart/gasprice) ↩︎
3. [Optimism Gas Price Source](https://optimistic.etherscan.io/chart/gasprice) ↩︎
4. [Avalanche Gas Price Source](https://snowtrace.io/chart/gasprice) ↩︎
5. [BnB Smart Chain Gas Price Source](https://bscscan.com/chart/gasprice) ↩︎
6. [Sei Gas Prices Config](https://github.com/sei-protocol/chain-registry/blob/main/gas.json) ↩︎
7. [Injective Launches Gas Compression](https://blog.injective.com/en/injective-unveils-fee-reductions-with-gas-compression/) ↩︎

## EIP-1559 Configuration

Coming soon.



<table data-card-size="large" data-view="cards" data-full-width="false"><thead><tr><th></th><th data-type="content-ref"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>← Previous</td><td><a href="network-information.md">network-information.md</a></td><td><a href="network-information.md">network-information.md</a></td></tr><tr><td>Next → </td><td><a href="multivm-token-standard.md">multivm-token-standard.md</a></td><td><a href="multivm-token-standard.md">multivm-token-standard.md</a></td></tr></tbody></table>
