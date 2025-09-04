import * as ts from 'typescript';
import { BuiltinRegistry } from './builtins';

/**
 * Expression transformation utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript expressions to Aiken expressions
 */

export class ExpressionTransformer {
  private builtinRegistry: BuiltinRegistry;

  constructor(builtinRegistry: BuiltinRegistry) {
    this.builtinRegistry = builtinRegistry;
  }

  /**
   * Transform a TypeScript expression to Aiken expression string
   */
  transformExpression(expression: ts.Expression): string {
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

    if (
      expression.kind === ts.SyntaxKind.TrueKeyword ||
      expression.kind === ts.SyntaxKind.FalseKeyword
    ) {
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

  private transformBinaryExpression(expression: ts.BinaryExpression): string {
    const left = this.transformExpression(expression.left);
    const right = this.transformExpression(expression.right);
    const operator = this.transformOperator(expression.operatorToken);

    // Handle logical operators specially for Aiken syntax
    if (operator === '&&' || operator === '||') {
      return `${left} ${operator} ${right}`;
    }

    return `${left} ${operator} ${right}`;
  }

  private transformPropertyAccessExpression(expression: ts.PropertyAccessExpression): string {
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
  private transformCallExpression(expression: ts.CallExpression): string {
    const callee = this.transformExpression(expression.expression);
    const args = expression.arguments
      .map((arg: ts.Expression) => this.transformExpression(arg))
      .join(', ');

    // Check if this is a builtin function call
    const builtinMapping = this.builtinRegistry.getMapping(callee);
    if (builtinMapping) {
      return `${builtinMapping.aikenName}(${args})`;
    }

    return `${callee}(${args})`;
  }

  private transformIdentifier(expression: ts.Identifier): string {
    // Handle special case for transaction access
    if (expression.text === 'tx') {
      return 'ctx.transaction';
    }
    return expression.text;
  }

  private transformElementAccessExpression(expression: ts.ElementAccessExpression): string {
    const obj = this.transformExpression(expression.expression);
    const index = this.transformExpression(expression.argumentExpression);
    return `${obj}[${index}]`;
  }

  private transformObjectLiteralExpression(expression: ts.ObjectLiteralExpression): string {
    // For Aiken, we might need to convert to record syntax or data constructors
    const properties = expression.properties
      .filter((prop): prop is ts.PropertyAssignment => ts.isPropertyAssignment(prop))
      .map(prop => {
        const name = prop.name.getText();
        const value = this.transformExpression(prop.initializer);
        return `${name}: ${value}`;
      })
      .join(', ');

    return `{ ${properties} }`;
  }

  private transformArrayLiteralExpression(expression: ts.ArrayLiteralExpression): string {
    const elements = expression.elements.map(elem => this.transformExpression(elem)).join(', ');
    return `[${elements}]`;
  }

  private transformOperator(operator: ts.BinaryOperatorToken): string {
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
