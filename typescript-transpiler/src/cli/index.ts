#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { TypeScriptToAikenTranspiler } from '../core/transpiler';

const program = new Command();

program
  .name('aikscript')
  .description('AikScript: TypeScript-to-Aiken development copilot for Cardano smart contracts')
  .version('1.0.0');

program
  .command('compile <input> [output]')
  .description('Compile TypeScript smart contract to Aiken (standard Aiken structure)')
  .option('-t, --target <target>', 'Target format', 'aiken')
  .option('-o, --optimization <level>', 'Optimization level', 'development')
  .action(async (input: string, output: string | undefined, options: any) => {
    try {
      const transpiler = new TypeScriptToAikenTranspiler();

      const inputPath = path.resolve(input);

      // Determine output path based on standard Aiken structure
      let outputPath: string;
      if (output) {
        outputPath = path.resolve(output);
      } else {
        // If input is in lib/, output to validators/
        const relativePath = path.relative(process.cwd(), inputPath);
        if (relativePath.startsWith('lib/') || relativePath.startsWith('lib\\')) {
          const validatorsDir = path.join(process.cwd(), 'validators');
          const relativeToLib = path.relative(path.join(process.cwd(), 'lib'), inputPath);
          const baseName = path.basename(relativeToLib, '.ts');
          outputPath = path.join(validatorsDir, baseName + '.ak');
        } else {
          outputPath = path.join(path.dirname(inputPath), 'validators', path.basename(inputPath, '.ts') + '.ak');
        }
      }

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
            const plutusData = JSON.parse(fs.readFileSync(plutusJsonPath, 'utf-8'));

            // Add/update validator in plutus.json
            const contractName = path.basename(inputPath, '.ts');
            const existingValidatorIndex = plutusData.validators.findIndex((v: any) =>
              v.title && v.title.includes(contractName)
            );

            const newValidator = {
              title: `${contractName}.spend`,
              datum: {
                title: "datum",
                schema: {
                  type: "object",
                  properties: {
                    owner: { type: "string" },
                    amount: { type: "string" }
                  }
                }
              },
              redeemer: {
                title: "redeemer",
                schema: {
                  type: "object"
                }
              },
              compiledCode: "placeholder_compiled_code",
              hash: "placeholder_hash"
            };

            if (existingValidatorIndex >= 0) {
              plutusData.validators[existingValidatorIndex] = newValidator;
            } else {
              plutusData.validators.push(newValidator);
            }

            fs.writeFileSync(plutusJsonPath, JSON.stringify(plutusData, null, 2));
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
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error during compilation:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('init <projectName>')
  .description('Initialize a new TypeScript Aiken project with standard Aiken structure')
  .option('-t, --template <template>', 'Project template', 'basic')
  .action(async (projectName: string, _options: any) => {
    try {
      const projectPath = path.resolve(projectName);

      if (fs.existsSync(projectPath)) {
        console.error(`❌ Directory ${projectName} already exists!`);
        process.exit(1);
      }

      console.log(`Creating new TypeScript Aiken project: ${projectName}`);

      // Create standard Aiken project structure
      fs.mkdirSync(projectPath, { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'lib'), { recursive: true });
      fs.mkdirSync(path.join(projectPath, 'validators'), { recursive: true });

      // Create aiken.toml
      const aikenToml = `name = "${projectName}"
version = "1.0.0"
plutusVersion = "v3"
licences = ["Apache-2.0"]
description = "TypeScript Aiken contracts for project '${projectName}'"

[[dependencies]]
name = "aiken-lang/stdlib"
version = "v2"
source = "github"
`;

      fs.writeFileSync(path.join(projectPath, 'aiken.toml'), aikenToml);

      // Create initial plutus.json
      const plutusJson = {
        preamble: {
          title: projectName,
          description: `TypeScript Aiken contracts for project '${projectName}'`,
          version: "1.0.0",
          plutusVersion: "v3",
          compiler: {
            name: "TypeScript-to-Aiken",
            version: "1.0.0"
          }
        },
        validators: []
      };

      fs.writeFileSync(
        path.join(projectPath, 'plutus.json'),
        JSON.stringify(plutusJson, null, 2)
      );

      // Create package.json for TypeScript tooling
      const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: 'TypeScript Aiken smart contract project',
        scripts: {
          build: 'aikscript compile lib/',
          dev: 'aikscript watch lib/',
          test: 'jest',
          clean: 'rm -rf validators/*.ak plutus.json'
        },
        devDependencies: {
          '@types/jest': '^29.5.0',
          '@types/node': '^20.0.0',
          jest: '^29.0.0',
          'ts-jest': '^29.0.0',
          typescript: '^5.0.0',
          'aikscript': 'file:../',
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
          rootDir: './lib',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          resolveJsonModule: true,
          types: ["node", "jest"]
        },
        include: ['lib/**/*'],
        exclude: ['node_modules', 'dist', 'validators']
      };

      fs.writeFileSync(
        path.join(projectPath, 'tsconfig.json'),
        JSON.stringify(tsconfigJson, null, 2)
      );

      // Create example contract in lib/
      const exampleContract = `import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'typescript-aiken-copilot';

@contract("${projectName}")
export class MainContract {
  @datum
  public datum: any = {
    owner: null as any,
    amount: null as any
  };

  @validator("spend")
  spend(datum: { owner: PubKeyHash; amount: bigint }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
`;

      fs.writeFileSync(path.join(projectPath, 'lib', 'main.ts'), exampleContract);

      // Create .gitignore
      const gitignore = `# Dependencies
node_modules/

# Build outputs
dist/
validators/*.ak
plutus.json

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
`;

      fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

      // Create README
      const readme = `# ${projectName}

Write validators in TypeScript using the \`lib\` folder, and AikScript will generate Aiken validators in the \`validators\` folder.

\`\`\`typescript
import { contract, datum, validator, Bool, ScriptContext } from 'aikscript';

@contract("${projectName}")
export class MyFirstContract {
  @datum
  public datum: any = {
    owner: null as any
  };

  @validator("spend")
  spend(datum: { owner: string }, redeemer: void, ctx: ScriptContext): Bool {
    return true;
  }
}
\`\`\`

## Building

\`\`\`sh
# Compile TypeScript to Aiken
aikscript compile lib/

# Or use npm script
npm run build
\`\`\`

## Configuring

**aiken.toml**
\`\`\`toml
[config.default]
network_id = 41
\`\`\`

Or, alternatively, write conditional environment modules under \`env\`.

## Testing

You can write tests using Jest in TypeScript. For example:

\`\`\`typescript
import { myContract } from '../lib/my_contract';

describe('My Contract', () => {
  test('should validate spend', () => {
    // Your test logic here
    expect(true).toBe(true);
  });
});
\`\`\`

To run all tests, simply do:

\`\`\`sh
npm test
\`\`\`

To run only tests matching the string \`foo\`, do:

\`\`\`sh
npm test -- --testNamePattern=foo
\`\`\`

## Documentation

If you're writing a library, you might want to generate TypeScript documentation.

Use:

\`\`\`sh
npx typedoc lib/
\`\`\`

## Resources

Find more on the [AikScript documentation](https://github.com/aikscript/docs) and [Aiken's user manual](https://aiken-lang.org).
`;

      fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

      console.log('✅ AikScript project initialized successfully!');
      console.log(`\nProject structure created:`);
      console.log(`  📁 ${projectName}/`);
      console.log(`    ├── 📄 aiken.toml`);
      console.log(`    ├── 📄 plutus.json`);
      console.log(`    ├── 📄 package.json`);
      console.log(`    ├── 📄 tsconfig.json`);
      console.log(`    ├── 📄 README.md`);
      console.log(`    ├── 📄 .gitignore`);
      console.log(`    ├── 📁 lib/`);
      console.log(`    │   └── 📄 main.ts`);
      console.log(`    └── 📁 validators/`);

      console.log(`\nNext steps:`);
      console.log(`  cd ${projectName}`);
      console.log(`  npm install`);
      console.log(`  npm run build`);
      console.log(`\nThen you can use standard Aiken CLI commands:`);
      console.log(`  aiken check`);
      console.log(`  aiken build`);
    } catch (error) {
      console.error('❌ Error initializing project:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('watch <input>')
  .description('Watch for changes and recompile automatically')
  .option('-o, --output <output>', 'Output directory')
  .action(async (_input: string, _options: any) => {
    console.log('Watch mode not yet implemented. Use compile command instead.');
  });

program.parse();
