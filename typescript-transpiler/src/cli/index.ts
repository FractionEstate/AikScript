#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { TypeScriptToAikenTranspiler } from '../core/transpiler';

const program = new Command();

program
  .name('ts-aiken')
  .description('TypeScript-to-Aiken development copilot for Cardano smart contracts')
  .version('1.0.0');

program
  .command('compile <input> [output]')
  .description('Compile TypeScript smart contract to Aiken')
  .option('-t, --target <target>', 'Target format', 'aiken')
  .option('-o, --optimization <level>', 'Optimization level', 'development')
  .action(async (input: string, output: string | undefined, options: any) => {
    try {
      const transpiler = new TypeScriptToAikenTranspiler();

      const inputPath = path.resolve(input);
      const outputPath = output
        ? path.resolve(output)
        : path.join(path.dirname(inputPath), 'validators', path.basename(inputPath, '.ts') + '.ak');

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const config = {
        inputPath,
        outputPath,
        target: options.target,
        optimization: options.optimization,
      };

      console.log(`Compiling ${inputPath} to ${outputPath}...`);
      console.log(`Input path resolved to: ${inputPath}`);
      console.log(`File exists: ${fs.existsSync(inputPath)}`);

      const result = transpiler.compile(config);

      if (result.success) {
        console.log(`✅ Compilation successful!`);
        console.log(`Output written to: ${result.outputPath}`);
      } else {
        console.error('❌ Compilation failed!');
        if (result.errors) {
          result.errors.forEach(error => console.error(`  ${error}`));
        }
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('init <projectName>')
  .description('Initialize a new TypeScript Aiken project')
  .option('-t, --template <template>', 'Project template', 'basic')
  .action(async (projectName: string, options: any) => {
    try {
      const projectPath = path.resolve(projectName);

      if (fs.existsSync(projectPath)) {
        console.error(`❌ Directory ${projectName} already exists!`);
        process.exit(1);
      }

      console.log(`Creating new TypeScript Aiken project: ${projectName}`);

      // Create project structure
      fs.mkdirSync(projectPath, { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'src', 'contracts'), { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'src', 'types'), { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'src', 'tests'), { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'validators'), { recursive: true });

      // Create package.json
      const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: 'TypeScript Aiken smart contract project',
        scripts: {
          build: 'ts-aiken compile src/',
          dev: 'ts-aiken watch src/',
          test: 'jest',
        },
        devDependencies: {
          '@types/jest': '^29.5.0',
          '@types/node': '^20.0.0',
          jest: '^29.0.0',
          'ts-jest': '^29.0.0',
          typescript: '^5.0.0',
          'typescript-aiken-copilot': '^1.0.0',
        },
      };

      fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );

      // Create tsconfig.json
      const tsconfigJson = {
        compilerOptions: {
          target: 'ES2020',
          module: 'commonjs',
          outDir: './dist',
          rootDir: './src',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist'],
      };

      fs.writeFileSync(
        path.join(projectPath, 'tsconfig.json'),
        JSON.stringify(tsconfigJson, null, 2)
      );

      // Create example contract
      const exampleContract = `import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'typescript-aiken-copilot';

@contract("TimeLock")
export class TimeLockContract {
  @datum
  interface LockDatum {
    lockUntil: POSIXTime;
    owner: PubKeyHash;
    beneficiary: PubKeyHash;
  }

  @validator("spend")
  unlock(datum: LockDatum, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start;

    return tx.isSignedBy(datum.owner) ||
           (tx.isSignedBy(datum.beneficiary) && now > datum.lockUntil);
  }
}
`;

      fs.writeFileSync(path.join(projectPath, 'src', 'contracts', 'TimeLock.ts'), exampleContract);

      // Create README
      const readme = `# ${projectName}

A Cardano smart contract project using TypeScript-to-Aiken transpiler.

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Build your contracts:
\`\`\`bash
npm run build
\`\`\`

3. Your compiled Aiken files will be in the \`validators/\` directory.

## Project Structure

- \`src/contracts/\` - Your smart contract definitions
- \`src/types/\` - Custom type definitions
- \`src/tests/\` - Test files
- \`validators/\` - Generated Aiken files
`;

      fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

      console.log('✅ Project initialized successfully!');
      console.log(`\nNext steps:`);
      console.log(`  cd ${projectName}`);
      console.log(`  npm install`);
      console.log(`  npm run build`);
    } catch (error) {
      console.error('❌ Error initializing project:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('watch <input>')
  .description('Watch for changes and recompile automatically')
  .option('-o, --output <output>', 'Output directory')
  .action(async (input: string, options: any) => {
    console.log('Watch mode not yet implemented. Use compile command instead.');
  });

program.parse();
