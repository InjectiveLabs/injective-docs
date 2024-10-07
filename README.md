# 🌟 Injective Docs

[The main documentation for Injective](https://docs.injective.network)

---

## 📚 Getting Started

1. Clone the repository and install dependencies

```bash
$ git clone git@github.com:InjectiveLabs/injective-docs.git
$ cd injective-docs
$ yarn
```

2. Regenerate documentation based on the desired branches for `injective-core` and `cosmos-sdk`
   _Note: you can change the branches/tags in the `scripts/setup.sh` file_

```bash
$ yarn generate
```

You can now either run the documentation locally OR build it for deployment and deploy it to the desired hosting service.

## 📚 Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## 📚 Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 📚 Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

---

## 🔓 License

Copyright © 2021 - 2024 Injective Foundation (https://injective.com/)

<a href="https://iili.io/mNneZN.md.png"><img src="https://iili.io/mNneZN.md.png" style="width: 300px; max-width: 100%; height: auto" />

Originally released by Injective Foundation under: <br />
Apache License <br />
Version 2.0, January 2004 <br />
http://www.apache.org/licenses/

<p>&nbsp;</p>
<div align="center">
  <sub><em>Powering the future of decentralized finance.</em></sub>
</div>
