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
exports.FunctionParser = void 0;
const ts = __importStar(require("typescript"));
/**
 * Parser for function declarations and method declarations
 */
class FunctionParser {
    /**
     * Parses a function declaration
     */
    parseFunctionDeclaration(node) {
        const result = {
            type: 'function',
            name: node.name?.text || 'anonymous',
            node,
            children: []
        };
        // Parse function parameters
        if (node.parameters) {
            result.children.push(...node.parameters.map(param => ({
                type: 'parameter',
                name: param.name.getText(),
                node: param,
                children: []
            })));
        }
        // Parse function body
        if (node.body) {
            result.children.push({
                type: 'body',
                name: 'body',
                node: node.body,
                children: []
            });
        }
        return result;
    }
    /**
     * Parses a method declaration
     */
    parseMethodDeclaration(node) {
        const result = {
            type: 'method',
            name: node.name.getText(),
            node,
            children: []
        };
        // Parse method parameters
        if (node.parameters) {
            result.children.push(...node.parameters.map(param => ({
                type: 'parameter',
                name: param.name.getText(),
                node: param,
                children: []
            })));
        }
        // Parse method body
        if (node.body) {
            result.children.push({
                type: 'body',
                name: 'body',
                node: node.body,
                children: []
            });
        }
        return result;
    }
    /**
     * Checks if a method is a validator method (has @validator decorator)
     */
    isValidatorMethod(node) {
        const decorators = ts.getDecorators(node);
        if (!decorators)
            return false;
        return decorators.some(decorator => {
            if (ts.isCallExpression(decorator.expression)) {
                const expression = decorator.expression.expression;
                return ts.isIdentifier(expression) && expression.text === 'validator';
            }
            return false;
        });
    }
    /**
     * Gets the validator name from the @validator decorator
     */
    getValidatorName(node) {
        const decorators = ts.getDecorators(node);
        if (!decorators)
            return null;
        for (const decorator of decorators) {
            if (ts.isCallExpression(decorator.expression)) {
                const expression = decorator.expression.expression;
                if (ts.isIdentifier(expression) && expression.text === 'validator') {
                    const args = decorator.expression.arguments;
                    if (args.length > 0 && ts.isStringLiteral(args[0])) {
                        return args[0].text;
                    }
                }
            }
        }
        return null;
    }
    /**
     * Parses validator method parameters
     */
    parseValidatorParameters(node) {
        const results = [];
        if (node.parameters.length >= 3) {
            // datum parameter
            results.push({
                type: 'validator_param',
                name: 'datum',
                node: node.parameters[0],
                children: []
            });
            // redeemer parameter
            results.push({
                type: 'validator_param',
                name: 'redeemer',
                node: node.parameters[1],
                children: []
            });
            // context parameter
            results.push({
                type: 'validator_param',
                name: 'context',
                node: node.parameters[2],
                children: []
            });
        }
        return results;
    }
    /**
     * Parses a function declaration (alias for parseFunctionDeclaration)
     */
    parseFunction(node) {
        if (ts.isFunctionDeclaration(node)) {
            const result = this.parseFunctionDeclaration(node);
            return this.convertToFunctionDefinition(result);
        }
        else {
            const result = this.parseMethodDeclaration(node);
            return this.convertToFunctionDefinition(result);
        }
    }
    /**
     * Parses a validator method
     */
    parseValidator(node) {
        const validatorName = this.getValidatorName(node) || 'validator';
        return {
            name: validatorName,
            parameters: this.parseValidatorParameters(node).map(param => ({
                name: param.name,
                type: 'unknown' // Will be resolved by type checker
            })),
            returnType: 'Bool',
            body: node.body ? node.body.getText() : '',
            isPublic: true,
            docs: []
        };
    }
    /**
     * Converts ParserResult to FunctionDefinition
     */
    convertToFunctionDefinition(result) {
        const bodyNode = result.children.find(child => child.type === 'body')?.node;
        return {
            name: result.name,
            parameters: result.children
                .filter(child => child.type === 'parameter')
                .map(param => ({
                name: param.name,
                type: 'unknown' // Will be resolved by type checker
            })),
            returnType: 'unknown',
            body: bodyNode ? bodyNode.getText() : '',
            isPublic: true,
            docs: []
        };
    }
}
exports.FunctionParser = FunctionParser;
//# sourceMappingURL=function-parser.js.map