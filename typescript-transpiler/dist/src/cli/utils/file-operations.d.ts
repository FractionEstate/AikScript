/**
 * Ensures a directory exists, creating it recursively if needed
 */
export declare function ensureDirectoryExists(dirPath: string): void;
/**
 * Resolves output path based on Aiken standard structure
 */
export declare function resolveOutputPath(inputPath: string, customOutput?: string): string;
/**
 * Updates plutus.json with validator information
 */
export declare function updatePlutusJson(plutusJsonPath: string, contractName: string, outputPath: string): void;
/**
 * Creates standard Aiken project structure
 */
export declare function createProjectStructure(projectPath: string): void;
/**
 * Generates aiken.toml content
 */
export declare function generateAikenToml(projectName: string): string;
/**
 * Generates initial plutus.json content
 */
export declare function generatePlutusJson(projectName: string): string;
//# sourceMappingURL=file-operations.d.ts.map