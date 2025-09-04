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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const transpiler_1 = require("../src/core/transpiler");
async function testTranspiler() {
    console.log('Starting transpiler test...');
    try {
        console.log('Creating transpiler instance...');
        const transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
        console.log('Transpiler created successfully');
        const inputPath = path.resolve('src/contracts/TimeLock.ts');
        const outputPath = path.resolve('test-output.aiken');
        console.log(`Input path: ${inputPath}`);
        console.log(`Output path: ${outputPath}`);
        console.log('Checking if input file exists...');
        if (!fs.existsSync(inputPath)) {
            throw new Error(`Input file does not exist: ${inputPath}`);
        }
        console.log('Input file exists');
        console.log('Reading source code...');
        const sourceCode = fs.readFileSync(inputPath, 'utf-8');
        console.log(`Source code length: ${sourceCode.length} characters`);
        console.log('Source code preview:');
        console.log(sourceCode.substring(0, 200) + '...');
        console.log('Parsing TypeScript...');
        const tsAst = transpiler.parse(sourceCode);
        console.log('Parse completed');
        console.log('Functions found:', tsAst.functions.length);
        console.log('Types found:', tsAst.types.length);
        console.log('Constants found:', tsAst.constants.length);
        if (tsAst.functions.length > 0) {
            console.log('First function:', JSON.stringify(tsAst.functions[0], null, 2));
        }
        console.log('Transforming to Aiken AST...');
        const aikenAst = transpiler.transform(tsAst);
        console.log('Transform completed');
        console.log('Aiken functions:', aikenAst.functions.length);
        console.log('Aiken types:', aikenAst.types.length);
        console.log('Aiken constants:', aikenAst.constants.length);
        console.log('Generating Aiken code...');
        const aikenCode = transpiler.generate(aikenAst);
        console.log('Generation completed');
        console.log('Generated code length:', aikenCode.length);
        console.log('Generated code:');
        console.log('--- START GENERATED CODE ---');
        console.log(aikenCode);
        console.log('--- END GENERATED CODE ---');
        console.log(`Writing to output file: ${outputPath}`);
        fs.writeFileSync(outputPath, aikenCode);
        console.log('File written successfully');
        console.log('✅ Test completed successfully!');
    }
    catch (error) {
        console.error('❌ Error occurred:');
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        console.error('Full error:', error);
    }
}
testTranspiler();
//# sourceMappingURL=test-transpiler.js.map