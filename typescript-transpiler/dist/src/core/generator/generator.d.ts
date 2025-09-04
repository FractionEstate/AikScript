import { BuiltinRegistry } from '../types/builtins';
import { AikenAST } from '../transpiler';
/**
 * Code generation utilities for TypeScript-to-Aiken transpiler
 * This module handles the generation of Aiken code from transformed AST
 */
export declare class CodeGenerator {
    private builtinRegistry;
    constructor(builtinRegistry: BuiltinRegistry);
    /**
     * Generate Aiken code from AikenAST
     * @param ast The AikenAST to generate code from
     * @returns The generated Aiken source code
     * @throws Error if code generation fails
     */
    generate(ast: AikenAST): string;
    /**
     * Generate import statement
     */
    private generateImport;
    /**
     * Generate type definition
     */
    private generateType;
    /**
     * Convert TypeScript-like syntax to Aiken syntax
     */
    private convertToAikenSyntax;
    /**
     * Generate constant definition
     */
    private generateConstant;
    /**
     * Generate function definition
     */
    private generateFunction;
    /**
     * Convert function body from TypeScript to Aiken syntax
     */
    private convertFunctionBodyToAiken;
    /**
     * Map type names to Aiken equivalents
     */
    private mapTypeToAiken;
    /**
     * Generate test definition
     */
    private generateTest;
    /**
     * Generate when expression
     */
    private generateWhenExpression;
    /**
     * Generate pattern for when clause
     */
    private generatePattern;
    /**
     * Generate pipe expression
     */
    private generatePipeExpression;
    /**
     * Check if a function body contains conditional logic
     */
    private isConditionalFunction;
    /**
     * Generate conditional pipeline with multiple pipe expressions
     */
    private generateConditionalPipeline;
    /**
     * Generate expect expression
     */
    private generateExpectExpression;
}
//# sourceMappingURL=generator.d.ts.map