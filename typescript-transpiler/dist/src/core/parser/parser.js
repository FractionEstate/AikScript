"use strict";
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
                ast.imports.push(this.parseImportDeclaration(node));
            }
            else if (ts.isTypeAliasDeclaration(node)) {
                ast.types.push(this.parseTypeAliasDeclaration(node));
            }
            else if (ts.isInterfaceDeclaration(node)) {
                ast.types.push(this.parseInterfaceDeclaration(node));
            }
            else if (ts.isVariableDeclaration(node) && this.isConstantDeclaration(node)) {
                ast.constants.push(this.parseConstantDeclaration(node));
            }
            else if (ts.isFunctionDeclaration(node)) {
                ast.functions.push(this.parseFunctionDeclaration(node));
            }
            else if (ts.isMethodDeclaration(node)) {
                if (this.isValidatorMethod(node)) {
                    const validator = this.parseValidatorDeclaration(node);
                    ast.functions.push(validator);
                }
                else {
                    const method = this.parseFunctionDeclaration(node);
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
        // Extract from file name or use default
        const fileName = sourceFile.fileName;
        const baseName = fileName.replace(/\.[^/.]+$/, '');
        return baseName || 'main';
    }
    /**
     * Parses import declaration
     */
    parseImportDeclaration(node) {
        const module = node.moduleSpecifier.getText().replace(/['"]/g, '');
        return {
            module,
        };
    }
    /**
     * Parses type alias declaration
     */
    parseTypeAliasDeclaration(node) {
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
    parseInterfaceDeclaration(node) {
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
    parseConstantDeclaration(node) {
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
    parseFunctionDeclaration(node) {
        const parameters = node.parameters.map(param => ({
            name: param.name.getText(),
            type: param.type ? this.generateTypeDefinition(param.type) : 'Void',
        }));
        const body = node.body ? node.body.getText() : '';
        const whenExpressions = this.parseWhenExpressions(body);
        const pipeExpressions = this.parsePipeExpressions(body);
        // Extract expect expressions from the source code around the function declaration
        const expectExpressions = this.parseExpectExpressionsAroundFunction(node);
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
    parseTestDeclaration(node) {
        return {
            name: node.name.getText(),
            body: node.body ? node.body.getText() : '',
            docs: this.extractJSDoc(node),
        };
    }
    /**
     * Generates type definition string from TypeScript type
     */
    generateTypeDefinition(type) {
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
            const paramTypes = type.parameters.map(p => p.type ? this.generateTypeDefinition(p.type) : 'any');
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
    isPublicDeclaration(node) {
        // Check for export keyword or public modifier
        if (ts.isVariableDeclaration(node) ||
            ts.isFunctionDeclaration(node) ||
            ts.isTypeAliasDeclaration(node) ||
            ts.isInterfaceDeclaration(node)) {
            return ((ts.isVariableDeclaration(node) ? undefined : node.modifiers)?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword || mod.kind === ts.SyntaxKind.PublicKeyword) || false);
        }
        return false;
    }
    /**
     * Checks if a variable declaration is a constant
     */
    isConstantDeclaration(node) {
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
    isTestMethod(node) {
        return node.name.getText().startsWith('test');
    }
    /**
     * Checks if a method has a @validator decorator
     */
    isValidatorMethod(node) {
        const modifiers = node.modifiers;
        if (!modifiers)
            return false;
        return modifiers.some(modifier => {
            if (ts.isDecorator(modifier)) {
                const expression = modifier.expression;
                if (ts.isCallExpression(expression)) {
                    const identifier = expression.expression;
                    if (ts.isIdentifier(identifier)) {
                        return identifier.text === 'validator';
                    }
                }
                else if (ts.isIdentifier(expression)) {
                    return expression.text === 'validator';
                }
            }
            return false;
        });
    }
    /**
     * Parses validator declaration
     */
    parseValidatorDeclaration(node) {
        const body = node.body ? node.body.getText() : '';
        const parameters = node.parameters.map(param => ({
            name: param.name.getText(),
            type: param.type ? this.generateTypeDefinition(param.type) : 'Data',
        }));
        // For validators, we need to generate validator syntax instead of function syntax
        const validatorName = node.name.getText();
        const purpose = this.extractValidatorPurpose(node);
        // Extract the actual function body (remove the outer braces if present)
        let cleanBody = body.trim();
        if (cleanBody.startsWith('{') && cleanBody.endsWith('}')) {
            cleanBody = cleanBody.slice(1, -1).trim();
        }
        // Generate validator block instead of function
        const validatorBody = `validator ${validatorName} {
  ${purpose}(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) -> ${node.type ? this.generateTypeDefinition(node.type) : 'Bool'} {
    ${cleanBody}
  }
}`;
        return {
            name: validatorName,
            parameters,
            returnType: node.type ? this.generateTypeDefinition(node.type) : 'Bool',
            body: validatorBody,
            isPublic: this.isPublicDeclaration(node),
            docs: this.extractJSDoc(node),
        };
    }
    /**
     * Extracts validator purpose from decorator arguments
     */
    extractValidatorPurpose(node) {
        const modifiers = node.modifiers;
        if (!modifiers)
            return 'spend';
        for (const modifier of modifiers) {
            if (ts.isDecorator(modifier)) {
                const expression = modifier.expression;
                if (ts.isCallExpression(expression) && expression.arguments.length > 0) {
                    const arg = expression.arguments[0];
                    if (ts.isStringLiteral(arg)) {
                        return arg.text;
                    }
                }
            }
        }
        return 'spend';
    }
    /**
     * Extracts JSDoc comments
     */
    extractJSDoc(node) {
        const docs = [];
        const jsDoc = ts.getJSDocCommentsAndTags(node);
        if (jsDoc && jsDoc.length > 0) {
            jsDoc.forEach((doc) => {
                if (doc.comment) {
                    docs.push(typeof doc.comment === 'string' ? doc.comment : doc.comment.map(c => c.text).join(''));
                }
            });
        }
        return docs;
    }
    /**
     * Parses when expressions in the function body
     */
    parseWhenExpressions(body) {
        const whenRegex = /\/\/\s*@when\s+(\w+)/g;
        const expressions = [];
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
    parseWhenClausesFromBody(body, variableName) {
        const clauses = [];
        // Simple pattern: look for if statements that check the variable
        const ifRegex = new RegExp(`if\\s*\\(\\s*${variableName}\\s*===?\\s*([^)]+)\\)`, 'g');
        let match;
        while ((match = ifRegex.exec(body)) !== null) {
            const patternValue = match[1].replace(/['"]/g, '').trim();
            clauses.push({
                pattern: { type: 'literal', value: patternValue },
                body: `// matched ${patternValue}`,
            });
        }
        // Look for hasOwnProperty checks (for object patterns)
        const hasOwnPropertyRegex = new RegExp(`${variableName}\\.hasOwnProperty\\('([^']+)'\\)`, 'g');
        while ((match = hasOwnPropertyRegex.exec(body)) !== null) {
            const propertyName = match[1];
            clauses.push({
                pattern: { type: 'constructor', constructor: propertyName },
                body: `// matched ${propertyName}`,
            });
        }
        return clauses;
    }
    /**
     * Parses pipe expressions in the function body
     */
    parsePipeExpressions(body) {
        const pipeRegex = /\/\/\s*@pipe\s+(.+)/g;
        const expressions = [];
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
    parsePipeLine(pipeLine) {
        // Remove the |> operators and split by them
        const parts = pipeLine.split(/\s*\|\s*>\s*/).map(p => p.trim());
        if (parts.length < 2) {
            return null;
        }
        const initialValue = parts[0];
        const operations = [];
        for (let i = 1; i < parts.length; i++) {
            const part = parts[i];
            // Handle function calls with arguments like addPrefix("Result: ")
            const funcMatch = part.match(/^(\w+)\((.*)\)$/);
            if (funcMatch) {
                const functionName = funcMatch[1];
                const args = funcMatch[2] ? funcMatch[2].split(',').map(a => a.trim()) : [];
                operations.push({ functionName, args });
            }
            else {
                // Simple function name without arguments
                operations.push({ functionName: part, args: [] });
            }
        }
        return { initialValue, operations };
    }
    /**
     * Parses expect expressions in the function body
     */
    parseExpectExpressions(body) {
        const expectRegex = /\/\/\s*@expect\s+(.+)/g;
        const expressions = [];
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
     * Parses expect expressions around a function declaration
     */
    parseExpectExpressionsAroundFunction(node) {
        const sourceFile = node.getSourceFile();
        const text = sourceFile.getFullText();
        const functionStart = node.getStart();
        // Look for @expect comments in the 500 characters before the function
        const searchStart = Math.max(0, functionStart - 500);
        const searchText = text.substring(searchStart, functionStart);
        // Find all @expect comments in the search text
        const expectRegex = /\/\/\s*@expect\s+(.+)/g;
        const expressions = [];
        let match;
        while ((match = expectRegex.exec(searchText)) !== null) {
            const expectLine = match[1].trim();
            const parsed = this.parseExpectLine(expectLine);
            if (parsed) {
                expressions.push(parsed);
            }
        }
        // For each function, collect all expect expressions that precede it
        // If there are multiple expressions close together, they likely belong to the same function
        if (expressions.length > 1) {
            // Check if the last few expressions are close together (within the same logical block)
            const lastExpressions = expressions.slice(-2); // Get last 2 expressions
            const searchTextAfterLastExpression = searchText.substring(searchText.lastIndexOf('@expect', searchText.lastIndexOf('@expect') - 1));
            // If there's no function declaration between the last two @expect comments,
            // they likely belong to the same function
            const hasFunctionBetween = searchTextAfterLastExpression.includes('export function') ||
                searchTextAfterLastExpression.includes('function ');
            if (!hasFunctionBetween) {
                return lastExpressions;
            }
        }
        // Default: return only the last expect expression
        return expressions.length > 0 ? [expressions[expressions.length - 1]] : [];
    }
    /**
     * Parses a single expect line like "someOption, 'Value not found'" or "someOption 'Value not found'"
     */
    parseExpectLine(expectLine) {
        // Handle expect with custom error message: expect(option.Some, "error message") or expect(option.Some "error message")
        // Also handle simple variable names and complex expressions with dots
        const withMessageMatch = expectLine.match(/^([\w.]+)[,\s]+['"](.+)['"]$/);
        if (withMessageMatch) {
            return {
                expression: withMessageMatch[1],
                errorMessage: withMessageMatch[2]
            };
        }
        // Handle simple expect: expect(option) or expect(option.Some)
        const simpleMatch = expectLine.match(/^([\w.]+)$/);
        if (simpleMatch) {
            return {
                expression: simpleMatch[1],
                errorMessage: 'Expected value but found None'
            };
        }
        return null;
    }
}
exports.TypeScriptParser = TypeScriptParser;
//# sourceMappingURL=parser.js.map