import * as ts from 'typescript';
export interface TranspilerAST {
    moduleName: string;
    docs: string[];
    imports: ImportDeclaration[];
    types: TypeDefinition[];
    constants: ConstantDefinition[];
    functions: FunctionDefinition[];
    tests: TestDefinition[];
}
export interface ImportDeclaration {
    module: string;
    alias?: string;
    exposing?: string[];
}
export interface TypeDefinition {
    name: string;
    typeParams?: string[];
    definition: string;
    isOpaque: boolean;
    isPublic: boolean;
    docs?: string[];
}
export interface ConstantDefinition {
    name: string;
    typeAnnotation?: string;
    value: string;
    isPublic: boolean;
    docs?: string[];
}
export interface FunctionDefinition {
    name: string;
    typeParams?: string[];
    parameters: ParameterDefinition[];
    returnType?: string;
    body: string;
    whenExpressions?: WhenExpression[];
    pipeExpressions?: PipeExpression[];
    expectExpressions?: ExpectExpression[];
    isPublic: boolean;
    docs?: string[];
}
export interface ParameterDefinition {
    name: string;
    type: string;
}
export interface TestDefinition {
    name: string;
    body: string;
    docs?: string[];
}
export interface Pattern {
    type: 'wildcard' | 'literal' | 'variable' | 'constructor' | 'tuple' | 'list';
    value?: string | number | boolean | Pattern[];
    name?: string;
    constructor?: string;
    args?: Pattern[];
}
export interface WhenClause {
    pattern: Pattern;
    guard?: string;
    body: string;
}
export interface WhenExpression {
    expression: string;
    clauses: WhenClause[];
}
export interface PipeExpression {
    initialValue: string;
    operations: PipeOperation[];
}
export interface PipeOperation {
    functionName: string;
    args?: string[];
}
export interface ExpectExpression {
    expression: string;
    errorMessage?: string;
}
export interface ContractDefinition {
    name: string;
    datums: DatumDefinition[];
    validators: ValidatorDefinition[];
    classDeclaration: ts.ClassDeclaration;
}
export interface DatumDefinition {
    name: string;
    interfaceDeclaration: ts.InterfaceDeclaration;
}
export interface ValidatorDefinition {
    name: string;
    purpose: string;
    methodDeclaration: ts.MethodDeclaration;
    parameters: ts.ParameterDeclaration[];
    returnType: ts.TypeNode;
}
export declare class TypeScriptParser {
    private config;
    private program?;
    private checker?;
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
     * Parses import declaration
     */
    private parseImportDeclaration;
    /**
     * Parses type alias declaration
     */
    private parseTypeAliasDeclaration;
    /**
     * Parses interface declaration
     */
    private parseInterfaceDeclaration;
    /**
     * Parses constant declaration
     */
    private parseConstantDeclaration;
    /**
     * Parses function declaration
     */
    private parseFunctionDeclaration;
    /**
     * Parses test declaration
     */
    private parseTestDeclaration;
    /**
     * Generates type definition string from TypeScript type
     */
    private generateTypeDefinition;
    /**
     * Checks if a declaration is public
     */
    private isPublicDeclaration;
    /**
     * Checks if a variable declaration is a constant
     */
    private isConstantDeclaration;
    /**
     * Checks if a method is a test method
     */
    private isTestMethod;
    /**
     * Checks if a method has a @validator decorator
     */
    private isValidatorMethod;
    /**
     * Parses validator declaration
     */
    private parseValidatorDeclaration;
    /**
     * Extracts validator purpose from decorator arguments
     */
    private extractValidatorPurpose;
    /**
     * Extracts JSDoc comments
     */
    private extractJSDoc;
    /**
     * Parses when expressions in the function body
     */
    private parseWhenExpressions;
    /**
     * Parses when clauses from the function body based on if-else structure
     */
    private parseWhenClausesFromBody;
    /**
     * Parses pipe expressions in the function body
     */
    private parsePipeExpressions;
    /**
     * Parses a single pipe line like "input |> double |> addOne |> square"
     */
    private parsePipeLine;
    /**
     * Parses expect expressions in the function body
     */
    private parseExpectExpressions;
    /**
     * Parses expect expressions around a function declaration
     */
    private parseExpectExpressionsAroundFunction;
    /**
     * Parses a single expect line like "someOption, 'Value not found'" or "someOption 'Value not found'"
     */
    private parseExpectLine;
}
//# sourceMappingURL=parser.d.ts.map