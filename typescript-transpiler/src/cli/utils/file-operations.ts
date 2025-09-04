// CLI utility functions for AikScript
// Following aiken-lang patterns for modular organization

import * as fs from 'fs';
import * as path from 'path';
import { PlutusData, PlutusValidator } from '../commands/index';

/**
 * Ensures a directory exists, creating it recursively if needed
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Resolves output path based on Aiken standard structure
 */
export function resolveOutputPath(inputPath: string, customOutput?: string): string {
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
  } else {
    return path.join(
      path.dirname(inputPath),
      'validators',
      path.basename(inputPath, '.ts') + '.ak'
    );
  }
}

/**
 * Updates plutus.json with validator information
 */
export function updatePlutusJson(
  plutusJsonPath: string,
  contractName: string,
  outputPath: string
): void {
  try {
    const plutusData: PlutusData = JSON.parse(fs.readFileSync(plutusJsonPath, 'utf-8'));

    // Add/update validator in plutus.json
    const existingValidatorIndex = plutusData.validators.findIndex(
      (v: PlutusValidator) => v.title && v.title.includes(contractName)
    );

    const newValidator: PlutusValidator = {
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
    } else {
      plutusData.validators.push(newValidator);
    }

    fs.writeFileSync(plutusJsonPath, JSON.stringify(plutusData, null, 2));
  } catch (error) {
    throw new Error(`Could not update plutus.json: ${(error as Error).message}`);
  }
}

/**
 * Creates standard Aiken project structure
 */
export function createProjectStructure(projectPath: string): void {
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
export function generateAikenToml(projectName: string): string {
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
export function generatePlutusJson(projectName: string): string {
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
