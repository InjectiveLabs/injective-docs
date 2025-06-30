# Interact with a node using REST Endpoints

All gRPC services on the Cosmos SDK are made available for more convenient REST-based queries through gRPC-gateway. The format of the URL path is based on the Protobuf service method's full-qualified name, but may contain small customizations so that final URLs look more idiomatic. For example, the REST endpoint for the `cosmos.bank.v1beta1.Query/AllBalances` method is `GET /cosmos/bank/v1beta1/balances/{address}`. Request arguments are passed as query parameters.

The following examples assume you are using REST Endpoints to interact with your node in your local private network. You can change the domain to public networks.

As a concrete example, the `curl` command to make balances request is:

```bash
curl \
    -X GET \
    -H "Content-Type: application/json" \
    http://localhost:1317/cosmos/bank/v1beta1/balances/$MY_VALIDATOR
```

Make sure to replace `localhost:1317` with the REST endpoint of your node, configured under the `api.address` field.

The list of all available REST endpoints is available as a Swagger specification file; it can be viewed at `localhost:1317/swagger`. Make sure that the `api.swagger` field is set to true in your `app.toml` file.

#### Query for historical state using REST

Querying for historical state is done using the HTTP header `x-cosmos-block-height`. For example, a curl command would look like:

```bash
curl \
    -X GET \
    -H "Content-Type: application/json" \
    -H "x-cosmos-block-height: 279256"
    http://localhost:1317/cosmos/bank/v1beta1/balances/$MY_VALIDATOR
```

Assuming the state at that block has not yet been pruned by the node, this query should return a non-empty response.

## Cross-Origin Resource Sharing (CORS)

[CORS policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) are not enabled by default to help with security. If you would like to use the rest-server in a public environment we recommend you provide a reverse proxy, this can be done with [nginx](https://www.nginx.com/). For testing and development purposes, there is an `enabled-unsafe-cors` field inside `app.toml`.

## Sending Transactions

Sending transactions using gRPC and REST requires some additional steps: generating the transaction, signing it, and finally broadcasting it.&#x20;

You can learn more in [transactions](../defi/transactions.md "mention").&#x20;
