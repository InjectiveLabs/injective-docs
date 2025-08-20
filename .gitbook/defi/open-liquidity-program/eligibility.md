---
description: How to Qualify and Remain Qualified for OLP Rewards
---

# Eligibility

## Clean Slate Qualification

An Injective address can qualify for OLP by meeting the following criteria:

* The **address must be opted out of the Trade & Earn (T\&E) program** prior to the start of the qualification process. The address will not earn T\&E rewards during the qualification process. See examples in [Python](https://github.com/InjectiveLabs/sdk-python/blob/master/examples/chain\_client/24\_MsgRewardsOptOut.py), [Go](https://github.com/InjectiveLabs/sdk-go/blob/master/examples/chain/24\_MsgRegisterAsDMM/example.go), and [TS](https://github.com/InjectiveLabs/injective-ts/wiki/04CoreModulesExchange#msgrewardsoptout) for opting out programatically.
  * Note: Eligibility for the qualification process begins at 00:00 UTC the day after the opt out is complete. To check if an address has been successfully opted out of T\&E, [this list can be cross referenced](https://lcd.injective.network/injective/exchange/v1beta1/opted\_out\_of\_rewards\_accounts).
* The address's maker volume must account for **at least 0.25% of the total daily exchange maker volume of** [**eligible markets**](program-details/eligible-markets.md) **for 3 days in a row** in the same epoch. Self trading is strictly prohibited.

Assuming both of these requirements have been met, the address will qualify for OLP rewards on the 4th day at 00:00 UTC. Once qualified, an address will remain eligible for rewards through the rest of the epoch unless special circumstances (e.g. abusing the system, wash trading, etc.) compel the removal of the address. Note that activity prior to qualification will not count towards rewards.

{% hint style="warning" %}
It may be prudent to consolidate trading strategies into a single address to increase maker volume. Otherwise, addresses with less maker volume than the required threshold will not qualify for rewards even if volume on an aggregate level between multiple addresses exceeds the threshold.&#x20;

See [documentation on the Injective `authz` module](https://docs.injective.network/develop/modules/Core/authz/) for a method of executing multiple strategies from a single address while retaining trading [fee discounts](https://helixapp.com/fee-discounts).
{% endhint %}

## Maintaining Next Epoch Eligibility/Pre-Qualification

To automatically qualify for the next epoch after qualifying for the current epoch, an **address must account for at least 0.25% of total exchange maker volume** of [eligible markets](program-details/eligible-markets.md) (not including KAVA reward markets) from the date of qualification to the last day of the epoch.&#x20;

* Example: Address `inj1a` enters epoch 21 ineligible for OLP rewards. `inj1a` accounts for 1%, 0.1%, and 0.2% of total daily exchange maker volume of [eligible markets](program-details/eligible-markets.md) on days 1, 2, and 3 of epoch 21, respectively. On days 4, 5, and 6, `inj1a` accounts for 0.5% of the applicable volume each day. `inj1a` qualifies on day 7 of the epoch. To maintain eligibility/qualification for epoch 22, `inj1a` must account for at least 0.25% of the cumulative applicable maker volume from day 7 through day 28 of epoch 21. If the cumulative maker volume of [eligible markets](program-details/eligible-markets.md) for this period (days 7 through 28) was $100M, then `inj1a` must account for $250,000 of cumulative maker volume in those markets within the same period.

If the address was eligible for the entire epoch through a previous epoch's pre-qualification, that address must account for at least 0.25% of the maker volume of [eligible markets](program-details/eligible-markets.md) in the entire epoch.&#x20;

* Example: Address `inj1a` enters epoch 22 prequalified from maintaining eligibility in epoch 21. Suppose the cumulative maker volume of [eligible markets](program-details/eligible-markets.md) in epoch 22 totals $200M. Then `inj1a` must contribute at least $500,000 of the $200M in [eligible markets](program-details/eligible-markets.md) by the end of epoch 22 to maintain automatic eligibility for epoch 23.

## Disqualification

**Any address that fails to account for at least 0.25% of applicable maker volume in an epoch will be disqualified from OLP at the start of the next epoch**. If the address wishes to rejoin the program, the address must go through the [clean slate qualification process](eligibility.md#clean-slate-qualification) again (though the address does not have to opt out of T\&E another time). Note that any liquidity contributed on days that the address is not eligible will not be rewarded retroactively once the address requalifies.

{% hint style="info" %}
Disqualification occurs at the end of each epoch, meaning addresses continue to accrue rewards within the epoch regardless of next epoch eligibility.
{% endhint %}

## Tracking Eligibility

The [OLP dashboard](https://trading.injective.network/program/liquidity/eligibility) can be used to track current and future epoch reward eligibility.

{% embed url="https://trading.injective.network/program/liquidity/eligibility" %}
