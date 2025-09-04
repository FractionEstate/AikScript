"use strict";
// Compile command handler for AikScript CLI
// Following aiken-lang patterns for modular command organization
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
exports.handleCompile = handleCompile;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const transpiler_1 = require("../../core/transpiler");
const file_operations_1 = require("../utils/file-operations");
/**
 * Handles the compile command
 * Compiles TypeScript smart contract to Aiken format
 */
async function handleCompile(input, output, options) {
    try {
        const transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
        const inputPath = path.resolve(input);
        const outputPath = (0, file_operations_1.resolveOutputPath)(inputPath, output);
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        (0, file_operations_1.ensureDirectoryExists)(outputDir);
        const config = {
            inputPath,
            outputPath,
            target: options.target,
            optimization: options.optimization,
        };
        console.log(`🔄 Compiling ${inputPath} to ${outputPath}...`);
        if (!fs.existsSync(inputPath)) {
            console.error(`❌ Input file not found: ${inputPath}`);
            process.exit(1);
        }
        const result = transpiler.compile(config);
        if (result.success) {
            console.log(`✅ Compilation successful!`);
            console.log(`📄 Aiken output: ${result.outputPath}`);
            // Update plutus.json if it exists (standard Aiken structure)
            const plutusJsonPath = path.join(process.cwd(), 'plutus.json');
            if (fs.existsSync(plutusJsonPath)) {
                try {
                    const contractName = path.basename(inputPath, '.ts');
                    (0, file_operations_1.updatePlutusJson)(plutusJsonPath, contractName, outputPath);
                    console.log(`📄 Updated plutus.json with validator information`);
                }
                catch (error) {
                    console.warn(`⚠️  Could not update plutus.json: ${error.message}`);
                }
            }
            console.log(`\n🎉 Ready to use with Aiken CLI:`);
            console.log(`   aiken check`);
            console.log(`   aiken build`);
        }
        else {
            console.error('❌ Compilation failed');
            if (result.errors && result.errors.length > 0) {
                console.error(`Error: ${result.errors.join(', ')}`);
            }
            process.exit(1);
        }
    }
    catch (error) {
        console.error('❌ Error during compilation:', error.message);
        process.exit(1);
    }
}
//# sourceMappingURL=compile.js.map