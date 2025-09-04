# Contributing to AikScript

Thank you for your interest in contributing to AikScript! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js >= 20.19.5
- pnpm >= 10.11.0 (recommended) or npm >= 10.0.0
- Aiken >= 1.1.19
- Git

### Installation

1. Fork and clone the repository:

```bash
git clone https://github.com/FractionEstate/AikScript.git
cd AikScript/typescript-transpiler
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm run build
```

4. Run tests:

```bash
pnpm test
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the existing code style
- Update tests for any new functionality
- Ensure all tests pass
- Update documentation as needed

### 3. Package Development

**Adding New Aiken Stdlib Functions:**
```bash
# Navigate to the appropriate package
cd src/core/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/

# Add new module (e.g., for string operations)
mkdir string
echo "export declare function stringLength(s: ByteArray): Int;" > string/index.ts

# Update main stdlib index
echo "export * from './string/index';" >> ../index.ts
```

**Adding New Cardano Functions:**
```bash
# Navigate to Cardano package
cd src/core/packages/cardano/stdlib/v1.0.0/lib/cardano/

# Add new module
mkdir new-feature
echo "export declare function newFunction(): void;" > new-feature/index.ts

# Update package index
echo "export * from './new-feature/index';" >> ../index.ts
```

### 4. Testing

**Run All Tests:**
```bash
pnpm test
```

**Run Tests with Coverage:**
```bash
pnpm run test:coverage
```

**Run Specific Test:**
```bash
pnpm test -- test-file-name
```

### 5. Code Quality

**Linting:**
```bash
pnpm run lint
```

**Auto-fix Lint Issues:**
```bash
pnpm run lint:fix
```

**Code Formatting:**
```bash
pnpm run format
```

### 6. Build Process

**Development Build:**
```bash
pnpm run build
```

**Watch Mode:**
```bash
pnpm run dev
```

**Clean Build:**
```bash
pnpm run clean
```

## Package Architecture

### Understanding the Package System

AikScript uses a version-controlled package system that mirrors the Aiken ecosystem:

```
src/core/packages/
├── aiken-lang/           # Aiken ecosystem packages
│   ├── stdlib/v2.2.0/   # Core standard library
│   ├── fuzz/v2.2.0/     # Property-based testing
│   ├── prelude/v1.0.0/  # Common utilities
│   └── merkle-patricia-forestry/v2.1.0/
└── cardano/              # Cardano-specific packages
    └── stdlib/v1.0.0/
```

### Scoped Imports

Use scoped imports for better organization:

```typescript
// Aiken stdlib
import { listPush } from '@aiken/collection';
import { blake2b_256 } from '@aiken/crypto';

// Cardano functions
import { addressFromScript } from '@cardano/address';

// Type definitions
import { Bool, Int } from '@types/basic';
```

### Version Management

- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Create new version directories for breaking changes
- Update package indexes when releasing new versions
- Maintain backward compatibility within major versions

## Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(collection): add listFind function
fix(crypto): correct blake2b_256 implementation
docs(readme): update installation instructions
test(transpiler): add unit tests for new validator
```

## Pull Request Process

1. **Create a Feature Branch**: `git checkout -b feature/your-feature`
2. **Make Changes**: Implement your feature or fix
3. **Add Tests**: Ensure comprehensive test coverage
4. **Update Documentation**: Update docs if needed
5. **Run Quality Checks**:
   ```bash
   pnpm run lint
   pnpm test
   pnpm run build
   ```
6. **Commit Changes**: Use descriptive commit messages
7. **Create Pull Request**: Push to your fork and create a PR
8. **Code Review**: Address any feedback from reviewers
9. **Merge**: Once approved, your changes will be merged

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer `interface` over `type` for object shapes
- Use branded types for domain-specific types
- Avoid `any` type; use proper type definitions

### Naming Conventions

- **Classes**: PascalCase
- **Interfaces**: PascalCase with 'I' prefix (optional)
- **Functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Types**: PascalCase

### File Organization

- One class/interface per file
- Related utilities in the same directory
- Clear index.ts files for re-exports
- Consistent directory structure

## Testing Guidelines

### Unit Tests

- Test all public functions
- Use descriptive test names
- Cover edge cases and error conditions
- Mock external dependencies

### Integration Tests

- Test complete workflows
- Verify transpilation output
- Test CLI commands
- Validate generated Aiken code

### Test Structure

```
tests/
├── unit/                    # Unit tests
├── integration/            # Integration tests
└── fixtures/               # Test data and fixtures
```

## Documentation

### Code Documentation

- Use JSDoc comments for public APIs
- Document parameters and return types
- Provide usage examples
- Explain complex algorithms

### README Updates

- Update README.md for new features
- Add examples for new functionality
- Update installation instructions if needed

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Node.js version, OS, etc.
- **Code Sample**: Minimal code to reproduce the issue

### Feature Requests

When requesting features, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature is needed
- **Implementation Ideas**: How it could be implemented
- **Alternatives**: Other solutions considered

## Getting Help

- **Documentation**: Check the [docs](./docs/) directory
- **Issues**: Search existing issues on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our Discord community

## License

By contributing to AikScript, you agree that your contributions will be licensed under the MIT License.
