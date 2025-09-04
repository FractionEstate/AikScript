import { AikenFunction } from '../../transpiler';
/**
 * Generates Aiken function definitions from AikenFunction objects
 */
export declare class FunctionGenerator {
    private expressionGenerator;
    constructor();
    /**
     * Generate function definition
     */
    generate(func: AikenFunction): string;
    /**
     * Generate conditional pipeline with multiple pipe expressions
     */
    private generateConditionalPipeline;
}
//# sourceMappingURL=index.d.ts.map