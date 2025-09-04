import { TranspilerAST } from './parser/parser';
export interface AikenAST {
    moduleName: string;
    docs: string[];
    imports: AikenImport[];
    types: AikenType[];
    constants: AikenConstant[];
    functions: AikenFunction[];
    tests: AikenTest[];
}
export interface AikenImport {
    module: string;
    alias?: string;
    exposing?: string[];
}
export interface AikenType {
    name: string;
    typeParams?: string[];
    definition: string;
    isOpaque: boolean;
    isPublic: boolean;
    docs?: string[];
}
export interface AikenConstant {
    name: string;
    type: string;
    value: string;
    isPublic: boolean;
    docs?: string[];
}
export interface AikenFunction {
    name: string;
    typeParams?: string[];
    parameters: AikenParameter[];
    returnType: string;
    body: string;
    whenExpressions?: AikenWhenExpression[];
    pipeExpressions?: AikenPipeExpression[];
    expectExpressions?: AikenExpectExpression[];
    isPublic: boolean;
    docs?: string[];
}
export interface AikenTest {
    name: string;
    body: string;
    docs?: string[];
}
export interface AikenParameter {
    name: string;
    type: string;
}
export interface AikenPattern {
    type: 'wildcard' | 'literal' | 'variable' | 'constructor' | 'tuple' | 'list';
    value?: string | number | boolean | AikenPattern[];
    name?: string;
    constructor?: string;
    args?: AikenPattern[];
}
export interface AikenWhenClause {
    pattern: AikenPattern;
    guard?: string;
    body: string;
}
export interface AikenWhenExpression {
    expression: string;
    clauses: AikenWhenClause[];
}
export interface AikenPipeExpression {
    initialValue: string;
    operations: AikenPipeOperation[];
}
export interface AikenPipeOperation {
    functionName: string;
    args?: string[];
}
export interface AikenExpectExpression {
    expression: string;
    errorMessage?: string;
}
export interface AikenContract {
    name: string;
    datums: AikenDatum[];
    validators: AikenValidator[];
}
export interface AikenDatum {
    name: string;
    fields: AikenField[];
}
export interface AikenField {
    name: string;
    type: string;
}
export interface AikenValidator {
    name: string;
    purpose: string;
    parameters: AikenParameter[];
    returnType: string;
    body: string;
}
export interface TranspilerConfig {
    inputPath: string;
    outputPath: string;
    target: 'aiken' | 'plutus';
    optimization: 'development' | 'production';
}
export declare class TypeScriptToAikenTranspiler {
    private parser;
    private transformer;
    private generator;
    constructor();
    /**
     * Parses TypeScript source code into a TranspilerAST
     * @param sourceCode The TypeScript source code to parse
     * @returns The parsed AST representation
     */
    parse(sourceCode: string): TranspilerAST;
    /**
     * Transforms a TranspilerAST into an AikenAST
     * @param ast The TypeScript AST to transform
     * @returns The transformed Aiken AST
     */
    transform(ast: TranspilerAST): AikenAST;
    /**
     * Generates Aiken code from an AikenAST
     * @param aikenAst The Aiken AST to generate code from
     * @returns The generated Aiken source code
     */
    generate(aikenAst: AikenAST): string;
    compile(config: TranspilerConfig): CompilationResult;
    /**
     * Get access to the builtin registry for external use
     */
    getBuiltinRegistry(): import(".").BuiltinRegistry;
}
export interface CompilationResult {
    success: boolean;
    outputPath: string;
    generatedCode: string;
    errors?: string[];
}
//# sourceMappingURL=transpiler.d.ts.map