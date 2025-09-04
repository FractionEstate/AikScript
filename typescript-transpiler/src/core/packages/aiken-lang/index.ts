// Aiken Language Packages
// Version-controlled package exports

export * as cardano from './stdlib/v2.2.0/lib/cardano/index';
export * as aiken from './stdlib/v2.2.0/lib/aiken/index';
export * as merklePatriciaForestry from './merkle-patricia-forestry/v2.1.0/lib/aiken/index';
export * as prelude from './prelude/v1.0.0/lib/aiken/index';

// Legacy exports for backward compatibility
// Note: Prelude types are foundational and may conflict with stdlib
// Use namespace imports (e.g., aiken.prelude.Bool) for clarity
