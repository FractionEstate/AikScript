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

/**
 * Compile command handler
 * Compiles TypeScript smart contract to Aiken format
 * @param input Input TypeScript file path
 * @param output Optional output Aiken file path
 * @param options Command options
 */
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
          outputPath = path.join(
            path.dirname(inputPath),
            'validators',
            path.basename(inputPath, '.ts') + '.ak'
          );
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
            const existingValidatorIndex = plutusData.validators.findIndex(
              (v: any) => v.title && v.title.includes(contractName)
            );

            const newValidator = {
              title: `${contractName}.spend`,
              datum: {
                title: 'datum',
                schema: {
                  type: 'object',
                  properties: {
                    owner: { type: 'string' },
                    amount: { type: 'string' },
                  },
                },
              },
              redeemer: {
                title: 'redeemer',
                schema: {
                  type: 'object',
                },
              },
              compiledCode: 'placeholder_compiled_code',
              hash: 'placeholder_hash',
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

      // Create standard Aiken project structure matching smartcontracts example
      const dirs = [
        'env',
        'lib',
        'typescript/lib',
        'typescript/validators',
        'validators',
        'build/packages',
        '.github/workflows'
      ];

      dirs.forEach(dir => {
        fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
      });

      // Create aiken.toml matching smartcontracts format
      const aikenToml = `name = "${projectName}"
version = "0.0.0"
compiler = "v1.1.19"
plutus = "v3"
license = "Apache-2.0"
description = "Aiken contracts for project '${projectName}'"

[repository]
user = "your-username"
project = "${projectName}"
platform = "github"

[[dependencies]]
name = "aiken-lang/stdlib"
version = "v2.2.0"
source = "github"

[config]
`;

      fs.writeFileSync(path.join(projectPath, 'aiken.toml'), aikenToml);

      // Create initial plutus.json matching smartcontracts format
      const plutusJson = {
        preamble: {
          title: projectName,
          description: `Aiken contracts for project '${projectName}'`,
          version: "0.0.0",
          plutusVersion: "v3",
          compiler: {
            name: "Aiken",
            version: "v1.1.19+e525483"
          },
          license: "Apache-2.0"
        },
        validators: [
          {
            title: "placeholder.placeholder.mint",
            redeemer: {
              title: "_redeemer",
              schema: {
                $ref: "#/definitions/Data"
              }
            },
            datum: {
              title: "_datum",
              schema: {
                $ref: "#/definitions/Data"
              }
            },
            parameters: [],
            compiledCode: "validators/placeholder.ak"
          }
        ],
        definitions: {
          Data: {
            title: "Data",
            description: "Any Plutus data."
          }
        }
      };

      fs.writeFileSync(path.join(projectPath, 'plutus.json'), JSON.stringify(plutusJson, null, 2));

      // Create .gitignore matching smartcontracts format
      const gitignoreContent = `# Aiken compilation artifacts
artifacts/
# Aiken's project working directory
build/
# Aiken's default documentation export
docs/
`;

      fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);

      // Create README.md matching smartcontracts format
      const readme = `# ${projectName}

Write validators in the \`validators\` folder, and supporting functions in the \`lib\` folder using \`.ak\` as a file extension.

\`\`\`aiken
validator my_first_validator {
  spend(_datum: Option<Data>, _redeemer: Data, _output_reference: Data, _context: Data) {
    True
  }
}
\`\`\`

## Building

\`\`\`sh
aiken build
\`\`\`

## Configuring

Edit \`aiken.toml\` to configure your project.

## TypeScript Support

This project includes TypeScript support through AikScript. Write your contracts in TypeScript in the \`typescript/lib/\` directory and use AikScript commands:

\`\`\`sh
# Check and compile TypeScript contracts
aikscript check
aikscript build

# Create new contracts
aikscript new my-contract
\`\`\`
`;

      fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

      // Create GitHub Actions CI workflow
      const ciWorkflow = `name: Continuous Integration

on:
  push:
    branches: ["main"]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: aiken-lang/setup-aiken@v1
        with:
          version: v1.1.19
      - run: aiken fmt --check
      - run: aiken check -D
      - run: aiken build
`;

      fs.writeFileSync(path.join(projectPath, '.github/workflows/continuous-integration.yml'), ciWorkflow);

      // Create placeholder validator
      const placeholderValidator = `validator placeholder {
  mint(_redeemer: Data, _context: Data) {
    True
  }
}
`;

      fs.writeFileSync(path.join(projectPath, 'validators/placeholder.ak'), placeholderValidator);

      // Create example contract in typescript/lib
      const exampleContract = `import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

@contract("HelloWorld")
export class HelloWorldContract {
  @datum
  public data: any = {
    owner: null as any
  };

  @validator("spend")
  hello(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
`;

      fs.mkdirSync(path.join(projectPath, 'typescript/lib/types'), { recursive: true });
      fs.writeFileSync(path.join(projectPath, 'typescript/lib/HelloWorld.ts'), exampleContract);

      // Create lib/utils.ts in typescript directory
      const utilsFile = `/**
 * Utility functions for AikScript contracts
 */

// Common validation helpers
export function validateSignature(tx: any, pubKeyHash: any): boolean {
  return tx.isSignedBy(pubKeyHash);
}

export function validateTimeRange(tx: any, startTime: any, endTime?: any): boolean {
  const currentTime = tx.validityRange.start;
  if (endTime) {
    return currentTime >= startTime && currentTime <= endTime;
  }
  return currentTime >= startTime;
}

// Common data constructors
export function createDatum(fields: Record<string, any>): any {
  return fields;
}

export function createRedeemer(action: string, data?: any): any {
  return data || action;
}
`;

      fs.writeFileSync(path.join(projectPath, 'typescript/lib/utils.ts'), utilsFile);

      console.log('✅ AikScript project initialized successfully!');
      console.log(`\n📁 Project structure:`);
      console.log(`   ${projectName}/`);
      console.log(`   ├── .gitignore`);
      console.log(`   ├── README.md`);
      console.log(`   ├── aiken.toml`);
      console.log(`   ├── plutus.json`);
      console.log(`   ├── .github/`);
      console.log(`   │   └── workflows/`);
      console.log(`   │       └── continuous-integration.yml`);
      console.log(`   ├── build/`);
      console.log(`   │   └── packages/`);
      console.log(`   ├── env/`);
      console.log(`   ├── lib/`);
      console.log(`   ├── typescript/`);
      console.log(`   │   ├── lib/`);
      console.log(`   │   │   ├── HelloWorld.ts`);
      console.log(`   │   │   ├── utils.ts`);
      console.log(`   │   │   └── types/`);
      console.log(`   │   └── validators/`);
      console.log(`   └── validators/`);
      console.log(`       └── placeholder.ak`);

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

// Add Aiken-like commands for familiar interface

/**
 * New command - Create a new AikScript project
 * Mirrors: aiken new
 */
program
  .command('new <projectName>')
  .description('Create a new AikScript project')
  .option('-t, --template <template>', 'Project template', 'basic')
  .action(async (projectName: string, options: any) => {
    try {
      const projectPath = path.resolve(projectName);

      if (fs.existsSync(projectPath)) {
        console.error(`❌ Directory ${projectName} already exists!`);
        process.exit(1);
      }

      console.log(`🔄 Creating new AikScript project: ${projectName}`);

      // Create project directory
      fs.mkdirSync(projectPath, { recursive: true });

      // Create standard Aiken project structure
      const dirs = [
        'lib',
        'lib/types',
        'validators',
        'tests',
        'env'
      ];

      dirs.forEach(dir => {
        fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
      });

      // Create aiken.toml
      const aikenToml = `[project]
name = "${projectName}"
version = "1.0.0"
plutusVersion = "v3"
licences = ["Apache-2.0"]
description = "AikScript project"

[dependencies]
aiken-lang/stdlib = "2.2.0"
`;

      fs.writeFileSync(path.join(projectPath, 'aiken.toml'), aikenToml);

      // Create package.json for AikScript
      const packageJson = {
        name: projectName,
        version: "1.0.0",
        description: "AikScript project",
        scripts: {
          build: "aikscript build",
          check: "aikscript check",
          test: "aikscript check"
        },
        devDependencies: {
          aikscript: "^1.0.0"
        }
      };

      fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );

      // Create placeholder validator
      const placeholderValidator = `validator placeholder {
  mint(_redeemer: Data, _context: Data) {
    True
  }
}
`;

      fs.writeFileSync(path.join(projectPath, 'validators/placeholder.ak'), placeholderValidator);

      // Create example contract in typescript/lib
      const exampleContract = `import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

@contract("HelloWorld")
export class HelloWorldContract {
  @datum
  public data: any = {
    owner: null as any
  };

  @validator("spend")
  hello(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
`;

      fs.mkdirSync(path.join(projectPath, 'typescript/lib/types'), { recursive: true });
      fs.writeFileSync(path.join(projectPath, 'typescript/lib/HelloWorld.ts'), exampleContract);

      // Create lib/utils.ts in typescript directory
      const utilsFile = `/**
 * Utility functions for AikScript contracts
 */

// Common validation helpers
export function validateSignature(tx: any, pubKeyHash: any): boolean {
  return tx.isSignedBy(pubKeyHash);
}

export function validateTimeRange(tx: any, startTime: any, endTime?: any): boolean {
  const currentTime = tx.validityRange.start;
  if (endTime) {
    return currentTime >= startTime && currentTime <= endTime;
  }
  return currentTime >= startTime;
}

// Common data constructors
export function createDatum(fields: Record<string, any>): any {
  return fields;
}

export function createRedeemer(action: string, data?: any): any {
  return data || action;
}
`;

      fs.writeFileSync(path.join(projectPath, 'typescript/lib/utils.ts'), utilsFile);

      console.log('✅ AikScript project initialized successfully!');
      console.log(`\n📁 Project structure:`);
      console.log(`   ${projectName}/`);
      console.log(`   ├── .gitignore`);
      console.log(`   ├── README.md`);
      console.log(`   ├── aiken.toml`);
      console.log(`   ├── plutus.json`);
      console.log(`   ├── .github/`);
      console.log(`   │   └── workflows/`);
      console.log(`   │       └── continuous-integration.yml`);
      console.log(`   ├── build/`);
      console.log(`   │   └── packages/`);
      console.log(`   ├── env/`);
      console.log(`   ├── lib/`);
      console.log(`   ├── typescript/`);
      console.log(`   │   ├── lib/`);
      console.log(`   │   │   ├── HelloWorld.ts`);
      console.log(`   │   │   ├── utils.ts`);
      console.log(`   │   │   └── types/`);
      console.log(`   │   └── validators/`);
      console.log(`   └── validators/`);
      console.log(`       └── placeholder.ak`);

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
