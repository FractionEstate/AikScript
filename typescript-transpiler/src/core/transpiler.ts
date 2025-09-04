import { TranspilerAST } from './parser';
import { AikenTransformer } from './transformer';

// Aiken AST representation
export interface AikenAST {
  contracts: AikenContract[];
  types: AikenType[];
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

export interface AikenParameter {
  name: string;
  type: string;
}

export interface AikenType {
  name: string;
  definition: string;
}

export interface TranspilerConfig {
  inputPath: string;
  outputPath: string;
  target: 'aiken' | 'plutus';
  optimization: 'development' | 'production';
}

export class TypeScriptToAikenTranspiler {
  private transformer: AikenTransformer;

  constructor() {
    this.transformer = new AikenTransformer();
  }

  /**
   * Parses TypeScript source code into a TranspilerAST
   * @param sourceCode The TypeScript source code to parse
   * @returns The parsed AST representation
   */
  parse(sourceCode: string): TranspilerAST {
    return this.transformer.parse(sourceCode);
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
    return this.transformer.generate(aikenAst);
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
      require('fs').writeFileSync(config.outputPath, aikenCode);

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
