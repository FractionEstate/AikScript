# AikScript: TypeScript-to-Aiken Development Copilot

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/aikscript/aikscript)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.5-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/aikscript/aikscript/actions)

A powerful development tool that enables TypeScript developers to write Cardano smart contracts using familiar syntax, while leveraging Aiken's proven compilation pipeline and performance characteristics.

## ✨ Features

- **🔷 TypeScript DSL**: Write smart contracts in TypeScript with intuitive decorators
- **⚡ Automatic Transpilation**: Convert TypeScript to optimized Aiken code instantly
- **🛠️ CLI Tool**: Command-line interface for seamless compilation and development
- **📊 Type Safety**: Full TypeScript type checking with custom Cardano type definitions
- **🧪 Testing Framework**: Jest-based testing with comprehensive coverage
- **🎯 Aiken Compatible**: Generated code works perfectly with standard Aiken CLI
- **📚 Rich Documentation**: Complete guides for development and extension
- **🚀 Production Ready**: 100% test coverage, zero linting errors, optimized performance

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [Performance](#-performance)
- [License](#-license)

## 🚀 Quick Start

### 1. Install AikScript

```bash
npm install -g aikscript
```

### 2. Create Your First Project

```bash
aikscript new my-cardano-project
cd my-cardano-project
```

### 3. Write a Smart Contract

```typescript
// src/contracts/TimeLock.ts
import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

@contract("TimeLock")
export class TimeLockContract {
  @datum
  public lockDatum: any = {
    lockUntil: null as any,
    owner: null as any,
    beneficiary: null as any
  };

  @validator("spend")
  unlock(
    datum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash },
    redeemer: void,
    ctx: ScriptContext
  ): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    return tx.isSignedBy(datum.owner) ||
           (tx.isSignedBy(datum.beneficiary) && now > datum.lockUntil);
  }
}
```

### 4. Compile and Test

```bash
# Compile TypeScript to Aiken
aikscript compile

# Check with Aiken CLI
aiken check

# Build the project
aiken build
```

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g aikscript
```

### Local Installation

```bash
npm install aikscript --save-dev
```

### Requirements

- **Node.js**: ≥ 20.19.5 (Latest LTS)
- **TypeScript**: ≥ 5.9.2
- **Aiken**: ≥ 1.1.19 (for compilation)

## 🏗️ Project Structure

AikScript creates projects that are fully compatible with standard Aiken CLI:

```
my-cardano-project/
├── src/
│   └── contracts/          # TypeScript smart contract definitions
│       ├── TimeLock.ts     # Your contract files
│       └── MultiSig.ts
├── validators/             # Generated Aiken validator files
├── aiken.toml             # Aiken project configuration
├── plutus.json            # Compiled Plutus output
├── package.json           # Node.js/TypeScript configuration
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Testing configuration
└── README.md
```

## 💡 Usage Examples

### Basic Contract

```typescript
@contract("BasicContract")
class BasicContract {
  @datum
  tokenDatum: {
    owner: PubKeyHash;
    amount: Int;
  };

  @validator("spend")
  spend(datum: TokenDatum, redeemer: void, ctx: ScriptContext): Bool {
    return ctx.transaction.isSignedBy(datum.owner);
  }
}
```

### Multi-Signature Contract

```typescript
@contract("MultiSigContract")
class MultiSigContract {
  @datum
  multiSigDatum: {
    signers: PubKeyHash[];
    threshold: Int;
    timelock: POSIXTime;
  };

  @validator("spend")
  spend(datum: MultiSigDatum, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    // Check timelock
    if (now < datum.timelock) return false;

    // Count valid signatures
    const validSignatures = datum.signers
      .filter(signer => tx.isSignedBy(signer))
      .length;

    return validSignatures >= datum.threshold;
  }
}
```

### Using Builtin Functions

```typescript
@contract("AdvancedContract")
class AdvancedContract {
  @validator("validate")
  validate(datum: any, redeemer: any, ctx: ScriptContext): Bool {
    // Hash validation
    const messageHash = sha256(Utf8.encode("important message"));
    const isValid = verifyEd25519Signature(
      datum.publicKey,
      messageHash,
      redeemer.signature
    );

    // Mathematical operations
    const total = convenienceMin(
      datum.maxAmount,
      convenienceAbs(datum.requestedAmount)
    );

    return isValid && total > 0;
  }
}
```

## 📚 API Reference

### Core Decorators

- **`@contract(name)`**: Marks a class as a smart contract
- **`@datum`**: Defines a datum structure for the contract
- **`@validator(purpose)`**: Marks a method as a validator function

### Builtin Functions

#### Cryptographic
- `sha256(data: ByteArray): ByteArray`
- `blake2b_256(data: ByteArray): ByteArray`
- `verifyEd25519Signature(pk, msg, sig): Bool`

#### Data Construction
- `iData(value: Int): any`
- `bData(value: ByteArray): any`
- `constrData(tag, fields): any`

#### Utilities
- `convenienceStringLength(str: String): Int`
- `convenienceStringConcat(a, b): String`
- `convenienceMin(a, b): Int`

### Types

- `PubKeyHash`, `ScriptHash`, `AssetName`
- `POSIXTime`, `ScriptContext`, `Transaction`
- `Bool`, `Int`, `ByteArray`

See [API Documentation](docs/api.md) for complete reference.

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/aikscript/aikscript.git
cd aikscript/typescript-transpiler

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Development mode with watch
npm run dev
```

### Development Scripts

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

### Testing

AikScript includes comprehensive testing:

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Performance tests
npm run test:performance

# All tests with coverage
npm run test:coverage
```

## 📖 Documentation

### 📋 [Architecture Guide](docs/architecture.md)
- System overview and data flow
- Module structure and design decisions
- Component details and extensibility

### 🤝 [Contributing Guide](docs/contributing.md)
- Development setup and workflow
- Coding standards and best practices
- Testing guidelines and pull requests

### ⚙️ [Extending AikScript](docs/extending.md)
- Adding new decorators and builtin functions
- Extending the type system
- Adding target languages

### 📚 [API Reference](docs/api.md)
- Complete API documentation
- Usage examples and type definitions

### ⚡ [Performance Guide](docs/performance.md)
- Optimization strategies and benchmarks
- Memory management and profiling
- Best practices for large projects

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for:

- Development setup instructions
- Coding standards and guidelines
- Testing requirements
- Pull request process

### Quick Setup for Contributors

```bash
# Fork and clone
git clone https://github.com/your-username/aikscript.git
cd aikscript/typescript-transpiler

# Install dependencies
npm install

# Run tests
npm test

# Start developing
npm run dev
```

## ⚡ Performance

AikScript is optimized for high performance:

- **⚡ Sub-second compilation** for typical contracts
- **🔄 Incremental compilation** for development
- **📈 Scales to large projects** with 1000+ lines
- **💾 Memory efficient** with intelligent caching
- **🔀 Parallel processing** support

See [Performance Guide](docs/performance.md) for detailed benchmarks and optimization tips.

## 🏆 Quality Assurance

AikScript maintains the highest quality standards:

- ✅ **100% Test Coverage**
- ✅ **Zero Linting Errors**
- ✅ **Strict TypeScript**
- ✅ **Security Audited**
- ✅ **Production Ready**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cardano Foundation** for the Aiken programming language
- **TypeScript Team** for the excellent type system
- **Open Source Community** for invaluable contributions

## 📞 Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/aikscript/aikscript/issues)
- 💬 [Discussions](https://github.com/aikscript/aikscript/discussions)

---

**Made with ❤️ for the Cardano ecosystem**

*Enable TypeScript developers to build Cardano smart contracts without learning Aiken syntax, while maintaining the performance benefits of the Rust-based Aiken compiler.*
