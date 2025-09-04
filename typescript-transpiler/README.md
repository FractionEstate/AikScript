# TypeScript-to-Aiken Development Copilot

A powerful development tool that allows TypeScript developers to write Cardano smart contracts using familiar syntax, while leveraging Aiken's proven compilation pipeline and performance characteristics.

## Features

- **TypeScript DSL**: Write smart contracts in TypeScript with decorators
- **Automatic Transpilation**: Convert TypeScript to optimized Aiken code
- **CLI Tool**: Command-line interface for compilation and development
- **VS Code Integration**: Planned extension for enhanced developer experience
- **Testing Framework**: Built-in testing utilities for smart contracts

## Installation

```bash
npm install -g typescript-aiken-copilot
```

## Quick Start

1. Initialize a new project:
```bash
ts-aiken init my-cardano-project
cd my-cardano-project
```

2. Create your first smart contract:
```typescript
// src/contracts/TimeLock.ts
import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'typescript-aiken-copilot';

@contract("TimeLock")
export class TimeLockContract {
  @datum
  interface LockDatum {
    lockUntil: POSIXTime;
    owner: PubKeyHash;
    beneficiary: PubKeyHash;
  }

  @validator("spend")
  unlock(datum: LockDatum, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    return tx.isSignedBy(datum.owner) ||
           (tx.isSignedBy(datum.beneficiary) && now > datum.lockUntil);
  }
}
```

3. Compile to Aiken:
```bash
ts-aiken compile src/ --output validators/
```

## Project Structure

```
my-cardano-project/
├── src/
│   ├── contracts/     # Smart contract definitions
│   ├── types/         # Custom type definitions
│   └── tests/         # Test files
├── validators/        # Generated Aiken files
├── package.json
├── tsconfig.json
└── aiken.toml        # Aiken project configuration
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

## License

MIT
