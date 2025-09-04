"use strict";
// Main TypeScript parser for AikScript
// Following aiken-lang patterns for modular organization
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptParser = void 0;
const fs = __importStar(require("fs"));
const ts = __importStar(require("typescript"));
const import_parser_js_1 = require("./parsers/import-parser.js");
const type_parser_js_1 = require("./parsers/type-parser.js");
const function_parser_js_1 = require("./parsers/function-parser.js");
const constant_parser_js_1 = require("./parsers/constant-parser.js");
class TypeScriptParser {
    constructor(config = {}) {
        this.config = config;
        this.config = {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            ...config,
        };
        this.importParser = new import_parser_js_1.ImportParser();
        this.typeParser = new type_parser_js_1.TypeParser();
        this.functionParser = new function_parser_js_1.FunctionParser();
        this.constantParser = new constant_parser_js_1.ConstantParser();
    }
    /**
     * Parses a TypeScript file into a TranspilerAST
     * @param filePath Path to the TypeScript file to parse
     * @returns The parsed AST representation
     * @throws Error if the file cannot be read or parsed
     */
    parse(filePath) {
        try {
            const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf-8'), this.config.target || ts.ScriptTarget.ES2020, true);
            this.program = ts.createProgram([filePath], this.config);
            this.checker = this.program.getTypeChecker();
            return this.analyzeSourceFile(sourceFile);
        }
        catch (error) {
            throw new Error(`Failed to parse TypeScript file ${filePath}: ${error.message}`);
        }
    }
    /**
     * Parses TypeScript source code string into a TranspilerAST
     * @param sourceCode The TypeScript source code to parse
     * @param fileName Optional filename for the source (defaults to 'temp.ts')
     * @returns The parsed AST representation
     * @throws Error if the source cannot be parsed
     */
    parseSource(sourceCode, fileName = 'temp.ts') {
        try {
            const sourceFile = ts.createSourceFile(fileName, sourceCode, this.config.target || ts.ScriptTarget.ES2020, true);
            this.program = ts.createProgram([fileName], this.config);
            this.checker = this.program.getTypeChecker();
            return this.analyzeSourceFile(sourceFile);
        }
        catch (error) {
            throw new Error(`Failed to parse TypeScript source: ${error.message}`);
        }
    }
    /**
     * Analyzes a TypeScript source file and converts it to TranspilerAST
     */
    analyzeSourceFile(sourceFile) {
        const ast = {
            moduleName: this.extractModuleName(sourceFile),
            docs: [],
            imports: [],
            types: [],
            constants: [],
            functions: [],
            tests: [],
        };
        const visit = (node) => {
            if (ts.isImportDeclaration(node)) {
                ast.imports.push(this.importParser.parse(node));
            }
            else if (ts.isTypeAliasDeclaration(node)) {
                ast.types.push(this.typeParser.parseTypeAlias(node));
            }
            else if (ts.isInterfaceDeclaration(node)) {
                ast.types.push(this.typeParser.parseInterface(node));
            }
            else if (ts.isVariableDeclaration(node) && this.isConstantDeclaration(node)) {
                ast.constants.push(this.constantParser.parse(node));
            }
            else if (ts.isFunctionDeclaration(node)) {
                ast.functions.push(this.functionParser.parseFunction(node));
            }
            else if (ts.isMethodDeclaration(node)) {
                if (this.isValidatorMethod(node)) {
                    const validator = this.functionParser.parseValidator(node);
                    ast.functions.push(validator);
                }
                else {
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
    extractModuleName(sourceFile) {
        const fileName = sourceFile.fileName;
        const baseName = fileName.replace(/\.[^/.]+$/, '');
        return baseName || 'main';
    }
    /**
     * Checks if a variable declaration is a constant
     */
    isConstantDeclaration(node) {
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
    isValidatorMethod(node) {
        // Check for validator decorator
        const decorators = ts.getDecorators(node);
        if (!decorators)
            return false;
        return decorators.some(decorator => {
            if (ts.isCallExpression(decorator.expression)) {
                const expression = decorator.expression.expression;
                return ts.isIdentifier(expression) && expression.text === 'validator';
            }
            return false;
        });
    }
}
exports.TypeScriptParser = TypeScriptParser;
//# sourceMappingURL=index.js.map