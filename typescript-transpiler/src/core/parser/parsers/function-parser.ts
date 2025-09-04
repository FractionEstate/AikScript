import * as ts from 'typescript';
import { ParserResult, FunctionDefinition } from '../interfaces/index';

/**
 * Parser for function declarations and method declarations
 */
export class FunctionParser {
  /**
   * Parses a function declaration
   */
  parseFunctionDeclaration(node: ts.FunctionDeclaration): ParserResult {
    const result: ParserResult = {
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
  parseMethodDeclaration(node: ts.MethodDeclaration): ParserResult {
    const result: ParserResult = {
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
  isValidatorMethod(node: ts.MethodDeclaration): boolean {
    const decorators = ts.getDecorators(node);
    if (!decorators) return false;

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
  getValidatorName(node: ts.MethodDeclaration): string | null {
    const decorators = ts.getDecorators(node);
    if (!decorators) return null;

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
  parseValidatorParameters(node: ts.MethodDeclaration): ParserResult[] {
    const results: ParserResult[] = [];

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
  parseFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration): FunctionDefinition {
    if (ts.isFunctionDeclaration(node)) {
      const result = this.parseFunctionDeclaration(node);
      return this.convertToFunctionDefinition(result);
    } else {
      const result = this.parseMethodDeclaration(node);
      return this.convertToFunctionDefinition(result);
    }
  }

  /**
   * Parses a validator method
   */
  parseValidator(node: ts.MethodDeclaration): FunctionDefinition {
    const validatorName = this.getValidatorName(node) || 'validator';

    return {
      name: validatorName,
      parameters: this.parseValidatorParameters(node).map(param => ({
        name: param.name,
        type: 'unknown' // Will be resolved by type checker
      })),
      returnType: 'Bool',
      body: node.body ? (node.body as ts.Node).getText() : '',
      isPublic: true,
      docs: []
    };
  }

  /**
   * Converts ParserResult to FunctionDefinition
   */
  private convertToFunctionDefinition(result: ParserResult): FunctionDefinition {
    const bodyNode = result.children.find(child => child.type === 'body')?.node as ts.Node;

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
