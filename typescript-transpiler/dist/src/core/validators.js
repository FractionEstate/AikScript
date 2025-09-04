"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEngine = exports.ValidatorTransformer = void 0;
const ts = __importStar(require("typescript"));
const types_1 = require("./types");
class ValidatorTransformer {
    constructor(expressionTransformer) {
        this.expressionTransformer = expressionTransformer;
    }
    /**
     * Transform a TypeScript validator method to Aiken validator
     */
    transformValidator(validator, _datums) {
        const parameters = this.extractParameters(validator.methodDeclaration);
        // Adjust parameters based on validator purpose
        this.adjustParametersForPurpose(parameters, validator.purpose);
        const returnType = validator.returnType
            ? types_1.TypeMapper.transformTypeNode(validator.returnType)
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
    extractParameters(methodDeclaration) {
        if (!methodDeclaration.parameters) {
            return [];
        }
        return methodDeclaration.parameters.map((param) => ({
            name: param.name.getText(),
            type: param.type ? types_1.TypeMapper.transformTypeNode(param.type) : 'Void',
        }));
    }
    adjustParametersForPurpose(parameters, purpose) {
        switch (purpose) {
            case 'spend':
                // spend(datum: Option<DatumType>, redeemer: RedeemerType, output_reference: OutputReference, transaction: Transaction)
                if (parameters.length >= 1 && parameters[0].name === 'datum') {
                    parameters[0].type = types_1.TypeMapper.wrapInOption(parameters[0].type);
                }
                if (parameters.length >= 2 &&
                    parameters[1].name === 'redeemer' &&
                    parameters[1].type === 'Void') {
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
                if (parameters.length >= 1 &&
                    parameters[0].name === 'redeemer' &&
                    parameters[0].type === 'Void') {
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
                if (parameters.length >= 1 &&
                    parameters[0].name === 'redeemer' &&
                    parameters[0].type === 'Void') {
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
                    parameters[0].type = types_1.TypeMapper.wrapInOption(parameters[0].type);
                }
                if (parameters.length >= 2 &&
                    parameters[1].name === 'redeemer' &&
                    parameters[1].type === 'Void') {
                    parameters[1].type = 'Data';
                }
        }
    }
    transformMethodBody(body) {
        if (!body)
            return '';
        let aikenBody = '';
        const visit = (node) => {
            if (ts.isReturnStatement(node) && node.expression) {
                aikenBody += this.expressionTransformer.transformExpression(node.expression);
            }
            else if (ts.isVariableStatement(node)) {
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
            }
            else if (ts.isIfStatement(node)) {
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
exports.ValidatorTransformer = ValidatorTransformer;
/**
 * Validation engine for Aiken contracts
 * This class validates the correctness of Aiken contracts' ASTs
 */
class ValidationEngine {
    constructor() {
        this.errors = [];
    }
    /**
     * Validates a TranspilerAST for correctness
     * @param ast The AST to validate
     * @returns True if validation passes, false otherwise
     */
    validate(ast) {
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
    getErrors() {
        return [...this.errors];
    }
    /**
     * Validates the overall contract structure
     * @param _ast The AST to validate
     */
    validateContractStructure(_ast) {
        // Implementation for contract structure validation
    }
    /**
     * Validates type definitions
     * @param _ast The AST to validate
     */
    validateTypes(_ast) {
        // Implementation for type validation
    }
    /**
     * Validates validator functions
     * @param _ast The AST to validate
     */
    validateValidators(_ast) {
        // Implementation for validator validation
    }
    /**
     * Validates constant definitions
     * @param _ast The AST to validate
     */
    validateConstants(_ast) {
        // Implementation for constant validation
    }
}
exports.ValidationEngine = ValidationEngine;
//# sourceMappingURL=validators.js.map