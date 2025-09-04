// @aikscript/types v1.0.0 - Core Types Package
// Main entry point for the AikScript types system

// Export all basic types and functions
export * from './basic';

// Export all builtin functions
export * from './builtin';

// Export all convenience types and functions
export * from './convenience';

// ===== TYPE ALIASES FOR BACKWARD COMPATIBILITY =====

// Re-export basic types with common aliases
export type { Bool as Boolean } from './basic';
export type { Int as Integer } from './basic';
export type { ByteArray as Bytes } from './basic';

// ===== COMMONLY USED TYPES =====

// Export types from their respective modules
export type {
  POSIXTime,
  PubKeyHash,
  ScriptHash,
  AssetName,
  PolicyId,
  Ada,
  Percentage,
  Data,
  Datum,
  Redeemer,
  Script
} from './basic';

export type {
  Option,
  Rational,
  Dict,
  Ordering,
  Fuzzer
} from './convenience';
