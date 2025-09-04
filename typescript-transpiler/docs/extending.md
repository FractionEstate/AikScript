# Extending AikScript

This guide explains how to extend AikScript with new features, decorators, builtin functions, and target languages. Whether you're adding support for new Cardano features or extending the transpiler for other blockchain platforms, this document will guide you through the process.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Adding New Decorators](#adding-new-decorators)
- [Adding Builtin Functions](#adding-builtin-functions)
- [Extending the Type System](#extending-the-type-system)
- [Adding Target Languages](#adding-target-languages)
- [Custom Transforms](#custom-transforms)
- [Testing Extensions](#testing-extensions)
- [Performance Considerations](#performance-considerations)

## Architecture Overview

AikScript uses a modular architecture that makes extension straightforward:

```
TypeScript Source
       ↓
   Parser (src/core/parser.ts)
       ↓
  Transformer (src/core/transformer.ts)
       ↓
  Generator (src/core/generator.ts)
       ↓
Target Language Output
```

Each module has specific extension points:

- **Parser**: Recognizes new decorators and syntax
- **Transformer**: Converts TypeScript AST to internal representation
- **Generator**: Produces target language code

## Adding New Decorators

### 1. Define the Decorator Interface

First, add the decorator to the type definitions:

```typescript
// src/types/cardano.ts
export interface ContractDecorator {
  name: string;
  applyTo: 'class' | 'method' | 'property';
  metadata: Record<string, any>;
}

// Add new decorator definition
export const CustomDecorator: ContractDecorator = {
  name: 'custom',
  applyTo: 'method',
  metadata: {
    description: 'Custom validator behavior',
    parameters: ['param1', 'param2']
  }
};
```

### 2. Update the Parser

Modify the parser to recognize the new decorator:

```typescript
// src/core/parser.ts
private extractDecorators(node: ts.ClassDeclaration): ContractDecorators {
  const decorators: ContractDecorators = {
    contract: null,
    datums: [],
    validators: [],
    customDecorators: [] // Add support for custom decorators
  };

  for (const decorator of node.decorators || []) {
    const decoratorName = this.getDecoratorName(decorator);

    switch (decoratorName) {
      case 'contract':
        decorators.contract = this.parseContractDecorator(decorator);
        break;
      case 'datum':
        decorators.datums.push(this.parseDatumDecorator(decorator));
        break;
      case 'validator':
        decorators.validators.push(this.parseValidatorDecorator(decorator));
        break;
      case 'custom': // Handle new decorator
        decorators.customDecorators.push(this.parseCustomDecorator(decorator));
        break;
    }
  }

  return decorators;
}

private parseCustomDecorator(decorator: ts.Decorator): CustomDecoratorInfo {
  // Parse decorator arguments and metadata
  const args = this.getDecoratorArguments(decorator);

  return {
    name: 'custom',
    parameters: args,
    metadata: CustomDecorator.metadata
  };
}
```

### 3. Update the Transformer

Transform the new decorator into the internal AST:

```typescript
// src/core/transformer.ts
private transformCustomDecorator(
  decorator: CustomDecoratorInfo,
  context: TransformContext
): AikenAST.CustomNode {
  return {
    type: 'custom_decorator',
    name: decorator.name,
    parameters: decorator.parameters,
    metadata: decorator.metadata
  };
}
```

### 4. Update the Generator

Generate code for the new decorator:

```typescript
// src/core/generator.ts
private generateCustomDecorator(node: AikenAST.CustomNode): string {
  const params = node.parameters.map(p => this.generateExpression(p)).join(', ');

  return `@custom(${params})`;
}
```

### 5. Add TypeScript Declarations

Update the declaration file for type checking:

```typescript
// src/types/cardano.d.ts
declare function custom(param1: any, param2: any): MethodDecorator;
```

## Adding Builtin Functions

### 1. Define the Function Signature

Add the builtin function to the type definitions:

```typescript
// src/types/cardano.ts
export interface BuiltinFunction {
  name: string;
  signature: string;
  category: 'crypto' | 'math' | 'utility' | 'custom';
  description: string;
}

// Add new builtin
export const NewBuiltin: BuiltinFunction = {
  name: 'newBuiltin',
  signature: 'newBuiltin(param: Type): ReturnType',
  category: 'utility',
  description: 'Description of the new builtin function'
};
```

### 2. Update the Transformer

Add transformation logic for the new builtin:

```typescript
// src/core/transformer.ts
private transformBuiltinCall(
  node: ts.CallExpression,
  context: TransformContext
): AikenAST.BuiltinCall {
  const functionName = this.getFunctionName(node);

  switch (functionName) {
    case 'sha256':
      return this.transformSha256Call(node);
    case 'newBuiltin': // Handle new builtin
      return this.transformNewBuiltinCall(node);
    default:
      throw new Error(`Unknown builtin function: ${functionName}`);
  }
}

private transformNewBuiltinCall(node: ts.CallExpression): AikenAST.BuiltinCall {
  const args = this.transformArguments(node.arguments);

  return {
    type: 'builtin_call',
    function: NewBuiltin,
    arguments: args
  };
}
```

### 3. Update the Generator

Generate the target language code:

```typescript
// src/core/generator.ts
private generateBuiltinCall(node: AikenAST.BuiltinCall): string {
  const args = node.arguments.map(arg => this.generateExpression(arg)).join(', ');

  switch (node.function.name) {
    case 'sha256':
      return `sha256(${args})`;
    case 'newBuiltin':
      return `new_builtin(${args})`; // Target language function name
    default:
      throw new Error(`Unsupported builtin: ${node.function.name}`);
  }
}
```

### 4. Add Tests

Create comprehensive tests for the new builtin:

```typescript
// tests/builtins/newBuiltin.test.ts
describe('newBuiltin builtin function', () => {
  test('should transform correctly', () => {
    const input = `
      const result = newBuiltin(param);
    `;

    const expected = `
      result = new_builtin(param)
    `;

    expect(transpile(input)).toBe(expected);
  });

  test('should handle multiple parameters', () => {
    const input = `
      const result = newBuiltin(a, b, c);
    `;

    const expected = `
      result = new_builtin(a, b, c)
    `;

    expect(transpile(input)).toBe(expected);
  });
});
```

## Extending the Type System

### 1. Define New Types

Add new types to the type system:

```typescript
// src/types/cardano.ts
export interface CustomType {
  name: string;
  definition: string;
  validation: (value: any) => boolean;
}

// Example: Add a new Cardano-specific type
export const CustomAssetType: CustomType = {
  name: 'CustomAsset',
  definition: 'CustomAsset { policyId: PolicyId, assetName: AssetName }',
  validation: (value: any) => {
    return value &&
           typeof value.policyId === 'string' &&
           typeof value.assetName === 'string';
  }
};
```

### 2. Update Type Validation

Add validation logic in the parser:

```typescript
// src/core/parser.ts
private validateCustomType(
  typeNode: ts.TypeNode,
  context: ValidationContext
): ValidationResult {
  const typeName = this.getTypeName(typeNode);

  switch (typeName) {
    case 'CustomAsset':
      return this.validateCustomAssetType(typeNode);
    default:
      return { valid: true };
  }
}

private validateCustomAssetType(typeNode: ts.TypeNode): ValidationResult {
  // Custom validation logic
  return {
    valid: true,
    warnings: [],
    errors: []
  };
}
```

### 3. Update Type Generation

Generate type definitions in the target language:

```typescript
// src/core/generator.ts
private generateCustomType(type: CustomType): string {
  return type.definition;
}
```

## Adding Target Languages

### 1. Define Language Interface

Create a new language interface:

```typescript
// src/core/generator.ts
export interface TargetLanguage {
  name: string;
  fileExtension: string;
  generate(ast: AikenAST.Program): string;
  generateType(type: AikenAST.Type): string;
  generateFunction(func: AikenAST.Function): string;
  generateBuiltin(builtin: AikenAST.BuiltinCall): string;
}

// Example: Add Plutus Core support
export class PlutusCoreGenerator implements TargetLanguage {
  name = 'plutus-core';
  fileExtension = '.plc';

  generate(ast: AikenAST.Program): string {
    // Plutus Core generation logic
    return this.generateProgram(ast);
  }

  // Implement other methods...
}
```

### 2. Register the Language

Add the language to the main generator:

```typescript
// src/core/generator.ts
private generators: Map<string, TargetLanguage> = new Map([
  ['aiken', new AikenGenerator()],
  ['plutus-core', new PlutusCoreGenerator()],
  // Add more languages here
]);
```

### 3. Update CLI

Add CLI support for the new language:

```typescript
// src/cli/index.ts
const SUPPORTED_TARGETS = ['aiken', 'plutus-core'] as const;

interface CompileOptions {
  target: typeof SUPPORTED_TARGETS[number];
  // ... other options
}
```

## Custom Transforms

### 1. Define Transform Interface

Create a plugin interface for custom transforms:

```typescript
// src/core/transformer.ts
export interface CustomTransform {
  name: string;
  appliesTo: 'before' | 'after' | 'replace';
  condition: (node: ts.Node) => boolean;
  transform: (node: ts.Node, context: TransformContext) => ts.Node;
}

// Example: Add a custom transform
export const ExampleTransform: CustomTransform = {
  name: 'example-transform',
  appliesTo: 'before',
  condition: (node) => ts.isClassDeclaration(node),
  transform: (node, context) => {
    // Custom transformation logic
    return node;
  }
};
```

### 2. Register Transforms

Add transforms to the transformer pipeline:

```typescript
// src/core/transformer.ts
private customTransforms: CustomTransform[] = [
  ExampleTransform,
  // Add more transforms here
];

private applyCustomTransforms(node: ts.Node): ts.Node {
  let transformedNode = node;

  for (const transform of this.customTransforms) {
    if (transform.condition(transformedNode)) {
      transformedNode = transform.transform(transformedNode, this.context);
    }
  }

  return transformedNode;
}
```

## Testing Extensions

### 1. Unit Tests

Create unit tests for new features:

```typescript
// tests/extensions/customDecorator.test.ts
describe('Custom Decorator', () => {
  test('should parse custom decorator', () => {
    const input = `
      @contract("Test")
      class TestContract {
        @custom("param1", "param2")
        customMethod() {}
      }
    `;

    const ast = parser.parseSource(input);
    expect(ast.contracts[0].customDecorators).toHaveLength(1);
  });

  test('should transform custom decorator', () => {
    // Test transformation logic
  });

  test('should generate custom decorator code', () => {
    // Test code generation
  });
});
```

### 2. Integration Tests

Test the complete pipeline:

```typescript
// tests/integration/customFeature.test.ts
describe('Custom Feature Integration', () => {
  test('should transpile complete contract with custom features', () => {
    const input = `
      @contract("AdvancedContract")
      class AdvancedContract {
        @datum
        customDatum: CustomAsset;

        @validator("spend")
        @custom("enhanced")
        spend(datum: CustomAsset, redeemer: void, ctx: ScriptContext): Bool {
          return newBuiltin(datum.policyId);
        }
      }
    `;

    const result = transpile(input, { target: 'aiken' });
    expect(result.success).toBe(true);
    expect(result.output).toContain('new_builtin');
  });
});
```

### 3. Performance Tests

Test performance impact of extensions:

```typescript
// tests/performance/extensions.test.ts
describe('Extension Performance', () => {
  test('should not significantly impact compilation speed', () => {
    const largeContract = generateLargeContract();

    const startTime = Date.now();
    const result = transpile(largeContract);
    const endTime = Date.now();

    const duration = endTime - startTime;
    expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
  });
});
```

## Performance Considerations

### 1. Memory Management

- **AST Caching**: Cache parsed ASTs for repeated transformations
- **Lazy Evaluation**: Only transform nodes when needed
- **Garbage Collection**: Clean up temporary objects

### 2. Compilation Speed

- **Incremental Compilation**: Only recompile changed files
- **Parallel Processing**: Process independent modules in parallel
- **Optimization Passes**: Apply optimizations in efficient order

### 3. Bundle Size

- **Tree Shaking**: Remove unused code from extensions
- **Dynamic Imports**: Load extensions on demand
- **Minification**: Compress generated code

### 4. Error Handling

- **Fast Fail**: Stop on first error to avoid wasted computation
- **Error Caching**: Cache validation errors for quick re-runs
- **Graceful Degradation**: Continue with partial results when possible

## Best Practices

### 1. Extension Design

- **Single Responsibility**: Each extension should have one clear purpose
- **Backward Compatibility**: Don't break existing functionality
- **Configuration**: Make extensions configurable when possible
- **Documentation**: Document extension usage and configuration

### 2. Code Quality

- **Type Safety**: Use strict TypeScript for all extensions
- **Error Handling**: Provide clear error messages
- **Testing**: Comprehensive test coverage for all extensions
- **Performance**: Monitor and optimize extension performance

### 3. Community Guidelines

- **Naming Conventions**: Follow established naming patterns
- **Code Style**: Match the existing codebase style
- **Pull Requests**: Create clear, focused pull requests
- **Documentation**: Update docs for new extensions

## Example: Complete Extension

Here's a complete example of adding a new builtin function:

```typescript
// 1. Define the builtin
export const StringReverseBuiltin: BuiltinFunction = {
  name: 'stringReverse',
  signature: 'stringReverse(str: String): String',
  category: 'utility',
  description: 'Reverses a string'
};

// 2. Add to transformer
private transformStringReverseCall(node: ts.CallExpression): AikenAST.BuiltinCall {
  const args = this.transformArguments(node.arguments);
  return {
    type: 'builtin_call',
    function: StringReverseBuiltin,
    arguments: args
  };
}

// 3. Add to generator
case 'stringReverse':
  return `string_reverse(${args})`;

// 4. Add TypeScript declaration
declare function stringReverse(str: string): string;

// 5. Add tests
test('should reverse strings', () => {
  const input = `stringReverse("hello")`;
  const expected = `string_reverse("hello")`;
  expect(transpile(input)).toBe(expected);
});
```

This modular approach makes AikScript highly extensible while maintaining code quality and performance standards.
