import { BuiltinRegistry } from './builtins';
import {
  AikenAST,
  AikenImport,
  AikenType,
  AikenConstant,
  AikenFunction,
  AikenTest,
  AikenParameter
} from './transpiler';
import {
  TranspilerAST,
  ImportDeclaration,
  TypeDefinition,
  ConstantDefinition,
  FunctionDefinition,
  TestDefinition,
  ParameterDefinition
} from './parser';

/**
 * Main transformation orchestrator for TypeScript-to-Aiken transpiler
 * This module coordinates all the transformation steps
 */

export class AikenTransformer {
  private builtinRegistry: BuiltinRegistry;

  constructor() {
    this.builtinRegistry = new BuiltinRegistry();
  }

  /**
   * Transforms a TranspilerAST into an AikenAST
   * @param ast The TranspilerAST to transform
   * @returns The transformed AikenAST
   * @throws Error if transformation fails
   */
  transform(ast: TranspilerAST): AikenAST {
    try {
      const aikenAst: AikenAST = {
        moduleName: ast.moduleName || 'main',
        docs: ast.docs,
        imports: [],
        types: [],
        constants: [],
        functions: [],
        tests: [],
      };

      // Transform imports
      ast.imports.forEach(imp => {
        aikenAst.imports.push(this.transformImport(imp));
      });

      // Transform types
      ast.types.forEach(type => {
        aikenAst.types.push(this.transformType(type));
      });

      // Transform constants
      ast.constants.forEach(constant => {
        aikenAst.constants.push(this.transformConstant(constant));
      });

      // Transform functions
      ast.functions.forEach(func => {
        aikenAst.functions.push(this.transformFunction(func));
      });

      // Transform tests
      ast.tests.forEach(test => {
        aikenAst.tests.push(this.transformTest(test));
      });

      return aikenAst;
    } catch (error) {
      throw new Error(`Failed to transform AST: ${(error as Error).message}`);
    }
  }

  /**
   * Transforms an import declaration
   */
  private transformImport(imp: ImportDeclaration): AikenImport {
    return {
      module: imp.module,
      alias: imp.alias,
      exposing: imp.exposing,
    };
  }

  /**
   * Transforms a type definition
   */
  private transformType(type: TypeDefinition): AikenType {
    let definition = '';

    if (type.isOpaque) {
      definition += 'pub opaque ';
    } else if (type.isPublic) {
      definition += 'pub ';
    }

    definition += `type ${type.name}`;

    if (type.typeParams && type.typeParams.length > 0) {
      definition += `<${type.typeParams.join(', ')}>`;
    }

    definition += ` {\n${type.definition}\n}`;

    return {
      name: type.name,
      typeParams: type.typeParams,
      definition,
      isOpaque: type.isOpaque,
      isPublic: type.isPublic,
      docs: type.docs,
    };
  }

  /**
   * Transforms a constant definition
   */
  private transformConstant(constant: ConstantDefinition): AikenConstant {
    let definition = '';

    if (constant.isPublic) {
      definition += 'pub ';
    }

    definition += `const ${constant.name}`;

    if (constant.typeAnnotation) {
      definition += `: ${constant.typeAnnotation}`;
    }

    definition += ` = ${constant.value}`;

    return {
      name: constant.name,
      type: constant.typeAnnotation || 'unknown',
      value: constant.value,
      isPublic: constant.isPublic,
      docs: constant.docs,
    };
  }

  /**
   * Transforms a function definition
   */
  private transformFunction(func: FunctionDefinition): AikenFunction {
    let definition = '';

    if (func.isPublic) {
      definition += 'pub ';
    }

    definition += `fn ${func.name}`;

    if (func.typeParams && func.typeParams.length > 0) {
      definition += `<${func.typeParams.join(', ')}>`;
    }

    const params = func.parameters.map((p: ParameterDefinition) => `${p.name}: ${p.type}`).join(', ');
    definition += `(${params})`;

    if (func.returnType) {
      definition += ` -> ${func.returnType}`;
    }

    definition += ` {\n${func.body}\n}`;

    return {
      name: func.name,
      typeParams: func.typeParams,
      parameters: func.parameters,
      returnType: func.returnType || 'Void',
      body: func.body,
      isPublic: func.isPublic,
      docs: func.docs,
    };
  }

  /**
   * Transforms a test definition
   */
  private transformTest(test: TestDefinition): AikenTest {
    return {
      name: test.name,
      body: test.body,
      docs: test.docs,
    };
  }

  /**
   * Get the builtin registry for external access
   */
  getBuiltinRegistry(): BuiltinRegistry {
    return this.builtinRegistry;
  }
}
