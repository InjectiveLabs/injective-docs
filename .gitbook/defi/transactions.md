# Transactions

When users want to interact with Injective and make state changes, they create transactions. Once the transaction is created, it requires a signature from the private key linked to the account initiating the particular state change. Following the signature, the transaction is broadcasted to Injective.

After being broadcasted and passing all validations (including signature validation, values validations, etc.), the transaction is included in a block that undergoes network approval via the consensus process.

### Messages

In simpler terms, messages are the instructions given to Injective about the desired state change. Messages are module-specific objects that trigger state transitions within the scope of the module they belong to. Every transaction must have at least one message.

**Additionally, multiple messages can be packed within the same transaction.** Available Messages from each module can be found in the [modules](../../developers/modules/ "mention")section.&#x20;

### Transaction Context

Besides Messages, every transaction has a context. The context includes `fees`, `accountDetails`, `memo`, `signatures`, etc.

### Transaction Flow <a href="#transaction-flow" id="transaction-flow"></a>

Every transaction we want to broadcast to Injective has the same flow. The flow consists of three steps: preparing, signing, and broadcasting the transaction. When the transaction is included in a block, the state change that was specified using the Message is applied on Injective.&#x20;
