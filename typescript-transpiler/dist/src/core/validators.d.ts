import * as ts from 'typescript';
import { ExpressionTransformer } from './expressions';
import { AikenValidator } from './transpiler';
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
export interface ValidatorDefinition {
    name: string;
    purpose: string;
    methodDeclaration: ts.MethodDeclaration;
    returnType?: ts.TypeNode;
}
export declare class ValidatorTransformer {
    private expressionTransformer;
    constructor(expressionTransformer: ExpressionTransformer);
    /**
     * Transform a TypeScript validator method to Aiken validator
     */
    transformValidator(validator: ValidatorDefinition, _datums: unknown[]): AikenValidator;
    private extractParameters;
    private adjustParametersForPurpose;
    private transformMethodBody;
}
/**
 * Validation engine for Aiken contracts
 * This class validates the correctness of Aiken contracts' ASTs
 */
export declare class ValidationEngine {
    private errors;
    /**
     * Validates a TranspilerAST for correctness
     * @param ast The AST to validate
     * @returns True if validation passes, false otherwise
     */
    validate(ast: TranspilerAST): boolean;
    /**
     * Gets all validation errors
     * @returns Array of validation errors
     */
    getErrors(): ValidationError[];
    /**
     * Validates the overall contract structure
     * @param _ast The AST to validate
     */
    private validateContractStructure;
    /**
     * Validates type definitions
     * @param _ast The AST to validate
     */
    private validateTypes;
    /**
     * Validates validator functions
     * @param _ast The AST to validate
     */
    private validateValidators;
    /**
     * Validates constant definitions
     * @param _ast The AST to validate
     */
    private validateConstants;
}
//# sourceMappingURL=validators.d.ts.map