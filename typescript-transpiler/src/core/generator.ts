import { BuiltinRegistry } from './builtins';
import {
  AikenAST,
  AikenImport,
  AikenType,
  AikenConstant,
  AikenFunction,
  AikenTest,
  AikenWhenExpression,
  AikenPipeExpression
} from './transpiler';

/**
 * Code generation utilities for TypeScript-to-Aiken transpiler
 * This module handles the generation of Aiken code from transformed AST
 */

export class CodeGenerator {
  private builtinRegistry: BuiltinRegistry;

  constructor(builtinRegistry: BuiltinRegistry) {
    this.builtinRegistry = builtinRegistry;
  }

  /**
   * Generate Aiken code from AikenAST
   * @param ast The AikenAST to generate code from
   * @returns The generated Aiken source code
   * @throws Error if code generation fails
   */
  generate(ast: AikenAST): string {
    try {
      const lines: string[] = [];

      // Add module docs
      if (ast.docs && ast.docs.length > 0) {
        ast.docs.forEach(doc => {
          lines.push(`/// ${doc}`);
        });
        lines.push('');
      }

      // Add builtin imports if any are used
      const usedImports = this.builtinRegistry.getUsedImports();
      if (usedImports.length > 0) {
        lines.push(`use aiken/builtin.{${usedImports.join(', ')}}`);
        lines.push('');
      }

      // Generate imports
      ast.imports.forEach(imp => {
        lines.push(this.generateImport(imp));
      });

      if (ast.imports.length > 0) {
        lines.push('');
      }

      // Generate types
      ast.types.forEach(type => {
        lines.push(this.generateType(type));
        lines.push('');
      });

      // Generate constants
      ast.constants.forEach(constant => {
        lines.push(this.generateConstant(constant));
        lines.push('');
      });

      // Generate functions
      ast.functions.forEach(func => {
        lines.push(this.generateFunction(func));
        lines.push('');
      });

      // Generate tests
      ast.tests.forEach(test => {
        lines.push(this.generateTest(test));
        lines.push('');
      });

      return lines.join('\n');
    } catch (error) {
      throw new Error(`Failed to generate Aiken code: ${(error as Error).message}`);
    }
  }

  /**
   * Generate import statement
   */
  private generateImport(imp: AikenImport): string {
    let result = `use ${imp.module}`;

    if (imp.alias) {
      result += ` as ${imp.alias}`;
    }

    if (imp.exposing && imp.exposing.length > 0) {
      result += `.{${imp.exposing.join(', ')}}`;
    }

    return result;
  }

  /**
   * Generate type definition
   */
  private generateType(type: AikenType): string {
    const lines: string[] = [];

    // Add docs
    if (type.docs && type.docs.length > 0) {
      type.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    // Check if this is a simple type alias (no braces in definition)
    const isSimpleAlias = !type.definition.includes('{') && !type.definition.includes('|');

    let typeDeclaration = '';
    if (type.isOpaque) {
      typeDeclaration += 'pub opaque type ';
    } else if (type.isPublic) {
      typeDeclaration += 'pub type ';
    } else {
      typeDeclaration += 'type ';
    }
    typeDeclaration += type.name;

    // Handle generic types
    if (type.typeParams && type.typeParams.length > 0) {
      typeDeclaration += `<${type.typeParams.join(', ')}>`;
    }

    if (isSimpleAlias) {
      // For simple type aliases, use = syntax
      typeDeclaration += ` = ${type.definition}`;
      lines.push(typeDeclaration);
    } else {
      // For complex types (records, unions), use { } syntax
      typeDeclaration += ' {';
      lines.push(typeDeclaration);

      // Parse the definition and convert to Aiken syntax
      const aikenDefinition = this.convertToAikenSyntax(type.definition);
      if (aikenDefinition.trim()) {
        lines.push(aikenDefinition);
      }
      lines.push('}');
    }

    return lines.join('\n');
  }

  /**
   * Convert TypeScript-like syntax to Aiken syntax
   */
  private convertToAikenSyntax(definition: string): string {
    // Handle record types (objects with properties)
    if (definition.includes('{') && definition.includes(':')) {
      // If it's already properly formatted, clean it up
      if (definition.startsWith('{') && definition.endsWith('}')) {
        // Extract content between braces
        const content = definition.slice(1, -1).trim();
        // Clean up formatting - ensure proper line breaks and indentation
        const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        return lines.join('\n');
      }
      // Otherwise, it's likely a type alias that doesn't need extra formatting
      return definition;
    }

    // Handle union types - they should be used directly
    if (definition.includes('|')) {
      return definition;
    }

    // Handle primitive types and type references - they should be used directly
    return definition;
  }

  /**
   * Generate constant definition
   */
  private generateConstant(constant: AikenConstant): string {
    const lines: string[] = [];

    // Add docs
    if (constant.docs && constant.docs.length > 0) {
      constant.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    let definition = '';
    if (constant.isPublic) {
      definition += 'pub ';
    }
    definition += `const ${constant.name}: ${constant.type} = ${constant.value}`;

    lines.push(definition);
    return lines.join('\n');
  }

  /**
   * Generate function definition
   */
  private generateFunction(func: AikenFunction): string {
    const lines: string[] = [];

    // Add docs
    if (func.docs && func.docs.length > 0) {
      func.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    let signature = '';
    if (func.isPublic) {
      signature += 'pub ';
    }
    signature += `fn ${func.name}`;

    if (func.typeParams && func.typeParams.length > 0) {
      signature += `<${func.typeParams.join(', ')}>`;
    }

    const params = func.parameters.map(p => `${p.name}: ${this.mapTypeToAiken(p.type)}`).join(', ');
    signature += `(${params}) -> ${this.mapTypeToAiken(func.returnType)}`;

    lines.push(signature);
    lines.push('{');

    // Convert function body from TypeScript to Aiken syntax
    let aikenBody = this.convertFunctionBodyToAiken(func.body);

    // If pipe expressions exist, replace the body with pipe expression
    if (func.pipeExpressions && func.pipeExpressions.length > 0) {
      // Use the first pipe expression as the main body
      const pipeExpr = func.pipeExpressions[0];
      aikenBody = this.generatePipeExpression(pipeExpr);
    }

    lines.push(aikenBody);

    // Generate additional when expressions if any (but not pipe expressions since we handled them above)
    if (func.whenExpressions && func.whenExpressions.length > 0) {
      func.whenExpressions.forEach(whenExpr => {
        lines.push('');
        lines.push(this.generateWhenExpression(whenExpr));
      });
    }

    // Don't generate pipe expressions separately since we handled them in the body
    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Convert function body from TypeScript to Aiken syntax
   */
  private convertFunctionBodyToAiken(body: string): string {
    return body
      .replace(/const\s+/g, 'let ') // Convert const to let
      .replace(/let\s+/g, 'let ') // Keep let as is
      .replace(/===\s*true/g, '') // Remove === true
      .replace(/===\s*false/g, ' == False') // Convert === false
      .replace(/===\s*([^f])/g, ' == $1') // Convert === to ==
      .replace(/!==\s*([^f])/g, ' != $1') // Convert !== to !=
      .replace(/&&/g, ' && ') // Ensure spaces around &&
      .replace(/\|\|/g, ' || ') // Ensure spaces around ||
      .replace(/!/g, ' !') // Ensure space before !
      .replace(/if\s*\(/g, 'if ') // Remove parentheses from if
      .replace(/\)\s*{/g, ' {') // Remove closing paren from if
      .replace(/else\s*if\s*\(/g, 'else if ') // Remove parentheses from else if
      .replace(/}\s*else\s*{/g, '} else {') // Clean up else
      .replace(/return\s+/g, '') // Remove return keyword (Aiken uses implicit return)
      .replace(/;/g, '') // Remove semicolons
      .replace(/undefined/g, 'None') // Convert undefined to None
      .replace(/null/g, 'None') // Convert null to None
      .replace(/Date\.now\(\)/g, 'get_current_time()') // Convert Date.now() to Aiken function
      .replace(/typeof\s+(\w+)\s*===\s*['"]string['"]/g, 'is_string($1)') // Convert typeof checks
      .replace(/typeof\s+(\w+)\s*===\s*['"]number['"]/g, 'is_int($1)') // Convert typeof checks
      .replace(/typeof\s+(\w+)\s*===\s*['"]boolean['"]/g, 'is_bool($1)') // Convert typeof checks
      .replace(/JSON\.stringify/g, 'to_string') // Convert JSON.stringify to Aiken function
      .replace(/\.\.\./g, '..') // Convert spread operator
      .replace(/`([^`]*)`/g, '"$1"') // Convert template literals to regular strings
      .replace(/(\w+)\.(\w+)/g, '$1.$2') // Keep property access as is
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/(\w+)\.hasOwnProperty\('([^']+)'\)/g, '$1 is $2') // Convert hasOwnProperty to pattern matching
      .replace(/(\w+)\.length/g, 'length($1)') // Convert .length to length() function
      .replace(/(\w+)\[(\d+)\]/g, 'index($1, $2)') // Convert array access to index function
      .trim();
  }

  /**
   * Map type names to Aiken equivalents
   */
  private mapTypeToAiken(typeName: string): string {
    switch (typeName) {
      case 'boolean':
        return 'Bool';
      case 'number':
        return 'Int';
      case 'string':
        return 'String';
      default:
        return typeName;
    }
  }

  /**
   * Generate test definition
   */
  private generateTest(test: AikenTest): string {
    const lines: string[] = [];

    // Add docs
    if (test.docs && test.docs.length > 0) {
      test.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    lines.push(`test ${test.name}() {`);
    lines.push(test.body);
    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate when expression
   */
  private generateWhenExpression(whenExpr: AikenWhenExpression): string {
    const lines: string[] = [];

    lines.push(`when ${whenExpr.expression} {`);
    whenExpr.clauses.forEach(clause => {
      const pattern = this.generatePattern(clause.pattern);
      const guard = clause.guard ? ` if ${clause.guard}` : '';
      lines.push(`  ${pattern}${guard} => ${clause.body.replace(/\/\/ matched /, '')},`);
    });
    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate pattern for when clause
   */
  private generatePattern(pattern: any): string {
    switch (pattern.type) {
      case 'wildcard':
        return '_';
      case 'literal':
        return pattern.value;
      case 'variable':
        return pattern.name!;
      case 'constructor':
        if (pattern.constructor === 'Ok') {
          return 'Ok(value)';
        } else if (pattern.constructor === 'Error') {
          return 'Error(error)';
        } else if (pattern.constructor === 'Some') {
          return 'Some(value)';
        } else if (pattern.constructor === 'None') {
          return 'None';
        }
        return `${pattern.constructor}(${pattern.args?.map((arg: any) => this.generatePattern(arg)).join(', ') || ''})`;
      case 'tuple':
        return `(${pattern.args?.map((arg: any) => this.generatePattern(arg)).join(', ') || ''})`;
      case 'list':
        return `[${pattern.args?.map((arg: any) => this.generatePattern(arg)).join(', ') || ''}]`;
      default:
        return pattern.value || '_';
    }
  }

  /**
   * Generate pipe expression
   */
  private generatePipeExpression(pipeExpr: AikenPipeExpression): string {
    const lines: string[] = [];

    let currentValue = pipeExpr.initialValue;
    pipeExpr.operations.forEach((op) => {
      if (op.args && op.args.length > 0) {
        currentValue = `${op.functionName}(${currentValue}, ${op.args.join(', ')})`;
      } else {
        currentValue = `${op.functionName}(${currentValue})`;
      }
    });

    lines.push(currentValue);
    return lines.join('\n');
  }
}
