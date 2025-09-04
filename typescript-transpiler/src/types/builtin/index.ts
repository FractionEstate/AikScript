// Builtin function declarations for AikScript
// These will be transformed by the transpiler into Aiken UPLC calls
// Following aiken-lang patterns for modular organization

import { Int, ByteArray, Bool } from '../basic/index';

// Cryptographic functions
export declare function sha256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;
export declare function ripemd_160(data: ByteArray): ByteArray;

// Additional cryptographic functions from aiken-lang/stdlib
export declare function sha2_256(bytes: ByteArray): ByteArray;
export declare function sha3_256(bytes: ByteArray): ByteArray;
export declare function verifyEcdsaSignature(key: ByteArray, msg: ByteArray, sig: ByteArray): Bool;
export declare function verifySchnorrSignature(key: ByteArray, msg: ByteArray, sig: ByteArray): Bool;

// Data conversion functions
export declare function iData(value: Int): unknown;
export declare function bData(value: ByteArray): unknown;
export declare function constrData(tag: Int, fields: unknown[]): unknown;
export declare function mapData(entries: [unknown, unknown][]): unknown;
export declare function listData(items: unknown[]): unknown;

// Data extraction functions
export declare function unConstrData(data: unknown): { tag: Int; fields: unknown[] };
export declare function unMapData(data: unknown): [unknown, unknown][];
export declare function unListData(data: unknown): unknown[];
export declare function unIData(data: unknown): Int;
export declare function unBData(data: unknown): ByteArray;

// Utility data constructors
export declare function mkPairData(first: unknown, second: unknown): unknown;
export declare function mkNilData(): unknown;
export declare function mkNilPairData(): unknown;

// Comparison and utility functions
export declare function equalsData(a: unknown, b: unknown): Bool;
export declare function serialiseData(data: unknown): ByteArray;

// String functions
export declare function appendString(a: string, b: string): string;
export declare function equalsString(a: string, b: string): Bool;
export declare function encodeUtf8(str: string): ByteArray;
export declare function decodeUtf8(bytes: ByteArray): string;

// List functions
export declare function chooseList(
  list: unknown[],
  defaultValue: unknown,
  whenEmpty: unknown,
  whenNonEmpty: (head: unknown, tail: unknown[]) => unknown
): unknown;
export declare function mkCons(item: unknown, list: unknown[]): unknown[];
export declare function headList(list: unknown[]): unknown;
export declare function tailList(list: unknown[]): unknown[];
export declare function nullList(list: unknown[]): Bool;

// Pair functions
export declare function fstPair(pair: [unknown, unknown]): unknown;
export declare function sndPair(pair: [unknown, unknown]): unknown;

// Control flow
export declare function ifThenElse(condition: Bool, whenTrue: unknown, whenFalse: unknown): unknown;
export declare function chooseUnit(unit: void, value: unknown): unknown;
export declare function trace(message: string, value: unknown): unknown;

// ByteArray functions
export declare function appendByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function consByteString(byte: number, bytes: ByteArray): ByteArray;
export declare function sliceByteString(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function lengthOfByteString(bytes: ByteArray): Int;
export declare function indexByteString(bytes: ByteArray, index: Int): number;

// Signature verification
export declare function verifyEd25519Signature(
  publicKey: string,
  message: ByteArray,
  signature: ByteArray
): Bool;
export declare function verifyEcdsaSecp256k1Signature(
  publicKey: ByteArray,
  message: ByteArray,
  signature: ByteArray
): Bool;
export declare function verifySchnorrSecp256k1Signature(
  publicKey: ByteArray,
  message: ByteArray,
  signature: ByteArray
): Bool;

// Bitwise operations
export declare function andByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function orByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function xorByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function complementByteString(bytes: ByteArray): ByteArray;
export declare function readBit(bytes: ByteArray, index: Int): Bool;
export declare function writeBits(bytes: ByteArray, bits: Bool[]): ByteArray;
export declare function countSetBits(value: Int): Int;
export declare function findFirstSetBit(value: Int): Int;
export declare function shiftByteString(bytes: ByteArray, amount: Int): ByteArray;
export declare function rotateByteString(bytes: ByteArray, amount: Int): ByteArray;

// Conversion functions
export declare function integerToByteString(value: Int): ByteArray;
export declare function byteStringToInteger(bytes: ByteArray): Int;

// Integer arithmetic functions
export declare function addInteger(a: Int, b: Int): Int;
export declare function subtractInteger(a: Int, b: Int): Int;
export declare function multiplyInteger(a: Int, b: Int): Int;
export declare function divideInteger(a: Int, b: Int): Int;
export declare function quotientInteger(a: Int, b: Int): Int;
export declare function remainderInteger(a: Int, b: Int): Int;
export declare function modInteger(a: Int, b: Int): Int;
export declare function equalsInteger(a: Int, b: Int): Bool;
export declare function lessThanInteger(a: Int, b: Int): Bool;
export declare function lessThanEqualsInteger(a: Int, b: Int): Bool;

// ByteString comparison functions
export declare function equalsByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanEqualsByteString(a: ByteArray, b: ByteArray): Bool;

// Mathematical functions from aiken-lang/stdlib
export declare function mathAbs(value: Int): Int;
export declare function mathClamp(value: Int, min: Int, max: Int): Int;
export declare function mathGcd(x: Int, y: Int): Int;
export declare function mathIsSqrt(value: Int, x: Int): Bool;
export declare function mathLog(value: Int, base: Int): Int;
export declare function mathLog2(value: Int): Int;

// Merkle Patricia Forestry functions (from aiken-lang/merkle-patricia-forestry)
export declare function sliceByteArray(bytes: ByteArray, start: Int, length: Int): ByteArray;
export declare function nibble(bytes: ByteArray, index: Int): Int;
export declare function nibbles(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function suffix(path: ByteArray, cursor: Int): ByteArray;
export declare function combineHashes(left: ByteArray, right: ByteArray): ByteArray;
export declare function merkle4(branch: Int, root: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle8(branch: Int, root: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle16(branch: Int, root: ByteArray, neighbor8: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function sparseMerkle4(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle8(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle16(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;

// Null hash constants for merkle trees
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;

// Merkle Patricia Forestry types and functions
export declare type MerklePatriciaForestry = { root: ByteArray };
export declare type Proof = ProofStep[];
export declare type ProofStep =
  | { Branch: { skip: Int; neighbors: ByteArray } }
  | { Fork: { skip: Int; neighbor: Neighbor } }
  | { Leaf: { skip: Int; key: ByteArray; value: ByteArray } };
export declare type Neighbor = { nibble: Int; prefix: ByteArray; root: ByteArray };

export declare function mpfFromRoot(root: ByteArray): MerklePatriciaForestry;
export declare function mpfIsEmpty(mpf: MerklePatriciaForestry): Bool;
export declare function mpfHas(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): Bool;
export declare function mpfMiss(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof): Bool;
export declare function mpfInsert(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function mpfDelete(mpf: MerklePatriciaForestry, key: ByteArray, value: ByteArray, proof: Proof): MerklePatriciaForestry;
export declare function mpfUpdate(mpf: MerklePatriciaForestry, key: ByteArray, proof: Proof, oldValue: ByteArray, newValue: ByteArray): MerklePatriciaForestry;
export declare function mpfRoot(mpf: MerklePatriciaForestry): ByteArray;
export declare const mpfEmpty: MerklePatriciaForestry;

// Dictionary functions from aiken-lang/stdlib
export declare type DictStd = unknown;
export declare const dictEmptyStd: DictStd;
export declare function dictInsertStd(dict: DictStd, key: ByteArray, value: unknown): DictStd;
export declare function dictGetStd(dict: DictStd, key: ByteArray): unknown;
export declare function dictDeleteStd(dict: DictStd, key: ByteArray): DictStd;
export declare function dictSizeStd(dict: DictStd): Int;

// CBOR functions from aiken-lang/stdlib
export declare function cborDiagnostic(data: unknown): string;
export declare function cborSerialise(data: unknown): ByteArray;
export declare function cborDeserialise(bytes: ByteArray): unknown;

// Address functions from cardano stdlib
export declare function addressFromScript(script: ByteArray): unknown;
export declare function addressFromVerificationKey(vk: ByteArray): unknown;
export declare function addressWithDelegationKey(addr: unknown, vk: ByteArray): unknown;
export declare function addressWithDelegationScript(addr: unknown, script: ByteArray): unknown;

// Asset functions from cardano stdlib
export declare function valueFromAsset(policyId: ByteArray, assetName: ByteArray, quantity: Int): unknown;
export declare function valueFromAssetList(assets: unknown): unknown;
export declare const valueZero: unknown;
export declare function valueAdd(a: unknown, b: unknown): unknown;
export declare function valueSubtract(a: unknown, b: unknown): unknown;
export declare function valueGetAsset(value: unknown, policyId: ByteArray, assetName: ByteArray): Int;
export declare function valueIsZero(value: unknown): Bool;
