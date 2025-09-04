// Main exports for the TypeScript-to-Aiken transpiler
// Following aiken-lang patterns for modular organization

// Core transpiler engine
export * from './core/index';

// Version-controlled packages
export * from './core/packages/index';

// Type system
export * from './types/index';

// CLI interface
export * from './cli/index';

// Legacy exports for backward compatibility
export { TypeScriptToAikenTranspiler } from './core/transpiler';
