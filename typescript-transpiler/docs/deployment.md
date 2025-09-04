# 🚀 AikScript Deployment Guide

This guide covers deploying AikScript projects to Cardano mainnet and testnet environments.

## Prerequisites

- ✅ AikScript CLI installed (`npm install -g aikscript`)
- ✅ Aiken CLI installed (for final compilation)
- ✅ Cardano CLI installed (for deployment)
- ✅ Test ADA on testnet (for testing)
- ✅ Mainnet ADA (for production deployment)

## Quick Deployment Workflow

### 1. Develop Your Contract

```bash
# Create new project
aikscript new my-project
cd my-project

# Write your contract in TypeScript
# Edit typescript/validators/MyContract.ts

# Compile to Aiken
aikscript build
```

### 2. Test on Testnet

```bash
# Switch to testnet
export CARDANO_NODE_SOCKET_PATH=/path/to/testnet/socket
export MAGIC=testnet

# Build with Aiken
aiken build

# Test your contract
aiken check
```

### 3. Deploy to Testnet

```bash
# Create deployment script
cardano-cli transaction build \
  --tx-in $UTXO \
  --tx-out $SCRIPT_ADDRESS+$MIN_ADA \
  --tx-out-datum-hash $DATUM_HASH \
  --change-address $CHANGE_ADDR \
  --out-file tx.raw

# Sign and submit
cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file payment.skey \
  --out-file tx.signed

cardano-cli transaction submit \
  --tx-file tx.signed
```

## Project Structure for Deployment

```
my-project/
├── typescript/
│   ├── lib/           # Utility functions
│   └── validators/    # Smart contracts
├── validators/        # Generated Aiken files
├── plutus.json        # Contract metadata
├── aiken.toml         # Aiken configuration
└── deployment/        # Deployment scripts
    ├── testnet/
    │   ├── deploy.sh
    │   └── test-data.json
    └── mainnet/
        ├── deploy.sh
        └── parameters.json
```

## Environment Setup

### Testnet Configuration

```bash
# Testnet environment variables
export CARDANO_NODE_SOCKET_PATH=/path/to/testnet/node.socket
export MAGIC=1097911063
export NETWORK=testnet
```

### Mainnet Configuration

```bash
# Mainnet environment variables
export CARDANO_NODE_SOCKET_PATH=/path/to/mainnet/node.socket
export MAGIC=mainnet
export NETWORK=mainnet
```

## Deployment Scripts

### Automated Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

# Configuration
NETWORK=${NETWORK:-testnet}
SCRIPT_NAME=${SCRIPT_NAME:-MyContract}

echo "🚀 Deploying $SCRIPT_NAME to $NETWORK"

# Build contracts
aikscript build
aiken build

# Get script address
SCRIPT_ADDRESS=$(cardano-cli address build \
  --payment-script-file plutus.json \
  --network-magic $MAGIC)

echo "📍 Script Address: $SCRIPT_ADDRESS"

# Get UTXO for funding
UTXO=$(cardano-cli query utxo \
  --address $WALLET_ADDR \
  --network-magic $MAGIC \
  | head -n 2 | tail -n 1 | awk '{print $1"#"$2}')

# Build transaction
cardano-cli transaction build \
  --tx-in $UTXO \
  --tx-out $SCRIPT_ADDRESS+$MIN_ADA \
  --tx-out-datum-hash $DATUM_HASH \
  --change-address $WALLET_ADDR \
  --network-magic $MAGIC \
  --out-file tx.raw

# Sign and submit
cardano-cli transaction sign \
  --tx-body-file tx.raw \
  --signing-key-file wallet.skey \
  --network-magic $MAGIC \
  --out-file tx.signed

TX_ID=$(cardano-cli transaction submit \
  --tx-file tx.signed \
  --network-magic $MAGIC)

echo "✅ Deployment successful!"
echo "🔗 Transaction ID: $TX_ID"
echo "📍 Script Address: $SCRIPT_ADDRESS"
```

## Testing Deployed Contracts

### Unit Testing

```typescript
// tests/MyContract.test.ts
import { MyContract } from '../typescript/validators/MyContract';

describe('MyContract', () => {
  test('should validate correct conditions', () => {
    // Test contract logic
  });
});
```

### Integration Testing

```bash
# Run integration tests
npm run test:integration

# Test on testnet
npm run test:testnet
```

## Monitoring and Maintenance

### Contract Monitoring

```bash
# Check contract status
cardano-cli query utxo \
  --address $SCRIPT_ADDRESS \
  --network-magic $MAGIC

# Monitor transactions
cardano-cli query tip --network-magic $MAGIC
```

### Updates and Upgrades

```bash
# For contract upgrades:
# 1. Deploy new contract version
# 2. Migrate existing UTXOs
# 3. Update frontend/backends
# 4. Announce to users
```

## Security Considerations

### Pre-Deployment Checklist

- ✅ **Audit Code**: Review all contract logic
- ✅ **Test Coverage**: 100% test coverage achieved
- ✅ **Peer Review**: Code reviewed by multiple developers
- ✅ **Testnet Testing**: Extensive testing on testnet
- ✅ **Security Audit**: Third-party security audit completed
- ✅ **Emergency Procedures**: Have rollback plan ready

### Post-Deployment Monitoring

- 🔍 **Transaction Monitoring**: Watch for unusual activity
- 📊 **Performance Metrics**: Track gas usage and success rates
- 🚨 **Alert System**: Set up alerts for contract failures
- 📝 **Incident Response**: Document response procedures

## Troubleshooting

### Common Issues

**❌ "Script execution failed"**
- Check datum format matches contract expectations
- Verify redeemer structure
- Ensure sufficient execution units

**❌ "Insufficient funds"**
- Check minimum ADA requirements
- Verify UTXO selection
- Confirm transaction fees

**❌ "Invalid script"**
- Rebuild with latest AikScript version
- Check Aiken compilation errors
- Verify plutus.json integrity

### Getting Help

- 📖 **Documentation**: Check AikScript docs
- 💬 **Community**: Join Cardano developer forums
- 🐛 **Bug Reports**: Submit issues on GitHub
- 💡 **Support**: Contact AikScript team

## Performance Optimization

### Gas Optimization

```typescript
// Optimize for gas efficiency
@contract("OptimizedContract")
export class OptimizedContract {
  @validator("spend")
  spend(datum: OptimizedDatum, redeemer: void, ctx: ScriptContext): Bool {
    // Use efficient algorithms
    // Minimize computational complexity
    // Optimize data structures
  }
}
```

### Batch Operations

```bash
# Batch multiple transactions
cardano-cli transaction build \
  --tx-in $UTXO1 \
  --tx-in $UTXO2 \
  --tx-out $SCRIPT_ADDR+$AMOUNT1 \
  --tx-out $SCRIPT_ADDR+$AMOUNT2 \
  --network-magic $MAGIC
```

## Success Metrics

### Deployment KPIs

- ✅ **Uptime**: 99.9% contract availability
- ✅ **Success Rate**: >95% transaction success
- ✅ **Response Time**: <5 seconds average
- ✅ **Cost Efficiency**: Optimized gas usage
- ✅ **User Adoption**: Growing user base

### Monitoring Dashboard

```bash
# Contract health check
./scripts/health-check.sh

# Performance metrics
./scripts/metrics.sh

# User analytics
./scripts/analytics.sh
```

---

## 🎯 Next Steps

1. **Complete Testing**: Run full test suite
2. **Security Audit**: Get professional audit
3. **Documentation**: Update all docs
4. **Community**: Share with Cardano community
5. **Support**: Set up user support channels

**Happy deploying! 🚀**
