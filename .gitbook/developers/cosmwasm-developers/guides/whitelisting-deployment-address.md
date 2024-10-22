# Whitelisting deployment address

Contract upload on Injective mainnet requires governance approval. You can read through the guide to do so in the [mainnet-deployment.md](mainnet-deployment.md "mention") guide.&#x20;

This structure has been put in place for multiple reasons:

1. Historically, the community has discovered vulnerabilities in CosmWasm whereby certain contracts could cause a chain halt. Thus, requiring approval will be inherently more secure until the language matures and stabilizes over time.
2. Governance prevents un-audited and bogus contracts from being deployed into the network ensuring that hacks and scams will occur at a lesser degree.
3. This results in a more curated experience for ecosystem users since the blockchain does not fill up with unwanted transactions and contracts.

This governance process is time-consuming for validators and the community. Injective builders additionally face a 4-day wait to roll out features, affecting developer experience and user growth.

As of the Altaris chain upgrade, it is now possible to request whitelisting your address for contract uploads.

## Submission Guidelines

To be considered for a whitelist approval, it is strongly recommended to include all the following information in the governance proposal. Validators are recommended to contact the Foundation in Discord to verify the information submitted for each proposal before voting.

1. Are the identities of the team members known to the community?
2. Has the team completed KYC/KYB with the Injective Foundation?
3. How long has the protocol been live on Injective mainnet?
4. Has the team developed applications in other ecosystems? (provide the details)

## Voting Guidelines

Users that meet these criteria will have a greater chance at receiving whitelist permissions:

1. The project has completed Injective Foundation KYC/KYB and the team members' identities are known to the community. _Exception: Anonymous developers with proven credibility and successful apps in other ecosystems._
2. The project has been live on mainnet for at least 1 month and has achieved significant TVL/usage.

## Operational Guidelines

It is strongly recommended to use a multisig or Ledger wallet for the whitelisted uploads.
