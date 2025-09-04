// Aiken Merkle Patricia Forestry Module
// TypeScript declarations for aiken-lang/merkle-patricia-forestry

export * from './helpers';
export * from './merkling';

// Additional exports for commonly used functions
export declare function sliceByteArray(data: Uint8Array, start: bigint, end: bigint): Uint8Array;
export declare function hashLeaf(key: Uint8Array, value: Uint8Array): Uint8Array;
export declare function concatByteArrays(a: Uint8Array, b: Uint8Array): Uint8Array;

// Nibble and byte manipulation functions
export declare function nibble(data: Uint8Array, index: number | bigint): number;
export declare function nibbles(data: Uint8Array): number[];
export declare function suffix(data: Uint8Array, start: number | bigint): Uint8Array;
export declare function combineHashes(left: Uint8Array, right: Uint8Array): Uint8Array;

// Merkle tree functions for different sizes
export declare function merkle4(branch: number, root: Uint8Array, siblings: Uint8Array[]): Uint8Array;
export declare function merkle8(branch: number, root: Uint8Array, siblings: Uint8Array[]): Uint8Array;
export declare function sparseMerkle4(indices: number[], values: Uint8Array[], siblings: Uint8Array[]): Uint8Array;
export declare function sparseMerkle8(indices: number[], values: Uint8Array[], siblings: Uint8Array[]): Uint8Array;
