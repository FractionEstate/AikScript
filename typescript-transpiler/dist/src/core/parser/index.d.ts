import * as ts from 'typescript';
import { TranspilerAST } from './interfaces';
export declare class TypeScriptParser {
    private config;
    private program?;
    private checker?;
    private importParser;
    private typeParser;
    private functionParser;
    private constantParser;
    constructor(config?: ts.CompilerOptions);
    /**
     * Parses a TypeScript file into a TranspilerAST
     * @param filePath Path to the TypeScript file to parse
     * @returns The parsed AST representation
     * @throws Error if the file cannot be read or parsed
     */
    parse(filePath: string): TranspilerAST;
    /**
     * Parses TypeScript source code string into a TranspilerAST
     * @param sourceCode The TypeScript source code to parse
     * @param fileName Optional filename for the source (defaults to 'temp.ts')
     * @returns The parsed AST representation
     * @throws Error if the source cannot be parsed
     */
    parseSource(sourceCode: string, fileName?: string): TranspilerAST;
    /**
     * Analyzes a TypeScript source file and converts it to TranspilerAST
     */
    private analyzeSourceFile;
    /**
     * Extracts module name from source file
     */
    private extractModuleName;
    /**
     * Checks if a variable declaration is a constant
     */
    private isConstantDeclaration;
    /**
     * Checks if a method is a validator method
     */
    private isValidatorMethod;
}
//# sourceMappingURL=index.d.ts.map