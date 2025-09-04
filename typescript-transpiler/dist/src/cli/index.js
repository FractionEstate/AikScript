#!/usr/bin/env node
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
const commander_1 = require("commander");
const transpiler_1 = require("../core/transpiler");
const program = new commander_1.Command();
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
    .action(async (input, output, options) => {
    try {
        const transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
        const inputPath = path.resolve(input);
        // Determine output path based on standard Aiken structure
        let outputPath;
        if (output) {
            outputPath = path.resolve(output);
        }
        else {
            // If input is in lib/, output to validators/
            const relativePath = path.relative(process.cwd(), inputPath);
            if (relativePath.startsWith('lib/') || relativePath.startsWith('lib\\')) {
                const validatorsDir = path.join(process.cwd(), 'validators');
                const relativeToLib = path.relative(path.join(process.cwd(), 'lib'), inputPath);
                const baseName = path.basename(relativeToLib, '.ts');
                outputPath = path.join(validatorsDir, baseName + '.ak');
            }
            else {
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
                    const existingValidatorIndex = plutusData.validators.findIndex((v) => v.title && v.title.includes(contractName));
                    const newValidator = {
                        title: `${contractName}.spend`,
                        datum: {
                            title: 'datum',
                            schema: {
                                $ref: '#/definitions/Data',
                            },
                        },
                        redeemer: {
                            title: 'redeemer',
                            schema: {
                                $ref: '#/definitions/Data',
                            },
                        },
                        compiledCode: outputPath,
                        parameters: [],
                    };
                    if (existingValidatorIndex >= 0) {
                        plutusData.validators[existingValidatorIndex] = newValidator;
                    }
                    else {
                        plutusData.validators.push(newValidator);
                    }
                    fs.writeFileSync(plutusJsonPath, JSON.stringify(plutusData, null, 2));
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
            process.exit(1);
        }
    }
    catch (error) {
        console.error('❌ Error during compilation:', error.message);
        process.exit(1);
    }
});
program
    .command('init <projectName>')
    .description('Initialize a new TypeScript Aiken project with standard Aiken structure')
    .option('-t, --template <template>', 'Project template', 'basic')
    .action(async (projectName, _options) => {
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
        fs.mkdirSync(path.join(projectPath, 'typescript/validators'), { recursive: true });
        fs.writeFileSync(path.join(projectPath, 'typescript/validators/HelloWorld.ts'), exampleContract);
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
        console.log(`   │   │   ├── utils.ts`);
        console.log(`   │   │   └── types/`);
        console.log(`   │   └── validators/`);
        console.log(`   │       └── HelloWorld.ts`);
        console.log(`   └── validators/`);
        console.log(`       └── placeholder.ak`);
        console.log(`\nNext steps:`);
        console.log(`  cd ${projectName}`);
        console.log(`  npm install`);
        console.log(`  npm run build`);
        console.log(`\nThen you can use standard Aiken CLI commands:`);
        console.log(`  aiken check`);
        console.log(`  aiken build`);
    }
    catch (error) {
        console.error('❌ Error initializing project:', error.message);
        process.exit(1);
    }
});
program
    .command('watch <input>')
    .description('Watch for changes and recompile automatically')
    .option('-o, --output <output>', 'Output directory')
    .action(async (_input, _options) => {
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
    .action(async (projectName) => {
    try {
        const projectPath = path.resolve(projectName);
        if (fs.existsSync(projectPath)) {
            console.error(`❌ Directory ${projectName} already exists!`);
            process.exit(1);
        }
        console.log(`🔄 Creating new AikScript project: ${projectName}`);
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
        fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
        // Create plutus.json matching smartcontracts format
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

This project includes TypeScript support through AikScript. Write your contracts in TypeScript in the \`typescript/validators/\` directory and utility functions in \`typescript/lib/\`.

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
        // Create example contract in typescript/validators
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
        fs.mkdirSync(path.join(projectPath, 'typescript/validators'), { recursive: true });
        fs.writeFileSync(path.join(projectPath, 'typescript/validators/HelloWorld.ts'), exampleContract);
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
        console.log(`✅ AikScript project initialized successfully!`);
        console.log(`📁 Project structure:`);
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
        console.log(`   │   │   ├── utils.ts`);
        console.log(`   │   │   └── types/`);
        console.log(`   │   └── validators/`);
        console.log(`   │       └── HelloWorld.ts`);
        console.log(`   └── validators/`);
        console.log(`       └── placeholder.ak`);
        console.log(``);
        console.log(`🚀 Next steps:`);
        console.log(`   cd ${projectName}`);
        console.log(`   npm install`);
        console.log(`   npm run build`);
        console.log(``);
        console.log(`Then you can use standard Aiken CLI commands:`);
        console.log(`   aiken check`);
        console.log(`   aiken build`);
    }
    catch (error) {
        console.error(`❌ Failed to create project: ${error}`);
        process.exit(1);
    }
});
/**
 * Check command - Type-check and run tests
 * Mirrors: aiken check
 */
program
    .command('check')
    .description('Type-check AikScript project and run tests')
    .action(async () => {
    try {
        console.log(`🔍 Checking AikScript project...`);
        // Check if we're in a project directory
        const aikenTomlPath = path.join(process.cwd(), 'aiken.toml');
        if (!fs.existsSync(aikenTomlPath)) {
            console.error(`❌ Not in an AikScript project directory (no aiken.toml found)`);
            console.log(`💡 Try running: aikscript new <projectName>`);
            process.exit(1);
        }
        // Check typescript directories for TypeScript files
        const tsLibDir = path.join(process.cwd(), 'typescript/lib');
        const tsValidatorsDir = path.join(process.cwd(), 'typescript/validators');
        if (!fs.existsSync(tsLibDir) && !fs.existsSync(tsValidatorsDir)) {
            console.error(`❌ No typescript/lib or typescript/validators directories found`);
            process.exit(1);
        }
        // Recursively find all TypeScript files in both directories
        const findTsFiles = (dir) => {
            const files = [];
            if (!fs.existsSync(dir))
                return files;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    // Recursively search subdirectories
                    files.push(...findTsFiles(fullPath));
                }
                else if (item.endsWith('.ts')) {
                    files.push(fullPath);
                }
            }
            return files;
        };
        const libFiles = findTsFiles(tsLibDir);
        const validatorFiles = findTsFiles(tsValidatorsDir);
        const tsFiles = [...libFiles, ...validatorFiles];
        if (tsFiles.length === 0) {
            console.log(`⚠️  No TypeScript files found in typescript/`);
            console.log(`✅ Project structure is valid`);
            return;
        }
        console.log(`📁 Found ${tsFiles.length} TypeScript file(s)`);
        // Compile all TypeScript files
        const transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
        let errorCount = 0;
        let contractCount = 0;
        let utilityCount = 0;
        for (const tsFile of tsFiles) {
            try {
                const fileContent = fs.readFileSync(tsFile, 'utf-8');
                const isContract = fileContent.includes('@contract(');
                const isInValidatorsDir = tsFile.includes(path.join('typescript', 'validators'));
                const isInTypesDir = tsFile.includes(path.join('typescript', 'lib', 'types'));
                const relativePath = path.relative(process.cwd(), tsFile);
                if (isInValidatorsDir || (isContract && !isInTypesDir)) {
                    // This is a contract file - compile to validators
                    const outputPath = path.join(process.cwd(), 'validators', path.basename(tsFile, '.ts') + '.ak');
                    console.log(`🔄 Compiling contract ${relativePath}...`);
                    const config = {
                        inputPath: tsFile,
                        outputPath,
                        target: 'aiken',
                        optimization: 'development',
                    };
                    const result = transpiler.compile(config);
                    if (result.success) {
                        contractCount++;
                    }
                    else {
                        console.error(`❌ ${path.basename(tsFile)} compilation failed`);
                        errorCount++;
                    }
                }
                else {
                    // This is a utility file or type definition - just validate syntax
                    const fileType = isInTypesDir ? 'type definition' : 'utility';
                    console.log(`🔍 Validating ${fileType} ${relativePath}...`);
                    const config = {
                        inputPath: tsFile,
                        outputPath: '', // No output for utilities/types
                        target: 'aiken',
                        optimization: 'development',
                    };
                    const result = transpiler.compile(config);
                    if (result.success) {
                        console.log(`✅ ${path.basename(tsFile)} validated successfully`);
                        utilityCount++;
                    }
                    else {
                        console.error(`❌ ${path.basename(tsFile)} validation failed`);
                        errorCount++;
                    }
                }
            }
            catch (error) {
                console.error(`❌ Error processing ${path.basename(tsFile)}: ${error}`);
                errorCount++;
            }
        }
        console.log(``);
        console.log(`📊 Check Results:`);
        console.log(`   ✅ Successful: ${contractCount + utilityCount}`);
        console.log(`   ❌ Failed: ${errorCount}`);
        console.log(`   📁 Total files: ${tsFiles.length}`);
        console.log(`   🏗️  Contracts: ${contractCount}`);
        console.log(`   🛠️  Utilities: ${utilityCount}`);
        if (errorCount > 0) {
            console.log(`❌ Check failed with ${errorCount} error(s)`);
            process.exit(1);
        }
        else {
            console.log(`✅ All checks passed!`);
        }
    }
    catch (error) {
        console.error(`❌ Check failed: ${error}`);
        process.exit(1);
    }
});
/**
 * Build command - Build the AikScript project
 * Mirrors: aiken build
 */
program
    .command('build')
    .description('Build AikScript project')
    .action(async () => {
    try {
        console.log(`🔨 Building AikScript project...`);
        // Check if we're in a project directory
        const aikenTomlPath = path.join(process.cwd(), 'aiken.toml');
        if (!fs.existsSync(aikenTomlPath)) {
            console.error(`❌ Not in an AikScript project directory (no aiken.toml found)`);
            console.log(`💡 Try running: aikscript new <projectName>`);
            process.exit(1);
        }
        // First run check to ensure everything compiles
        console.log(`🔍 Running pre-build checks...`);
        // Check typescript directories for TypeScript files
        const tsLibDir = path.join(process.cwd(), 'typescript/lib');
        const tsValidatorsDir = path.join(process.cwd(), 'typescript/validators');
        if (!fs.existsSync(tsLibDir) && !fs.existsSync(tsValidatorsDir)) {
            console.error(`❌ No typescript/lib or typescript/validators directories found`);
            process.exit(1);
        }
        // Recursively find all TypeScript files in both directories
        const findTsFiles = (dir) => {
            const files = [];
            if (!fs.existsSync(dir))
                return files;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    // Recursively search subdirectories
                    files.push(...findTsFiles(fullPath));
                }
                else if (item.endsWith('.ts')) {
                    files.push(fullPath);
                }
            }
            return files;
        };
        const libFiles = findTsFiles(tsLibDir);
        const validatorFiles = findTsFiles(tsValidatorsDir);
        const tsFiles = [...libFiles, ...validatorFiles];
        if (tsFiles.length === 0) {
            console.log(`⚠️  No TypeScript files found in typescript/`);
            console.log(`✅ Build completed (no files to compile)`);
            return;
        }
        // Compile all files
        const transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
        let errorCount = 0;
        let contractCount = 0;
        let utilityCount = 0;
        for (const tsFile of tsFiles) {
            try {
                const fileContent = fs.readFileSync(tsFile, 'utf-8');
                const isContract = fileContent.includes('@contract(');
                const isInValidatorsDir = tsFile.includes(path.join('typescript', 'validators'));
                const isInTypesDir = tsFile.includes(path.join('typescript', 'lib', 'types'));
                if (isInValidatorsDir || (isContract && !isInTypesDir)) {
                    // This is a contract file - compile to validators
                    const outputPath = path.join(process.cwd(), 'validators', path.basename(tsFile, '.ts') + '.ak');
                    const config = {
                        inputPath: tsFile,
                        outputPath,
                        target: 'aiken',
                        optimization: 'production',
                    };
                    const result = transpiler.compile(config);
                    if (result.success) {
                        contractCount++;
                    }
                    else {
                        errorCount++;
                    }
                }
                else {
                    // This is a utility file or type definition - just validate syntax
                    const fileType = isInTypesDir ? 'type definition' : 'utility';
                    console.log(`🔍 Validating ${fileType} ${path.relative(process.cwd(), tsFile)}...`);
                    const config = {
                        inputPath: tsFile,
                        outputPath: '', // No output for utilities/types
                        target: 'aiken',
                        optimization: 'production',
                    };
                    const result = transpiler.compile(config);
                    if (result.success) {
                        utilityCount++;
                    }
                    else {
                        errorCount++;
                    }
                }
            }
            catch (error) {
                console.error(`❌ Error processing ${path.basename(tsFile)}: ${error}`);
                errorCount++;
            }
        }
        if (errorCount > 0) {
            console.error(`❌ Build failed with ${errorCount} error(s)`);
            process.exit(1);
        }
        // Update plutus.json with compiled validators
        if (contractCount > 0) {
            try {
                const plutusJsonPath = path.join(process.cwd(), 'plutus.json');
                let plutusJson = {};
                // Read existing plutus.json if it exists
                if (fs.existsSync(plutusJsonPath)) {
                    const plutusJsonContent = fs.readFileSync(plutusJsonPath, 'utf-8');
                    plutusJson = JSON.parse(plutusJsonContent);
                }
                else {
                    // Create basic structure if it doesn't exist
                    plutusJson = {
                        preamble: {
                            title: "test-smartcontracts",
                            description: "Aiken contracts for project 'test-smartcontracts'",
                            version: "0.0.0",
                            plutusVersion: "v3",
                            compiler: {
                                name: "Aiken",
                                version: "v1.1.19+e525483"
                            },
                            license: "Apache-2.0"
                        },
                        validators: [],
                        definitions: {
                            Data: {
                                title: "Data",
                                description: "Any Plutus data."
                            }
                        }
                    };
                }
                // Clear existing validators and add newly compiled ones
                plutusJson.validators = [];
                // Find all compiled .ak files in validators directory
                const validatorsDir = path.join(process.cwd(), 'validators');
                if (fs.existsSync(validatorsDir)) {
                    const validatorFiles = fs.readdirSync(validatorsDir)
                        .filter(file => file.endsWith('.ak'))
                        .map(file => path.join('validators', file));
                    for (const validatorFile of validatorFiles) {
                        const validatorName = path.basename(validatorFile, '.ak');
                        plutusJson.validators.push({
                            title: `${validatorName}.${validatorName}.spend`,
                            redeemer: {
                                title: "_redeemer",
                                schema: {
                                    "$ref": "#/definitions/Data"
                                }
                            },
                            datum: {
                                title: "_datum",
                                schema: {
                                    "$ref": "#/definitions/Data"
                                }
                            },
                            parameters: [],
                            compiledCode: validatorFile
                        });
                    }
                }
                // Write updated plutus.json
                fs.writeFileSync(plutusJsonPath, JSON.stringify(plutusJson, null, 2));
                console.log(`📄 Updated plutus.json with ${plutusJson.validators.length} validator(s)`);
            }
            catch (error) {
                console.warn(`⚠️  Failed to update plutus.json: ${error}`);
            }
        }
        console.log(`✅ Build completed successfully!`);
        console.log(`📊 Compiled ${contractCount} contract(s), validated ${utilityCount} utility file(s)`);
        console.log(`📁 Output: ./validators/`);
    }
    catch (error) {
        console.error(`❌ Build failed: ${error}`);
        process.exit(1);
    }
});
/**
 * Format command - Format AikScript project
 * Mirrors: aiken fmt
 */
program
    .command('fmt')
    .description('Format AikScript project files')
    .action(async () => {
    try {
        console.log(`🎨 Formatting AikScript project...`);
        // Check if we're in a project directory
        const aikenTomlPath = path.join(process.cwd(), 'aiken.toml');
        if (!fs.existsSync(aikenTomlPath)) {
            console.error(`❌ Not in an AikScript project directory (no aiken.toml found)`);
            process.exit(1);
        }
        // Check typescript directories for TypeScript files
        const tsLibDir = path.join(process.cwd(), 'typescript/lib');
        const tsValidatorsDir = path.join(process.cwd(), 'typescript/validators');
        if (!fs.existsSync(tsLibDir) && !fs.existsSync(tsValidatorsDir)) {
            console.log(`⚠️  No typescript directories found`);
            return;
        }
        // Recursively find all TypeScript files in both directories
        const findTsFiles = (dir) => {
            const files = [];
            if (!fs.existsSync(dir))
                return files;
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    // Recursively search subdirectories
                    files.push(...findTsFiles(fullPath));
                }
                else if (item.endsWith('.ts')) {
                    files.push(fullPath);
                }
            }
            return files;
        };
        const libFiles = findTsFiles(tsLibDir);
        const validatorFiles = findTsFiles(tsValidatorsDir);
        const tsFiles = [...libFiles, ...validatorFiles];
        if (tsFiles.length === 0) {
            console.log(`⚠️  No TypeScript files found in typescript/`);
            return;
        }
        console.log(`📁 Found ${tsFiles.length} TypeScript file(s)`);
        // For now, just check if prettier is available and format
        // In a real implementation, you'd integrate with prettier or another formatter
        console.log(`✅ Formatting completed (placeholder - integrate with prettier)`);
    }
    catch (error) {
        console.error(`❌ Format failed: ${error}`);
        process.exit(1);
    }
});
// Parse the command line arguments
program.parse();
//# sourceMappingURL=index.js.map