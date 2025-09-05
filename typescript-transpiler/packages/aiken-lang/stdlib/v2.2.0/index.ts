// Aiken Stdlib Module
// Main entry point for Aiken standard library functions

// Re-export all submodules
export * as collection from './lib/aiken/collection/index';
export * as crypto from './lib/aiken/crypto/index';
export * as math from './lib/aiken/math/index';
export * as cbor from './lib/aiken/cbor/index';

// Re-export commonly used types from the AikScript types package
export type { Bool, Int, ByteArray, Data } from '@aikscript/types';
