// Merkle Patricia Forestry Helpers
// TypeScript declarations for aiken-lang/merkle-patricia-forestry helpers

// Basic types
type ByteArray = Uint8Array;
type Int = bigint;

// Helper functions for MPF operations
export declare function calculateMerkleRoot(leaves: ByteArray[]): ByteArray;
export declare function verifyMerkleProof(root: ByteArray, leaf: ByteArray, proof: ByteArray[], index: Int): boolean;
export declare function getMerkleProof(leaves: ByteArray[], index: Int): ByteArray[];
export declare function combineMerkleProofs(proof1: ByteArray[], proof2: ByteArray[]): ByteArray[];
