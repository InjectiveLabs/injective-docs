# Install injectived

The easiest way to install `injectived` and Injective core is by downloading a pre-built binary for your operating system. Download the most recent Injective binaries from [the official releases repo](https://github.com/InjectiveLabs/injective-chain-releases).

```bash
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.13.2-1723753267/linux-amd64.zip
```

This zip file will contain three binaries and a virtual machine:

* **`injectived`** - Injective daemon
* **`peggo`** - Injective ERC-20 bridge relayer daemon
* **`injective-exchange`** - the Injective Exchange daemon
* **`libwasmvm.x86_64.so`** - the wasm virtual machine which is needed to execute smart contracts.

Unzip and add `injectived`, to your `/usr/bin`. Also add `libwasmvm.x86_64.so` to user library path `/usr/lib`.

Note that you do not need `injective-exchange` and `peggo` for deploying and instantiating smart contracts.

```bash
unzip linux-amd64.zip
sudo mv injectived /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib
```

Confirm your version matches the output below (your output may be slightly different if a newer version is available):

```bash
injectived version
Version v1.10.0 (bf0b93dca)
Compiled at 20230317-2113 using Go go1.19.4 (amd64)
```

## Start injectived

Once you have `injectived` installed, you can start an instance of the chain by downloading this initialization script and starting the binary

```bash
wget https://raw.githubusercontent.com/InjectiveLabs/injective-chain-releases/master/scripts/setup.sh
```

Once the `script.sh` is downloaded, run it and start the chain

```bash
./setup.sh && injectived start
```
