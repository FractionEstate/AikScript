import * as ts from 'typescript';
import { ConstantDefinition } from '../interfaces';
export declare class ConstantParser {
    /**
     * Parses constant declaration
     */
    parse(node: ts.VariableDeclaration): ConstantDefinition;
    /**
     * Generates type definition string from TypeScript type
     */
    private generateTypeDefinition;
    /**
     * Checks if a declaration is public
     */
    private isPublicDeclaration;
    /**
     * Extracts JSDoc comments
     */
    private extractJSDoc;
}
//# sourceMappingURL=constant-parser.d.ts.map