import * as ts from 'typescript';
import { TypeDefinition } from '../interfaces';
export declare class TypeParser {
    /**
     * Parses type alias declaration
     */
    parseTypeAlias(node: ts.TypeAliasDeclaration): TypeDefinition;
    /**
     * Parses interface declaration
     */
    parseInterface(node: ts.InterfaceDeclaration): TypeDefinition;
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
//# sourceMappingURL=type-parser.d.ts.map