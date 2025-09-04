"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptToAikenTranspiler = void 0;
const transformer_1 = require("./transformer/transformer");
const parser_1 = require("./parser/parser");
const generator_1 = require("./generator/generator");
class TypeScriptToAikenTranspiler {
    constructor() {
        this.parser = new parser_1.TypeScriptParser();
        this.transformer = new transformer_1.AikenTransformer();
        this.generator = new generator_1.CodeGenerator(this.transformer.getBuiltinRegistry());
    }
    /**
     * Parses TypeScript source code into a TranspilerAST
     * @param sourceCode The TypeScript source code to parse
     * @returns The parsed AST representation
     */
    parse(sourceCode) {
        return this.parser.parseSource(sourceCode);
    }
    /**
     * Transforms a TranspilerAST into an AikenAST
     * @param ast The TypeScript AST to transform
     * @returns The transformed Aiken AST
     */
    transform(ast) {
        return this.transformer.transform(ast);
    }
    /**
     * Generates Aiken code from an AikenAST
     * @param aikenAst The Aiken AST to generate code from
     * @returns The generated Aiken source code
     */
    generate(aikenAst) {
        return this.generator.generate(aikenAst);
    }
    compile(config) {
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
        }
        catch (error) {
            console.error('❌ Compilation failed:', error.message);
            return {
                success: false,
                outputPath: config.outputPath,
                generatedCode: '',
                errors: [error.message],
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
exports.TypeScriptToAikenTranspiler = TypeScriptToAikenTranspiler;
//# sourceMappingURL=transpiler.js.map