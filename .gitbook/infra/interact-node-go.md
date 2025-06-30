# Interact with a node programmatically with Go

{% hint style="info" %}
The following examples are in Go, but the Python and TS SDKs can also be used to programatically interact with a node/Injective.&#x20;

* [TypeScript Examples](https://docs.ts.injective.network/core-modules)
* [Python Examples](https://github.com/InjectiveLabs/sdk-python/tree/master/examples)
{% endhint %}

The following snippet shows how to query the state using gRPC inside a Go program. The idea is to create a gRPC connection, and use the Protobuf-generated client code to query the gRPC server.

```go
import (
    "context"
    "fmt"

	"google.golang.org/grpc"

    sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx"
)

func queryState() error {
    myAddress, err := sdk.AccAddressFromBech32("inj...")
    if err != nil {
        return err
    }

    // Create a connection to the gRPC server.
    grpcConn := grpc.Dial(
        "127.0.0.1:9090", // your gRPC server address.
        grpc.WithInsecure(), // The SDK doesn't support any transport security mechanism.
    )
    defer grpcConn.Close()

    // This creates a gRPC client to query the x/bank service.
    bankClient := banktypes.NewQueryClient(grpcConn)
    bankRes, err := bankClient.Balance(
        context.Background(),
        &banktypes.QueryBalanceRequest{Address: myAddress, Denom: "inj"},
    )
    if err != nil {
        return err
    }

    fmt.Println(bankRes.GetBalance()) // Prints the account balance

    return nil
}
```

#### **Query for historical state using Go**

Querying for historical blocks is done by adding the block height metadata in the gRPC request.

```go
import (
    "context"
    "fmt"

    "google.golang.org/grpc"
    "google.golang.org/grpc/metadata"

    grpctypes "github.com/cosmos/cosmos-sdk/types/grpc"
	"github.com/cosmos/cosmos-sdk/types/tx"
)

func queryState() error {
    // --snip--

    var header metadata.MD
    bankRes, err = bankClient.Balance(
        metadata.AppendToOutgoingContext(context.Background(), grpctypes.GRPCBlockHeightHeader, "12"), // Add metadata to request
        &banktypes.QueryBalanceRequest{Address: myAddress, Denom: denom},
        grpc.Header(&header), // Retrieve header from response
    )
    if err != nil {
        return err
    }
    blockHeight = header.Get(grpctypes.GRPCBlockHeightHeader)

    fmt.Println(blockHeight) // Prints the block height (12)

    return nil
}
```

