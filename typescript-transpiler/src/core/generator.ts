import { BuiltinRegistry } from './builtins';
import {
  AikenAST,
  AikenImport,
  AikenType,
  AikenConstant,
  AikenFunction,
  AikenTest
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

    lines.push(type.definition);
    return lines.join('\n');
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

    const params = func.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
    signature += `(${params}) -> ${func.returnType}`;

    lines.push(signature);
    lines.push('{');
    lines.push(func.body);
    lines.push('}');

    return lines.join('\n');
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
}
