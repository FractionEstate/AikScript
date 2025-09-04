import { BuiltinRegistry } from './builtins';
import { ExpressionTransformer } from './expressions';
import { CodeGenerator } from './generator';
import { ContractDefinition, TranspilerAST, TypeScriptParser } from './parser';
import { AikenAST, AikenContract, AikenDatum, AikenType } from './transpiler';
import { TypeMapper } from './types';
import { ValidatorTransformer } from './validators';

/**
 * Main transformation orchestrator for TypeScript-to-Aiken transpiler
 * This module coordinates all the transformation steps
 */

export class AikenTransformer {
  private parser: TypeScriptParser;
  private builtinRegistry: BuiltinRegistry;
  private typeMapper: TypeMapper;
  private expressionTransformer: ExpressionTransformer;
  private validatorTransformer: ValidatorTransformer;
  private codeGenerator: CodeGenerator;

  constructor() {
    this.parser = new TypeScriptParser();
    this.builtinRegistry = new BuiltinRegistry();
    this.typeMapper = TypeMapper;
    this.expressionTransformer = new ExpressionTransformer(this.builtinRegistry);
    this.validatorTransformer = new ValidatorTransformer(this.expressionTransformer);
    this.codeGenerator = new CodeGenerator(this.builtinRegistry);
  }

  /**
   * Parse TypeScript source code
   */
  parse(sourceCode: string): TranspilerAST {
    return this.parser.parseSource(sourceCode);
  }

  /**
   * Transform TranspilerAST to AikenAST
   */
  transform(ast: TranspilerAST): AikenAST {
    // Reset builtin tracking for new transformation
    this.builtinRegistry.reset();

    const contracts = ast.contracts.map(contract => this.transformContract(contract));
    const types = ast.types.map(type => this.transformType(type));

    return {
      contracts,
      types,
    };
  }

  /**
   * Generate Aiken code from AikenAST
   */
  generate(ast: AikenAST): string {
    return this.codeGenerator.generate(ast);
  }

  /**
   * Transform a single contract
   */
  private transformContract(contract: ContractDefinition): AikenContract {
    const datums = contract.datums.map(datum => this.transformDatum(datum));
    const validators = contract.validators.map(validator =>
      this.validatorTransformer.transformValidator(validator, datums)
    );

    return {
      name: contract.name,
      datums,
      validators,
    };
  }

  /**
   * Transform a single datum
   */
  private transformDatum(datum: any): AikenDatum {
    const fields: any[] = [];

    // Extract fields from interface
    if (datum.interfaceDeclaration.members) {
      for (const member of datum.interfaceDeclaration.members) {
        if (member.name && member.type) {
          const fieldName = member.name.getText();
          const fieldType = TypeMapper.transformTypeNode(member.type);
          fields.push({ name: fieldName, type: fieldType });
        }
      }
    }

    return {
      name: datum.name,
      fields,
    };
  }

  /**
   * Transform a single type
   */
  private transformType(type: any): AikenType {
    const definition = TypeMapper.transformTypeDefinition(type);

    return {
      name: type.name,
      definition,
    };
  }

  /**
   * Get the builtin registry for external access
   */
  getBuiltinRegistry(): BuiltinRegistry {
    return this.builtinRegistry;
  }
}
