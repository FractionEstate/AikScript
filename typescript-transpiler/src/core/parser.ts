import * as fs from 'fs';
import * as ts from 'typescript';

// AST representation for our transpiler
export interface TranspilerAST {
  contracts: ContractDefinition[];
  types: TypeDefinition[];
  imports: ImportDeclaration[];
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

export interface TypeDefinition {
  name: string;
  declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration;
}

export interface ImportDeclaration {
  clause: ts.ImportClause;
  module: string;
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

  private analyzeSourceFile(sourceFile: ts.SourceFile): TranspilerAST {
    const contracts: ContractDefinition[] = [];
    const types: TypeDefinition[] = [];
    const imports: ImportDeclaration[] = [];

    const visit = (node: ts.Node) => {
      if (ts.isClassDeclaration(node)) {
        const contract = this.extractContract(node);
        if (contract) {
          contracts.push(contract);
        }
      } else if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        types.push({
          name: node.name.text,
          declaration: node,
        });
      } else if (ts.isImportDeclaration(node)) {
        imports.push({
          clause: node.importClause!,
          module: node.moduleSpecifier.getText().replace(/['"]/g, ''),
        });
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sourceFile, visit);

    return {
      contracts,
      types,
      imports,
    };
  }

  private extractContract(classDeclaration: ts.ClassDeclaration): ContractDefinition | null {
    const decorators = ts.getDecorators(classDeclaration);
    if (!decorators) return null;

    const contractDecorator = decorators.find((decorator: ts.Decorator) =>
      this.isContractDecorator(decorator)
    );

    if (!contractDecorator) return null;

    const contractName = this.extractContractName(contractDecorator);
    const datums = this.extractDatums(classDeclaration);
    const validators = this.extractValidators(classDeclaration);

    return {
      name: contractName,
      datums,
      validators,
      classDeclaration,
    };
  }

  private isContractDecorator(decorator: ts.Decorator): boolean {
    const expression = decorator.expression;
    if (!ts.isCallExpression(expression)) return false;

    const identifier = expression.expression;
    return ts.isIdentifier(identifier) && identifier.text === 'contract';
  }

  private extractContractName(decorator: ts.Decorator): string {
    const expression = decorator.expression as ts.CallExpression;
    const args = expression.arguments;
    if (args.length === 0) return '';

    const arg = args[0];
    if (ts.isStringLiteral(arg)) {
      return arg.text;
    }

    return '';
  }

  private extractDatums(classDeclaration: ts.ClassDeclaration): DatumDefinition[] {
    const datums: DatumDefinition[] = [];

    const visit = (node: ts.Node) => {
      if (ts.isPropertyDeclaration(node)) {
        const decorators = ts.getDecorators(node);
        if (decorators) {
          const datumDecorator = decorators.find((decorator: ts.Decorator) =>
            this.isDatumDecorator(decorator)
          );

          if (datumDecorator) {
            // For our DSL, the @datum decorator is applied to a property with an object literal
            const propertyName = node.name.getText();
            const initializer = node.initializer;

            if (initializer && ts.isObjectLiteralExpression(initializer)) {
              // Create a synthetic interface from the object literal
              const syntheticInterface = this.createSyntheticInterface(propertyName, initializer);
              datums.push({
                name: propertyName,
                interfaceDeclaration: syntheticInterface,
              });
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(classDeclaration, visit);

    return datums;
  }

  private createSyntheticInterface(
    name: string,
    objectLiteral: ts.ObjectLiteralExpression
  ): ts.InterfaceDeclaration {
    // Create property signatures from object literal properties
    const members: ts.PropertySignature[] = [];

    for (const property of objectLiteral.properties) {
      if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) {
        const propertyName = property.name;

        // For now, we'll use 'any' type since we can't easily infer types from null literals
        // In a real implementation, you'd want to do proper type inference
        const typeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);

        const propertySignature = ts.factory.createPropertySignature(
          undefined, // modifiers
          propertyName, // pass the identifier directly, not propertyName.text
          undefined, // question token
          typeNode
        );

        members.push(propertySignature);
      }
    }

    // Create the interface declaration
    const interfaceName = ts.factory.createIdentifier(name);
    const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
      undefined, // decorators
      interfaceName,
      undefined, // type parameters
      undefined, // heritage clauses
      members
    );

    return interfaceDeclaration;
  }

  private isDatumDecorator(decorator: ts.Decorator): boolean {
    const expression = decorator.expression;
    return ts.isIdentifier(expression) && expression.text === 'datum';
  }

  private extractValidators(classDeclaration: ts.ClassDeclaration): ValidatorDefinition[] {
    const validators: ValidatorDefinition[] = [];

    const visit = (node: ts.Node) => {
      if (ts.isMethodDeclaration(node)) {
        const decorators = ts.getDecorators(node);
        if (decorators) {
          const validatorDecorator = decorators.find((decorator: ts.Decorator) =>
            this.isValidatorDecorator(decorator)
          );

          if (validatorDecorator) {
            const purpose = this.extractValidatorPurpose(validatorDecorator);
            validators.push({
              name: node.name.getText(),
              purpose,
              methodDeclaration: node,
              parameters: Array.from(node.parameters),
              returnType: node.type!,
            });
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(classDeclaration, visit);

    return validators;
  }

  private isValidatorDecorator(decorator: ts.Decorator): boolean {
    const expression = decorator.expression;
    if (!ts.isCallExpression(expression)) return false;

    const identifier = expression.expression;
    return ts.isIdentifier(identifier) && identifier.text === 'validator';
  }

  private extractValidatorPurpose(decorator: ts.Decorator): string {
    const expression = decorator.expression as ts.CallExpression;
    const args = expression.arguments;
    if (args.length === 0) return '';

    const arg = args[0];
    if (ts.isStringLiteral(arg)) {
      return arg.text;
    }

    return '';
  }

  getTypeChecker(): ts.TypeChecker {
    if (!this.checker) {
      throw new Error('TypeChecker not initialized. Call parse() or parseSource() first.');
    }
    return this.checker;
  }

  getProgram(): ts.Program {
    if (!this.program) {
      throw new Error('Program not initialized. Call parse() or parseSource() first.');
    }
    return this.program;
  }
}
