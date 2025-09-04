import { TranspilerAST } from './parser';
import { AikenTransformer } from './transformer';
import { TypeScriptParser } from './parser';
import { CodeGenerator } from './generator';

// Aiken AST representation
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
  whenExpressions?: AikenWhenExpression[]; // Pattern matching expressions
  pipeExpressions?: AikenPipeExpression[]; // Pipe operator expressions
  expectExpressions?: AikenExpectExpression[]; // Expect expressions for error handling
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

// Pattern matching interfaces
export interface AikenPattern {
  type: 'wildcard' | 'literal' | 'variable' | 'constructor' | 'tuple' | 'list';
  value?: any;
  name?: string;
  constructor?: string;
  args?: AikenPattern[];
}

export interface AikenWhenClause {
  pattern: AikenPattern;
  guard?: string; // Optional guard expression
  body: string;
}

export interface AikenWhenExpression {
  expression: string;
  clauses: AikenWhenClause[];
}

// Pipe operator interfaces
export interface AikenPipeExpression {
  initialValue: string;
  operations: AikenPipeOperation[];
}

export interface AikenPipeOperation {
  functionName: string;
  args?: string[];
}

// Expect expression interfaces
export interface AikenExpectExpression {
  expression: string;
  errorMessage?: string;
}

// Legacy interfaces for backward compatibility
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

export class TypeScriptToAikenTranspiler {
  private parser: TypeScriptParser;
  private transformer: AikenTransformer;
  private generator: CodeGenerator;

  constructor() {
    this.parser = new TypeScriptParser();
    this.transformer = new AikenTransformer();
    this.generator = new CodeGenerator(this.transformer.getBuiltinRegistry());
  }

  /**
   * Parses TypeScript source code into a TranspilerAST
   * @param sourceCode The TypeScript source code to parse
   * @returns The parsed AST representation
   */
  parse(sourceCode: string): TranspilerAST {
    return this.parser.parseSource(sourceCode);
  }

  /**
   * Transforms a TranspilerAST into an AikenAST
   * @param ast The TypeScript AST to transform
   * @returns The transformed Aiken AST
   */
  transform(ast: TranspilerAST): AikenAST {
    return this.transformer.transform(ast);
  }

  /**
   * Generates Aiken code from an AikenAST
   * @param aikenAst The Aiken AST to generate code from
   * @returns The generated Aiken source code
   */
  generate(aikenAst: AikenAST): string {
    return this.generator.generate(aikenAst);
  }

  compile(config: TranspilerConfig): CompilationResult {
    try {
      // Read source file
      console.log(`Reading source file: ${config.inputPath}`);
      const sourceCode = require('fs').readFileSync(config.inputPath, 'utf-8');
      console.log(`Source code length: ${sourceCode.length}`);
      console.log(`Source code preview: ${sourceCode.substring(0, 200)}...`);

      // Parse TypeScript
      console.log('Starting parsing...');
      const tsAst = this.parse(sourceCode);
      console.log('Parsing completed');

      // Transform to Aiken AST
      console.log('Starting transformation...');
      const aikenAst = this.transform(tsAst);
      console.log('Transformation completed');

      // Generate Aiken code
      console.log('Starting code generation...');
      const aikenCode = this.generate(aikenAst);
      console.log('Code generation completed');
      console.log('Generated code preview:', aikenCode.substring(0, 200));

      // Write output
      // Write output only if output path is provided
      if (config.outputPath) {
        require('fs').writeFileSync(config.outputPath, aikenCode);
      }

      return {
        success: true,
        outputPath: config.outputPath,
        generatedCode: aikenCode,
      };
    } catch (error) {
      console.error('❌ Compilation failed:', (error as Error).message);
      return {
        success: false,
        outputPath: config.outputPath,
        generatedCode: '',
        errors: [(error as Error).message],
      };
    }
  }

  /**
   * Get access to the builtin registry for external use
   */
  getBuiltinRegistry() {
    return this.transformer.getBuiltinRegistry();
  }
}

export interface CompilationResult {
  success: boolean;
  outputPath: string;
  generatedCode: string;
  errors?: string[];
}
