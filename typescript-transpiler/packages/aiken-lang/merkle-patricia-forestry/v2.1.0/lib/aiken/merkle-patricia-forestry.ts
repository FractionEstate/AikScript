// Merkle Patricia Forestry Module
// TypeScript declarations for aiken-lang/merkle-patricia-forestry

import { ByteArray, Int } from '@aikscript/types';

// Basic types
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

// Merkle Tree Functions
export declare function sliceByteArray(data: ByteArray, start: Int, end: Int): ByteArray;
export declare function nibble(data: ByteArray, index: Int): Int;
export declare function nibbles(data: ByteArray): Int[];
export declare function suffix(data: ByteArray, start: Int): ByteArray;
export declare function combineHashes(left: ByteArray, right: ByteArray): ByteArray;

// Merkle Tree Constructors
export declare function merkle4(hashes: ByteArray[]): ByteArray;
export declare function merkle8(hashes: ByteArray[]): ByteArray;
export declare function merkle16(hashes: ByteArray[]): ByteArray;
export declare function sparseMerkle4(hashes: ByteArray[]): ByteArray;
export declare function sparseMerkle8(hashes: ByteArray[]): ByteArray;
export declare function sparseMerkle16(hashes: ByteArray[]): ByteArray;

// Null Hash Constants
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;
