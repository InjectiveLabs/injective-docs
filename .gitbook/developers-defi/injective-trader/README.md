# Injective Trader

Injective Trader is a professional-grade framework that provides a high-performance, reliable foundation for developing and deploying algorithmic trading strategies on the Injective blockchain. It bridges the gap between algorithmic trading strategies and blockchain execution, eliminating technical barriers. The framework takes care of the heavy lifting - real-time data streaming, order execution, reconnection/recovery, transaction batching, and analytics This frees up traders to focus solely on strategy development rather than blockchain complexities.

You can use it to import existing strategies or create new ones that:

* **Place orders automatically** based on your logic
* **Monitor markets 24/7** and react to price changes
* **Manage risk** with built-in limits and safety features
* **Handle multiple markets** simultaneously
* **Provide detailed logs** of all trading activity

### Core Capabilities

**Simplified Strategy Development**

* No SDK expertise required - focus purely on trading logic
* Rapid strategy deployment with minimal technical overhead
* Event-driven architecture enabling intuitive strategy implementation

**Built-in Reliability**

* Automated reconnection and recovery mechanisms
* Transaction validation before execution
* Comprehensive error handling and retry logic

**Performance Optimization**

* Intelligent transaction batching for cost reduction
* Automatic fee management and optimization
* Multi-account support for scale

**Enterprise-Ready Features**

* Complete position and PnL tracking
* Risk management capabilities
* Detailed performance analytics

{% hint style="warning" %}
Injective trader transacts assets with real value, as such security is paramount. Be sure to use the following as a security baseline, and also take further measures to protect your assets.

* **Never share private keys** or commit them to Git.
* Store secrets in a local **`.env` file** and load via environment variables.
* For extra safety, consider using [**AuthZ**](https://github.com/InjectiveLabs/injective-trader/tree/master?tab=readme-ov-file#authorization-trading-authz) to grant trading rights without exposing your main account.
{% endhint %}

## Quick Start (5 minutes)

### 1. Get Your Injective Account Ready (and Funded)

1. **Create an account** on Injective using Keplr or `injectived`.
2. If using Keplr, **export your private key** for the `.env` file.
   * _Tip: With AuthZ, you can grant limited permissions to a trading account for better security._
3. **Fund your account** with USDT by sending from another Injective address, or via [bridge.injective.network](http://bridge.injective.network/).
   * _EVM tip: You can derive your `inj` address with the TS SDK and bridge USDT from Ethereum to Injective without even setting up an Injective account._

### 2. Download and Setup

```bash
git clone https://github.com/InjectiveLabs/injective-trader.git
cd injective-trader

# Create a virtual environment (recommended)
python3 -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\Activate.ps1

pip install -r requirements.txt
pip install "injective-py==1.9"
```

_Note: `injective-trader` is not yet compatible with `injective-py` v1.11._

### 3. Configure Your Strategy

Edit the preexisting `config.yaml`:

```yaml
Exchange: Helix
ConsoleLevel: INFO
FileLevel: DEBUG

Components:
  Initializer:
    Network: mainnet
    BotName: MyBot
    MarketTickers:
      - INJ/USDT PERP
      - BTC/USDT PERP
      - ETH/USDT PERP

Strategies:
  MyMarketMaker:
    Name: "MyMarketMaker"
    Class: "SimpleStrategy"
    MarketIds:
      - "0x17ef48032..."  # INJ/USDT PERP
      - "0x4ca0f92f..."  # BTC/USDT PERP
      - "0x9b998016..."  # ETH/USDT PERP
    AccountAddresses:
      - "inj1your_account_address_here"
    TradingAccount: "inj1your_account_address_here"
    CIDPrefix: "my_mm"
    Parameters:
      OrderSize: 0.1
      MaxPosition: 1.0
      SpreadThreshold: 0.005
```

### 4. Set Your Private Key

Instead of a single `INJECTIVE_PRIVATE_KEY`, use **bot-scoped environment variables** in `.env` (matches the framework defaults):

```
# For bot named "MyBot"
MyBot_GRANTER_INJECTIVE_PRIVATE_KEY=your_granter_private_key_here
MyBot_GRANTEE_0_INJECTIVE_PRIVATE_KEY=your_first_grantee_private_key_here
```

Load them into your session:

```bash
export $(grep -v '^#' .env | xargs)
```

### 5. Run Your Strategy

```bash
python main.py MyBot config.yaml --log_path logs/my_bot.log --network mainnet
```

That's it - your bot is now live!

## IDE set up

If you are using VS code or compatible IDEs (such as Cursor), consider adding the following configuration for easy debugging.

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run MyBot (mainnet)",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/main.py",
      "console": "integratedTerminal",
      "args": ["MyBot", "config.yaml", "--log_path", "logs/strategy.log", "--network", "mainnet"],
      "envFile": "${workspaceFolder}/.env"
    },
    {
      "name": "Run MyBot (testnet, debug)",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/main.py",
      "console": "integratedTerminal",
      "args": ["MyBot", "config.yaml", "--log_path", "logs/debug.log", "--network", "testnet", "--debug"],
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

You should now be able to do **Run → Start Debugging** in your IDE.

## Next

Learn more about the [simple strategy](injective-trader-simple-strategy.md) that ships with Injective Trader, to get yourself comfortable with the codebase before diving in.
