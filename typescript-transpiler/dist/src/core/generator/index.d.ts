import { BuiltinRegistry } from '../builtins';
import { AikenAST } from '../transpiler';
/**
 * Main code generation orchestrator
 * Coordinates all specialized generators to produce Aiken code
 */
export declare class CodeGenerator {
    private builtinRegistry;
    private importGenerator;
    private typeGenerator;
    private constantGenerator;
    private functionGenerator;
    private testGenerator;
    constructor(builtinRegistry: BuiltinRegistry);
    /**
     * Generate Aiken code from AikenAST
     */
    generate(ast: AikenAST): string;
}
//# sourceMappingURL=index.d.ts.map