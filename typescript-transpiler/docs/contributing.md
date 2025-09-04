# Contributing to AikScript

Welcome! We're excited that you're interested in contributing to AikScript. This guide will help you get started with development, understand our processes, and make meaningful contributions.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Code Review Process](#code-review-process)

## Development Setup

### Prerequisites

- **Node.js**: Version 20.19.5 or higher
- **TypeScript**: Version 5.9.2 or higher
- **Git**: Version 2.30 or higher

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aikscript/aikscript.git
   cd aikscript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify setup**
   ```bash
   npm run build
   npm test
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## Project Structure

```
aikscript/
├── src/                    # Source code
│   ├── core/              # Core transpilation engine
│   ├── types/             # Type definitions and decorators
│   └── cli/               # Command-line interface
├── tests/                 # Test files
├── docs/                  # Documentation
├── examples/              # Example projects
├── dist/                  # Compiled output (generated)
├── package.json           # Node.js configuration
├── tsconfig.json          # TypeScript configuration
└── jest.config.js         # Test configuration
```

### Key Directories

- **`src/core/`**: Core transpilation logic
  - `parser.ts`: TypeScript AST parsing
  - `transformer.ts`: AST transformation
  - `generator.ts`: Aiken code generation
  - `transpiler.ts`: Main orchestration

- **`src/types/`**: Type system and decorators
  - `cardano.ts`: Cardano-specific types and DSL
  - `cardano.d.ts`: TypeScript declarations

- **`src/cli/`**: Command-line interface
  - `index.ts`: CLI commands and project templates

## Development Workflow

### 1. Choose an Issue

- Check [GitHub Issues](https://github.com/aikscript/aikscript/issues) for open tasks
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-number-description
```

### 3. Write Tests First (TDD)

```typescript
// Example: tests/new-feature.test.ts
describe('New Feature', () => {
  test('should work correctly', () => {
    // Arrange
    const input = 'test input';

    // Act
    const result = processInput(input);

    // Assert
    expect(result).toBe('expected output');
  });
});
```

### 4. Implement the Feature

- Follow the existing code patterns
- Add comprehensive error handling
- Include JSDoc comments for new functions
- Update types as needed

### 5. Run Tests and Lint

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Check code formatting
npm run format:check

# Fix formatting issues
npm run format

# Run linting
npm run lint
```

### 6. Update Documentation

- Update relevant documentation files
- Add examples for new features
- Update the changelog

## Coding Standards

### TypeScript Guidelines

- **Use strict TypeScript**: All code must pass strict type checking
- **Avoid `any` types**: Use specific types whenever possible
- **Interface over type aliases**: Prefer interfaces for object shapes
- **Const assertions**: Use `as const` for literal values

```typescript
// ✅ Good
interface ContractDefinition {
  name: string;
  datums: DatumDefinition[];
}

const VALIDATOR_PURPOSES = ['spend', 'mint', 'withdraw'] as const;

// ❌ Avoid
type ContractDef = any;

const purposes = ['spend', 'mint', 'withdraw'];
```

### Naming Conventions

- **Classes**: PascalCase (`TypeScriptParser`)
- **Interfaces**: PascalCase with 'I' prefix (`IContractDefinition`)
- **Methods/Functions**: camelCase (`parseSourceCode()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Private fields**: camelCase with underscore (`_parser`)

### Code Organization

- **Single Responsibility**: Each function/class should have one purpose
- **DRY Principle**: Don't repeat yourself
- **Early Returns**: Use early returns to reduce nesting
- **Error Handling**: Use try/catch for external operations

```typescript
// ✅ Good: Early return pattern
function processFile(filePath: string): Result {
  if (!fs.existsSync(filePath)) {
    return { success: false, error: 'File not found' };
  }

  // Process file...
  return { success: true, data: processedData };
}

// ❌ Avoid: Deep nesting
function processFile(filePath: string): Result {
  if (fs.existsSync(filePath)) {
    // Deep nesting makes code hard to read
    if (isValidFile(filePath)) {
      // More nesting...
    }
  }
}
```

### Documentation Standards

- **JSDoc Comments**: All public APIs must have JSDoc
- **Parameter Documentation**: Document all parameters and return types
- **Examples**: Include usage examples where helpful
- **Error Conditions**: Document when functions throw errors

```typescript
/**
 * Parses TypeScript source code into an AST representation
 *
 * @param sourceCode - The TypeScript source code to parse
 * @param fileName - Optional filename for error reporting
 * @returns The parsed AST representation
 * @throws {Error} If the source code contains syntax errors
 *
 * @example
 * ```typescript
 * const ast = parser.parseSource('class MyClass {}');
 * console.log(ast.contracts.length); // 0
 * ```
 */
parseSource(sourceCode: string, fileName?: string): TranspilerAST {
  // Implementation...
}
```

## Testing

### Test Structure

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test module interactions
- **End-to-End Tests**: Test complete workflows

### Test Naming

```typescript
describe('TypeScriptParser', () => {
  describe('parseSource', () => {
    test('should parse valid TypeScript code', () => {
      // Test implementation
    });

    test('should throw on invalid syntax', () => {
      // Test implementation
    });
  });
});
```

### Test Coverage

- **Target**: Maintain 90%+ code coverage
- **Focus Areas**: Core parsing and transformation logic
- **Edge Cases**: Test error conditions and boundary values

## Documentation

### Types of Documentation

1. **Code Comments**: JSDoc and inline comments
2. **README Files**: Project and feature documentation
3. **Architecture Docs**: System design and data flow
4. **API Docs**: Generated from JSDoc comments

### Documentation Updates

When making changes:

1. **Update relevant docs** in the `docs/` folder
2. **Add JSDoc comments** for new public APIs
3. **Update examples** if behavior changes
4. **Update changelog** with user-facing changes

## Submitting Changes

### Commit Guidelines

- **Clear Messages**: Write descriptive commit messages
- **Atomic Commits**: Each commit should be a single logical change
- **Reference Issues**: Include issue numbers when applicable

```bash
# Good commit messages
git commit -m "feat: add support for custom validators"
git commit -m "fix: handle empty contract definitions (#123)"
git commit -m "docs: update installation instructions"

# Avoid vague messages
git commit -m "fix bug"
git commit -m "update code"
```

### Pull Request Process

1. **Create a PR**: Push your branch and create a pull request
2. **Fill out the template**: Provide clear description and context
3. **Link related issues**: Reference any related GitHub issues
4. **Request review**: Assign appropriate reviewers

### PR Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No linting errors
```

## Code Review Process

### Review Criteria

- **Functionality**: Does the code work as intended?
- **Code Quality**: Follows coding standards and best practices?
- **Testing**: Adequate test coverage and quality?
- **Documentation**: Clear and complete documentation?
- **Performance**: No obvious performance issues?

### Review Comments

- **Be constructive**: Focus on improvement, not criticism
- **Explain reasoning**: Provide context for suggestions
- **Reference standards**: Link to coding standards when applicable

### Addressing Feedback

- **Acknowledge comments**: Respond to all review comments
- **Make changes**: Address feedback promptly
- **Re-request review**: Ask for re-review after changes
- **Discuss disagreements**: Have constructive discussions when needed

## Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Discord**: For real-time chat (if available)

### Asking for Help

When asking for help:

1. **Be specific**: Describe the problem clearly
2. **Provide context**: Include relevant code and error messages
3. **Show what you've tried**: Demonstrate your troubleshooting efforts
4. **Use proper formatting**: Format code and errors appropriately

## Recognition

Contributors are recognized through:

- **GitHub Contributors**: Listed in repository contributors
- **Changelog**: Mentioned in release notes
- **Social Media**: Featured in project updates
- **Swag**: Special recognition for significant contributions

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a positive community
- Follow the project's standards and guidelines

Thank you for contributing to AikScript! Your efforts help make Cardano smart contract development more accessible and powerful.
