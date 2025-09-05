// Main exports for the TypeScript-to-Aiken transpiler
// Following aiken-lang patterns for modular organization

// Core transpiler engine
export * from './core/index';

// Type system - now using package-based architecture
export * from '../packages/aikscript/v1.0.0/lib/types/index';

// CLI interface
export * from './cli/index';

// Legacy exports for backward compatibility
export { TypeScriptToAikenTranspiler } from './core/transpiler';
