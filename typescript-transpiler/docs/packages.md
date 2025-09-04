# AikScript Package System

AikScript implements a sophisticated package management system that mirrors the Aiken ecosystem, providing version-controlled, modular packages with scoped imports.

## Overview

The package system enables:

- **Version Control**: Each package has specific versions (e.g., `v2.2.0`, `v1.0.0`)
- **Scoped Imports**: Clean import syntax using `@aiken/*`, `@cardano/*` prefixes
- **Modular Architecture**: Separate packages for different functionality domains
- **Easy Maintenance**: Clear separation of concerns and dependencies
- **Aiken Compatibility**: Direct mapping to Aiken's package ecosystem

## Package Structure

```
src/core/packages/
├── aiken-lang/                    # Aiken ecosystem packages
│   ├── stdlib/v2.2.0/            # Core standard library
│   │   ├── lib/aiken/
│   │   │   ├── collection/       # List/dict operations
│   │   │   ├── crypto/           # Cryptographic functions
│   │   │   ├── math/             # Mathematical operations
│   │   │   ├── cbor/             # Serialization
│   │   │   ├── primitive/        # Basic types & operations
│   │   │   └── index.ts          # Stdlib exports
│   │   ├── aiken.toml            # Package configuration
│   │   └── index.ts              # Package entry point
│   ├── fuzz/v2.2.0/              # Property-based testing
│   │   └── lib/aiken/fuzz/
│   ├── prelude/v1.0.0/           # Common utilities
│   │   └── lib/aiken/prelude/
│   └── merkle-patricia-forestry/v2.1.0/  # MPF operations
│       └── lib/aiken/merkle-patricia-forestry/
└── cardano/                       # Cardano-specific packages
    └── stdlib/v1.0.0/            # Cardano functions
        └── lib/cardano/
            ├── address/          # Address construction
            ├── assets/           # Asset/value operations
            └── transaction/      # Transaction types
```

## Scoped Import System

### Aiken Standard Library

```typescript
// Collection operations
import { listPush, listMap, listFilter } from '@aiken/collection';
import { dictInsert, dictGet, dictSize } from '@aiken/collection';

// Cryptographic functions
import { blake2b_256, sha3_256, keccak_256 } from '@aiken/crypto';

// Mathematical operations
import { intAbs, intPow, intSqrt } from '@aiken/math';

// Serialization
import { encodeCbor, decodeCbor } from '@aiken/cbor';

// Merkle Patricia Forestry
import { mpfInsert, mpfGet, mpfRoot } from '@aiken/merkle-patricia-forestry';

// Prelude utilities
import { identity, compose, pipe } from '@aiken/prelude';

// Property-based testing
import { fuzz, property, generator } from '@aiken/fuzz';
```

### Cardano-Specific Functions

```typescript
// Address operations
import { addressFromScript, addressFromVerificationKey } from '@cardano/address';

// Asset operations
import { valueAdd, valueSubtract, valueGetAsset } from '@cardano/assets';

// Transaction types
import { Transaction, Input, Output } from '@cardano/transaction';
```

### Type Definitions

```typescript
// Basic types
import { Bool, Int, ByteArray, Data } from '@types/basic';

// DSL decorators
import { contract, datum, validator } from '@types/dsl';

// Builtin function types
import { BuiltinMapping } from '@types/builtin';
```

## Package Development

### Adding New Functions

**1. Choose the appropriate package:**
- `@aiken/*` for general Aiken stdlib functions
- `@cardano/*` for Cardano-specific operations
- `@types/*` for type definitions

**2. Navigate to the package directory:**
```bash
cd src/core/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/
```

**3. Create or update the module:**
```typescript
// In collection/index.ts
export declare function listFind<T>(
  list: T[],
  predicate: (item: T) => Bool
): T | undefined;
```

**4. Update the package index:**
```typescript
// In lib/aiken/index.ts
export * from './collection/index';
```

**5. Update the main package index:**
```typescript
// In src/core/packages/aiken-lang/index.ts
export * as collection from './stdlib/v2.2.0/lib/aiken/collection/index';
```

### Version Management

**Creating a New Version:**
```bash
# Copy existing version
cp -r src/core/packages/aiken-lang/stdlib/v2.2.0 \
      src/core/packages/aiken-lang/stdlib/v2.3.0

# Update version-specific files
cd src/core/packages/aiken-lang/stdlib/v2.3.0
# Make breaking changes...

# Update package index
echo "export * as stdlib from './stdlib/v2.3.0/index';" >> ../index.ts
```

**Version Selection:**
- **Patch versions** (2.2.0 → 2.2.1): Bug fixes, no breaking changes
- **Minor versions** (2.2.0 → 2.3.0): New features, backward compatible
- **Major versions** (2.2.0 → 3.0.0): Breaking changes

## Package Configuration

Each package includes an `aiken.toml` file for configuration:

```toml
# aiken.toml
name = "aiken-lang/stdlib"
version = "2.2.0"
description = "Aiken standard library"

[dependencies]
# Package dependencies would be listed here
```

## Testing Packages

### Unit Tests

```typescript
// tests/unit/packages.test.ts
import { listPush, listMap } from '@aiken/collection';

describe('@aiken/collection', () => {
  test('listPush adds element to list', () => {
    const result = listPush([1, 2, 3], 4);
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
```

### Integration Tests

```typescript
// tests/integration/packages.test.ts
import { blake2b_256 } from '@aiken/crypto';
import { listMap } from '@aiken/collection';

describe('Package Integration', () => {
  test('crypto and collection work together', () => {
    const data = [ByteArray.from([1, 2, 3]), ByteArray.from([4, 5, 6])];
    const hashes = listMap(data, blake2b_256);
    expect(hashes).toHaveLength(2);
  });
});
```

## Build Process

### Package Compilation

```bash
# Build all packages
npm run build:packages

# Build specific package
npx tsc src/core/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/**/*.ts --outDir dist/packages/aiken-lang/stdlib/v2.2.0
```

### Validation

```bash
# Validate all packages
npm run validate:packages

# Check for linting issues
npm run lint:packages

# Run package tests
npm run test:packages
```

## Migration Guide

### From Flat Structure to Packages

**Old Structure:**
```typescript
import { listPush } from 'aikscript/lib/collection';
```

**New Structure:**
```typescript
import { listPush } from '@aiken/collection';
```

### Updating Existing Code

1. **Replace old imports:**
   ```typescript
   // Old
   import { sha256 } from 'aikscript/crypto';

   // New
   import { sha256 } from '@aiken/crypto';
   ```

2. **Update type imports:**
   ```typescript
   // Old
   import { Bool, Int } from 'aikscript/types';

   // New
   import { Bool, Int } from '@types/basic';
   ```

3. **Update Cardano imports:**
   ```typescript
   // Old
   import { addressFromScript } from 'aikscript/cardano';

   // New
   import { addressFromScript } from '@cardano/address';
   ```

## Best Practices

### Package Organization

1. **Single Responsibility**: Each package should have one clear purpose
2. **Version Consistency**: Keep related packages at compatible versions
3. **Clear Naming**: Use descriptive names for functions and modules
4. **Documentation**: Document all public APIs with JSDoc comments

### Import Guidelines

1. **Prefer Scoped Imports**: Use `@aiken/*` instead of relative imports
2. **Group Related Imports**: Group imports by package/domain
3. **Avoid Wildcard Imports**: Be specific about what you import
4. **Consistent Aliasing**: Use consistent aliases for commonly used functions

### Development Workflow

1. **Test First**: Write tests before implementing new functions
2. **Version Planning**: Plan version bumps for breaking changes
3. **Documentation**: Update docs when adding new packages
4. **Code Review**: Get reviews for package structure changes

## Troubleshooting

### Common Issues

**"Cannot find module '@aiken/collection'"**
- Check that the package index files are properly exporting the module
- Verify the package structure matches the import path
- Ensure the package is built and available

**"Type errors in package imports"**
- Verify type definitions are properly exported
- Check that interface names match between packages
- Ensure version compatibility

**"Build failures in packages"**
- Check TypeScript configuration for package directories
- Verify all dependencies are properly declared
- Ensure no circular import dependencies

### Debug Commands

```bash
# Check package structure
find src/core/packages -name "*.ts" | head -20

# Validate package exports
node -e "console.log(Object.keys(require('./dist/src/core/packages/aiken-lang/index.js')))"

# Check for missing exports
grep -r "export" src/core/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/
```

## Contributing

When contributing new packages:

1. Follow the established directory structure
2. Include comprehensive tests
3. Update documentation
4. Add examples in the `examples/` directory
5. Update the main package indexes
6. Follow semantic versioning guidelines

## Future Enhancements

- **Package Registry**: Centralized package registry for community packages
- **Dependency Management**: Automatic dependency resolution and version conflicts
- **Plugin System**: Extensible plugin architecture for custom packages
- **Package Templates**: Standardized templates for new package creation
- **Documentation Generator**: Automated API documentation generation
