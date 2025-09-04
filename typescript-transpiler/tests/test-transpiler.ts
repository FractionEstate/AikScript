import * as fs from 'fs';
import * as path from 'path';
import { TypeScriptToAikenTranspiler } from '../src/core/transpiler';

async function testTranspiler() {
  console.log('Starting transpiler test...');

  try {
    console.log('Creating transpiler instance...');
    const transpiler = new TypeScriptToAikenTranspiler();
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
    console.log('Contracts found:', tsAst.contracts.length);
    console.log('Types found:', tsAst.types.length);

    if (tsAst.contracts.length > 0) {
      console.log('First contract:', JSON.stringify(tsAst.contracts[0], null, 2));
    }

    console.log('Transforming to Aiken AST...');
    const aikenAst = transpiler.transform(tsAst);
    console.log('Transform completed');
    console.log('Aiken contracts:', aikenAst.contracts.length);
    console.log('Aiken types:', aikenAst.types.length);

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
  } catch (error) {
    console.error('❌ Error occurred:');
    console.error('Message:', (error as Error).message);
    console.error('Stack:', (error as Error).stack);
    console.error('Full error:', error);
  }
}

testTranspiler();
