// Cardano-specific type definitions for TypeScript-to-Aiken DSL

// Basic types
export type POSIXTime = bigint;
export type PubKeyHash = string & { __brand: 'PubKeyHash' };
export type ScriptHash = string & { __brand: 'ScriptHash' };
export type AssetName = string & { __brand: 'AssetName' };
export type PolicyId = string & { __brand: 'PolicyId' };
export type Ada = bigint & { __brand: 'Ada' };
export type Percentage = number & { __brand: 'Percentage' };
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type Void = undefined;
export type String = string;
export type Data = any; // Plutus Data type - can be Int, ByteArray, List<Data>, Map<Data, Data>, or Constr

// Transaction types
export interface TxInput {
  transactionId: string;
  outputIndex: number;
  address: Address;
  amount: Value;
  datum?: Datum;
  referenceScript?: Script;
}

export interface TxOutput {
  address: Address;
  amount: Value;
  datum?: Datum;
  referenceScript?: Script;
}

export interface ValidityRange {
  start?: POSIXTime;
  end?: POSIXTime;
}

export interface Transaction {
  inputs: TxInput[];
  outputs: TxOutput[];
  fee: Ada;
  validityRange: ValidityRange;
  signatories: PubKeyHash[];
  mint?: Value;
  collateral?: TxInput[];
  collateralReturn?: TxOutput;
  totalCollateral?: Ada;
  isSignedBy(pubKeyHash: PubKeyHash): Bool;
}

// Value and assets
export interface Value {
  ada: Ada;
  assets: Map<PolicyId, Map<AssetName, bigint>>;
}

// Addresses and credentials
export type Address = string & { __brand: 'Address' };
export type Credential = VerificationKeyCredential | ScriptCredential;

export interface AddressDetails {
  paymentCredential: Credential;
  stakeCredential?: Credential;
}

// Script context
export interface ScriptContext {
  transaction: Transaction;
  purpose: ScriptPurpose;
  spendingTxOutRef?: TxOutRef;
}

export interface TxOutRef {
  transactionId: string;
  outputIndex: number;
}

// Script purposes
export type ScriptPurpose =
  | { type: 'spend'; txOutRef: TxOutRef }
  | { type: 'mint'; policyId: PolicyId }
  | { type: 'withdraw'; stakeCredential: Credential }
  | { type: 'publish' };

// Datum and redeemer types
export type Datum = any;
export type Redeemer = any;

// Script types
export type Script = string;

// Decorators for DSL
export function contract(name: string) {
  return function <T extends new (...args: any[]) => {}>(target: T): T {
    // Store contract metadata
    (target as any).__contractName = name;
    return target;
  };
}

export function datum(target: any, context: ClassFieldDecoratorContext): void {
  const datums = (target.constructor as any).__datums || [];
  datums.push(context.name);
  (target.constructor as any).__datums = datums;
}

export function validator(purpose: string) {
  return function <T extends (...args: any[]) => any>(
    target: T,
    context: ClassMethodDecoratorContext
  ): T {
    const validators = (target.constructor as any).__validators || [];
    validators.push({
      name: context.name,
      purpose,
      implementation: target
    });
    (target.constructor as any).__validators = validators;
    return target;
  };
}

// Utility functions
export function pubKeyHash(hash: string): PubKeyHash {
  return hash as PubKeyHash;
}

export function scriptHash(hash: string): ScriptHash {
  return hash as ScriptHash;
}

export function ada(amount: bigint): Ada {
  return amount as Ada;
}

export function assetName(name: string): AssetName {
  return name as AssetName;
}

export function policyId(id: string): PolicyId {
  return id as PolicyId;
}

// Builtin function declarations for Aiken
// These will be transformed by the transpiler

// Cryptographic functions
export declare function sha256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;
export declare function ripemd_160(data: ByteArray): ByteArray;

// Data conversion functions
export declare function iData(value: Int): any;
export declare function bData(value: ByteArray): any;
export declare function constrData(tag: Int, fields: any[]): any;
export declare function mapData(entries: [any, any][]): any;
export declare function listData(items: any[]): any;

// Data extraction functions
export declare function unConstrData(data: any): { tag: Int; fields: any[] };
export declare function unMapData(data: any): [any, any][];
export declare function unListData(data: any): any[];
export declare function unIData(data: any): Int;
export declare function unBData(data: any): ByteArray;

// Utility data constructors
export declare function mkPairData(first: any, second: any): any;
export declare function mkNilData(): any;
export declare function mkNilPairData(): any;

// Comparison and utility functions
export declare function equalsData(a: any, b: any): Bool;
export declare function serialiseData(data: any): ByteArray;

// String functions
export declare function appendString(a: string, b: string): string;
export declare function equalsString(a: string, b: string): Bool;
export declare function encodeUtf8(str: string): ByteArray;
export declare function decodeUtf8(bytes: ByteArray): string;

// List functions
export declare function chooseList(list: any[], defaultValue: any, whenEmpty: any, whenNonEmpty: (head: any, tail: any[]) => any): any;
export declare function mkCons(item: any, list: any[]): any[];
export declare function headList(list: any[]): any;
export declare function tailList(list: any[]): any[];
export declare function nullList(list: any[]): Bool;

// Pair functions
export declare function fstPair(pair: [any, any]): any;
export declare function sndPair(pair: [any, any]): any;

// Control flow
export declare function ifThenElse(condition: Bool, whenTrue: any, whenFalse: any): any;
export declare function chooseUnit(unit: void, value: any): any;
export declare function trace(message: string, value: any): any;

// ByteArray functions
export declare function appendByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function consByteString(byte: number, bytes: ByteArray): ByteArray;
export declare function sliceByteString(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function lengthOfByteString(bytes: ByteArray): Int;
export declare function indexByteString(bytes: ByteArray, index: Int): number;

// Signature verification
export declare function verifyEd25519Signature(publicKey: PubKeyHash, message: ByteArray, signature: ByteArray): Bool;
export declare function verifyEcdsaSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;
export declare function verifySchnorrSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;

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

// BLS12-381 operations
export declare function bls12_381_G1_Add(a: any, b: any): any;
export declare function bls12_381_G1_Neg(point: any): any;
export declare function bls12_381_G1_ScalarMul(point: any, scalar: any): any;
export declare function bls12_381_G1_Equal(a: any, b: any): Bool;
export declare function bls12_381_G1_Compress(point: any): ByteArray;
export declare function bls12_381_G1_Uncompress(bytes: ByteArray): any;
export declare function bls12_381_G1_HashToGroup(data: ByteArray): any;
export declare function bls12_381_G2_Add(a: any, b: any): any;
export declare function bls12_381_G2_Neg(point: any): any;
export declare function bls12_381_G2_ScalarMul(scalar: any, point: any): any;
export declare function bls12_381_G2_Equal(a: any, b: any): Bool;
export declare function bls12_381_G2_Compress(point: any): ByteArray;
export declare function bls12_381_G2_Uncompress(bytes: ByteArray): any;
export declare function bls12_381_G2_HashToGroup(data: ByteArray, dst: ByteArray): any;
export declare function bls12_381_MillerLoop(g1: any, g2: any): any;
export declare function bls12_381_MulMlResult(a: any, b: any): any;
export declare function bls12_381_FinalVerify(a: any, b: any): Bool;

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

// Additional ByteString functions
export declare function replicateByte(count: Int, byte: Int): ByteArray;

// Additional utility functions
export declare function chooseUnit(unit: void, value: any): any;
export declare function unconstrIndex(data: any): Int;
export declare function unconstrFields(data: any): any[];

// Aiken Standard Library Types and Functions
// These are higher-level utilities built on top of UPLC builtins

// Option type
export type Option<T> = { type: 'Some'; value: T } | { type: 'None' };
export const Some = <T>(value: T): Option<T> => ({ type: 'Some', value });
export const None: Option<never> = { type: 'None' };

// Rational type for mathematical operations
export interface Rational {
  numerator: Int;
  denominator: Int;
}

// Dictionary/Map type
export interface Dict<K, V> {
  // Dictionary operations
}

// Ordering type for comparisons
export type Ordering = 'Less' | 'Equal' | 'Greater';

// Transaction types from aiken/transaction
export interface TransactionId {
  __brand: 'TransactionId';
  value: ByteArray;
}

export interface OutputReference {
  transactionId: TransactionId;
  outputIndex: Int;
}

// Address and credential types
export interface VerificationKeyCredential {
  __brand: 'VerificationKeyCredential';
  hash: PubKeyHash;
}

export interface ScriptCredential {
  __brand: 'ScriptCredential';
  hash: ScriptHash;
}

// Value and asset types
export interface Value {
  ada: Ada;
  assets: Map<PolicyId, Map<AssetName, Int>>;
}

// Fuzzing utilities
export declare function fuzzInt(): Int;
export declare function fuzzByteArray(): ByteArray;
export declare function fuzzString(): String;
export declare function fuzzBool(): Bool;
export declare function fuzzOption<T>(fuzzer: () => T): Option<T>;
export declare function fuzzList<T>(fuzzer: () => T): T[];
export declare function fuzzLabel(label: String): void;

// Collection operations
export declare function listFilter<T>(list: T[], predicate: (item: T) => Bool): T[];
export declare function listMap<T, U>(list: T[], mapper: (item: T) => U): U[];
export declare function listLength<T>(list: T[]): Int;
export declare function listHead<T>(list: T[]): Option<T>;
export declare function listTail<T>(list: T[]): T[];
export declare function listIsEmpty<T>(list: T[]): Bool;
export declare function listFind<T>(list: T[], predicate: (item: T) => Bool): Option<T>;
export declare function listAny<T>(list: T[], predicate: (item: T) => Bool): Bool;
export declare function listAll<T>(list: T[], predicate: (item: T) => Bool): Bool;
export declare function listCount<T>(list: T[], predicate: (item: T) => Bool): Int;

// Dictionary operations
export declare function dictNew<K, V>(): Dict<K, V>;
export declare function dictInsert<K, V>(dict: Dict<K, V>, key: K, value: V): Dict<K, V>;
export declare function dictGet<K, V>(dict: Dict<K, V>, key: K): Option<V>;
export declare function dictDelete<K, V>(dict: Dict<K, V>, key: K): Dict<K, V>;
export declare function dictHasKey<K, V>(dict: Dict<K, V>, key: K): Bool;
export declare function dictSize<K, V>(dict: Dict<K, V>): Int;

// Option operations
export declare function optionMap<T, U>(option: Option<T>, mapper: (value: T) => U): Option<U>;
export declare function optionIsSome<T>(option: Option<T>): Bool;
export declare function optionIsNone<T>(option: Option<T>): Bool;
export declare function optionUnwrap<T>(option: Option<T>): T;
export declare function optionUnwrapOr<T>(option: Option<T>, defaultValue: T): T;
export declare function optionUnwrapOrElse<T>(option: Option<T>, defaultFn: () => T): T;

// Rational operations
export declare function rationalFromInt(value: Int): Rational;
export declare function rationalAdd(a: Rational, b: Rational): Rational;
export declare function rationalSubtract(a: Rational, b: Rational): Rational;
export declare function rationalMultiply(a: Rational, b: Rational): Rational;
export declare function rationalDivide(a: Rational, b: Rational): Option<Rational>;
export declare function rationalCompare(a: Rational, b: Rational): Ordering;
export declare function rationalTruncate(rational: Rational): Int;
export declare function rationalCeil(rational: Rational): Int;
export declare function rationalFloor(rational: Rational): Int;

// ByteArray utilities
export declare function byteArrayCompare(a: ByteArray, b: ByteArray): Ordering;
export declare function byteArrayIsEmpty(bytes: ByteArray): Bool;
export declare function byteArrayConcat(arrays: ByteArray[]): ByteArray;
export declare function byteArraySlice(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function byteArrayToHex(bytes: ByteArray): String;
export declare function byteArrayFromHex(hex: String): Option<ByteArray>;

// Integer utilities
export declare function intCompare(a: Int, b: Int): Ordering;
export declare function intAbs(value: Int): Int;
export declare function intSign(value: Int): Int;
export declare function intMin(a: Int, b: Int): Int;
export declare function intMax(a: Int, b: Int): Int;
export declare function intClamp(value: Int, min: Int, max: Int): Int;

// String utilities
export declare function stringLength(str: String): Int;
export declare function stringIsEmpty(str: String): Bool;
export declare function stringConcat(strings: String[]): String;
export declare function stringSlice(str: String, start: Int, end: Int): String;
export declare function stringCompare(a: String, b: String): Ordering;
export declare function stringToByteArray(str: String): ByteArray;
export declare function stringFromByteArray(bytes: ByteArray): Option<String>;

// ============================================================================
// CONVENIENCE FUNCTIONS - TypeScript implementations using existing builtins
// ============================================================================

/**
 * Mathematical convenience functions using existing UPLC builtins
 */

// Absolute value
export function convenienceAbs(value: Int): Int {
  return lessThanInteger(value, 0n) ? subtractInteger(0n, value) : value;
}

// Minimum of two integers
export function convenienceMin(a: Int, b: Int): Int {
  return lessThanInteger(a, b) ? a : b;
}

// Maximum of two integers
export function convenienceMax(a: Int, b: Int): Int {
  return lessThanInteger(a, b) ? b : a;
}

// Clamp value between min and max
export function convenienceClamp(value: Int, minVal: Int, maxVal: Int): Int {
  if (lessThanInteger(value, minVal)) return minVal;
  if (lessThanInteger(maxVal, value)) return maxVal;
  return value;
}

// Sign function (-1, 0, or 1)
export function convenienceSign(value: Int): Int {
  if (lessThanInteger(value, 0n)) return -1n;
  if (lessThanInteger(0n, value)) return 1n;
  return 0n;
}

// Power function (exponentiation by squaring for positive integer exponents)
export function conveniencePow(base: Int, exponent: Int): Int {
  if (equalsInteger(exponent, 0n)) return 1n;
  if (equalsInteger(exponent, 1n)) return base;

  let result = 1n;
  let currentBase = base;
  let currentExponent = exponent;

  while (lessThanInteger(0n, currentExponent)) {
    if (equalsInteger(remainderInteger(currentExponent, 2n), 1n)) {
      result = multiplyInteger(result, currentBase);
    }
    currentBase = multiplyInteger(currentBase, currentBase);
    currentExponent = divideInteger(currentExponent, 2n);
  }

  return result;
}

// Check if number is even
export function convenienceIsEven(value: Int): Bool {
  return equalsInteger(remainderInteger(value, 2n), 0n);
}

// Check if number is odd
export function convenienceIsOdd(value: Int): Bool {
  return equalsInteger(remainderInteger(value, 2n), 1n);
}

// Factorial (for small integers to avoid overflow)
export function convenienceFactorial(n: Int): Int {
  if (lessThanInteger(n, 0n)) return 0n; // Error case
  if (equalsInteger(n, 0n) || equalsInteger(n, 1n)) return 1n;

  let result = 1n;
  let i = 2n;
  while (lessThanEqualsInteger(i, n)) {
    result = multiplyInteger(result, i);
    i = addInteger(i, 1n);
  }
  return result;
}

/**
 * String convenience functions using existing builtins
 */

// Get string length
export function convenienceStringLength(str: String): Int {
  return lengthOfByteString(encodeUtf8(str));
}

// Concatenate two strings
export function convenienceStringConcat(a: String, b: String): String {
  return decodeUtf8(appendByteString(encodeUtf8(a), encodeUtf8(b)));
}

// Check if string contains substring
export function convenienceStringContains(haystack: String, needle: String): Bool {
  const haystackBytes = encodeUtf8(haystack);
  const needleBytes = encodeUtf8(needle);
  const haystackLen = lengthOfByteString(haystackBytes);
  const needleLen = lengthOfByteString(needleBytes);

  if (lessThanInteger(haystackLen, needleLen)) return false;

  let i = 0n;
  const maxStart = subtractInteger(haystackLen, needleLen);

  while (lessThanEqualsInteger(i, maxStart)) {
    const slice = sliceByteString(haystackBytes, i, addInteger(i, needleLen));
    if (equalsByteString(slice, needleBytes)) return true;
    i = addInteger(i, 1n);
  }

  return false;
}

// Compare two strings lexicographically
export function convenienceStringCompare(a: String, b: String): Int {
  const aBytes = encodeUtf8(a);
  const bBytes = encodeUtf8(b);
  const aLen = lengthOfByteString(aBytes);
  const bLen = lengthOfByteString(bBytes);

  const minLen = convenienceMin(aLen, bLen);

  let i = 0n;
  while (lessThanInteger(i, minLen)) {
    const aByte = indexByteString(aBytes, i);
    const bByte = indexByteString(bBytes, i);

    if (lessThanInteger(BigInt(aByte), BigInt(bByte))) return -1n;
    if (lessThanInteger(BigInt(bByte), BigInt(aByte))) return 1n;

    i = addInteger(i, 1n);
  }

  if (lessThanInteger(aLen, bLen)) return -1n;
  if (lessThanInteger(bLen, aLen)) return 1n;
  return 0n;
}

// Check if string starts with prefix
export function convenienceStringStartsWith(str: String, prefix: String): Bool {
  const strBytes = encodeUtf8(str);
  const prefixBytes = encodeUtf8(prefix);
  const prefixLen = lengthOfByteString(prefixBytes);

  if (lessThanInteger(lengthOfByteString(strBytes), prefixLen)) return false;

  const strPrefix = sliceByteString(strBytes, 0n, prefixLen);
  return equalsByteString(strPrefix, prefixBytes);
}

// Check if string ends with suffix
export function convenienceStringEndsWith(str: String, suffix: String): Bool {
  const strBytes = encodeUtf8(str);
  const suffixBytes = encodeUtf8(suffix);
  const strLen = lengthOfByteString(strBytes);
  const suffixLen = lengthOfByteString(suffixBytes);

  if (lessThanInteger(strLen, suffixLen)) return false;

  const start = subtractInteger(strLen, suffixLen);
  const strSuffix = sliceByteString(strBytes, start, strLen);
  return equalsByteString(strSuffix, suffixBytes);
}

// Get substring
export function convenienceSubstring(str: String, start: Int, end: Int): String {
  const strBytes = encodeUtf8(str);
  const strLen = lengthOfByteString(strBytes);

  const clampedStart = convenienceMax(0n, convenienceMin(start, strLen));
  const clampedEnd = convenienceMax(clampedStart, convenienceMin(end, strLen));

  const resultBytes = sliceByteString(strBytes, clampedStart, clampedEnd);
  return decodeUtf8(resultBytes);
}

// Split string by delimiter (returns array of strings)
export function convenienceStringSplit(str: String, delimiter: String): String[] {
  const result: String[] = [];
  const strBytes = encodeUtf8(str);
  const delimiterBytes = encodeUtf8(delimiter);
  const delimiterLen = lengthOfByteString(delimiterBytes);

  if (equalsInteger(delimiterLen, 0n)) {
    // Empty delimiter - split into characters
    const strLen = lengthOfByteString(strBytes);
    let i = 0n;
    while (lessThanInteger(i, strLen)) {
      const charBytes = sliceByteString(strBytes, i, addInteger(i, 1n));
      result.push(decodeUtf8(charBytes));
      i = addInteger(i, 1n);
    }
    return result;
  }

  let currentPos = 0n;
  const strLen = lengthOfByteString(strBytes);

  while (lessThanInteger(currentPos, strLen)) {
    const remaining = subtractInteger(strLen, currentPos);
    if (lessThanInteger(remaining, delimiterLen)) {
      // No more delimiters
      const partBytes = sliceByteString(strBytes, currentPos, strLen);
      result.push(decodeUtf8(partBytes));
      break;
    }

    // Look for delimiter
    const checkBytes = sliceByteString(strBytes, currentPos, addInteger(currentPos, delimiterLen));
    if (equalsByteString(checkBytes, delimiterBytes)) {
      // Found delimiter
      const partBytes = sliceByteString(strBytes, currentPos, currentPos);
      result.push(decodeUtf8(partBytes));
      currentPos = addInteger(currentPos, delimiterLen);
    } else {
      currentPos = addInteger(currentPos, 1n);
    }
  }

  return result;
}
