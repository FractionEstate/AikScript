# AikScript - TypeScript to Aiken Transpiler for Cardano Smart Contracts

[![Build Status](https://img.shields.io/github/workflow/status/your-username/AikScript/CI)](https://github.com/your-username/AikScript/actions)
[![Coverage](https://img.shields.io/codecov/c/github/your-username/AikScript)](https://codecov.io/gh/your-username/AikScript)
[![License](https://img.shields.io/github/license/your-username/AikScript)](https://github.com/your-username/AikScript/blob/main/LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.19.5-brightgreen)](https://nodejs.org/)

AikScript enables TypeScript developers to build Cardano smart contracts without learning Aiken syntax, while maintaining the performance benefits of the Rust-based Aiken compiler.

## 🚀 Features

- ✅ Write Cardano smart contracts using familiar TypeScript syntax
- ✅ Automatic transpilation to high-performance Aiken code
- ✅ Full TypeScript type safety and IDE support
- ✅ Comprehensive builtin function support for cryptography and data handling
- ✅ Type-safe convenience functions for math and string operations
- ✅ Production-ready build pipeline
- ✅ Complete test coverage
- ✅ **Package-based architecture** with version control
- ✅ **Scoped import system** (@aiken/*, @cardano/*)
- ✅ **Modular stdlib** implementation
- ✅ **Merkle Patricia Forestry** integration
- ✅ **Property-based testing** framework
- ✅ **Prelude utilities** for common operations

## 📋 Requirements

- Node.js >= 20.19.5
- Aiken >= 1.1.19
- pnpm >= 10.11.0 (recommended) or npm >= 10.0.0

## 🔧 Installation

```bash
# Install with pnpm (recommended)
pnpm install aikscript

# Or with npm
npm install aikscript
```

## 📝 Quick Start

### 1. Create a Basic Contract

```typescript
// MyFirstContract.ts
import {
  Bool,
  contract,
  datum,
  PubKeyHash,
  ScriptContext,
  validator
} from 'aikscript';

// Import from scoped packages
import { listPush, listMap } from '@aiken/collection';
import { blake2b_256 } from '@aiken/crypto';
import { addressFromScript } from '@cardano/address';

@contract("MyFirstContract")
export class MyFirstContract {
  @datum
  public lockDatum: any = {
    owner: null as any
  };

  @validator("spend")
  unlock(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
```

### 2. Transpile to Aiken

```bash
# Transpile a single file
aikscript transpile path/to/MyFirstContract.ts

# Transpile all contracts in a directory
aikscript transpile path/to/contracts/
```

### 3. Build with Aiken

```bash
# Navigate to output directory
cd aikscript-output

# Build with Aiken
aiken build
```

## 🏗️ Project Structure

```
AikScript/
├── typescript-transpiler/          # Main TypeScript project
│   ├── src/
│   │   ├── cli/                    # Command-line interface
│   │   ├── core/                   # Core transpiler engine
│   │   │   ├── packages/           # Version-controlled packages
│   │   │   │   ├── aiken-lang/     # Aiken ecosystem packages
│   │   │   │   │   ├── stdlib/v2.2.0/        # Core stdlib
│   │   │   │   │   ├── fuzz/v2.2.0/          # Property testing
│   │   │   │   │   ├── prelude/v1.0.0/       # Utilities
│   │   │   │   │   └── merkle-patricia-forestry/v2.1.0/
│   │   │   │   └── cardano/         # Cardano-specific packages
│   │   │   │       └── stdlib/v1.0.0/
│   │   │   ├── parser/             # TypeScript AST parsing
│   │   │   ├── transformer/        # AST transformation logic
│   │   │   ├── generator/          # Aiken code generation
│   │   │   └── types/              # Core type definitions
│   │   ├── types/                  # Type system
│   │   └── index.ts                # Main library exports
│   ├── examples/                   # Example contracts
│   ├── tests/                      # Jest test suite
│   └── ...
├── benchmarks/                     # Aiken benchmark examples
├── examples/                       # Additional examples
└── ...
```

## 🧪 Example Contracts

AikScript comes with several example contracts demonstrating various features:

- **TimeLock**: Simple time-locked funds contract
- **MultiSig**: Multi-signature wallet implementation
- **TokenVesting**: Vesting schedule for token distribution
- **NFTMinting**: NFT minting policy
- **AdvancedAuction**: Sophisticated NFT marketplace with auctions

Example of a TimeLock contract:

```typescript
@contract("TimeLock")
export class TimeLockContract {
  @datum
  public lockDatum: any = {
    lockUntil: null as any,
    owner: null as any,
    beneficiary: null as any
  };

  @validator("spend")
  unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    return tx.isSignedBy(datum.owner) ||
           (tx.isSignedBy(datum.beneficiary) && now > datum.lockUntil);
  }
}
```

## 🔍 Advanced Features

### Cryptographic Functions

```typescript
// Hashing
const hash1 = sha256(data);
const hash2 = blake2b_256(data);
const hash3 = keccak_256(data);

// Signature verification
const isValid = verifyEd25519Signature(pubKey, message, signature);
```

### Data Construction

```typescript
// Data constructors
const intData = iData(100n);
const byteData = bData(new Uint8Array([1, 2, 3]));
const constructorData = constrData(0n, [intData, byteData]);
const listData = listData([intData, byteData]);
```

### Type-Safe Operations

```typescript
// String operations
const encoded = encodeUtf8("hello");
const decoded = decodeUtf8(encoded);
const length = lengthOfByteString(encoded);

// Bitwise operations
const bitCount = countSetBits(42n);
const firstBit = findFirstSetBit(42n);
```

## 📦 Package System

AikScript features a sophisticated package management system that mirrors the Aiken ecosystem:

### Scoped Imports

```typescript
// Aiken standard library
import { listPush, listMap } from '@aiken/collection';
import { blake2b_256, sha3_256 } from '@aiken/crypto';
import { intAbs, intPow } from '@aiken/math';

// Cardano-specific functions
import { addressFromScript } from '@cardano/address';
import { valueAdd, valueSubtract } from '@cardano/assets';

// Merkle Patricia Forestry
import { mpfInsert, mpfGet } from '@aiken/merkle-patricia-forestry';

// Property-based testing
import { fuzz, property } from '@aiken/fuzz';

// Prelude utilities
import { identity, compose } from '@aiken/prelude';
```

### Version Control

Each package is version-controlled, allowing for:
- **Multiple versions** of the same package
- **Easy upgrades** and **downgrades**
- **Backward compatibility** guarantees
- **Clear dependency management**

### Package Structure

```
src/core/packages/
├── aiken-lang/           # Aiken ecosystem
│   ├── stdlib/v2.2.0/   # Core functions
│   ├── fuzz/v2.2.0/     # Property testing
│   ├── prelude/v1.0.0/  # Utilities
│   └── merkle-patricia-forestry/v2.1.0/
└── cardano/              # Cardano-specific
    └── stdlib/v1.0.0/
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/your-username/AikScript.git
cd AikScript

# Install dependencies
pnpm install

# Development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

## 📚 Documentation

For complete documentation, visit [aikscript.io/docs](https://aikscript.io/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- The Aiken team for their incredible work on the Aiken compiler
- The Cardano community for ongoing support and feedback
- All contributors who have helped make this project possible

---

Built with ❤️ for the Cardano community
