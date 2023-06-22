# Ocr

## Abstract

OCR module is to store chainlink's OCR(Off-Chain Report) info into the chain storage.

Feed configuration is managed by module admin and report move to on-chain by transmitters and observers. Transmitters and observers are rewarded in LINK token on the chain configured by governance.

While storing feed information, module provide hooks where oracle module can use for the calculation of cumulative price for futures market.

## Contents

1. [**Concepts**](01\_concepts.md)
2. [**State**](02\_state.md)
3. [**Messages**](03\_messages.md)
4. [**Proposals**](04\_proposals.md)
5. [**Begin-Block**](05\_begin\_block.md)
6. [**Hooks**](06\_hooks.md)
7. [**Events**](07\_events.md)
8. [**Parameters**](08\_params.md)
