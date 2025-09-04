// Aiken Merkle Patricia Forestry Module
// TypeScript declarations for aiken-lang/merkle-patricia-forestry

export * from './helpers';
export * from './merkling';

// Additional exports for commonly used functions
export declare function sliceByteArray(data: Uint8Array, start: bigint, end: bigint): Uint8Array;
export declare function hashLeaf(key: Uint8Array, value: Uint8Array): Uint8Array;
export declare function concatByteArrays(a: Uint8Array, b: Uint8Array): Uint8Array;
