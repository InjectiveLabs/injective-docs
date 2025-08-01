# Setting up the keyring

{% hint style="info" %}
This document describes how to configure and use the keyring and its various backends for an Injective node. `injectived` should be installed prior to setting up the keyring. See the [Install `injectived` page](../developers/injectived/install.md) for more information.
{% endhint %}

The keyring holds the private/public keypairs used to interact with the node. For instance, a validator key needs to be set up before running the Injective node, so that blocks can be correctly signed. The private key can be stored in different locations, called "backends", such as a file or the operating system's own key storage.

### Available backends for the keyring

#### The `os` backend

The `os` backend relies on operating system-specific defaults to handle key storage securely. Typically, an operating system's credential sub-system handles password prompts, private keys storage, and user sessions according to the user's password policies. Here is a list of the most popular operating systems and their respective passwords manager:

* macOS (since Mac OS 8.6): [Keychain](https://support.apple.com/en-gb/guide/keychain-access/welcome/mac)
* Windows: [Credentials Management API](https://docs.microsoft.com/en-us/windows/win32/secauthn/credentials-management)
* GNU/Linux:
  * [libsecret](https://gitlab.gnome.org/GNOME/libsecret)
  * [kwallet](https://api.kde.org/frameworks/kwallet/html/index.html)

GNU/Linux distributions that use GNOME as default desktop environment typically come with [Seahorse](https://wiki.gnome.org/Apps/Seahorse). Users of KDE based distributions are commonly provided with [KDE Wallet Manager](https://userbase.kde.org/KDE_Wallet_Manager). Whilst the former is in fact a `libsecret` convenient frontend, the latter is a `kwallet` client.

`os` is the default option since operating system's default credentials managers are designed to meet users' most common needs and provide them with a comfortable experience without compromising on security.

The recommended backends for headless environments are `file` and `pass`.

#### The `file` backend

The `file` stores the keyring encrypted within the app's configuration directory. This keyring will request a password each time it is accessed, which may occur multiple times in a single command resulting in repeated password prompts. If using bash scripts to execute commands using the `file` option you may want to utilize the following format for multiple prompts:

```bash
# assuming that KEYPASSWD is set in the environment
yes $KEYPASSWD | injectived keys add me
yes $KEYPASSWD | injectived keys show me
# start injectived with keyring-backend flag
injectived --keyring-backend=file start
```

{% hint style="info" %}
The first time you add a key to an empty keyring, you will be prompted to type the password twice.
{% endhint %}

#### The `pass` backend

The `pass` backend uses the [pass](https://www.passwordstore.org/) utility to manage on-disk encryption of keys' sensitive data and metadata. Keys are stored inside `gpg` encrypted files within app-specific directories. `pass` is available for the most popular UNIX operating systems as well as GNU/Linux distributions. Please refer to its manual page for information on how to download and install it.

{% hint style="info" %}
`pass` uses [GnuPG](https://gnupg.org/) for encryption. `gpg` automatically invokes the `gpg-agent` daemon upon execution, which handles the caching of GnuPG credentials. Please refer to `gpg-agent` man page for more information on how to configure cache parameters such as credentials TTL and passphrase expiration.
{% endhint %}

The password store must be set up prior to first use:

```sh
pass init <GPG_KEY_ID>
```

Replace `<GPG_KEY_ID>` with your GPG key ID. You can use your personal GPG key or an alternative one you may want to use specifically to encrypt the password store.

#### The `kwallet` backend

The `kwallet` backend uses `KDE Wallet Manager`, which comes installed by default on the GNU/Linux distributions that ships KDE as default desktop environment. Please refer to[ KWallet Handbook](https://docs.kde.org/stable/en/kdeutils/kwallet/index.html) for more information.

#### The `test` backend

The `test` backend is a password-less variation of the `file` backend. Keys are stored unencrypted on disk.

**Provided for testing purposes only. The `test` backend is not recommended for use in production environments**.

#### The `memory` backend

The `memory` backend stores keys in memory. The keys are immediately deleted after the program has exited.

**Provided for testing purposes only. The `memory` backend is not recommended for use in production environments**.

### Adding keys to the keyring

You can use `injectived keys` for help about the keys command and `injectived keys [command] --help` for more information about a particular subcommand.

{% hint style="info" %}
You can also enable auto-completion with the `injectived completion` command. For example, at the start of a bash session, run `. <(injectived completion)`, and all `injectived` subcommands will be auto-completed.
{% endhint %}

To create a new key in the keyring, run the `add` subcommand with a `<key_name>` argument. For the purpose of this tutorial, we will solely use the `test` backend, and call our new key `my_validator`. This key will be used in the next section.

```bash
$ injectived keys add my_validator --keyring-backend test

# Put the generated address in a variable for later use.
MY_VALIDATOR_ADDRESS=$(injectived keys show my_validator -a --keyring-backend test)
```

This command generates a new 24-word mnemonic phrase, persists it to the relevant backend, and outputs information about the keypair. If this keypair will be used to hold value-bearing tokens, be sure to write down the mnemonic phrase somewhere safe!

By default, the keyring generates a `eth_secp256k1` keypair. The keyring also supports `ed25519` keys, which may be created by passing the `--algo ed25519` flag. A keyring can of course hold both types of keys simultaneously.
