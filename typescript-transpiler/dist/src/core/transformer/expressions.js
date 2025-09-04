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
exports.ExpressionTransformer = void 0;
const ts = __importStar(require("typescript"));
/**
 * Expression transformation utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript expressions to Aiken expressions
 */
class ExpressionTransformer {
    constructor(builtinRegistry) {
        this.builtinRegistry = builtinRegistry;
    }
    /**
     * Transform a TypeScript expression to Aiken expression string
     */
    transformExpression(expression) {
        if (ts.isBinaryExpression(expression)) {
            return this.transformBinaryExpression(expression);
        }
        if (ts.isPropertyAccessExpression(expression)) {
            return this.transformPropertyAccessExpression(expression);
        }
        if (ts.isCallExpression(expression)) {
            return this.transformCallExpression(expression);
        }
        if (ts.isIdentifier(expression)) {
            return this.transformIdentifier(expression);
        }
        if (ts.isStringLiteral(expression)) {
            return `"${expression.text}"`;
        }
        if (ts.isNumericLiteral(expression)) {
            return expression.text;
        }
        if (expression.kind === ts.SyntaxKind.TrueKeyword ||
            expression.kind === ts.SyntaxKind.FalseKeyword) {
            return expression.kind === ts.SyntaxKind.TrueKeyword ? 'True' : 'False';
        }
        if (ts.isParenthesizedExpression(expression)) {
            return `(${this.transformExpression(expression.expression)})`;
        }
        if (ts.isElementAccessExpression(expression)) {
            return this.transformElementAccessExpression(expression);
        }
        if (ts.isObjectLiteralExpression(expression)) {
            return this.transformObjectLiteralExpression(expression);
        }
        if (ts.isArrayLiteralExpression(expression)) {
            return this.transformArrayLiteralExpression(expression);
        }
        return 'unknown_expression';
    }
    transformBinaryExpression(expression) {
        const left = this.transformExpression(expression.left);
        const right = this.transformExpression(expression.right);
        const operator = this.transformOperator(expression.operatorToken);
        // Handle logical operators specially for Aiken syntax
        if (operator === '&&' || operator === '||') {
            return `${left} ${operator} ${right}`;
        }
        return `${left} ${operator} ${right}`;
    }
    transformPropertyAccessExpression(expression) {
        const obj = this.transformExpression(expression.expression);
        const prop = expression.name.text;
        // Handle special case for transaction access through context
        if (obj === 'tx') {
            return `ctx.transaction.${prop}`;
        }
        // Check for builtin function calls like Math.abs, Buffer.from, etc.
        const fullName = `${obj}.${prop}`;
        const builtinMapping = this.builtinRegistry.getMapping(fullName);
        if (builtinMapping) {
            return builtinMapping.aikenName;
        }
        return `${obj}.${prop}`;
    }
    /**
     * Transform a call expression (function call)
     */
    transformCallExpression(expression) {
        const callee = this.transformExpression(expression.expression);
        const args = expression.arguments
            .map((arg) => this.transformExpression(arg))
            .join(', ');
        // Check if this is a builtin function call
        const builtinMapping = this.builtinRegistry.getMapping(callee);
        if (builtinMapping) {
            return `${builtinMapping.aikenName}(${args})`;
        }
        return `${callee}(${args})`;
    }
    transformIdentifier(expression) {
        // Handle special case for transaction access
        if (expression.text === 'tx') {
            return 'ctx.transaction';
        }
        return expression.text;
    }
    transformElementAccessExpression(expression) {
        const obj = this.transformExpression(expression.expression);
        const index = this.transformExpression(expression.argumentExpression);
        return `${obj}[${index}]`;
    }
    transformObjectLiteralExpression(expression) {
        // For Aiken, we might need to convert to record syntax or data constructors
        const properties = expression.properties
            .filter((prop) => ts.isPropertyAssignment(prop))
            .map(prop => {
            const name = prop.name.getText();
            const value = this.transformExpression(prop.initializer);
            return `${name}: ${value}`;
        })
            .join(', ');
        return `{ ${properties} }`;
    }
    transformArrayLiteralExpression(expression) {
        const elements = expression.elements.map(elem => this.transformExpression(elem)).join(', ');
        return `[${elements}]`;
    }
    transformOperator(operator) {
        switch (operator.kind) {
            case ts.SyntaxKind.PlusToken:
                return '+';
            case ts.SyntaxKind.MinusToken:
                return '-';
            case ts.SyntaxKind.AsteriskToken:
                return '*';
            case ts.SyntaxKind.SlashToken:
                return '/';
            case ts.SyntaxKind.EqualsEqualsToken:
                return '==';
            case ts.SyntaxKind.ExclamationEqualsToken:
                return '!=';
            case ts.SyntaxKind.LessThanToken:
                return '<';
            case ts.SyntaxKind.GreaterThanToken:
                return '>';
            case ts.SyntaxKind.AmpersandAmpersandToken:
                return '&&';
            case ts.SyntaxKind.BarBarToken:
                return '||';
            default:
                return operator.getText();
        }
    }
}
exports.ExpressionTransformer = ExpressionTransformer;
//# sourceMappingURL=expressions.js.map