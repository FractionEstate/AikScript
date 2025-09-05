// Merkle Patricia Forestry Helpers
// TypeScript declarations for aiken-lang/merkle-patricia-forestry helpers

// Basic types
export type ByteArray = Uint8Array;
export type Int = bigint;

// Helper functions for MPF operations
export declare function calculateMerkleRoot(leaves: ByteArray[]): ByteArray;
export declare function verifyMerkleProof(root: ByteArray, leaf: ByteArray, proof: ByteArray[], index: Int): boolean;
export declare function getMerkleProof(leaves: ByteArray[], index: Int): ByteArray[];
export declare function combineMerkleProofs(proof1: ByteArray[], proof2: ByteArray[]): ByteArray[];

// Additional helper functions
export declare function sliceByteArray(data: ByteArray, start: Int, end: Int): ByteArray;
export declare function hashLeaf(key: ByteArray, value: ByteArray): ByteArray;
export declare function concatByteArrays(a: ByteArray, b: ByteArray): ByteArray;
