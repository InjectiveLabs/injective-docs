# Min Quantity Tick Size

## Minimum Market Quantity Tick Size

The minimum market quantity tick size dictates the smallest increment by which an order quantity can increase or decrease. For instance, if a market has a minimum quantity tick size of **0.001**, an order submitted with a quantity of **0.0011** would be rejected because it does not align with the allowed increments.

{% hint style="info" %}
**Note:** Derivative markets share the same format for `minQuantityTickSize` between the user interface and the chain, so no formatting is required.
{% endhint %}

### Spot Market

#### Conversion from Human-Readable Format to Chain Format

Using the INJ/USDT market as an example, which has **18 base decimals** and **6 quote decimals**, the conversion to chain format is as follows:

$$\text{chainFormat} = \text{value} \times 10^{\text{baseDecimals}}$$

#### Conversion from Chain Format to Human-Readable Format

To convert back to a human-readable format:

$$\text{humanReadableFormat} = \text{value} \times 10^{-\text{baseDecimals}}$$

Also, be sure to check out our [typescript docs](https://docs.ts.injective.network/calculations/min-quantity-tick-size).
