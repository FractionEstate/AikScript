export type POSIXTime = bigint;
export type PubKeyHash = string & {
    __brand: 'PubKeyHash';
};
export type ScriptHash = string & {
    __brand: 'ScriptHash';
};
export type AssetName = string & {
    __brand: 'AssetName';
};
export type PolicyId = string & {
    __brand: 'PolicyId';
};
export type Ada = bigint & {
    __brand: 'Ada';
};
export type Percentage = number & {
    __brand: 'Percentage';
};
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type Void = undefined;
export type String = string;
export type Data = Int | ByteArray | Data[] | Map<Data, Data> | {
    tag: Int;
    fields: Data[];
};
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
export interface Value {
    ada: Ada;
    assets: Map<PolicyId, Map<AssetName, bigint>>;
}
export type Address = string & {
    __brand: 'Address';
};
export type Credential = VerificationKeyCredential | ScriptCredential;
export interface AddressDetails {
    paymentCredential: Credential;
    stakeCredential?: Credential;
}
export interface ScriptContext {
    transaction: Transaction;
    purpose: ScriptPurpose;
    spendingTxOutRef?: TxOutRef;
}
export interface TxOutRef {
    transactionId: string;
    outputIndex: number;
}
export type ScriptPurpose = {
    type: 'spend';
    txOutRef: TxOutRef;
} | {
    type: 'mint';
    policyId: PolicyId;
} | {
    type: 'withdraw';
    stakeCredential: Credential;
} | {
    type: 'publish';
};
export type Datum = Data;
export type Redeemer = Data;
export type Script = string;
export declare function contract(name: string): <T extends new (...args: unknown[]) => Record<string, unknown>>(target: T) => T;
export declare function datum(target: Record<string, unknown>, propertyKey: string): void;
export declare function validator(purpose: string): (target: Record<string, unknown>, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function pubKeyHash(hash: string): PubKeyHash;
export declare function scriptHash(hash: string): ScriptHash;
export declare function ada(amount: bigint): Ada;
export declare function assetName(name: string): AssetName;
export declare function policyId(id: string): PolicyId;
export declare function sha256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;
export declare function ripemd_160(data: ByteArray): ByteArray;
export declare function iData(value: Int): Data;
export declare function bData(value: ByteArray): Data;
export declare function constrData(tag: Int, fields: Data[]): Data;
export declare function mapData(entries: [Data, Data][]): Data;
export declare function listData(items: Data[]): Data;
export declare function unConstrData(data: Data): {
    tag: Int;
    fields: Data[];
};
export declare function unMapData(data: Data): [Data, Data][];
export declare function unListData(data: Data): Data[];
export declare function unIData(data: Data): Int;
export declare function unBData(data: Data): ByteArray;
export declare function mkPairData(first: Data, second: Data): Data;
export declare function mkNilData(): Data;
export declare function mkNilPairData(): Data[];
export declare function equalsData(a: Data, b: Data): Bool;
export declare function serialiseData(data: Data): ByteArray;
export declare function appendString(a: string, b: string): string;
export declare function equalsString(a: string, b: string): Bool;
export declare function encodeUtf8(str: string): ByteArray;
export declare function decodeUtf8(bytes: ByteArray): string;
export declare function chooseList<T>(list: T[], defaultValue: T, whenEmpty: T, whenNonEmpty: (head: T, tail: T[]) => T): T;
export declare function mkCons<T>(item: T, list: T[]): T[];
export declare function headList<T>(list: T[]): T;
export declare function tailList<T>(list: T[]): T[];
export declare function nullList<T>(list: T[]): Bool;
export declare function fstPair<T, U>(pair: [T, U]): T;
export declare function sndPair<T, U>(pair: [T, U]): U;
export declare function ifThenElse<T>(condition: Bool, whenTrue: T, whenFalse: T): T;
export declare function chooseUnit<T>(unit: void, value: T): T;
export declare function trace<T>(message: string, value: T): T;
export declare function appendByteString(a: ByteArray, b: ByteArray): ByteArray;
export declare function consByteString(byte: number, bytes: ByteArray): ByteArray;
export declare function sliceByteString(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function lengthOfByteString(bytes: ByteArray): Int;
export declare function indexByteString(bytes: ByteArray, index: Int): number;
export declare function verifyEd25519Signature(publicKey: PubKeyHash, message: ByteArray, signature: ByteArray): Bool;
export declare function verifyEcdsaSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;
export declare function verifySchnorrSecp256k1Signature(publicKey: ByteArray, message: ByteArray, signature: ByteArray): Bool;
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
export declare function integerToByteString(value: Int): ByteArray;
export declare function byteStringToInteger(bytes: ByteArray): Int;
export declare function bls12_381_G1_Add(a: ByteArray, b: ByteArray): ByteArray;
export declare function bls12_381_G1_Neg(point: ByteArray): ByteArray;
export declare function bls12_381_G1_ScalarMul(point: ByteArray, scalar: Int): ByteArray;
export declare function bls12_381_G1_Equal(a: ByteArray, b: ByteArray): Bool;
export declare function bls12_381_G1_Compress(point: ByteArray): ByteArray;
export declare function bls12_381_G1_Uncompress(bytes: ByteArray): ByteArray;
export declare function bls12_381_G1_HashToGroup(data: ByteArray): ByteArray;
export declare function bls12_381_G2_Add(a: ByteArray, b: ByteArray): ByteArray;
export declare function bls12_381_G2_Neg(point: ByteArray): ByteArray;
export declare function bls12_381_G2_ScalarMul(scalar: Int, point: ByteArray): ByteArray;
export declare function bls12_381_G2_Equal(a: ByteArray, b: ByteArray): Bool;
export declare function bls12_381_G2_Compress(point: ByteArray): ByteArray;
export declare function bls12_381_G2_Uncompress(bytes: ByteArray): ByteArray;
export declare function bls12_381_G2_HashToGroup(data: ByteArray, dst: ByteArray): ByteArray;
export declare function bls12_381_MillerLoop(g1: ByteArray, g2: ByteArray): ByteArray;
export declare function bls12_381_MulMlResult(a: ByteArray, b: ByteArray): ByteArray;
export declare function bls12_381_FinalVerify(a: ByteArray, b: ByteArray): Bool;
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
export declare function equalsByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanByteString(a: ByteArray, b: ByteArray): Bool;
export declare function lessThanEqualsByteString(a: ByteArray, b: ByteArray): Bool;
export declare function replicateByte(count: Int, byte: Int): ByteArray;
export declare function unconstrIndex(data: Data): Int;
export declare function unconstrFields(data: Data): Data[];
export type Option<T> = {
    type: 'Some';
    value: T;
} | {
    type: 'None';
};
export declare const Some: <T>(value: T) => Option<T>;
export declare const None: Option<never>;
export interface Rational {
    numerator: Int;
    denominator: Int;
}
export interface Dict<K, V> {
}
export type Ordering = 'Less' | 'Equal' | 'Greater';
export interface TransactionId {
    __brand: 'TransactionId';
    value: ByteArray;
}
export interface OutputReference {
    transactionId: TransactionId;
    outputIndex: Int;
}
export interface VerificationKeyCredential {
    __brand: 'VerificationKeyCredential';
    hash: PubKeyHash;
}
export interface ScriptCredential {
    __brand: 'ScriptCredential';
    hash: ScriptHash;
}
export declare function fuzzInt(): Int;
export declare function fuzzByteArray(): ByteArray;
export declare function fuzzString(): String;
export declare function fuzzBool(): Bool;
export declare function fuzzOption<T>(fuzzer: () => T): Option<T>;
export declare function fuzzList<T>(fuzzer: () => T): T[];
export declare function fuzzLabel(label: String): void;
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
export declare function dictNew<K, V>(): Dict<K, V>;
export declare function dictInsert<K, V>(dict: Dict<K, V>, key: K, value: V): Dict<K, V>;
export declare function dictGet<K, V>(dict: Dict<K, V>, key: K): Option<V>;
export declare function dictDelete<K, V>(dict: Dict<K, V>, key: K): Dict<K, V>;
export declare function dictHasKey<K, V>(dict: Dict<K, V>, key: K): Bool;
export declare function dictSize<K, V>(dict: Dict<K, V>): Int;
export declare function optionMap<T, U>(option: Option<T>, mapper: (value: T) => U): Option<U>;
export declare function optionIsSome<T>(option: Option<T>): Bool;
export declare function optionIsNone<T>(option: Option<T>): Bool;
export declare function optionUnwrap<T>(option: Option<T>): T;
export declare function optionUnwrapOr<T>(option: Option<T>, defaultValue: T): T;
export declare function optionUnwrapOrElse<T>(option: Option<T>, defaultFn: () => T): T;
export declare function rationalFromInt(value: Int): Rational;
export declare function rationalAdd(a: Rational, b: Rational): Rational;
export declare function rationalSubtract(a: Rational, b: Rational): Rational;
export declare function rationalMultiply(a: Rational, b: Rational): Rational;
export declare function rationalDivide(a: Rational, b: Rational): Option<Rational>;
export declare function rationalCompare(a: Rational, b: Rational): Ordering;
export declare function rationalTruncate(rational: Rational): Int;
export declare function rationalCeil(rational: Rational): Int;
export declare function rationalFloor(rational: Rational): Int;
export declare function byteArrayCompare(a: ByteArray, b: ByteArray): Ordering;
export declare function byteArrayIsEmpty(bytes: ByteArray): Bool;
export declare function byteArrayConcat(arrays: ByteArray[]): ByteArray;
export declare function byteArraySlice(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function byteArrayToHex(bytes: ByteArray): String;
export declare function byteArrayFromHex(hex: String): Option<ByteArray>;
export declare function intCompare(a: Int, b: Int): Ordering;
export declare function intAbs(value: Int): Int;
export declare function intSign(value: Int): Int;
export declare function intMin(a: Int, b: Int): Int;
export declare function intMax(a: Int, b: Int): Int;
export declare function intClamp(value: Int, min: Int, max: Int): Int;
export declare function stringLength(str: String): Int;
export declare function stringIsEmpty(str: String): Bool;
export declare function stringConcat(strings: String[]): String;
export declare function stringSlice(str: String, start: Int, end: Int): String;
export declare function stringCompare(a: String, b: String): Ordering;
export declare function stringToByteArray(str: String): ByteArray;
export declare function stringFromByteArray(bytes: ByteArray): Option<String>;
/**
 * Mathematical convenience functions using existing UPLC builtins
 */
export declare function convenienceAbs(value: Int): Int;
export declare function convenienceMin(a: Int, b: Int): Int;
export declare function convenienceMax(a: Int, b: Int): Int;
export declare function convenienceClamp(value: Int, minVal: Int, maxVal: Int): Int;
export declare function convenienceSign(value: Int): Int;
export declare function conveniencePow(base: Int, exponent: Int): Int;
export declare function convenienceIsEven(value: Int): Bool;
export declare function convenienceIsOdd(value: Int): Bool;
export declare function convenienceFactorial(n: Int): Int;
/**
 * String convenience functions using existing builtins
 */
export declare function convenienceStringLength(str: String): Int;
export declare function convenienceStringConcat(a: String, b: String): String;
export declare function convenienceStringContains(haystack: String, needle: String): Bool;
export declare function convenienceStringCompare(a: String, b: String): Int;
export declare function convenienceStringStartsWith(str: String, prefix: String): Bool;
export declare function convenienceStringEndsWith(str: String, suffix: String): Bool;
export declare function convenienceSubstring(str: String, start: Int, end: Int): String;
export declare function convenienceStringSplit(str: String, _delimiter: String): String[];
export type Bls12_381_G1Element = string & {
    __brand: 'Bls12_381_G1Element';
};
export type Bls12_381_G2Element = string & {
    __brand: 'Bls12_381_G2Element';
};
export type Bls12_381_Scalar = string & {
    __brand: 'Bls12_381_Scalar';
};
export type Bls12_381_MlResult = string & {
    __brand: 'Bls12_381_MlResult';
};
export interface Interval<T> {
    lowerBound?: T;
    upperBound?: T;
    lowerInclusive?: Bool;
    upperInclusive?: Bool;
}
export type CBOR = ByteArray;
export declare function createInterval<T>(lowerBound?: T, upperBound?: T, lowerInclusive?: Bool, upperInclusive?: Bool): Interval<T>;
export declare function createBls12_381_G1Element(value: string): Bls12_381_G1Element;
export declare function createBls12_381_G2Element(value: string): Bls12_381_G2Element;
export declare function createBls12_381_Scalar(value: string): Bls12_381_Scalar;
export declare function convenienceCompare(a: Int, b: Int): Int;
export declare function sliceByteArray(bytes: ByteArray, start: Int, length: Int): ByteArray;
export declare function nibble(bytes: ByteArray, index: Int): Int;
export declare function nibbles(bytes: ByteArray, start: Int, end: Int): ByteArray;
export declare function suffix(path: ByteArray, cursor: Int): ByteArray;
export declare function merkle4(branch: Int, root: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle8(branch: Int, root: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function merkle16(branch: Int, root: ByteArray, neighbor8: ByteArray, neighbor4: ByteArray, neighbor2: ByteArray, neighbor1: ByteArray): ByteArray;
export declare function sparseMerkle4(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle8(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function sparseMerkle16(me: Int, meHash: ByteArray, neighbor: Int, neighborHash: ByteArray): ByteArray;
export declare function combineHashes(left: ByteArray, right: ByteArray): ByteArray;
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;
//# sourceMappingURL=cardano.d.ts.map