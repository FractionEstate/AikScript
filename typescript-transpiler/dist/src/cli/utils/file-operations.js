"use strict";
// CLI utility functions for AikScript
// Following aiken-lang patterns for modular organization
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
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.resolveOutputPath = resolveOutputPath;
exports.updatePlutusJson = updatePlutusJson;
exports.createProjectStructure = createProjectStructure;
exports.generateAikenToml = generateAikenToml;
exports.generatePlutusJson = generatePlutusJson;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Ensures a directory exists, creating it recursively if needed
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
/**
 * Resolves output path based on Aiken standard structure
 */
function resolveOutputPath(inputPath, customOutput) {
    if (customOutput) {
        return path.resolve(customOutput);
    }
    // If input is in lib/, output to validators/
    const relativePath = path.relative(process.cwd(), inputPath);
    if (relativePath.startsWith('lib/') || relativePath.startsWith('lib\\')) {
        const validatorsDir = path.join(process.cwd(), 'validators');
        const relativeToLib = path.relative(path.join(process.cwd(), 'lib'), inputPath);
        const baseName = path.basename(relativeToLib, '.ts');
        return path.join(validatorsDir, baseName + '.ak');
    }
    else {
        return path.join(path.dirname(inputPath), 'validators', path.basename(inputPath, '.ts') + '.ak');
    }
}
/**
 * Updates plutus.json with validator information
 */
function updatePlutusJson(plutusJsonPath, contractName, outputPath) {
    try {
        const plutusData = JSON.parse(fs.readFileSync(plutusJsonPath, 'utf-8'));
        // Add/update validator in plutus.json
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
    }
    catch (error) {
        throw new Error(`Could not update plutus.json: ${error.message}`);
    }
}
/**
 * Creates standard Aiken project structure
 */
function createProjectStructure(projectPath) {
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
        ensureDirectoryExists(path.join(projectPath, dir));
    });
}
/**
 * Generates aiken.toml content
 */
function generateAikenToml(projectName) {
    return `name = "${projectName}"
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
}
/**
 * Generates initial plutus.json content
 */
function generatePlutusJson(projectName) {
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
    return JSON.stringify(plutusJson, null, 2);
}
//# sourceMappingURL=file-operations.js.map