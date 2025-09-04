import { BuiltinRegistry } from '../types/builtins';
import { AikenAST } from '../transpiler';
import { TranspilerAST } from '../parser/parser';
/**
 * Main transformation orchestrator for TypeScript-to-Aiken transpiler
 * This module coordinates all the transformation steps
 */
export declare class AikenTransformer {
    private builtinRegistry;
    constructor();
    /**
     * Transforms a TranspilerAST into an AikenAST
     * @param ast The TranspilerAST to transform
     * @returns The transformed AikenAST
     * @throws Error if transformation fails
     */
    transform(ast: TranspilerAST): AikenAST;
    /**
     * Transforms an import declaration
     */
    private transformImport;
    /**
     * Transforms a type definition
     */
    private transformType;
    /**
     * Transforms a constant definition
     */
    private transformConstant;
    /**
     * Transforms a function definition
     */
    private transformFunction;
    /**
     * Transforms a test definition
     */
    private transformTest;
    /**
     * Gets the builtin registry for external access
     */
    getBuiltinRegistry(): BuiltinRegistry;
}
//# sourceMappingURL=transformer.d.ts.map