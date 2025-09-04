// Main TypeScript parser for AikScript
// Following aiken-lang patterns for modular organization

import * as fs from 'fs';
import * as ts from 'typescript';
import { TranspilerAST } from './interfaces/index';
import { ImportParser } from './parsers/import-parser.js';
import { TypeParser } from './parsers/type-parser.js';
import { FunctionParser } from './parsers/function-parser.js';
import { ConstantParser } from './parsers/constant-parser.js';

export { TranspilerAST } from './interfaces';

export class TypeScriptParser {
  private program?: ts.Program;
  private checker?: ts.TypeChecker;
  private importParser: ImportParser;
  private typeParser: TypeParser;
  private functionParser: FunctionParser;
  private constantParser: ConstantParser;

  constructor(private config: ts.CompilerOptions = {}) {
    this.config = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      ...config,
    };

    this.importParser = new ImportParser();
    this.typeParser = new TypeParser();
    this.functionParser = new FunctionParser();
    this.constantParser = new ConstantParser();
  }

  /**
   * Parses a TypeScript file into a TranspilerAST
   * @param filePath Path to the TypeScript file to parse
   * @returns The parsed AST representation
   * @throws Error if the file cannot be read or parsed
   */
  parse(filePath: string): TranspilerAST {
    try {
      const sourceFile = ts.createSourceFile(
        filePath,
        fs.readFileSync(filePath, 'utf-8'),
        this.config.target || ts.ScriptTarget.ES2020,
        true
      );

      this.program = ts.createProgram([filePath], this.config);
      this.checker = this.program.getTypeChecker();

      return this.analyzeSourceFile(sourceFile);
    } catch (error) {
      throw new Error(`Failed to parse TypeScript file ${filePath}: ${(error as Error).message}`);
    }
  }

  /**
   * Parses TypeScript source code string into a TranspilerAST
   * @param sourceCode The TypeScript source code to parse
   * @param fileName Optional filename for the source (defaults to 'temp.ts')
   * @returns The parsed AST representation
   * @throws Error if the source cannot be parsed
   */
  parseSource(sourceCode: string, fileName = 'temp.ts'): TranspilerAST {
    try {
      const sourceFile = ts.createSourceFile(fileName, sourceCode, this.config.target || ts.ScriptTarget.ES2020, true);

      this.program = ts.createProgram([fileName], this.config);
      this.checker = this.program.getTypeChecker();

      return this.analyzeSourceFile(sourceFile);
    } catch (error) {
      throw new Error(`Failed to parse TypeScript source: ${(error as Error).message}`);
    }
  }

  /**
   * Analyzes a TypeScript source file and converts it to TranspilerAST
   */
  private analyzeSourceFile(sourceFile: ts.SourceFile): TranspilerAST {
    const ast: TranspilerAST = {
      moduleName: this.extractModuleName(sourceFile),
      docs: [],
      imports: [],
      types: [],
      constants: [],
      functions: [],
      tests: [],
    };

    const visit = (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) {
        ast.imports.push(this.importParser.parse(node));
      } else if (ts.isTypeAliasDeclaration(node)) {
        ast.types.push(this.typeParser.parseTypeAlias(node));
      } else if (ts.isInterfaceDeclaration(node)) {
        ast.types.push(this.typeParser.parseInterface(node));
      } else if (ts.isVariableDeclaration(node) && this.isConstantDeclaration(node)) {
        ast.constants.push(this.constantParser.parse(node));
      } else if (ts.isFunctionDeclaration(node)) {
        ast.functions.push(this.functionParser.parseFunction(node));
      } else if (ts.isMethodDeclaration(node)) {
        if (this.isValidatorMethod(node)) {
          const validator = this.functionParser.parseValidator(node);
          ast.functions.push(validator);
        } else {
          const method = this.functionParser.parseFunction(node);
          ast.functions.push(method);
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sourceFile, visit);
    return ast;
  }

  /**
   * Extracts module name from source file
   */
  private extractModuleName(sourceFile: ts.SourceFile): string {
    const fileName = sourceFile.fileName;
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    return baseName || 'main';
  }

  /**
   * Checks if a variable declaration is a constant
   */
  private isConstantDeclaration(node: ts.VariableDeclaration): boolean {
    // Check if it's declared with const
    const parent = node.parent;
    if (ts.isVariableDeclarationList(parent)) {
      return (parent.flags & ts.NodeFlags.Const) !== 0;
    }
    return false;
  }

  /**
   * Checks if a method is a validator method
   */
  private isValidatorMethod(node: ts.MethodDeclaration): boolean {
    // Check for validator decorator
    const decorators = ts.getDecorators(node);
    if (!decorators) return false;

    return decorators.some(decorator => {
      if (ts.isCallExpression(decorator.expression)) {
        const expression = decorator.expression.expression;
        return ts.isIdentifier(expression) && expression.text === 'validator';
      }
      return false;
    });
  }
}
