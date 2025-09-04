"use strict";
// Init command handler for AikScript CLI
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
exports.handleInit = handleInit;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const file_operations_1 = require("../utils/file-operations");
/**
 * Handles the init command
 * Initializes a new TypeScript Aiken project with standard Aiken structure
 */
async function handleInit(projectName, _options) {
    try {
        const projectPath = path.resolve(projectName);
        if (fs.existsSync(projectPath)) {
            console.error(`❌ Directory ${projectName} already exists!`);
            process.exit(1);
        }
        console.log(`Creating new TypeScript Aiken project: ${projectName}`);
        // Create standard Aiken project structure
        (0, file_operations_1.createProjectStructure)(projectPath);
        // Create aiken.toml
        const aikenToml = (0, file_operations_1.generateAikenToml)(projectName);
        fs.writeFileSync(path.join(projectPath, 'aiken.toml'), aikenToml);
        // Create initial plutus.json
        const plutusJson = (0, file_operations_1.generatePlutusJson)(projectName);
        fs.writeFileSync(path.join(projectPath, 'plutus.json'), plutusJson);
        // Create .gitignore
        const gitignoreContent = `# Aiken compilation artifacts
artifacts/
# Aiken's project working directory
build/
# Aiken's default documentation export
docs/
`;
        fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);
        // Create README.md
        const readme = generateReadme(projectName);
        fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
        // Create GitHub Actions CI workflow
        const ciWorkflow = generateCiWorkflow();
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
        const exampleContract = generateExampleContract();
        fs.writeFileSync(path.join(projectPath, 'typescript/lib/HelloWorld.ts'), exampleContract);
        console.log(`✅ Project ${projectName} created successfully!`);
        console.log(`\n📁 Project structure:`);
        console.log(`   ${projectName}/`);
        console.log(`   ├── aiken.toml`);
        console.log(`   ├── plutus.json`);
        console.log(`   ├── README.md`);
        console.log(`   ├── .gitignore`);
        console.log(`   ├── lib/`);
        console.log(`   ├── typescript/lib/`);
        console.log(`   ├── validators/`);
        console.log(`   └── .github/workflows/`);
        console.log(`\n🚀 Next steps:`);
        console.log(`   cd ${projectName}`);
        console.log(`   aiken check`);
        console.log(`   aikscript compile typescript/lib/HelloWorld.ts`);
    }
    catch (error) {
        console.error('❌ Error during project initialization:', error.message);
        process.exit(1);
    }
}
/**
 * Generates README content for the new project
 */
function generateReadme(projectName) {
    return `# ${projectName}

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
}
/**
 * Generates CI workflow content
 */
function generateCiWorkflow() {
    return `name: Continuous Integration

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
}
/**
 * Generates example TypeScript contract
 */
function generateExampleContract() {
    return `import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

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
}
//# sourceMappingURL=init.js.map