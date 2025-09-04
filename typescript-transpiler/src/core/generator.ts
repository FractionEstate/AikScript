import { BuiltinRegistry } from './builtins';
import { AikenAST, AikenContract, AikenValidator, AikenParameter } from './transpiler';

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
   */
  generate(ast: AikenAST): string {
    let output = '';

    // Add builtin imports if any are used
    const usedImports = this.builtinRegistry.getUsedImports();
    if (usedImports.length > 0) {
      output += `use aiken/builtin.{${usedImports.join(', ')}}\n\n`;
    }

    // Generate type definitions
    for (const type of ast.types) {
      output += type.definition + '\n\n';
    }

    // Generate contracts
    for (const contract of ast.contracts) {
      output += this.generateContract(contract) + '\n\n';
    }

    return output;
  }

  /**
   * Generate Aiken contract code
   */
  private generateContract(contract: AikenContract): string {
    let output = `// Contract: ${contract.name}\n`;

    // Generate datums
    for (const datum of contract.datums) {
      output += this.generateDatum(datum);
    }

    // Generate validators
    if (contract.validators.length > 0) {
      output += `validator ${contract.name} {\n`;

      for (const validator of contract.validators) {
        output += this.generateValidator(validator);
      }

      output += `}\n\n`;
    }

    return output;
  }

  /**
   * Generate Aiken datum type definition
   */
  private generateDatum(datum: { name: string; fields: AikenParameter[] }): string {
    // Convert to PascalCase for Aiken type naming convention
    const typeName = datum.name.charAt(0).toUpperCase() + datum.name.slice(1);
    let output = `pub type ${typeName} {\n`;

    for (const field of datum.fields) {
      output += `  ${field.name}: ${field.type},\n`;
    }

    output += '}\n\n';
    return output;
  }

  /**
   * Generate Aiken validator function
   */
  private generateValidator(validator: AikenValidator): string {
    const params = validator.parameters.map((p: AikenParameter) => `${p.name}: ${p.type}`).join(', ');

    let output = '';

    // Use the actual method name from TypeScript source
    output += `  fn ${validator.name}(${params}) {\n`;

    output += `    ${validator.body}\n`;
    output += `  }\n`;

    return output;
  }

  /**
   * Generate import statements for builtin functions
   */
  generateBuiltinImports(): string {
    const usedImports = this.builtinRegistry.getUsedImports();
    if (usedImports.length === 0) {
      return '';
    }

    return `use aiken/builtin.{${usedImports.join(', ')}}\n\n`;
  }

  /**
   * Generate type definitions
   */
  generateTypeDefinitions(types: any[]): string {
    return types.map(type => type.definition).join('\n\n') + '\n\n';
  }

  /**
   * Generate contract definitions
   */
  generateContractDefinitions(contracts: AikenContract[]): string {
    return contracts.map(contract => this.generateContract(contract)).join('\n\n');
  }
}
