// Parser interface definitions for AikScript
// Following aiken-lang patterns for modular organization

// Main AST representation
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

// Pattern matching interfaces
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

// Pipe operator interfaces
export interface PipeExpression {
  initialValue: string;
  operations: PipeOperation[];
}

export interface PipeOperation {
  functionName: string;
  args?: string[];
}

// Expect expression interfaces
export interface ExpectExpression {
  expression: string;
  errorMessage?: string;
}

// Legacy interfaces for backward compatibility
export interface ContractDefinition {
  name: string;
  datums: DatumDefinition[];
  validators: ValidatorDefinition[];
  classDeclaration: unknown; // ts.ClassDeclaration
}

export interface DatumDefinition {
  name: string;
  interfaceDeclaration: unknown; // ts.InterfaceDeclaration
}

export interface ValidatorDefinition {
  name: string;
  purpose: string;
  methodDeclaration: unknown; // ts.MethodDeclaration
  parameters: unknown[]; // ts.ParameterDeclaration[]
  returnType: unknown; // ts.TypeNode
}

// Parser result interface for modular parsing
export interface ParserResult {
  type: string;
  name: string;
  node: unknown; // TypeScript AST node
  children: ParserResult[];
}
