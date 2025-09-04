import { AikenWhenExpression, AikenPipeExpression, AikenExpectExpression } from '../../transpiler';
/**
 * Generates various Aiken expressions (when, pipe, expect)
 */
export declare class ExpressionGenerator {
    /**
     * Generate when expression
     */
    generateWhenExpression(whenExpr: AikenWhenExpression): string;
    /**
     * Generate pipe expression
     */
    generatePipeExpression(pipeExpr: AikenPipeExpression): string;
    /**
     * Generate expect expression
     */
    generateExpectExpression(expectExpr: AikenExpectExpression): string;
    /**
     * Generate pattern for when clause
     */
    private generatePattern;
}
//# sourceMappingURL=index.d.ts.map