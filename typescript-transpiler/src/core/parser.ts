import * as fs from 'fs';
import * as ts from 'typescript';

// AST representation for our transpiler
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

// Legacy interfaces for backward compatibility
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

export class TypeScriptParser {
  private program?: ts.Program;
  private checker?: ts.TypeChecker;

  constructor(private config: ts.CompilerOptions = {}) {
    this.config = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      ...config,
    };
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
        this.config.target!,
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
      const sourceFile = ts.createSourceFile(fileName, sourceCode, this.config.target!, true);

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
        ast.imports.push(this.parseImportDeclaration(node));
      } else if (ts.isTypeAliasDeclaration(node)) {
        ast.types.push(this.parseTypeAliasDeclaration(node));
      } else if (ts.isInterfaceDeclaration(node)) {
        ast.types.push(this.parseInterfaceDeclaration(node));
      } else if (ts.isVariableDeclaration(node) && this.isConstantDeclaration(node)) {
        ast.constants.push(this.parseConstantDeclaration(node));
      } else if (ts.isFunctionDeclaration(node)) {
        ast.functions.push(this.parseFunctionDeclaration(node));
      } else if (ts.isMethodDeclaration(node)) {
        if (this.isTestMethod(node)) {
          ast.tests.push(this.parseTestDeclaration(node));
        } else {
          ast.functions.push(this.parseFunctionDeclaration(node as any));
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
    // Extract from file name or use default
    const fileName = sourceFile.fileName;
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    return baseName || 'main';
  }

  /**
   * Parses import declaration
   */
  private parseImportDeclaration(node: ts.ImportDeclaration): ImportDeclaration {
    const module = node.moduleSpecifier.getText().replace(/['"]/g, '');
    return {
      module,
    };
  }

  /**
   * Parses type alias declaration
   */
  private parseTypeAliasDeclaration(node: ts.TypeAliasDeclaration): TypeDefinition {
    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: this.generateTypeDefinition(node.type),
      isOpaque: false,
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Parses interface declaration
   */
  private parseInterfaceDeclaration(node: ts.InterfaceDeclaration): TypeDefinition {
    const fields = node.members
      .filter(ts.isPropertySignature)
      .map(member => {
        const name = member.name.getText();
        const type = member.type ? this.generateTypeDefinition(member.type) : 'Void';
        return `  ${name}: ${type},`;
      })
      .join('\n');

    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: fields,
      isOpaque: false,
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Parses constant declaration
   */
  private parseConstantDeclaration(node: ts.VariableDeclaration): ConstantDefinition {
    return {
      name: node.name.getText(),
      typeAnnotation: node.type ? this.generateTypeDefinition(node.type) : undefined,
      value: node.initializer ? node.initializer.getText() : '',
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Parses function declaration
   */
  private parseFunctionDeclaration(node: ts.FunctionDeclaration): FunctionDefinition {
    const parameters: ParameterDefinition[] = node.parameters.map(param => ({
      name: param.name.getText(),
      type: param.type ? this.generateTypeDefinition(param.type) : 'Void',
    }));

    return {
      name: node.name?.getText() || 'anonymous',
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      parameters,
      returnType: node.type ? this.generateTypeDefinition(node.type) : 'Void',
      body: node.body ? node.body.getText() : '',
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Parses test declaration
   */
  private parseTestDeclaration(node: ts.MethodDeclaration): TestDefinition {
    return {
      name: node.name.getText(),
      body: node.body ? node.body.getText() : '',
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Generates type definition string from TypeScript type
   */
  private generateTypeDefinition(type: ts.TypeNode): string {
    // Map TypeScript types to Aiken types
    if (ts.isTypeReferenceNode(type)) {
      const typeName = type.typeName.getText();
      switch (typeName) {
        case 'boolean':
        case 'Bool':
          return 'Bool';
        case 'number':
        case 'Int':
          return 'Int';
        case 'string':
        case 'String':
          return 'String';
        case 'Uint8Array':
        case 'ByteArray':
          return 'ByteArray';
        case 'PubKeyHash':
          return 'PubKeyHash';
        case 'ScriptHash':
          return 'ScriptHash';
        case 'AssetName':
          return 'AssetName';
        case 'PolicyId':
          return 'PolicyId';
        case 'POSIXTime':
          return 'POSIXTime';
        case 'ScriptContext':
          return 'ScriptContext';
        case 'Address':
          return 'Address';
        default:
          return typeName;
      }
    }

    // Handle other type constructs
    if (ts.isArrayTypeNode(type)) {
      const elementType = this.generateTypeDefinition(type.elementType);
      return `List<${elementType}>`;
    }

    if (ts.isUnionTypeNode(type)) {
      // For now, just return the first type - this could be improved
      return this.generateTypeDefinition(type.types[0]);
    }

    // Default fallback
    return type.getText();
  }

  /**
   * Checks if a declaration is public
   */
  private isPublicDeclaration(node: ts.Node): boolean {
    // Check for export keyword or public modifier
    if (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      return (node as any).modifiers?.some((mod: ts.Modifier) =>
        mod.kind === ts.SyntaxKind.ExportKeyword ||
        mod.kind === ts.SyntaxKind.PublicKeyword
      ) || false;
    }
    return false;
  }

  /**
   * Checks if a variable declaration is a constant
   */
  private isConstantDeclaration(node: ts.VariableDeclaration): boolean {
    // Check parent for const keyword
    const parent = node.parent;
    if (ts.isVariableDeclarationList(parent)) {
      return parent.flags === ts.NodeFlags.Const;
    }
    return false;
  }

  /**
   * Checks if a method is a test method
   */
  private isTestMethod(node: ts.MethodDeclaration): boolean {
    return node.name.getText().startsWith('test');
  }

  /**
   * Extracts JSDoc comments
   */
  private extractJSDoc(node: ts.Node): string[] {
    const docs: string[] = [];
    const jsDoc = (node as any).jsDoc;
    if (jsDoc && Array.isArray(jsDoc)) {
      jsDoc.forEach((doc: any) => {
        if (doc.comment) {
          docs.push(doc.comment);
        }
      });
    }
    return docs;
  }
}
