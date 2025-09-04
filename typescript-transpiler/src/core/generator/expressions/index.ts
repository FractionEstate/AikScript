// Expression generation for AikScript
// Following aiken-lang patterns for modular organization

import {
  AikenWhenExpression,
  AikenPipeExpression,
  AikenExpectExpression
} from '../../transpiler';

/**
 * Generates various Aiken expressions (when, pipe, expect)
 */
export class ExpressionGenerator {
  /**
   * Generate when expression
   */
  generateWhenExpression(whenExpr: AikenWhenExpression): string {
    const lines: string[] = [];

    lines.push(`when ${whenExpr.expression} {`);
    whenExpr.clauses.forEach(clause => {
      const pattern = this.generatePattern(clause.pattern);
      const guard = clause.guard ? ` if ${clause.guard}` : '';
      lines.push(`  ${pattern}${guard} => ${clause.body.replace(/\/\/ matched /, '')},`);
    });
    lines.push('}');

    return lines.join('\n');
  }

  /**
   * Generate pipe expression
   */
  generatePipeExpression(pipeExpr: AikenPipeExpression): string {
    const lines: string[] = [];

    let currentValue = pipeExpr.initialValue;
    pipeExpr.operations.forEach(op => {
      if (op.args && op.args.length > 0) {
        currentValue = `${op.functionName}(${currentValue}, ${op.args.join(', ')})`;
      } else {
        currentValue = `${op.functionName}(${currentValue})`;
      }
    });

    lines.push(currentValue);
    return lines.join('\n');
  }

  /**
   * Generate expect expression
   */
  generateExpectExpression(expectExpr: AikenExpectExpression): string {
    const errorMessage = expectExpr.errorMessage || 'Expected value but found None';
    return `expect(${expectExpr.expression}, "${errorMessage}")`;
  }

  /**
   * Generate pattern for when clause
   */
  private generatePattern(pattern: unknown): string {
    const pat = pattern as Record<string, unknown>;
    switch (pat.type) {
      case 'wildcard':
        return '_';
      case 'literal':
        return String(pat.value || '');
      case 'variable':
        return String(pat.name || '_');
      case 'constructor': {
        const constructorName = String(pat.constructor || '');
        if (constructorName === 'Ok') {
          return 'Ok(value)';
        } else if (constructorName === 'Error') {
          return 'Error(error)';
        } else if (constructorName === 'Some') {
          return 'Some(value)';
        } else if (constructorName === 'None') {
          return 'None';
        }
        const args = pat.args as unknown[] | undefined;
        return `${constructorName}(${
          args?.map((arg: unknown) => this.generatePattern(arg)).join(', ') || ''
        })`;
      }
      case 'tuple': {
        const tupleArgs = pat.args as unknown[] | undefined;
        return `(${tupleArgs?.map((arg: unknown) => this.generatePattern(arg)).join(', ') || ''})`;
      }
      case 'list': {
        const listArgs = pat.args as unknown[] | undefined;
        return `[${listArgs?.map((arg: unknown) => this.generatePattern(arg)).join(', ') || ''}]`;
      }
      default:
        return String(pat.value || '_');
    }
  }
}
