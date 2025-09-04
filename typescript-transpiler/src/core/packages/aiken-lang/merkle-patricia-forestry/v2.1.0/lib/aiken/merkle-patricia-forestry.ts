// Merkle Patricia Forestry Module
// TypeScript declarations for aiken-lang/merkle-patricia-forestry

// Basic types
type ByteArray = Uint8Array;
type Bool = boolean;

// MPF Core Types
export declare type MerklePatriciaForestry = { root: ByteArray };
export declare type Proof = ByteArray[];
export declare type ProofStep = { left: ByteArray } | { right: ByteArray };

// MPF Core Functions
export declare function mpfFromRoot(root: ByteArray): MerklePatriciaForestry;
export declare function mpfIsEmpty(mpf: MerklePatriciaForestry): Bool;
export declare function mpfHas(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): Bool;
export declare function mpfMiss(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof): Bool;
export declare function mpfInsert(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function mpfDelete(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function mpfUpdate(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof, oldValue: ByteArray, newValue: ByteArray): MerklePatriciaForestry;
export declare function mpfRoot(mpf: MerklePatriciaForestry): ByteArray;

// Constants
export declare const mpfEmpty: MerklePatriciaForestry;

// Utility Functions
export declare function sliceByteArray(bytes: ByteArray, start: number, end: number): ByteArray;
export declare function concatByteArrays(left: ByteArray, right: ByteArray): ByteArray;
export declare function hashLeaf(key: ByteArray, value: ByteArray): ByteArray;
export declare function hashNode(left: ByteArray, right: ByteArray): ByteArray;
