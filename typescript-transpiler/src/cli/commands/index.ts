// CLI interface definitions for AikScript
// Following aiken-lang patterns for modular organization

export interface CompileOptions {
  target: 'aiken' | 'plutus';
  optimization: 'development' | 'production';
}

export interface InitOptions {
  template: string;
}

export interface CheckOptions {
  target: 'aiken' | 'plutus';
}

export interface BuildOptions {
  target: 'aiken' | 'plutus';
  optimization: 'development' | 'production';
}

// Plutus JSON structure interfaces
export interface PlutusJsonPreamble {
  title: string;
  description: string;
  version: string;
  plutusVersion: string;
  compiler: {
    name: string;
    version: string;
  };
  license: string;
}

export interface PlutusJsonValidator {
  title: string;
  redeemer: {
    title: string;
    schema: {
      $ref: string;
    };
  };
  datum: {
    title: string;
    schema: {
      $ref: string;
    };
  };
  parameters: unknown[];
  compiledCode: string;
}

export interface PlutusValidator {
  title: string;
  redeemer: {
    title: string;
    schema: {
      $ref: string;
    };
  };
  datum: {
    title: string;
    schema: {
      $ref: string;
    };
  };
  parameters: unknown[];
  compiledCode: string;
}

export interface PlutusJsonDefinitions {
  [key: string]: {
    title: string;
    description: string;
  };
}

export interface PlutusJson {
  preamble: PlutusJsonPreamble;
  validators: PlutusJsonValidator[];
  definitions: PlutusJsonDefinitions;
}

export interface PlutusData {
  validators: PlutusValidator[];
  preamble?: PlutusJsonPreamble;
  definitions?: PlutusJsonDefinitions;
}

// Project initialization interfaces
export interface ProjectTemplate {
  name: string;
  description: string;
  files: ProjectFile[];
}

export interface ProjectFile {
  path: string;
  content: string;
  executable?: boolean;
}

// Command result interfaces
export interface CommandResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface CompilationResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}
