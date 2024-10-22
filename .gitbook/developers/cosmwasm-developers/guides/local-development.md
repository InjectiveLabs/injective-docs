# Local Development

This guide will get you started deploying `cw20` smart contracts on a local Injective network running on your computer.&#x20;

We'll use the `cw20-base` contract from [CosmWasm's collection of specifications and contracts](https://github.com/CosmWasm/cw-plus) designed for production use on real networks. `cw20-base` is a basic implementation of a `cw20` compatible contract that can be imported in any custom contract you want to build on. It contains a straightforward but complete implementation of the cw20 spec along with all extensions. `cw20-base` can be deployed as-is or imported by other contracts.

### Prerequisites

Install Go, Rust, and other Cosmwasm dependencies by following the instructions:

1. [Go](https://docs.cosmwasm.com/docs/getting-started/installation#go)
2. [Rust](https://docs.cosmwasm.com/docs/getting-started/installation#rust)

Before starting, make sure you have [`rustup`](https://rustup.rs/) along with recent versions of `rustc` and `cargo` installed. Currently, we are testing on Rust v1.58.1+.

You also need to have the `wasm32-unknown-unknown` target installed as well as the `cargo-generate` Rust crate.

You can check versions via the following commands:

```bash
rustc --version
cargo --version
rustup target list --installed
# if wasm32 is not listed above, run this
rustup target add wasm32-unknown-unknown
# to install cargo-generate, run this
cargo install cargo-generate
```

### injectived

Make sure you have `injectived` installed locally. You can follow the [install-injectived.md](../../../toolkits/injectived/install-injectived.md "mention")guide to get `injectived` and other prerequisites running locally.&#x20;

Once you have `injectived` installed, you should also [start a local chain instance.](../../../toolkits/injectived/install-injectived.md#start-injectived)

### Compile CosmWasm Contracts

In this step, we will get all CW production template contracts and compile them using the [CosmWasm Rust Optimizer](https://github.com/CosmWasm/rust-optimizer) Docker image for compiling multiple contracts (called `workspace-optimizer`)—see [here](https://hub.docker.com/r/cosmwasm/workspace-optimizer/tags) (x86) or [here](https://hub.docker.com/r/cosmwasm/workspace-optimizer-arm64/tags) (ARM) for latest versions. This process may take a bit of time and CPU power.

```bash
git clone https://github.com/CosmWasm/cw-plus
cd cw-plus
```

Non ARM (Non-Apple silicon) devices:

```bash
docker run --rm -v "$(pwd)":/code \
--mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
cosmwasm/workspace-optimizer:0.12.12
```

Alternatively for Apple silicon devices (M1, M2, etc.) please use:

```bash
docker run --rm -v "$(pwd)":/code \
--mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
cosmwasm/workspace-optimizer-arm64:0.12.12
```

The docker script builds and optimizes all the CW contracts in the repo, with the compiled contracts located under the `artifacts` directory. Now we can deploy the `cw20_base.wasm` contract (`cw20_base-aarch64.wasm` if compiled on an ARM device).

### Upload the CosmWasm Contract to the Chain

```bash
# inside the CosmWasm/cw-plus repo 
yes 12345678 | injectived tx wasm store artifacts/cw20_base.wasm --from=genesis --chain-id="injective-1" --yes --gas-prices=500000000inj --gas=20000000
```

**Output:**

```
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: 4CFB63A47570C4CFBE8E669273B26BEF6EAFF922C07480CA42180C52219CE784
```

Then query the transaction by the `txhash` to verify the contract was indeed deployed.

```bash
injectived query tx 4CFB63A47570C4CFBE8E669273B26BEF6EAFF922C07480CA42180C52219CE784
```

**Output:**

```bash
code: 0
codespace: ""
data: 0A460A1E2F636F736D7761736D2E7761736D2E76312E4D736753746F7265436F64651224080112205F8201CF5E2D7E6C15DB11ADF03D62DDDDC92B8D4FAE98C4F3C1C37F378E15D9
events:
- attributes:
  - index: true
    key: YWNjX3NlcQ==
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204LzE=
  type: tx
- attributes:
  - index: true
    key: c2lnbmF0dXJl
    value: R29McmoxaDBtelNWN085SUNScStLbDdCVmdocDB6aU5EQ0Jwc1dFS1I1TlNXZkR2V1ZJejF0TEpGb0ZwSzlhNkFIQVdSVkZRNjExYitwSHdpY04wN1FFPQ==
  type: tx
- attributes:
  - index: true
    key: c3BlbmRlcg==
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204
  - index: true
    key: YW1vdW50
    value: MTAwMDAwMDAwMDAwMDAwMDBpbmo=
  type: coin_spent
- attributes:
  - index: true
    key: cmVjZWl2ZXI=
    value: aW5qMTd4cGZ2YWttMmFtZzk2MnlsczZmODR6M2tlbGw4YzVsNnM1eWU5
  - index: true
    key: YW1vdW50
    value: MTAwMDAwMDAwMDAwMDAwMDBpbmo=
  type: coin_received
- attributes:
  - index: true
    key: cmVjaXBpZW50
    value: aW5qMTd4cGZ2YWttMmFtZzk2MnlsczZmODR6M2tlbGw4YzVsNnM1eWU5
  - index: true
    key: c2VuZGVy
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204
  - index: true
    key: YW1vdW50
    value: MTAwMDAwMDAwMDAwMDAwMDBpbmo=
  type: transfer
- attributes:
  - index: true
    key: c2VuZGVy
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204
  type: message
- attributes:
  - index: true
    key: ZmVl
    value: MTAwMDAwMDAwMDAwMDAwMDBpbmo=
  - index: true
    key: ZmVlX3BheWVy
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204
  type: tx
- attributes:
  - index: true
    key: YWN0aW9u
    value: L2Nvc213YXNtLndhc20udjEuTXNnU3RvcmVDb2Rl
  type: message
- attributes:
  - index: true
    key: bW9kdWxl
    value: d2FzbQ==
  - index: true
    key: c2VuZGVy
    value: aW5qMTByZHN4ZGdyOGw4czBndnU4cnluaHUyMm5ueGtmeXRnNThjd204
  type: message
- attributes:
  - index: true
    key: Y29kZV9jaGVja3N1bQ==
    value: NWY4MjAxY2Y1ZTJkN2U2YzE1ZGIxMWFkZjAzZDYyZGRkZGM5MmI4ZDRmYWU5OGM0ZjNjMWMzN2YzNzhlMTVkOQ==
  - index: true
    key: Y29kZV9pZA==
    value: MQ==
  type: store_code
- attributes:
  - index: true
    key: YWNjZXNzX2NvbmZpZw==
    value: eyJwZXJtaXNzaW9uIjoiRXZlcnlib2R5IiwiYWRkcmVzcyI6IiIsImFkZHJlc3NlcyI6W119
  - index: true
    key: Y2hlY2tzdW0=
    value: Ilg0SUJ6MTR0Zm13VjJ4R3Q4RDFpM2QzSks0MVBycGpFODhIRGZ6ZU9GZGs9Ig==
  - index: true
    key: Y29kZV9pZA==
    value: IjEi
  - index: true
    key: Y3JlYXRvcg==
    value: ImluajEwcmRzeGRncjhsOHMwZ3Z1OHJ5bmh1MjJubnhrZnl0ZzU4Y3dtOCI=
  type: cosmwasm.wasm.v1.EventCodeStored
gas_used: "2158920"
gas_wanted: "20000000"
height: "47"
info: ""
logs:
- events:
  - attributes:
    - key: access_config
      value: '{"permission":"Everybody","address":"","addresses":[]}'
    - key: checksum
      value: '"X4IBz14tfmwV2xGt8D1i3d3JK41PrpjE88HDfzeOFdk="'
    - key: code_id
      value: '"1"'
    - key: creator
      value: '"inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8"'
    type: cosmwasm.wasm.v1.EventCodeStored
  - attributes:
    - key: action
      value: /cosmwasm.wasm.v1.MsgStoreCode
    - key: module
      value: wasm
    - key: sender
      value: inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8
    type: message
  - attributes:
    - key: code_checksum
      value: 5f8201cf5e2d7e6c15db11adf03d62ddddc92b8d4fae98c4f3c1c37f378e15d9
    - key: code_id
      value: "1"
    type: store_code
  log: ""
  msg_index: 0
raw_log: '[{"events":[{"type":"cosmwasm.wasm.v1.EventCodeStored","attributes":[{"key":"access_config","value":"{\"permission\":\"Everybody\",\"address\":\"\",\"addresses\":[]}"},{"key":"checksum","value":"\"X4IBz14tfmwV2xGt8D1i3d3JK41PrpjE88HDfzeOFdk=\""},{"key":"code_id","value":"\"1\""},{"key":"creator","value":"\"inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8\""}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgStoreCode"},{"key":"module","value":"wasm"},{"key":"sender","value":"inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8"}]},{"type":"store_code","attributes":[{"key":"code_checksum","value":"5f8201cf5e2d7e6c15db11adf03d62ddddc92b8d4fae98c4f3c1c37f378e15d9"},{"key":"code_id","value":"1"}]}]}]'
timestamp: "2023-03-06T15:48:30Z"
tx:
  '@type': /cosmos.tx.v1beta1.Tx
  auth_info:
    fee:
      amount:
      - amount: "10000000000000000"
        denom: inj
      gas_limit: "20000000"
      granter: ""
      payer: ""
    signer_infos:
    - mode_info:
        single:
          mode: SIGN_MODE_DIRECT
      public_key:
        '@type': /injective.crypto.v1beta1.ethsecp256k1.PubKey
        key: Ay+cc/lvd4Mn4pbgFkN87vWDaCXuXjVJYJGsdhrD09vk
      sequence: "1"
  body:
    extension_options: []
    memo: ""
    messages:
    - '@type': /cosmwasm.wasm.v1.MsgStoreCode
      instantiate_permission: null
      sender: inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8
      wasm_byte_code: YOUR_WASM_BYTE_HERE
    non_critical_extension_options: []
    timeout_height: "0"
  signatures:
  - GoLrj1h0mzSV7O9ICRq+Kl7BVghp0ziNDCBpsWEKR5NSWfDvWVIz1tLJFoFpK9a6AHAWRVFQ611b+pHwicN07QE=
txhash: 4CFB63A47570C4CFBE8E669273B26BEF6EAFF922C07480CA42180C52219CE784
```

Inspecting the output more closely, we can see the `code_id` of 1 for the contract

```bash
logs:
- events:
  - attributes:
    - key: access_config
      value: '{"permission":"Everybody","address":"","addresses":[]}'
    - key: checksum
      value: '"X4IBz14tfmwV2xGt8D1i3d3JK41PrpjE88HDfzeOFdk="'
    - key: code_id
      value: '"1"'
    - key: creator
      value: '"inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8"'
    type: cosmwasm.wasm.v1.EventCodeStored
  - attributes:
    - key: action
      value: /cosmwasm.wasm.v1.MsgStoreCode
    - key: module
      value: wasm
    - key: sender
      value: inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8
    type: message
  - attributes:
    - key: code_checksum
      value: 5f8201cf5e2d7e6c15db11adf03d62ddddc92b8d4fae98c4f3c1c37f378e15d9
    - key: code_id
      value: "1"
    type: store_code
  log: ""
  msg_index: 0
```

We’ve uploaded the contract code, but we still need to instantiate the contract.

### Instantiate the Contract

Before instantiating the contract, let's take a look at the CW-20 contract function signature for `instantiate`.

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    mut deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
```

Notably, it contains the `InstantiateMsg` parameter which contains the token name, symbol, decimals, and other details.

```rust
#[derive(Serialize, Deserialize, JsonSchema, Debug, Clone, PartialEq)]
pub struct InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub initial_balances: Vec<Cw20Coin>,
    pub mint: Option<MinterResponse>,
    pub marketing: Option<InstantiateMarketingInfo>,
}
```

The first step of instantiating the contract is to select an address to supply with our initial CW20 token allocation. In our case, we can just use the genesis address since we have the keys already set up, but feel free to generate new addresses and keys.

{% hint style="warning" %}
Make sure you have the private keys for the address you choose—you won't be able to test token transfers from the address otherwise. In addition, the chosen address must be a valid address on the chain (the address must have received funds at some point in the past) and must have balances to pay for gas when executing the contract.
{% endhint %}

To find the genesis address, run:

```bash
yes 12345678 | injectived keys show genesis
```

**Output:**

```bash
- name: genesis
  type: local
  address: inj10cfy5e6qt2zy55q2w2ux2vuq862zcyf4fmfpj3
  pubkey: '{"@type":"/injective.crypto.v1beta1.ethsecp256k1.PubKey","key":"ArtVkg9feLXjD4p6XRtWxVpvJUDhrcqk/5XYLsQI4slb"}'
  mnemonic: ""
```

Run the CLI command with `code_id` `1` along with the JSON encoded initialization arguments (with your selected address) and a label (a human-readable name for this contract in lists) to instantiate the contract:

```bash
CODE_ID=1
INIT='{"name":"Albcoin","symbol":"ALB","decimals":6,"initial_balances":[{"address":"inj10cfy5e6qt2zy55q2w2ux2vuq862zcyf4fmfpj3","amount":"69420"}],"mint":{"minter":"inj10cfy5e6qt2zy55q2w2ux2vuq862zcyf4fmfpj3"},"marketing":{}}'
yes 12345678 | injectived tx wasm instantiate $CODE_ID $INIT --label="Albcoin Token" --from=genesis --chain-id="injective-1" --yes --gas-prices=500000000inj --gas=20000000 --no-admin
```

Now the address of the instantiated contract can be obtained on [http://localhost:10337/swagger/#/Query/ContractsByCode](http://localhost:10337/swagger/#/Query/ContractsByCode)

And the contract info meta data can be obtained on [http://localhost:10337/swagger/#/Query/ContractInfo](http://localhost:10337/swagger/#/Query/ContractInfo) or by CLI query

```bash
CONTRACT=$(injectived query wasm list-contract-by-code $CODE_ID --output json | jq -r '.contracts[-1]')
injectived query wasm contract $CONTRACT
```

**Output:**

```bash
injectived query wasm contract $CONTRACT
address: inj14hj2tavq8fpesdwxxcu44rty3hh90vhujaxlnz
contract_info:
  admin: ""
  code_id: "1"
  created:
    block_height: "95"
    tx_index: "0"
  creator: inj10rdsxdgr8l8s0gvu8rynhu22nnxkfytg58cwm8
  extension: null
  ibc_port_id: ""
  label: Albcoin Token
```

### Querying the contract

The entire contract state can be queried with:

```bash
injectived query wasm contract-state all $CONTRACT
```

**Output:**

```bash
models:
- key: 000762616C616E6365696E6A31306366793565367174327A793535713277327578327675713836327A63796634666D66706A33
  value: IjY5NDIwIg==
- key: 636F6E74726163745F696E666F
  value: eyJjb250cmFjdCI6ImNyYXRlcy5pbzpjdzIwLWJhc2UiLCJ2ZXJzaW9uIjoiMS4wLjEifQ==
- key: 6D61726B6574696E675F696E666F
  value: eyJwcm9qZWN0IjpudWxsLCJkZXNjcmlwdGlvbiI6bnVsbCwibG9nbyI6bnVsbCwibWFya2V0aW5nIjpudWxsfQ==
- key: 746F6B656E5F696E666F
  value: eyJuYW1lIjoiQWxiY29pbiIsInN5bWJvbCI6IkFMQiIsImRlY2ltYWxzIjo2LCJ0b3RhbF9zdXBwbHkiOiI2OTQyMCIsIm1pbnQiOnsibWludGVyIjoiaW5qMTBjZnk1ZTZxdDJ6eTU1cTJ3MnV4MnZ1cTg2MnpjeWY0Zm1mcGozIiwiY2FwIjpudWxsfX0=
pagination:
  next_key: null
  total: "0"
```

The individual user’s token balance can also be queried with:

```bash
BALANCE_QUERY='{"balance": {"address": "inj10cfy5e6qt2zy55q2w2ux2vuq862zcyf4fmfpj3"}}'
injectived query wasm contract-state smart $CONTRACT "$BALANCE_QUERY" --output json
```

**Output:**

```bash
{"data":{"balance":"69420"}}
```

### Transferring Tokens

```bash
TRANSFER='{"transfer":{"recipient":"inj1dzqd00lfd4y4qy2pxa0dsdwzfnmsu27hgttswz","amount":"420"}}'
yes 12345678 | injectived tx wasm execute $CONTRACT "$TRANSFER" --from genesis --chain-id="injective-1" --yes --gas-prices=500000000inj --gas=20000000
```

Then confirm the balance transfer occurred successfully with:

```bash
# first address balance query
BALANCE_QUERY='{"balance": {"address": "inj10cfy5e6qt2zy55q2w2ux2vuq862zcyf4fmfpj3"}}'
injectived query wasm contract-state smart $CONTRACT "$BALANCE_QUERY" --output json
```

**Output:**

```bash
{"data":{"balance":"69000"}}
```

And confirm the recipient received the funds:

```bash
# recipient's address balance query
BALANCE_QUERY='{"balance": {"address": "inj1dzqd00lfd4y4qy2pxa0dsdwzfnmsu27hgttswz"}}'
injectived query wasm contract-state smart $CONTRACT "$BALANCE_QUERY" --output json
```

**Output:**

```bash
{"data":{"balance":"420"}}
```

## Testnet Development

Here are the main differences between a `local` and `testnet` development/deployment

* You can use our [Injective Testnet Faucet](https://testnet.faucet.injective.network) to get testnet funds to your address,
* You can use the [Injective Testnet Explorer](https://testnet.explorer.injective.network/codes/) to query your transactions and get more details,&#x20;
* When you are using `injectived` you have to specify the `testnet` rpc using the `node` flag `--node=https://testnet.sentry.tm.injective.network:443`
* Instead of using `injective-1` as a `chainId` you should use `injective-888` i.e the `chain-id` flag should now be `--chain-id="injective-888"`
* You can use the [Injective Testnet Explorer](https://testnet.explorer.injective.network/codes/) to find information about the `codeId` of the uploaded smart contracts OR find your instantiated smart contract

You can read more on the `injectived` and how to use it to query/send transactions against `testnet` [using-injectived.md](../../../toolkits/injectived/using-injectived.md "mention").
