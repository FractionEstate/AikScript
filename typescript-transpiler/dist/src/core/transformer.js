"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AikenTransformer = void 0;
const builtins_1 = require("./builtins");
/**
 * Main transformation orchestrator for TypeScript-to-Aiken transpiler
 * This module coordinates all the transformation steps
 */
class AikenTransformer {
    constructor() {
        this.builtinRegistry = new builtins_1.BuiltinRegistry();
    }
    /**
     * Transforms a TranspilerAST into an AikenAST
     * @param ast The TranspilerAST to transform
     * @returns The transformed AikenAST
     * @throws Error if transformation fails
     */
    transform(ast) {
        try {
            const aikenAst = {
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
        }
        catch (error) {
            throw new Error(`Failed to transform AST: ${error.message}`);
        }
    }
    /**
     * Transforms an import declaration
     */
    transformImport(imp) {
        return {
            module: imp.module,
            alias: imp.alias,
            exposing: imp.exposing,
        };
    }
    /**
     * Transforms a type definition
     */
    transformType(type) {
        // Check if this is a simple type alias (no braces, no unions in definition)
        const isSimpleAlias = !type.definition.includes('{') &&
            !type.definition.includes('|') &&
            !type.definition.includes('\n');
        let definition = '';
        if (isSimpleAlias) {
            // For simple type aliases, just use the definition as-is
            definition = type.definition;
        }
        else {
            // For complex types, check if it's already a record type
            const isRecordType = type.definition.trim().startsWith('{') && type.definition.trim().endsWith('}');
            if (isRecordType) {
                // For record types, just use the definition as-is (it will be formatted by the generator)
                definition = type.definition;
            }
            else {
                // For other complex types (unions, etc.), add the type wrapper
                if (type.isOpaque) {
                    definition += 'pub opaque ';
                }
                else if (type.isPublic) {
                    definition += 'pub ';
                }
                definition += `type ${type.name}`;
                if (type.typeParams && type.typeParams.length > 0) {
                    definition += `<${type.typeParams.join(', ')}>`;
                }
                definition += ` {\n${type.definition}\n}`;
            }
        }
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
    transformConstant(constant) {
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
    transformFunction(func) {
        return {
            name: func.name,
            typeParams: func.typeParams,
            parameters: func.parameters,
            returnType: func.returnType || 'Void',
            body: func.body,
            whenExpressions: func.whenExpressions,
            pipeExpressions: func.pipeExpressions,
            expectExpressions: func.expectExpressions,
            isPublic: func.isPublic,
            docs: func.docs,
        };
    }
    /**
     * Transforms a test definition
     */
    transformTest(test) {
        return {
            name: test.name,
            body: test.body,
            docs: test.docs,
        };
    }
    /**
     * Gets the builtin registry for external access
     */
    getBuiltinRegistry() {
        return this.builtinRegistry;
    }
}
exports.AikenTransformer = AikenTransformer;
//# sourceMappingURL=transformer.js.map