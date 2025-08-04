# Canonical Chain Upgrades

## Verify release versions

If you would like to verify `injectived` or `peggo` version numbers via Docker,
follow the instructions in the [`verify-injective-release`](https://github.com/injective-dev/snippets-inj/tree/main/verify-injective-release) code snippet.

This is useful if you are on an operating system other than Linux,
and would like to independently verify the binaries in each release.

For example, for v1.16.1, it should produce the following output:

```text
injectived version
Version v1.16.1 (8be67e82d)
Compiled at 20250802-1910 using Go go1.23.9 (amd64)
peggo version
Version v1.16.1 (8be67e82d)
Compiled at 20250802-1913 using Go go1.23.9 (amd64)
```

Note that this contains not only the version numbers (e.g. `v.1.16.1`),
but also contains the following:

- The binary release hashes (e.g. `8be67e82d`)
- The compiled time stamp (e.g. `20250802-1910`)
- The compiler (e.g. `Go go1.23.9 (amd64)`)

You can verify that these **match** the values stated in the [Injective chain releases](https://github.com/InjectiveLabs/injective-chain-releases/releases) page on Github.

## History of Canonical Chain Upgrades

***

### Version 10002-rc1

November 8th, 2021, 14:00 UTC

Block number: [4,352,000](https://explorer.injective.network/block/4352000)

Released Artifacts: [Injective Chain 10002-rc1 release](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.1.0-1636178708)

Following [proposal #65](https://injhub.com/proposals/65)

***

### Version 10002-rc2

November 15th, 2021

Block number: [4,594,100](https://explorer.injective.network/block/4594100)

Released Artifacts: [Injective Chain 10002-rc2 release](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.1.1-1636733798)

Following [proposal #70](https://injhub.com/proposals/70)

***

### Version 10003-rc1

Thursday, December 30th, 2021

Block number: [6,159,200](https://explorer.injective.network/block/6159200)

Released Artifacts: [Mainnet-10003-rc1-1640627705](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.1.1-1640627705)

Following [proposal #93](https://injhub.com/proposals/93)

***

### Version 10004-rc1

Tuesday, January 25th, 2022

Block number: [7067700](https://explorer.injective.network/block/7067700)

Released Artifacts: [Mainnet-10004-rc1-v1.4.0-1642928125](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.4.0-1642928125)

Following [proposal #106](https://injhub.com/proposals/106)

***

### Version 10004-rc1-patch

Sunday, February 20th, 2022

Block number: [7941974](https://explorer.injective.network/block/7941974)

Released Artifacts: [Mainnet-10004-rc1-v1.4.0-1645352045](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.4.0-1645352045)

***

### Version 10005-rc1

Monday, April 11th, 2022

Block number: [9614200](https://explorer.injective.network/block/9614200)

Released Artifacts: [Mainnet-v1.5.0-1649280277](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.5.0-1649280277)

***

### Version 10006-rc1

Tuesday, July 5th, 2022

Block number: [12569420](https://explorer.injective.network/block/12569420)

Released Artifacts: [Mainnet-v1.6.0-1656650662](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.6.0-1656650662)

***

### Version 10007-rc1

Thursday, September 1st, 2022

Block number: [14731000](https://explorer.injective.network/block/14731000)

Released Artifacts: [Mainnet-v1.7.0-1661881062](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.7.0-1661881062)

***

### Version 10008 - Camelot

Monday, November 21st, 2022

Block number: [19761600](https://explorer.injective.network/block/19761600)

Released Artifacts: [Mainnet-10008-1668679102](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.8.0-1668679102)

***

### Version 10009

Tuesday, January 18th, 2022

Block number: [24204000](https://explorer.injective.network/block/24204000/)

Released Artifacts: [Mainnet-10009-1673970775](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.9.0-1673970775)

***

### v1.10

Friday, March 17th, 2023

Block number: [28864000](https://explorer.injective.network/block/28864000/)

Released Artifacts: [Mainnet-v1.10-1678709842](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.10-1678709842)

***

### v1.11

Thursday, June 1st, 2023

Block number: [34775000](https://explorer.injective.network/block/34775000/)

Released Artifacts: [v1.11-1685225746](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.11-1685225746)

***

### v1.12.0 - Volan

Thursday, January 11th, 2024

Block number: [57076000](https://explorer.injective.network/block/57076000/)

Released Artifacts: [Mainnet-v1.12.0-1704530206](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.12.0-1704530206)

***

### v1.12.1

Monday, January 22nd, 2024

Block number: n/a

Released Artifacts: [Mainnet-v1.12.1-1705909076](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.12.1-1705909076)

***

### v1.13.0 - Altaris

Thursday, August 1st, 2024

Block number: [80319200](https://explorer.injective.network/block/80319200/)

Released Artifacts: [Mainnet-v1.13.0-1722157491](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.13.0-1722157491)

***

### v1.13.2

Tuesday, August 20th, 2024

Block number: [82830000](https://explorer.injective.network/block/82830000/)

Released Artifacts: [Mainnet-v1.13.2-1723753267](https://github.com/InjectiveLabs/injective-chain-releases/releases/tag/v1.13.2-1723753267)
