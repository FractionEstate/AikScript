# test-project

A Cardano smart contract project using TypeScript-to-Aiken transpiler.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Build your contracts:
```bash
npm run build
```

3. Your compiled Aiken files will be in the `validators/` directory.

## Project Structure

This project follows the standard Aiken project structure:

- `lib/` - Your smart contract definitions (TypeScript files)
- `validators/` - Generated Aiken validator files
- `aiken.toml` - Project configuration (compatible with Aiken CLI)
- `plutus.json` - Compiled Plutus output
- `package.json` - Node.js/TypeScript tooling configuration

## Usage with Aiken CLI

You can use the standard Aiken CLI commands on the generated files:

```bash
# Check the generated Aiken code
aiken check

# Build with Aiken
aiken build

# Run tests with Aiken
aiken test
```

## Development

The TypeScript files in `lib/` will be transpiled to Aiken code in `validators/`.
Use familiar TypeScript syntax and tooling while generating standard Aiken validators.
