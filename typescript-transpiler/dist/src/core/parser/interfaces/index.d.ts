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
    value?: unknown;
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
    classDeclaration: unknown;
}
export interface DatumDefinition {
    name: string;
    interfaceDeclaration: unknown;
}
export interface ValidatorDefinition {
    name: string;
    purpose: string;
    methodDeclaration: unknown;
    parameters: unknown[];
    returnType: unknown;
}
export interface ParserResult {
    type: string;
    name: string;
    node: unknown;
    children: ParserResult[];
}
//# sourceMappingURL=index.d.ts.map