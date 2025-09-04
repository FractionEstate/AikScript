// Compile command handler for AikScript CLI
// Following aiken-lang patterns for modular command organization

import * as fs from 'fs';
import * as path from 'path';
import { TypeScriptToAikenTranspiler } from '../../core/transpiler';
import { CompileOptions } from '../interfaces';
import { ensureDirectoryExists, resolveOutputPath, updatePlutusJson } from '../utils/file-operations';

/**
 * Handles the compile command
 * Compiles TypeScript smart contract to Aiken format
 */
export async function handleCompile(
  input: string,
  output: string | undefined,
  options: CompileOptions
): Promise<void> {
  try {
    const transpiler = new TypeScriptToAikenTranspiler();
    const inputPath = path.resolve(input);
    const outputPath = resolveOutputPath(inputPath, output);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    ensureDirectoryExists(outputDir);

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
          updatePlutusJson(plutusJsonPath, contractName, outputPath);
          console.log(`📄 Updated plutus.json with validator information`);
        } catch (error) {
          console.warn(`⚠️  Could not update plutus.json: ${(error as Error).message}`);
        }
      }

      console.log(`\n🎉 Ready to use with Aiken CLI:`);
      console.log(`   aiken check`);
      console.log(`   aiken build`);
    } else {
      console.error('❌ Compilation failed');
      if (result.errors && result.errors.length > 0) {
        console.error(`Error: ${result.errors.join(', ')}`);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error during compilation:', (error as Error).message);
    process.exit(1);
  }
}
