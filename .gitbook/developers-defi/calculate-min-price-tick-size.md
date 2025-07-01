# Min Price Tick Size

## Minimum Market Price Tick Size

The minimum market price tick size dictates the smallest increment by which an order price can increase or decrease. For instance, if a market has a minimum price tick size of **0.001**, an order submitted with a price of **0.0011** would be rejected because it does not align with the allowed increments.

{% hint style="info" %}
**Note:** The formulas for calculating the price tick size differ between spot and derivative markets.
{% endhint %}

### Spot Market

#### Conversion from Human-Readable Format to Chain Format

Using the INJ/USDT market as an example, which has **18 base decimals** and **6 quote decimals**, the conversion to chain format is as follows:

$$\text{chainFormat} = \text{value} \times 10^{(\text{quoteDecimals} - \text{baseDecimals})}$$

#### Conversion from Chain Format to Human-Readable Format

To convert back to a human-readable format:

$$\text{humanReadableFormat} = \text{value} \times 10^{(\text{baseDecimals} - \text{quoteDecimals})}$$

### Derivative Market

#### Conversion from Human-Readable Format to Chain Format

Using the INJ/USDT perpetual market with **6 quote decimals** as an example, the conversion to chain format is:

$$\text{chainFormat} = \text{value} \times 10^{-\text{quoteDecimals}}$$

#### Conversion from Chain Format to Human-Readable Format

To convert back to a human-readable format:

$$\text{humanReadableFormat} = \text{value} \times 10^{-\text{quoteDecimals}}$$

Also, be sure to check out our [typescript docs](https://docs.ts.injective.network/calculations/min-price-tick-size).
