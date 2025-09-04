import * as ts from 'typescript';
import { ExpressionTransformer } from './expressions';
import { AikenParameter, AikenValidator } from './transpiler';
import { TypeMapper } from './types';
import { TranspilerAST } from './parser';

/**
 * Validator transformation utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript validator methods to Aiken validators
 */

export interface ValidationError {
  message: string;
  line?: number;
  column?: number;
}

export class ValidatorTransformer {
  private expressionTransformer: ExpressionTransformer;

  constructor(expressionTransformer: ExpressionTransformer) {
    this.expressionTransformer = expressionTransformer;
  }

  /**
   * Transform a TypeScript validator method to Aiken validator
   */
  transformValidator(validator: any, _datums: any[]): AikenValidator {
    const parameters = this.extractParameters(validator.methodDeclaration);

    // Adjust parameters based on validator purpose
    this.adjustParametersForPurpose(parameters, validator.purpose);

    const returnType = validator.returnType
      ? TypeMapper.transformTypeNode(validator.returnType)
      : 'Bool';

    // Transform method body
    const body = this.transformMethodBody(validator.methodDeclaration.body);

    return {
      name: validator.name,
      purpose: validator.purpose,
      parameters,
      returnType,
      body,
    };
  }

  private extractParameters(methodDeclaration: ts.MethodDeclaration): AikenParameter[] {
    if (!methodDeclaration.parameters) {
      return [];
    }

    return methodDeclaration.parameters.map((param: ts.ParameterDeclaration) => ({
      name: param.name.getText(),
      type: param.type ? TypeMapper.transformTypeNode(param.type) : 'Void',
    }));
  }

  private adjustParametersForPurpose(parameters: AikenParameter[], purpose: string): void {
    switch (purpose) {
      case 'spend':
        // spend(datum: Option<DatumType>, redeemer: RedeemerType, output_reference: OutputReference, transaction: Transaction)
        if (parameters.length >= 1 && parameters[0].name === 'datum') {
          parameters[0].type = TypeMapper.wrapInOption(parameters[0].type);
        }
        if (
          parameters.length >= 2 &&
          parameters[1].name === 'redeemer' &&
          parameters[1].type === 'Void'
        ) {
          parameters[1].type = 'Data';
        }
        // Add output_reference and transaction if not present
        if (parameters.length < 3) {
          parameters.push({ name: 'output_reference', type: 'OutputReference' });
        }
        if (parameters.length < 4) {
          parameters.push({ name: 'transaction', type: 'Transaction' });
        }
        break;

      case 'mint':
        // mint(redeemer: RedeemerType, policy_id: PolicyId, transaction: Transaction)
        if (
          parameters.length >= 1 &&
          parameters[0].name === 'redeemer' &&
          parameters[0].type === 'Void'
        ) {
          parameters[0].type = 'Data';
        }
        // Add policy_id and transaction if not present
        if (parameters.length < 2) {
          parameters.push({ name: 'policy_id', type: 'PolicyId' });
        }
        if (parameters.length < 3) {
          parameters.push({ name: 'transaction', type: 'Transaction' });
        }
        break;

      case 'withdraw':
        // withdraw(redeemer: RedeemerType, credential: Credential, transaction: Transaction)
        if (
          parameters.length >= 1 &&
          parameters[0].name === 'redeemer' &&
          parameters[0].type === 'Void'
        ) {
          parameters[0].type = 'Data';
        }
        // Add credential and transaction if not present
        if (parameters.length < 2) {
          parameters.push({ name: 'credential', type: 'Credential' });
        }
        if (parameters.length < 3) {
          parameters.push({ name: 'transaction', type: 'Transaction' });
        }
        break;

      case 'publish':
        // publish has no parameters
        parameters.length = 0;
        break;

      default:
        // For unknown purposes, keep original parameters but ensure datum is Option-wrapped
        if (parameters.length >= 1 && parameters[0].name === 'datum') {
          parameters[0].type = TypeMapper.wrapInOption(parameters[0].type);
        }
        if (
          parameters.length >= 2 &&
          parameters[1].name === 'redeemer' &&
          parameters[1].type === 'Void'
        ) {
          parameters[1].type = 'Data';
        }
    }
  }

  private transformMethodBody(body: ts.Block | undefined): string {
    if (!body) return '';

    let aikenBody = '';

    const visit = (node: ts.Node) => {
      if (ts.isReturnStatement(node) && node.expression) {
        aikenBody += this.expressionTransformer.transformExpression(node.expression);
      } else if (ts.isVariableStatement(node)) {
        // Handle variable declarations
        for (const declaration of node.declarationList.declarations) {
          if (declaration.initializer && ts.isPropertyAccessExpression(declaration.initializer)) {
            // Handle simple property access assignments like: const tx = ctx.transaction
            const varName = declaration.name.getText();
            const propAccess = declaration.initializer;
            const obj = this.expressionTransformer.transformExpression(propAccess.expression);
            const prop = propAccess.name.text;

            // For now, we'll create a simple substitution map
            // In a more complete implementation, we'd track variable scopes
            if (varName === 'tx' && obj === 'ctx' && prop === 'transaction') {
              // Replace 'tx' with 'ctx.transaction' in the output
              // This is a simplified approach
              aikenBody = aikenBody.replace(/\btx\b/g, 'ctx.transaction');
            }
          }
        }
      } else if (ts.isIfStatement(node)) {
        aikenBody += `if ${this.expressionTransformer.transformExpression(node.expression)} {\n`;
        if (node.thenStatement) {
          visit(node.thenStatement);
        }
        aikenBody += '\n}';
        if (node.elseStatement) {
          aikenBody += ' else {\n';
          visit(node.elseStatement);
          aikenBody += '\n}';
        }
      }
      // Add more node types as needed

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(body, visit);

    return aikenBody;
  }
}

/**
 * Validation engine for Aiken contracts
 * This class validates the correctness of Aiken contracts' ASTs
 */
export class ValidationEngine {
  private errors: ValidationError[] = [];

  /**
   * Validates a TranspilerAST for correctness
   * @param ast The AST to validate
   * @returns True if validation passes, false otherwise
   */
  validate(ast: TranspilerAST): boolean {
    this.errors = [];

    this.validateContractStructure(ast);
    this.validateTypes(ast);
    this.validateValidators(ast);
    this.validateConstants(ast);

    return this.errors.length === 0;
  }

  /**
   * Gets all validation errors
   * @returns Array of validation errors
   */
  getErrors(): ValidationError[] {
    return [...this.errors];
  }

  /**
   * Validates the overall contract structure
   * @param _ast The AST to validate
   */
  private validateContractStructure(_ast: TranspilerAST): void {
    // Implementation for contract structure validation
  }

  /**
   * Validates type definitions
   * @param _ast The AST to validate
   */
  private validateTypes(_ast: TranspilerAST): void {
    // Implementation for type validation
  }

  /**
   * Validates validator functions
   * @param _ast The AST to validate
   */
  private validateValidators(_ast: TranspilerAST): void {
    // Implementation for validator validation
  }

  /**
   * Validates constant definitions
   * @param _ast The AST to validate
   */
  private validateConstants(_ast: TranspilerAST): void {
    // Implementation for constant validation
  }
}
