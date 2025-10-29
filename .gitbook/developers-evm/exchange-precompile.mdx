# Exchange Precompile

The Exchange Precompile is a system smart contract residing at the fixed address `0x0000000000000000000000000000000000000065`. It offers Solidity developers a gas-efficient and native pathway to interact directly with the Injective chain's exchange module. By leveraging this precompile, your smart contracts can seamlessly perform a variety of exchange-related actions, including:

* Depositing and withdrawing funds to/from subaccounts.
* Placing or cancelling spot and derivative orders.
* Querying subaccount balances and open positions.
* Managing authorization grants for other accounts or contracts.

#### Calling the Precompile: Direct vs. Proxy Access

Interacting with the Exchange Precompile can be approached in two primary ways:

**1. Direct Access (Self-Calling Contracts)**

In this mode, your smart contract interacts with the precompile on its own behalf. The contract itself is the actor performing operations on the exchange module, using its own funds and managing its own positions.

_Example:_

```
exchange.deposit(address(this), subaccountID, denom, amount);  
```

This method is straightforward and **requires no explicit authorization grant**, as the contract is inherently permissioned to manage its own resources.

**2. Proxy Access (Calling on Behalf of Another User)**

Smart contracts can also be designed to act as intermediaries, performing exchange operations on behalf of external user accounts. In this scenario, the contract calls the precompile, specifying a third-party's address as the sender or the account to be acted upon.

_Example:_

```
exchange.deposit(userAddress, subaccountID, denom, amount);  
```

For this to succeed, the smart contract (`grantee`) **must be explicitly authorized** by the user (`userAddress`, the `granter`) to perform the specified action. This authorization is managed using the `approve` and `revoke` methods provided by the precompile. **It's crucial to handle these authorizations with care to ensure user funds are secure.**

To authorize a contract to perform specific actions on your behalf:

```
exchange.approve(grantee, msgTypes, spendLimit, duration);  
```

* `grantee`: The address of the contract being authorized.
* `msgTypes`: An array of message types (e.g., `MsgCreateDerivativeLimitOrder`, `MsgDeposit`) the `grantee` is authorized to execute. Refer to `ExchangeTypes.sol` or the Injective Protocol protobuf definitions for a complete list.
* `spendLimit`: An array of `Cosmos.Coin` structs defining the maximum amount of specified tokens the `grantee` can utilize per message type or overall for the grant.
* `duration`: The time period, in seconds, for which the authorization remains valid.

To revoke a previously granted authorization:

```
exchange.revoke(grantee, msgTypes);  
```

To check if an authorization currently exists:

```
exchange.allowance(grantee, granter, msgType);  
```

#### Example: Direct Method

The `ExchangeDemo` contract below illustrates how a smart contract can use the direct access method. It performs basic exchange actions like depositing funds, withdrawing funds, creating a derivative limit order, and querying subaccount positions, all using its own subaccount and funds.

The `Exchange.sol` and `ExchangeTypes.sol` files contain the necessary interface definitions and data structures for interacting with the precompile. These are typically available in the official Injective Solidity contracts repository or can be included as dependencies in your project.

```solidity
// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.4;  
  
import "../src/Exchange.sol"; // Contains IExchangeModule interface  
import "../src/ExchangeTypes.sol"; // Contains necessary structs like DerivativeOrder  
  
contract ExchangeDemo {  
    address constant exchangeContract = 0x0000000000000000000000000000000000000065;  
    IExchangeModule exchange = IExchangeModule(exchangeContract);  
  
    /***************************************************************************  
     * Calling the precompile directly (contract acts on its own behalf)  
    ****************************************************************************/  
  
    /**  
     * @notice Deposits funds from the contract's balance into one of its exchange subaccounts.  
     * @param subaccountID The target subaccount ID (derived from the contract's address).  
     * @param denom The denomination of the asset to deposit (e.g., "inj").  
     * @param amount The quantity of the asset to deposit.  
     * @return success Boolean indicating if the deposit was successful.  
     */  
    function deposit(  
        string calldata subaccountID,  
        string calldata denom,  
        uint256 amount  
    ) external returns (bool) {  
        try exchange.deposit(address(this), subaccountID, denom, amount) returns (bool success) {  
            return success;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("Deposit error: ", reason)));  
        } catch {  
            revert("Unknown error during deposit");  
        }  
    }  
  
    /**  
     * @notice Withdraws funds from one of the contract's exchange subaccounts to its main balance.  
     * @param subaccountID The source subaccount ID.  
     * @param denom The denomination of the asset to withdraw.  
     * @param amount The quantity of the asset to withdraw.  
     * @return success Boolean indicating if the withdrawal was successful.  
     */  
    function withdraw(  
        string calldata subaccountID,  
        string calldata denom,  
        uint256 amount  
    ) external returns (bool) {  
        try exchange.withdraw(address(this), subaccountID, denom, amount) returns (bool success) {  
            return success;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("Withdraw error: ", reason)));  
        } catch {  
            revert("Unknown error during withdraw");  
        }  
    }  
  
    /**  
     * @notice Queries the derivative positions for a given subaccount of this contract.  
     * @param subaccountID The subaccount ID to query.  
     * @return positions An array of DerivativePosition structs.  
     */  
    function subaccountPositions(  
        string calldata subaccountID  
    ) external view returns (IExchangeModule.DerivativePosition[] memory positions) {  
        // Note: View functions calling precompiles might behave differently based on node configuration  
        // For on-chain state, this is fine. For off-chain queries, direct gRPC/API queries are often preferred.  
        return exchange.subaccountPositions(subaccountID);  
    }  
  
    /**  
     * @notice Creates a new derivative limit order from the contract's subaccount.  
     * @param order The DerivativeOrder struct containing order details.  
     * @return response The response struct containing details like order hash.  
     */  
    function createDerivativeLimitOrder(  
        IExchangeModule.DerivativeOrder calldata order  
    ) external returns (IExchangeModule.CreateDerivativeLimitOrderResponse memory response) {  
        try exchange.createDerivativeLimitOrder(address(this), order) returns (IExchangeModule.CreateDerivativeLimitOrderResponse memory resp) {  
            return resp;  
        } catch Error(string memory reason) {  
            revert(string(abi.encodePacked("CreateDerivativeLimitOrder error: ", reason)));  
        } catch {  
            revert("Unknown error during createDerivativeLimitOrder");  
        }  
    }  
}  
```

#### Start building

For detailed instructions on how to build, deploy, and interact with this `ExchangeDemo` smart contract, including setting up subaccounts and funding, please refer to the comprehensive demo available in our [solidity-contracts](https://github.com/InjectiveLabs/solidity-contracts/tree/master/demos/exchange) repository.

#### Conclusion

The Exchange Precompile is a powerful tool, enabling sophisticated, protocol-integrated trading logic to be embedded directly within your smart contracts on Injective. Whether your contract is managing its own portfolio or acting as a versatile trading interface for other users (via the proxy pattern with `approve` and `revoke`), this precompile offers a clean, secure, and efficient method to interact with the core exchange module using Solidity.

Remember to prioritize direct calls for self-contained contract logic and to carefully implement the proxy pattern with robust authorization when building reusable contract interfaces for the broader Injective ecosystem.

\
