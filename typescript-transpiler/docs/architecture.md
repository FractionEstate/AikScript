# AikScript Architecture Documentation

## Overview

AikScript is a TypeScript-to-Aiken transpiler that enables developers to write Cardano smart contracts using familiar TypeScript syntax while leveraging Aiken's proven compilation pipeline and performance characteristics.

## Core Architecture

### Data Flow Architecture

```
TypeScript Source Code
        ↓
    TypeScript Compiler API
        ↓
    Abstract Syntax Tree (AST)
        ↓
    AikScript Parser
        ↓
    TranspilerAST (Internal Representation)
        ↓
    AikScript Transformer
        ↓
    AikenAST (Target Representation)
        ↓
    AikScript Code Generator
        ↓
    Aiken Source Code
        ↓
    Aiken Compiler
        ↓
    Plutus Core
```

### Module Structure

```
src/
├── core/                    # Core transpilation engine
│   ├── parser.ts           # TypeScript AST parsing
│   ├── transformer.ts      # AST transformation logic
│   ├── transpiler.ts       # Main orchestration
│   ├── generator.ts        # Aiken code generation
│   ├── types.ts            # Type mapping utilities
│   ├── builtins.ts         # Builtin function registry
│   ├── expressions.ts      # Expression transformation
│   └── validators.ts       # Validator transformation
├── types/                  # Type definitions and decorators
│   ├── cardano.ts          # Cardano-specific types & DSL
│   ├── cardano.d.ts        # TypeScript declarations
│   ├── dsl.d.ts            # Legacy DSL declarations
│   └── index.ts            # Main type exports
├── cli/                    # Command-line interface
│   └── index.ts            # CLI commands and project templates
└── index.ts                # Main library exports
```

## Key Design Decisions

### 1. Decorator-Based DSL

**Decision**: Use TypeScript decorators for contract definition
**Rationale**:
- Familiar syntax for TypeScript developers
- Compile-time validation
- IDE support and autocompletion
- Clean separation of concerns

**Implementation**:
```typescript
@contract("MyContract")
export class MyContract {
  @datum
  public data: any = { /* ... */ };

  @validator("spend")
  spend(datum: Datum, redeemer: Redeemer, ctx: ScriptContext): Bool {
    // Implementation
  }
}
```

### 2. Modular Architecture

**Decision**: Separate parsing, transformation, and generation phases
**Rationale**:
- Single responsibility principle
- Easier testing and debugging
- Extensible for new target languages
- Clear data flow and error handling

**Benefits**:
- Each module can be tested independently
- Easy to add new features without affecting existing code
- Clear error boundaries and debugging points

### 3. TypeScript Compiler API Integration

**Decision**: Use TypeScript Compiler API for parsing
**Rationale**:
- Access to full TypeScript AST
- Type information and symbol resolution
- Future-proof with TypeScript updates
- Rich ecosystem and tooling

**Implementation**:
```typescript
const sourceFile = ts.createSourceFile(
  fileName,
  sourceCode,
  ts.ScriptTarget.ES2020,
  true
);
```

## Component Details

### Parser Module (`src/core/parser.ts`)

**Purpose**: Parse TypeScript source code into internal AST representation

**Key Classes**:
- `TypeScriptParser`: Main parser orchestrator
- Contract extraction logic
- Decorator detection and processing

**Design Patterns**:
- Visitor pattern for AST traversal
- Factory pattern for AST node creation
- Strategy pattern for different decorator types

### Transformer Module (`src/core/transformer.ts`)

**Purpose**: Transform internal AST to Aiken-compatible representation

**Key Classes**:
- `AikenTransformer`: Main transformation orchestrator
- `ExpressionTransformer`: Handle complex expressions
- `ValidatorTransformer`: Transform validator functions

**Transformation Pipeline**:
1. Parse TypeScript source
2. Extract contracts, datums, validators
3. Transform types and expressions
4. Generate Aiken-compatible structures

### Generator Module (`src/core/generator.ts`)

**Purpose**: Generate Aiken source code from transformed AST

**Key Features**:
- Aiken syntax generation
- Proper indentation and formatting
- Import statement management
- Error handling and validation

### Type System

**Cardano-Specific Types**:
- `PubKeyHash`: Public key hash representation
- `ScriptHash`: Script hash for contracts
- `AssetName`: Token name representation
- `Ada`: Native token type
- `Bool`: Boolean type (mapped to Aiken Bool)

**Type Mapping Strategy**:
```typescript
// TypeScript → Aiken mapping
PubKeyHash → VerificationKeyHash
ScriptHash → ScriptHash
bigint → Int
boolean → Bool
string → ByteArray (with encoding)
```

## Error Handling Strategy

### Parse Errors
- Invalid decorator usage
- Malformed contract definitions
- Type annotation issues

### Transformation Errors
- Unsupported TypeScript features
- Complex expression handling
- Type mapping failures

### Generation Errors
- Aiken syntax validation
- Import resolution issues
- File system operations

## Performance Considerations

### Compilation Speed
- **Target**: < 5 seconds for medium contracts (100-500 lines)
- **Optimization**: Lazy evaluation of complex expressions
- **Caching**: AST node reuse where possible

### Memory Usage
- **Strategy**: Streaming processing for large files
- **Cleanup**: Proper disposal of TypeScript compiler instances
- **Limits**: Configurable memory thresholds

## Testing Strategy

### Unit Tests
- Individual module testing
- Mock external dependencies
- Edge case coverage

### Integration Tests
- End-to-end transpilation
- CLI command testing
- Project template validation

### Test Coverage Goals
- **Target**: 90%+ code coverage
- **Focus Areas**: Parser logic, transformer accuracy, generator output

## Extensibility

### Adding New Target Languages
1. Create new generator module
2. Implement language-specific transformations
3. Add CLI target option
4. Update type mappings

### Adding New Decorators
1. Define decorator in `types/cardano.ts`
2. Add parsing logic in `parser.ts`
3. Implement transformation in `transformer.ts`
4. Update generator for output

### Adding New Builtin Functions
1. Register in `BuiltinRegistry`
2. Add type definitions
3. Implement transformation logic
4. Update documentation

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run tests
npm test

# Build project
npm run build

# Development mode
npm run dev
```

### Adding New Features
1. Create feature branch
2. Write tests first (TDD)
3. Implement functionality
4. Update documentation
5. Submit pull request

### Code Quality Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- JSDoc documentation
- Comprehensive test coverage

## Deployment and Distribution

### NPM Package
- Compiled JavaScript in `dist/`
- TypeScript declarations
- CLI binary in `bin/`
- Minimal runtime dependencies

### Docker Support
- Multi-stage build
- Alpine Linux base
- Minimal image size
- Development and production variants

## Future Enhancements

### Planned Features
- VS Code extension
- Web-based playground
- Advanced optimization passes
- Multi-language support
- Plugin architecture

### Performance Improvements
- Parallel processing
- Incremental compilation
- Advanced caching strategies
- Memory optimization

### Developer Experience
- Better error messages
- Interactive debugging
- Code generation templates
- Integration with popular IDEs

## Conclusion

AikScript's architecture is designed for maintainability, extensibility, and performance. The modular design allows for easy testing, debugging, and feature addition while maintaining high code quality and developer experience.

The use of TypeScript throughout the codebase ensures type safety and excellent IDE support, making it highly readable for both human developers and AI systems.
