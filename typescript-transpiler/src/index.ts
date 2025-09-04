// Main exports for the TypeScript-to-Aiken transpiler
export { BuiltinRegistry } from './core/builtins';
export { ExpressionTransformer } from './core/expressions';
export { CodeGenerator } from './core/generator';
export { TypeScriptParser } from './core/parser';
export { AikenTransformer } from './core/transformer';
export { TypeScriptToAikenTranspiler } from './core/transpiler';
export { TypeMapper } from './core/types';
export { ValidatorTransformer } from './core/validators';

// New modular exports
export * as aiken from './aiken/index';
export * as cardano from './cardano/index';
export * as merklePatriciaForestry from './merkle-patricia-forestry/index';

// Legacy exports for backward compatibility
export * from './types';
