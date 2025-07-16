# Indexer API

The Indexer API is a collection of microservices that serve data indexed from the Injective chain. The Injective Chain emits events when a transaction is included and there is an event listener within the Indexer API that listens for these events, processes them, and stores the data in a MongoDB. Querying the chain directly is an expensive (and less performant) API call than querying an API serving data from a MongoDB which is why the Indexer API exists.

Another benefit of using the Indexer API is streaming. MongoDB can stream updates in the collections/documents which can be quite beneficial for a nice user experience. This way we don't need to poll for the data, instead, we can subscribe for a stream and update the state of our dApp on updates broadcasted within the stream.

Finally, the Indexer API can serve historical data or processed data over a period of time (ex: for drawing charts, etc).
