"use strict";
// Main code generation orchestrator for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
const index_1 = require("./imports/index");
const index_2 = require("./types/index");
const index_3 = require("./constants/index");
const index_4 = require("./functions/index");
const index_5 = require("./tests/index");
/**
 * Main code generation orchestrator
 * Coordinates all specialized generators to produce Aiken code
 */
class CodeGenerator {
    constructor(builtinRegistry) {
        this.builtinRegistry = builtinRegistry;
        this.importGenerator = new index_1.ImportGenerator();
        this.typeGenerator = new index_2.TypeGenerator();
        this.constantGenerator = new index_3.ConstantGenerator();
        this.functionGenerator = new index_4.FunctionGenerator();
        this.testGenerator = new index_5.TestGenerator();
    }
    /**
     * Generate Aiken code from AikenAST
     */
    generate(ast) {
        try {
            const lines = [];
            // Add module docs
            if (ast.docs && ast.docs.length > 0) {
                ast.docs.forEach(doc => {
                    lines.push(`/// ${doc}`);
                });
                lines.push('');
            }
            // Add builtin imports if any are used
            const usedImports = this.builtinRegistry.getUsedImports();
            if (usedImports.length > 0) {
                lines.push(`use aiken/builtin.{${usedImports.join(', ')}}`);
                lines.push('');
            }
            // Generate imports
            ast.imports.forEach(imp => {
                lines.push(this.importGenerator.generate(imp));
            });
            if (ast.imports.length > 0) {
                lines.push('');
            }
            // Generate types
            ast.types.forEach(type => {
                lines.push(this.typeGenerator.generate(type));
                lines.push('');
            });
            // Generate constants
            ast.constants.forEach(constant => {
                lines.push(this.constantGenerator.generate(constant));
                lines.push('');
            });
            // Generate functions
            ast.functions.forEach(func => {
                lines.push(this.functionGenerator.generate(func));
                lines.push('');
            });
            // Generate tests
            ast.tests.forEach(test => {
                lines.push(this.testGenerator.generate(test));
                lines.push('');
            });
            return lines.join('\n');
        }
        catch (error) {
            throw new Error(`Failed to generate Aiken code: ${error.message}`);
        }
    }
}
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=index.js.map