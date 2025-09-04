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
  whenExpressions?: WhenExpression[]; // Pattern matching expressions
  pipeExpressions?: PipeExpression[]; // Pipe operator expressions
  expectExpressions?: ExpectExpression[]; // Expect expressions for error handling
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
  value?: any;
  name?: string;
  constructor?: string;
  args?: Pattern[];
}

export interface WhenClause {
  pattern: Pattern;
  guard?: string; // Optional guard expression
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
    const typeDef = this.generateTypeDefinition(node.type);

    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: typeDef,
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
        return `${name}: ${type}`;
      })
      .join(',\n');

    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: fields ? `{\n${fields}\n}` : '{}',
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

    const body = node.body ? node.body.getText() : '';
    const whenExpressions = this.parseWhenExpressions(body);
    const pipeExpressions = this.parsePipeExpressions(body);
    const expectExpressions = this.parseExpectExpressions(body);

    return {
      name: node.name?.getText() || 'anonymous',
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      parameters,
      returnType: node.type ? this.generateTypeDefinition(node.type) : 'Void',
      body,
      whenExpressions,
      pipeExpressions,
      expectExpressions,
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
    // Handle literal types (string literals, number literals, etc.)
    if (ts.isLiteralTypeNode(type)) {
      if (ts.isStringLiteral(type.literal)) {
        return type.literal.text;
      }
      if (ts.isNumericLiteral(type.literal)) {
        return type.literal.text;
      }
      return type.literal.getText();
    }

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

    // Handle union types
    if (ts.isUnionTypeNode(type)) {
      const unionTypes = type.types.map(t => this.generateTypeDefinition(t));
      return unionTypes.join(' | ');
    }

    // Handle array types
    if (ts.isArrayTypeNode(type)) {
      const elementType = this.generateTypeDefinition(type.elementType);
      return `List<${elementType}>`;
    }

    // Handle tuple types
    if (ts.isTupleTypeNode(type)) {
      const elementTypes = type.elements.map(t => this.generateTypeDefinition(t));
      return `(${elementTypes.join(', ')})`;
    }

    // Handle function types
    if (ts.isFunctionTypeNode(type)) {
      const paramTypes = type.parameters.map(p => this.generateTypeDefinition(p.type!));
      const returnType = this.generateTypeDefinition(type.type);
      return `(${paramTypes.join(', ')}) -> ${returnType}`;
    }

    // Handle type literals (object types)
    if (ts.isTypeLiteralNode(type)) {
      const members = type.members.filter(ts.isPropertySignature).map(member => {
        const name = member.name.getText();
        const memberType = member.type ? this.generateTypeDefinition(member.type) : 'Void';
        return `${name}: ${memberType}`;
      });
      return `{\n${members.map(m => `  ${m}`).join(',\n')}\n}`;
    }

    // Default fallback - return the raw text but try to convert basic types
    const rawText = type.getText();
    return rawText
      .replace(/\bboolean\b/g, 'Bool')
      .replace(/\bnumber\b/g, 'Int')
      .replace(/\bstring\b/g, 'String')
      .replace(/\bUint8Array\b/g, 'ByteArray');
  }

  /**
   * Checks if a declaration is public
   */
  private isPublicDeclaration(node: ts.Node): boolean {
    // Check for export keyword or public modifier
    if (
      ts.isVariableDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isInterfaceDeclaration(node)
    ) {
      return (
        (node as any).modifiers?.some(
          (mod: ts.Modifier) =>
            mod.kind === ts.SyntaxKind.ExportKeyword || mod.kind === ts.SyntaxKind.PublicKeyword
        ) || false
      );
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

  /**
   * Parses when expressions in the function body
   */
  private parseWhenExpressions(body: string): WhenExpression[] {
    const whenRegex = /\/\/\s*@when\s+(\w+)/g;
    const expressions: WhenExpression[] = [];
    let match;

    while ((match = whenRegex.exec(body)) !== null) {
      const variableName = match[1];
      const expression = variableName;
      const clauses = this.parseWhenClausesFromBody(body, variableName);
      if (clauses.length > 0) {
        expressions.push({ expression, clauses });
      }
    }

    return expressions;
  }

  /**
   * Parses when clauses from the function body based on if-else structure
   */
  private parseWhenClausesFromBody(body: string, variableName: string): WhenClause[] {
    const clauses: WhenClause[] = [];

    // Simple pattern: look for if statements that check the variable
    const ifRegex = new RegExp(`if\\s*\\(\\s*${variableName}\\s*===?\\s*([^)]+)\\)`, 'g');
    let match;

    while ((match = ifRegex.exec(body)) !== null) {
      const patternValue = match[1].replace(/['"]/g, '').trim();
      clauses.push({
        pattern: { type: 'literal', value: patternValue } as Pattern,
        body: `// matched ${patternValue}`,
      });
    }

    // Look for hasOwnProperty checks (for object patterns)
    const hasOwnPropertyRegex = new RegExp(`${variableName}\\.hasOwnProperty\\('([^']+)'\\)`, 'g');
    while ((match = hasOwnPropertyRegex.exec(body)) !== null) {
      const propertyName = match[1];
      clauses.push({
        pattern: { type: 'constructor', constructor: propertyName } as Pattern,
        body: `// matched ${propertyName}`,
      });
    }

    return clauses;
  }

  /**
   * Parses pipe expressions in the function body
   */
  private parsePipeExpressions(body: string): PipeExpression[] {
    const pipeRegex = /\/\/\s*@pipe\s+(.+)/g;
    const expressions: PipeExpression[] = [];
    let match;

    while ((match = pipeRegex.exec(body)) !== null) {
      const pipeLine = match[1].trim();
      const parsed = this.parsePipeLine(pipeLine);
      if (parsed) {
        expressions.push(parsed);
      }
    }

    return expressions;
  }

  /**
   * Parses a single pipe line like "input |> double |> addOne |> square"
   */
  private parsePipeLine(pipeLine: string): PipeExpression | null {
    // Remove the |> operators and split by them
    const parts = pipeLine.split(/\s*\|\s*>\s*/).map(p => p.trim());

    if (parts.length < 2) {
      return null;
    }

    const initialValue = parts[0];
    const operations: PipeOperation[] = [];

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];

      // Handle function calls with arguments like addPrefix("Result: ")
      const funcMatch = part.match(/^(\w+)\((.*)\)$/);
      if (funcMatch) {
        const functionName = funcMatch[1];
        const args = funcMatch[2] ? funcMatch[2].split(',').map(a => a.trim()) : [];
        operations.push({ functionName, args });
      } else {
        // Simple function name without arguments
        operations.push({ functionName: part, args: [] });
      }
    }

    return { initialValue, operations };
  }

  /**
   * Parses expect expressions in the function body
   */
  private parseExpectExpressions(body: string): ExpectExpression[] {
    const expectRegex = /\/\/\s*@expect\s+(.+)/g;
    const expressions: ExpectExpression[] = [];
    let match;

    while ((match = expectRegex.exec(body)) !== null) {
      const expectLine = match[1].trim();
      const parsed = this.parseExpectLine(expectLine);
      if (parsed) {
        expressions.push(parsed);
      }
    }

    return expressions;
  }

  /**
   * Parses a single expect line like "someOption, 'Value not found'"
   */
  private parseExpectLine(expectLine: string): ExpectExpression | null {
    // Handle expect with custom error message: expect(option, "error message")
    const withMessageMatch = expectLine.match(/^(\w+),\s*['"](.+)['"]$/);
    if (withMessageMatch) {
      return {
        expression: withMessageMatch[1],
        errorMessage: withMessageMatch[2]
      };
    }

    // Handle simple expect: expect(option)
    const simpleMatch = expectLine.match(/^(\w+)$/);
    if (simpleMatch) {
      return {
        expression: simpleMatch[1],
        errorMessage: 'Expected value but found None'
      };
    }

    return null;
  }
}
