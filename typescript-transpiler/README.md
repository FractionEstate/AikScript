# AikScript: TypeScript-to-Aiken Development Copilot

A powerful development tool that allows TypeScript developers to write Cardano smart contracts using familiar syntax, while leveraging Aiken's proven compilation pipeline and performance characteristics.

## Features

- **TypeScript DSL**: Write smart contracts in TypeScript with decorators
- **Automatic Transpilation**: Convert TypeScript to optimized Aiken code
- **CLI Tool**: Command-line interface for compilation and development
- **VS Code Integration**: Planned extension for enhanced developer experience
- **Testing Framework**: Built-in testing utilities for smart contracts
- **Aiken Compatible**: Generated code works seamlessly with standard Aiken CLI

## Installation

```bash
npm install -g aikscript
```

## Quick Start

1. Initialize a new project:
```bash
aikscript init my-cardano-project
cd my-cardano-project
```

2. Create your first smart contract:
```typescript
// lib/main.ts
import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

@contract("TimeLock")
export class TimeLockContract {
  @datum
  public datum: any = {
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

3. Compile to Aiken:
```bash
aikscript compile lib/
```

## Project Structure

AikScript creates projects that are fully compatible with standard Aiken CLI:

```
my-cardano-project/
├── lib/              # TypeScript smart contract definitions
├── validators/       # Generated Aiken validator files
├── aiken.toml        # Aiken project configuration
├── plutus.json       # Compiled Plutus output
├── package.json      # Node.js/TypeScript tooling
├── tsconfig.json     # TypeScript configuration
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Build the project (TypeScript → Aiken)
npm run build

# Run tests
npm test

# Development mode with watch
npm run dev
```

## Aiken CLI Compatibility

Generated AikScript projects work seamlessly with standard Aiken CLI:

```bash
# Check the generated Aiken code
aiken check

# Build with Aiken
aiken build

# Run Aiken tests
aiken test
```

## License

MIT
