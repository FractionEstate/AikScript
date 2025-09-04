// Main code generation orchestrator for AikScript
// Following aiken-lang patterns for modular organization

import { BuiltinRegistry } from '../types/builtins';
import {
  AikenAST,
} from '../transpiler';
import { ImportGenerator } from './imports/index';
import { TypeGenerator } from './types/index';
import { ConstantGenerator } from './constants/index';
import { FunctionGenerator } from './functions/index';
import { TestGenerator } from './tests/index';

/**
 * Main code generation orchestrator
 * Coordinates all specialized generators to produce Aiken code
 */
export class CodeGenerator {
  private builtinRegistry: BuiltinRegistry;
  private importGenerator: ImportGenerator;
  private typeGenerator: TypeGenerator;
  private constantGenerator: ConstantGenerator;
  private functionGenerator: FunctionGenerator;
  private testGenerator: TestGenerator;

  constructor(builtinRegistry: BuiltinRegistry) {
    this.builtinRegistry = builtinRegistry;
    this.importGenerator = new ImportGenerator();
    this.typeGenerator = new TypeGenerator();
    this.constantGenerator = new ConstantGenerator();
    this.functionGenerator = new FunctionGenerator();
    this.testGenerator = new TestGenerator();
  }

  /**
   * Generate Aiken code from AikenAST
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
        lines.push(this.importGenerator.generate(imp));
      });

      if (ast.imports.length > 0) {
        lines.push('');
      }

      // Generate types
      ast.types.forEach(type => {
        lines.push(this.typeGenerator.generate(type));
        lines.push('');
      });

      // Generate constants
      ast.constants.forEach(constant => {
        lines.push(this.constantGenerator.generate(constant));
        lines.push('');
      });

      // Generate functions
      ast.functions.forEach(func => {
        lines.push(this.functionGenerator.generate(func));
        lines.push('');
      });

      // Generate tests
      ast.tests.forEach(test => {
        lines.push(this.testGenerator.generate(test));
        lines.push('');
      });

      return lines.join('\n');
    } catch (error) {
      throw new Error(`Failed to generate Aiken code: ${(error as Error).message}`);
    }
  }
}
