# Install injectived

## Platform compatibiltiy guide

Check out this table to see which platform is supported to run `injectived` CLI:

| Platform | Pre-Built Binaries | Docker | From Source |
|----------|-------------------|--------|------------|
| macOS (M1/ARM) | ❌ | ✅ | ✅ |
| macOS (Intel) | ❌ | ✅ | ✅ |
| Windows (x86_64) | ❌ | ✅ | ❌ |
| Windows (ARM) | ❌ | ✅ | ❌ |
| Linux (x86_64) | ✅ | ✅ | ✅ |
| Linux (ARM) | ❌ | ✅ | ✅ |


## Getting started with pre-built binaries

At the moment, the only supported platform to run a pre-built `injectived` CLI is Linux x86_64. The pre-built binaries are available on the [Injective GitHub Releases page](https://github.com/InjectiveLabs/injective-chain-releases/releases).

```bash
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.14.1-1740773301/linux-amd64.zip
unzip linux-amd64.zip
```

This zip file will contain these files:

* **`injectived`** - Injective daemon also CLI
* **`peggo`** - Injective Ethereum's bridge relayer daemon
* **`libwasmvm.x86_64.so`** - the WASM virtual machine support file

Note: you do not need `peggo` for deploying and instantiating smart contracts, this is for validators.

```bash
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib
```

Confirm your version matches the output below (your output may be slightly different if a newer version is available):

```bash
injectived version

Version v1.14.1 (0fe59376dc)
Compiled at 20250302-2204 using Go go1.23.1 (amd64)
```

Continue to [Using injectived](./using-injectived.md) to learn how to use `injectived` CLI for interacting with the Injective blockchain. 

## Getting started with Docker

The following command will start a container with `injectived` CLI:

```bash
docker run -it --rm injectivelabs/injective-core:v1.14.1 injectived version

Version v1.14.1 (0fe59376d)
Compiled at 20250302-2220 using Go go1.22.11 (amd64)
```

This is compatible with most platforms and arm64 / x86_64 architectures.


Continue to [Using injectived](./using-injectived.md) to learn how to use `injectived` CLI for interacting with the Injective blockchain. 


## Getting started with source code

The following command will build `injectived` CLI from source code:

```bash
git clone https://github.com/InjectiveFoundation/injective-core.git
cd injective-core && git checkout v1.14.1
make install
```

This will install `injectived` CLI to your go path.

```bash
injectived version

Version v1.14.1 (dd7622f)
Compiled at 20250302-2230 using Go go1.24.0 (amd64)
```

(the commit hash may be different, as the open-source repository is published separately from the pre-built versions).

Continue to [Using injectived](./using-injectived.md) to learn how to use `injectived` CLI for interacting with the Injective blockchain. 

