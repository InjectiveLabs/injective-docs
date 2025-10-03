# 🌟 Injective Docs

[The main documentation for Injective](https://docs.injective.network)

---

## 📚 Getting Started

1. Clone the repository and create your branch

```bash
$ git clone git@github.com:InjectiveLabs/injective-docs.git
$ cd injective-docs
```

2. Update your content in the `.gitbook` folder. _Note: `.gitbook/developers/modules` should not be done as it's automatically pulled from the `injective-core` repo_

3. Regenerate documentation based on the desired branches for `injective-core` and `cosmos-sdk`. _Note: you can change the branches/tags in the `scripts/setup.sh` file_

```bash
$ yarn generate
```

4. Push your branch to the docs and make a PR to `master` to reflect the changes on the main page.

## 🔓 License

Copyright © 2021 - 2025 Injective Foundation (https://injective.com/)

<a href="https://iili.io/mNneZN.md.png"><img src="https://iili.io/mNneZN.md.png" style="width: 300px; max-width: 100%; height: auto" />

Originally released by Injective Foundation under: <br />
Apache License <br />
Version 2.0, January 2004 <br />
http://www.apache.org/licenses/

<p>&nbsp;</p>
<div align="center">
  <sub><em>Powering the future of decentralized finance.</em></sub>
</div>
