// @aikscript/types v1.0.0 - Builtin Functions
// Cryptographic, mathematical, and utility functions
// Consolidated from legacy builtin declarations

import { Int, ByteArray, Bool, Data } from './basic';

// ===== CRYPTOGRAPHIC FUNCTIONS =====

// Hash functions
export declare function sha256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;
export declare function ripemd_160(data: ByteArray): ByteArray;
export declare function sha2_256(bytes: ByteArray): ByteArray;

// Signature verification
export declare function verifyEcdsaSignature(key: ByteArray, msg: ByteArray, sig: ByteArray): Bool;
export declare function verifySchnorrSignature(key: ByteArray, msg: ByteArray, sig: ByteArray): Bool;
export declare function verifyEd25519Signature(publicKey: string, message: ByteArray, signature: ByteArray): Bool;
export declare function verifyEcdsaSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;
export declare function verifySchnorrSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;

// ===== DATA CONVERSION FUNCTIONS =====

// Data constructors
export declare function iData(value: Int): Data;
export declare function bData(value: ByteArray): Data;
export declare function constrData(tag: Int, fields: Data[]): Data;
export declare function mapData(entries: [Data, Data][]): Data;
export declare function listData(items: Data[]): Data;

// Data extractors
export declare function unConstrData(data: Data): { tag: Int; fields: Data[] };
export declare function unMapData(data: Data): [Data, Data][];
export declare function unListData(data: Data): Data[];
export declare function unIData(data: Data): Int;
export declare function unBData(data: Data): ByteArray;

// Utility data constructors
export declare function mkPairData(first: Data, second: Data): Data;
export declare function mkNilData(): Data;
export declare function mkNilPairData(): Data;

// Data comparison
export declare function equalsData(a: Data, b: Data): Bool;
export declare function serialiseData(data: Data): ByteArray;

// ===== STRING FUNCTIONS =====

export declare function appendString(a: string, b: string): string;
export declare function equalsString(a: string, b: string): Bool;
export declare function encodeUtf8(str: string): ByteArray;
export declare function decodeUtf8(bytes: ByteArray): string;

// ===== LIST FUNCTIONS =====

export declare function chooseList<T>(
  list: T[],
  defaultValue: T,
  whenEmpty: T,
  whenNonEmpty: (head: T, tail: T[]) => T
): T;
export declare function mkCons<T>(item: T, list: T[]): T[];
export declare function headList<T>(list: T[]): T;
export declare function tailList<T>(list: T[]): T[];
export declare function nullList<T>(list: T[]): Bool;

// ===== PAIR FUNCTIONS =====

export declare function fstPair<T, U>(pair: [T, U]): T;
export declare function sndPair<T, U>(pair: [T, U]): U;

// ===== CONTROL FLOW =====

export declare function ifThenElse<T>(condition: Bool, whenTrue: T, whenFalse: T): T;
export declare function chooseUnit<T>(unit: void, value: T): T;
export declare function trace<T>(message: string, value: T): T;

// ===== BYTEARRAY FUNCTIONS =====

export declare function appendByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function consByteString(byte: number, bytes: ByteArray): ByteArray;
export declare function sliceByteString(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function lengthOfByteString(bytes: ByteArray): Int;
export declare function indexByteString(bytes: ByteArray, index: Int): number;

// ===== BITWISE OPERATIONS =====

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

// ===== CONVERSION FUNCTIONS =====

export declare function integerToByteString(value: Int): ByteArray;
export declare function byteStringToInteger(bytes: ByteArray): Int;

// ===== INTEGER ARITHMETIC =====

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

// ===== BYTESTRING COMPARISON =====

export declare function equalsByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanEqualsByteString(a: ByteArray, b: ByteArray): Bool;

// ===== MATHEMATICAL FUNCTIONS =====

export declare function mathAbs(value: Int): Int;
export declare function mathClamp(value: Int, min: Int, max: Int): Int;
export declare function mathGcd(x: Int, y: Int): Int;
export declare function mathIsSqrt(value: Int, x: Int): Bool;
export declare function mathLog(value: Int, base: Int): Int;
export declare function mathLog2(value: Int): Int;

// ===== MERKLE PATRICIA FORESTRY FUNCTIONS =====

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

// Merkle constants
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;

// ===== DICTIONARY FUNCTIONS =====

export declare type DictStd = Data;
export declare const dictEmptyStd: DictStd;
export declare function dictInsertStd(dict: DictStd, key: ByteArray, value: Data): DictStd;
export declare function dictGetStd(dict: DictStd, key: ByteArray): Data;
export declare function dictDeleteStd(dict: DictStd, key: ByteArray): DictStd;
export declare function dictSizeStd(dict: DictStd): Int;

// ===== CBOR FUNCTIONS =====

export declare function cborDiagnostic(data: Data): string;
export declare function cborSerialise(data: Data): ByteArray;
export declare function cborDeserialise(bytes: ByteArray): Data;

// ===== ADDRESS FUNCTIONS =====

export declare function addressFromScript(script: ByteArray): Data;
export declare function addressFromVerificationKey(vk: ByteArray): Data;
export declare function addressWithDelegationKey(addr: Data, vk: ByteArray): Data;
export declare function addressWithDelegationScript(addr: Data, script: ByteArray): Data;

// ===== ASSET FUNCTIONS =====

export declare function valueFromAsset(policyId: ByteArray, assetName: ByteArray, quantity: Int): Data;
export declare function valueFromAssetList(assets: Data): Data;
export declare const valueZero: Data;
export declare function valueAdd(a: Data, b: Data): Data;
export declare function valueSubtract(a: Data, b: Data): Data;
export declare function valueGetAsset(value: Data, policyId: ByteArray, assetName: ByteArray): Int;
export declare function valueIsZero(value: Data): Bool;
