# AikScript API Reference

This document provides comprehensive API documentation for AikScript, including all public interfaces, types, and usage examples.

## Table of Contents

- [Core API](#core-api)
- [Decorators](#decorators)
- [Builtin Functions](#builtin-functions)
- [Type System](#type-system)
- [CLI Interface](#cli-interface)
- [Configuration](#configuration)
- [Examples](#examples)

## Core API

### TypeScriptToAikenTranspiler

The main transpiler class that orchestrates the entire compilation process.

```typescript
import { TypeScriptToAikenTranspiler } from 'aikscript';

const transpiler = new TypeScriptToAikenTranspiler();

// Parse TypeScript source
const ast = transpiler.parse(sourceCode);

// Transform to target AST
const targetAst = transpiler.transform(ast);

// Generate target code
const output = transpiler.generate(targetAst);

// Complete compilation
const result = transpiler.compile({
  inputPath: './contracts/MyContract.ts',
  outputPath: './validators/my_contract.ak',
  target: 'aiken',
  optimization: 'production'
});
```

#### Methods

##### `parse(sourceCode: string, fileName?: string): TranspilerAST`

Parses TypeScript source code into an internal AST representation.

**Parameters:**
- `sourceCode`: The TypeScript source code to parse
- `fileName`: Optional filename for error reporting

**Returns:** `TranspilerAST` - The parsed AST representation

**Throws:** `Error` if the source code contains syntax errors

##### `transform(ast: TranspilerAST): AikenAST`

Transforms the internal AST into the target language AST.

**Parameters:**
- `ast`: The parsed AST to transform

**Returns:** `AikenAST` - The transformed AST

##### `generate(ast: AikenAST): string`

Generates target language code from the AST.

**Parameters:**
- `ast`: The AST to generate code from

**Returns:** `string` - The generated code

##### `compile(config: TranspilerConfig): CompilationResult`

Performs the complete compilation pipeline.

**Parameters:**
- `config`: Compilation configuration

**Returns:** `CompilationResult` - Compilation result with success status and output

### TranspilerConfig

Configuration interface for the transpiler.

```typescript
interface TranspilerConfig {
  inputPath: string;           // Path to input TypeScript file
  outputPath: string;          // Path to output file
  target: 'aiken' | 'plutus';  // Target language
  optimization: 'development' | 'production'; // Optimization level
  sourceMap?: boolean;         // Generate source maps
  watch?: boolean;            // Watch mode for file changes
}
```

### CompilationResult

Result interface returned by the compile method.

```typescript
interface CompilationResult {
  success: boolean;
  output?: string;
  errors?: CompilationError[];
  warnings?: CompilationWarning[];
  metadata?: {
    inputSize: number;
    outputSize: number;
    compilationTime: number;
  };
}
```

## Decorators

### @contract

Marks a class as a smart contract and specifies its name.

```typescript
@contract("MyContract")
class MyContract {
  // Contract implementation
}
```

**Parameters:**
- `name`: The name of the contract

**Applies to:** Classes

### @datum

Defines a datum structure for the contract.

```typescript
@contract("TokenContract")
class TokenContract {
  @datum
  tokenDatum: {
    owner: PubKeyHash;
    amount: Int;
    policyId: PolicyId;
  };
}
```

**Parameters:** None

**Applies to:** Class properties

### @validator

Marks a method as a validator function.

```typescript
@contract("TokenContract")
class TokenContract {
  @validator("spend")
  spend(datum: TokenDatum, redeemer: void, ctx: ScriptContext): Bool {
    // Validation logic
    return datum.owner.equals(ctx.transaction.sender);
  }
}
```

**Parameters:**
- `purpose`: The purpose of the validator ('spend', 'mint', 'withdraw', etc.)

**Applies to:** Class methods

## Builtin Functions

### Cryptographic Functions

#### `sha256(data: ByteArray): ByteArray`

Computes the SHA-256 hash of the input data.

```typescript
const hash = sha256(Utf8.encode("Hello, World!"));
```

#### `blake2b_256(data: ByteArray): ByteArray`

Computes the Blake2b-256 hash of the input data.

```typescript
const hash = blake2b_256(Utf8.encode("Hello, World!"));
```

#### `keccak_256(data: ByteArray): ByteArray`

Computes the Keccak-256 hash of the input data.

```typescript
const hash = keccak_256(Utf8.encode("Hello, World!"));
```

#### `verifyEd25519Signature(pk: PubKeyHash, msg: ByteArray, sig: ByteArray): Bool`

Verifies an Ed25519 signature.

```typescript
const isValid = verifyEd25519Signature(publicKey, message, signature);
```

### Data Construction Functions

#### `iData(value: Int): any`

Creates integer data for Plutus.

```typescript
const data = iData(42);
```

#### `bData(value: ByteArray): any`

Creates byte array data for Plutus.

```typescript
const data = bData(Utf8.encode("hello"));
```

#### `constrData(tag: Int, fields: any[]): any`

Creates constructor data for Plutus.

```typescript
const data = constrData(0, [iData(1), bData(Utf8.encode("test"))]);
```

#### `listData(items: any[]): any`

Creates list data for Plutus.

```typescript
const data = listData([iData(1), iData(2), iData(3)]);
```

### Utility Functions

#### `lengthOfByteString(bytes: ByteArray): Int`

Returns the length of a byte array.

```typescript
const len = lengthOfByteString(Utf8.encode("hello")); // Returns 5
```

#### `encodeUtf8(str: string): ByteArray`

Encodes a string to UTF-8 bytes.

```typescript
const bytes = encodeUtf8("Hello, World!");
```

#### `decodeUtf8(bytes: ByteArray): string`

Decodes UTF-8 bytes to a string.

```typescript
const str = decodeUtf8(bytes);
```

### Mathematical Functions

#### `convenienceAbs(value: Int): Int`

Returns the absolute value of an integer.

```typescript
const abs = convenienceAbs(-42); // Returns 42
```

#### `convenienceMin(a: Int, b: Int): Int`

Returns the minimum of two integers.

```typescript
const min = convenienceMin(10, 20); // Returns 10
```

#### `convenienceMax(a: Int, b: Int): Int`

Returns the maximum of two integers.

```typescript
const max = convenienceMax(10, 20); // Returns 20
```

#### `conveniencePow(base: Int, exponent: Int): Int`

Calculates base raised to the power of exponent.

```typescript
const result = conveniencePow(2, 3); // Returns 8
```

### String Functions

#### `convenienceStringLength(str: String): Int`

Returns the length of a string.

```typescript
const len = convenienceStringLength("hello"); // Returns 5
```

#### `convenienceStringConcat(a: String, b: String): String`

Concatenates two strings.

```typescript
const result = convenienceStringConcat("hello", "world"); // Returns "helloworld"
```

#### `convenienceStringContains(haystack: String, needle: String): Bool`

Checks if a string contains a substring.

```typescript
const contains = convenienceStringContains("hello world", "world"); // Returns true
```

## Type System

### Cardano-Specific Types

#### `PubKeyHash`

Represents a public key hash.

```typescript
const owner: PubKeyHash = "addr1...";
```

#### `ScriptHash`

Represents a script hash.

```typescript
const scriptHash: ScriptHash = "script1...";
```

#### `AssetName`

Represents an asset name.

```typescript
const assetName: AssetName = "MyToken";
```

#### `PolicyId`

Represents a minting policy ID.

```typescript
const policyId: PolicyId = "policy1...";
```

#### `POSIXTime`

Represents a POSIX timestamp.

```typescript
const deadline: POSIXTime = 1640995200; // 2022-01-01 00:00:00 UTC
```

#### `ScriptContext`

Represents the script execution context.

```typescript
interface ScriptContext {
  transaction: Transaction;
  purpose: ScriptPurpose;
}
```

#### `Transaction`

Represents a Cardano transaction.

```typescript
interface Transaction {
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
  validityRange: ValidityRange;
  // ... other properties
}
```

### Utility Types

#### `Bool`

Boolean type for Plutus Core.

```typescript
const isValid: Bool = true;
```

#### `Int`

Integer type for Plutus Core.

```typescript
const amount: Int = 1000000; // 1 ADA in lovelace
```

#### `ByteArray`

Byte array type for Plutus Core.

```typescript
const data: ByteArray = Utf8.encode("hello");
```

## CLI Interface

### Command Line Usage

```bash
# Compile a single file
aikscript compile MyContract.ts

# Compile with options
aikscript compile MyContract.ts --output my_contract.ak --target aiken

# Create a new project
aikscript new MyProject

# Watch mode
aikscript compile MyContract.ts --watch

# Show help
aikscript --help
```

### Commands

#### `compile [file]`

Compiles a TypeScript contract to the target language.

**Options:**
- `--output, -o`: Output file path
- `--target, -t`: Target language (aiken, plutus)
- `--watch, -w`: Watch mode for file changes
- `--source-map`: Generate source maps

#### `new [name]`

Creates a new AikScript project.

**Options:**
- `--template, -T`: Project template to use
- `--target, -t`: Target language for the project

#### `init`

Initializes AikScript in an existing project.

#### `version`

Shows the AikScript version.

### Configuration Files

#### `aikscript.json`

Project configuration file.

```json
{
  "name": "my-contract",
  "version": "1.0.0",
  "target": "aiken",
  "optimization": "production",
  "sourceMap": true,
  "contracts": [
    "src/contracts/*.ts"
  ],
  "output": {
    "directory": "validators",
    "extension": ".ak"
  }
}
```

## Configuration

### TypeScript Configuration

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "tests"
  ]
}
```

### Jest Configuration

#### `jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## Examples

### Basic Contract

```typescript
import { contract, datum, validator, PubKeyHash, ScriptContext, Bool } from 'aikscript';

@contract("BasicContract")
class BasicContract {
  @datum
  basicDatum: {
    owner: PubKeyHash;
    amount: Int;
  };

  @validator("spend")
  spend(datum: { owner: PubKeyHash; amount: Int }, redeemer: void, ctx: ScriptContext): Bool {
    return ctx.transaction.isSignedBy(datum.owner);
  }
}
```

### Token Contract

```typescript
@contract("TokenContract")
class TokenContract {
  @datum
  tokenDatum: {
    owner: PubKeyHash;
    amount: Int;
    policyId: PolicyId;
  };

  @validator("spend")
  spend(datum: TokenDatum, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;

    // Check if transaction is signed by owner
    if (!tx.isSignedBy(datum.owner)) {
      return false;
    }

    // Check if amount is preserved
    const outputAmount = tx.outputs
      .filter(output => output.address.equals(datum.owner))
      .reduce((sum, output) => sum + output.amount, 0);

    return outputAmount >= datum.amount;
  }

  @validator("mint")
  mint(datum: TokenDatum, redeemer: MintRedeemer, ctx: ScriptContext): Bool {
    // Minting policy logic
    return verifyEd25519Signature(datum.owner, tx.hash, redeemer.signature);
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
    if (now < datum.timelock) {
      return false;
    }

    // Count valid signatures
    const validSignatures = datum.signers
      .filter(signer => tx.isSignedBy(signer))
      .length;

    return validSignatures >= datum.threshold;
  }
}
```

### Vesting Contract

```typescript
@contract("VestingContract")
class VestingContract {
  @datum
  vestingDatum: {
    beneficiary: PubKeyHash;
    totalAmount: Int;
    releasedAmount: Int;
    startTime: POSIXTime;
    duration: Int; // Duration in seconds
  };

  @validator("spend")
  spend(datum: VestingDatum, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    // Only beneficiary can withdraw
    if (!tx.isSignedBy(datum.beneficiary)) {
      return false;
    }

    // Calculate vested amount
    const elapsed = now - datum.startTime;
    const vestedAmount = convenienceMin(
      datum.totalAmount,
      (datum.totalAmount * elapsed) / datum.duration
    );

    const releasableAmount = vestedAmount - datum.releasedAmount;

    // Check withdrawal amount
    const withdrawalAmount = tx.outputs
      .filter(output => output.address.equals(datum.beneficiary))
      .reduce((sum, output) => sum + output.amount, 0);

    return withdrawalAmount <= releasableAmount;
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
    const signatureValid = verifyEd25519Signature(
      datum.publicKey,
      messageHash,
      redeemer.signature
    );

    // String operations
    const combined = convenienceStringConcat(
      datum.prefix,
      datum.suffix
    );

    // Mathematical operations
    const total = convenienceMin(
      datum.maxAmount,
      convenienceAbs(datum.requestedAmount)
    );

    return signatureValid &&
           convenienceStringContains(combined, "valid") &&
           total > 0;
  }
}
```

This API reference covers the core functionality of AikScript. For more advanced usage patterns and examples, see the examples directory in the project repository.
