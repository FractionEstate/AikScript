import * as ts from 'typescript';
import { BuiltinRegistry } from './builtins';
/**
 * Expression transformation utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript expressions to Aiken expressions
 */
export declare class ExpressionTransformer {
    private builtinRegistry;
    constructor(builtinRegistry: BuiltinRegistry);
    /**
     * Transform a TypeScript expression to Aiken expression string
     */
    transformExpression(expression: ts.Expression): string;
    private transformBinaryExpression;
    private transformPropertyAccessExpression;
    /**
     * Transform a call expression (function call)
     */
    private transformCallExpression;
    private transformIdentifier;
    private transformElementAccessExpression;
    private transformObjectLiteralExpression;
    private transformArrayLiteralExpression;
    private transformOperator;
}
//# sourceMappingURL=expressions.d.ts.map