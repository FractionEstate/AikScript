# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **End-to-End Testing**: Complete validation of TypeScript-to-Aiken workflow
  - Successful compilation of TimeLock contract example
  - Aiken CLI integration with `aiken check` and `aiken build`
  - Validation of generated Aiken code syntax and semantics
  - Production-ready code generation pipeline
- **Documentation Improvements**: Comprehensive documentation suite for AI Copilot readability
  - `docs/architecture.md`: Detailed system architecture and design decisions
  - `docs/contributing.md`: Developer guide for contributions
  - `docs/extending.md`: Guide for adding new features and extensions
  - `docs/api.md`: Complete API reference with examples
  - `docs/performance.md`: Performance guide and optimization strategies
- **Architecture Documentation**: Complete system overview with data flow diagrams
- **Developer Experience**: Enhanced documentation for better AI Copilot understanding
- **Code Readability**: Improved inline documentation and architectural clarity

### Changed
- **Rebranding**: Complete rebrand from 'ts-aiken' to 'aikscript' across all files
- **Project Structure**: Enhanced project organization for better maintainability
- **Documentation**: Comprehensive rewrite of all documentation for AI readability

### Fixed
- **Test Issues**: Resolved circular reference problems in test files
- **Decorator Syntax**: Fixed invalid decorator signatures and API usage
- **TypeScript Configuration**: Enabled experimental decorators for proper compilation
- **Aiken Compatibility**: Ensured full compatibility with standard Aiken project structures
- **Code Generation**: Fixed double braces and malformed conditional logic issues
- **Module Naming**: Corrected Aiken module naming conventions (lowercase required)

## [1.0.0] - 2025-09-04

### Added

- Initial release of TypeScript-to-Aiken Copilot
- TypeScript DSL for writing Cardano smart contracts
- Automatic transpilation to Aiken code
- CLI tool for compilation and development
- Support for common smart contract patterns:
  - TimeLock contracts
  - Multi-signature wallets
  - Token vesting
  - NFT minting
- Comprehensive test suite
- ESLint and Prettier configuration
- GitHub Actions CI/CD pipeline
- Complete documentation and examples

### Features

- **TypeScript DSL**: Write smart contracts using familiar TypeScript syntax with custom decorators
- **Automatic Transpilation**: Convert TypeScript contracts to optimized Aiken code
- **CLI Interface**: Command-line tool for easy compilation and development workflow
- **Expression Handling**: Support for complex expressions, logical operators, and property access
- **Type Safety**: Full TypeScript type checking with custom Cardano type definitions
- **Testing Framework**: Jest-based testing with TypeScript support
- **Code Quality**: ESLint, Prettier, and EditorConfig for consistent code style

### Technical Details

- Compatible with Node.js 12.x and higher
- TypeScript 4.9.5 for optimal compatibility
- Generates valid Aiken syntax with proper and/or chains
- Handles variable declarations, binary expressions, and method calls
- Custom decorator system for contract, datum, and validator definitions

### Planned

- VS Code extension for enhanced developer experience
- Additional smart contract templates
- Performance optimizations
- Extended testing utilities
- Documentation improvements

---

## Development Notes

This project was developed to bridge the gap between TypeScript developers and Cardano smart contract development using Aiken. The transpiler enables developers to write contracts in familiar TypeScript syntax while leveraging Aiken's proven performance and security characteristics.

### Key Technologies

- **TypeScript Compiler API**: For parsing and transforming TypeScript AST
- **Custom DSL**: Domain-specific language for smart contract development
- **Aiken Integration**: Generates optimized Aiken code compatible with the Aiken compiler
- **Node.js CLI**: Command-line interface for development workflow

### Architecture

- **Parser**: Converts TypeScript DSL to internal AST representation
- **Transpiler**: Transforms AST to Aiken code with proper syntax
- **CLI**: Provides development tools and compilation interface
- **Type System**: Custom types for Cardano-specific constructs

---

For more information, see the [README](README.md) and [Contributing Guide](CONTRIBUTING.md).
