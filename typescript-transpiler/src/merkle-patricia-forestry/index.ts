// Merkle Patricia Forestry Module
// Functions from aiken-lang/merkle-patricia-forestry/

import { ByteArray, Int, Bool } from '../types/basic/index';

// Core MPF types
export declare type MerklePatriciaForestry = { root: ByteArray };
export declare type Proof = ProofStep[];
export declare type ProofStep =
  | { Branch: { skip: Int; neighbors: ByteArray } }
  | { Fork: { skip: Int; neighbor: Neighbor } }
  | { Leaf: { skip: Int; key: ByteArray; value: ByteArray } };
export declare type Neighbor = { nibble: Int; prefix: ByteArray; root: ByteArray };

// MPF operations
export declare function fromRoot(root: ByteArray): MerklePatriciaForestry;
export declare const empty: MerklePatriciaForestry;
export declare function isEmpty(mpf: MerklePatriciaForestry): Bool;
export declare function root(mpf: MerklePatriciaForestry): ByteArray;

// Membership operations
export declare function has(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): Bool;
export declare function miss(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof): Bool;

// Modification operations
export declare function insert(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function remove(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function update(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof, oldValue: ByteArray, newValue: ByteArray): MerklePatriciaForestry;

// Merkle tree helper functions
export declare function sliceByteArray(bytes: ByteArray, start: Int, length: Int): ByteArray;
export declare function nibble(bytes: ByteArray, index: Int): Int;
export declare function nibbles(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function suffix(path: ByteArray, cursor: Int): ByteArray;
export declare function combineHashes(left: ByteArray, right: ByteArray): ByteArray;

// Merkle tree construction functions
export declare function merkle4(branch: Int, root: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle8(branch: Int, root: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle16(branch: Int, root: ByteArray, neighbor8: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function sparseMerkle4(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle8(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle16(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;

// Null hash constants
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;

// Re-export types
export type { ByteArray, Int, Bool } from '../types/basic/index';
