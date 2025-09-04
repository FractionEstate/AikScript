// Function definition generation for AikScript
// Following aiken-lang patterns for modular organization

import { AikenFunction } from '../../transpiler';
import { ExpressionGenerator } from '../expressions/index';
import { GeneratorUtils } from '../utils/index';

/**
 * Generates Aiken function definitions from AikenFunction objects
 */
export class FunctionGenerator {
  private expressionGenerator: ExpressionGenerator;

  constructor() {
    this.expressionGenerator = new ExpressionGenerator();
  }

  /**
   * Generate function definition
   */
  generate(func: AikenFunction): string {
    const lines: string[] = [];

    // Add docs
    if (func.docs && func.docs.length > 0) {
      func.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    // Check if this is a validator function (body starts with "validator")
    if (func.body.trim().startsWith('validator')) {
      // For validators, output the body as-is (it already contains proper validator syntax)
      lines.push(func.body);
      return lines.join('\n');
    }

    let signature = '';
    if (func.isPublic) {
      signature += 'pub ';
    }
    signature += `fn ${func.name}`;

    if (func.typeParams && func.typeParams.length > 0) {
      signature += `<${func.typeParams.join(', ')}>`;
    }

    const params = func.parameters.map(p => `${p.name}: ${GeneratorUtils.mapTypeToAiken(p.type)}`).join(', ');
    signature += `(${params}) -> ${GeneratorUtils.mapTypeToAiken(func.returnType)}`;

    lines.push(signature);

    // Convert function body from TypeScript to Aiken syntax
    let aikenBody = GeneratorUtils.convertFunctionBodyToAiken(func.body);
    let isConditionalWithPipeline = false;

    // If pipe expressions exist, handle them properly
    if (func.pipeExpressions && func.pipeExpressions.length > 0) {
      // Check if this is a conditional function with multiple pipe expressions
      if (GeneratorUtils.isConditionalFunction(func.body) && func.pipeExpressions.length > 1) {
        aikenBody = this.generateConditionalPipeline(func);
        isConditionalWithPipeline = true;
      } else {
        // Use the first pipe expression as the main body for simple cases
        const pipeExpr = func.pipeExpressions[0];
        aikenBody = this.expressionGenerator.generatePipeExpression(pipeExpr);
      }
    }

    // Only add outer braces if we're not using conditional pipeline (which adds its own braces)
    if (!isConditionalWithPipeline) {
      lines.push('{');
    }

    lines.push(aikenBody);

    // Generate additional when expressions if any (but not pipe expressions since we handled them above)
    if (func.whenExpressions && func.whenExpressions.length > 0) {
      func.whenExpressions.forEach(whenExpr => {
        lines.push('');
        lines.push(this.expressionGenerator.generateWhenExpression(whenExpr));
      });
    }

    // Generate expect expressions if any
    if (func.expectExpressions && func.expectExpressions.length > 0) {
      func.expectExpressions.forEach(expectExpr => {
        lines.push('');
        lines.push(this.expressionGenerator.generateExpectExpression(expectExpr));
      });
    }

    // Only add closing brace if we're not using conditional pipeline
    if (!isConditionalWithPipeline) {
      lines.push('}');
    }

    return lines.join('\n');
  }

  /**
   * Generate conditional pipeline with multiple pipe expressions
   */
  private generateConditionalPipeline(func: AikenFunction): string {
    if (!func.pipeExpressions || func.pipeExpressions.length === 0) {
      return GeneratorUtils.convertFunctionBodyToAiken(func.body);
    }

    const lines: string[] = [];
    const body = func.body;

    // Parse the conditional structure and extract branches
    const ifMatch = body.match(/if\s*\(([^)]+)\)\s*\{([\s\S]*?)\}\s*else\s*\{([\s\S]*?)\}/);

    if (ifMatch) {
      const condition = ifMatch[1];
      const elseBranch = ifMatch[3];

      // Generate the if branch with its pipe expression
      if (func.pipeExpressions.length >= 1) {
        const ifPipeExpr = func.pipeExpressions[0];
        const ifResult = this.expressionGenerator.generatePipeExpression(ifPipeExpr);
        lines.push(`if ${condition} {`);
        lines.push(`  ${ifResult}`);
        lines.push(`} else {`);

        // Generate the else branch with its pipe expression
        if (func.pipeExpressions.length >= 2) {
          const elsePipeExpr = func.pipeExpressions[1];
          const elseResult = this.expressionGenerator.generatePipeExpression(elsePipeExpr);
          lines.push(`  ${elseResult}`);
        } else {
          // Fallback to converted body for else branch
          const elseBody = GeneratorUtils.convertFunctionBodyToAiken(elseBranch);
          lines.push(`  ${elseBody}`);
        }
        lines.push(`}`);
      }
    }

    return lines.join('\n');
  }
}
