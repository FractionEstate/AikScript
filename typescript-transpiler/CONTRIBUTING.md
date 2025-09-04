# Contributing to TypeScript-to-Aiken Copilot

Thank you for your interest in contributing to the TypeScript-to-Aiken Copilot! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 12.x or higher
- npm or yarn
- Git

### Installation

1. Fork and clone the repository:

```bash
git clone https://github.com/your-username/typescript-aiken-copilot.git
cd typescript-aiken-copilot
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run tests:

```bash
npm test
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### 3. Code Quality

Run the following commands before submitting:

```bash
# Lint code
npm run lint

# Format code
npm run format

# Run tests with coverage
npm run test:coverage

# Build project
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Create Pull Request

Push your branch and create a pull request on GitHub.

## Code Style

This project uses:

- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** with strict mode
- **EditorConfig** for consistent editor settings

## Project Structure

```
src/
├── cli/           # Command-line interface
├── core/          # Core transpiler logic
│   ├── parser.ts  # TypeScript AST parser
│   └── transpiler.ts # Aiken code generator
├── contracts/     # Example smart contracts
└── index.ts       # Main exports

types/             # TypeScript type definitions
tests/             # Test files
```

## Adding New Features

### Contract Templates

To add a new contract template:

1. Create a new file in `src/contracts/`
2. Use the TypeScript DSL with decorators
3. Add tests in `tests/`
4. Update documentation

### Transpiler Features

When adding new transpiler features:

1. Update the parser if needed
2. Add transformation logic to the transpiler
3. Add comprehensive tests
4. Update type definitions

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Use Jest as the test framework
- Place test files in `tests/` directory
- Follow the naming convention: `*.test.ts`
- Test both positive and negative cases

## Documentation

### README Updates

Update the README.md when:

- Adding new features
- Changing API
- Updating installation instructions

### Code Documentation

- Use JSDoc comments for functions and classes
- Keep comments clear and concise
- Document complex logic

## Commit Convention

This project follows conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## Issues and Bug Reports

- Use GitHub Issues for bug reports and feature requests
- Provide detailed descriptions
- Include code examples when possible
- Check existing issues before creating new ones

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, feel free to:

- Open a GitHub Discussion
- Ask in the project's chat/community
- Check the existing documentation

Thank you for contributing to the TypeScript-to-Aiken Copilot! 🎉
