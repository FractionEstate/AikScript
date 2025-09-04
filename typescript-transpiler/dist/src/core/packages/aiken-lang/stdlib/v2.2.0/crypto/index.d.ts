import { ByteArray, Bool, Int } from '../../types/basic/index';
export declare type Hash = ByteArray;
export declare type Blake2b_224 = unknown;
export declare type Blake2b_256 = unknown;
export declare type Keccak_256 = unknown;
export declare type Sha2_256 = unknown;
export declare type Sha3_256 = unknown;
export declare function blake2b_224(bytes: ByteArray): Hash;
export declare function blake2b_256(bytes: ByteArray): Hash;
export declare function keccak_256(bytes: ByteArray): Hash;
export declare function sha2_256(bytes: ByteArray): Hash;
export declare function sha3_256(bytes: ByteArray): Hash;
export declare type VerificationKey = ByteArray;
export declare type Signature = ByteArray;
export declare function verifyEcdsaSignature(key: VerificationKey, msg: ByteArray, sig: Signature): Bool;
export declare function verifyEd25519Signature(key: VerificationKey, msg: ByteArray, sig: Signature): Bool;
export declare function verifySchnorrSignature(key: VerificationKey, msg: ByteArray, sig: Signature): Bool;
export declare type VerificationKeyHash = Hash;
export declare type ScriptHash = Hash;
export declare type Script = ByteArray;
export declare type DataHash = Hash;
export declare type Data = Int | ByteArray | Data[] | Map<Data, Data> | {
    tag: Int;
    fields: Data[];
};
export declare type Credential = {
    VerificationKey: VerificationKeyHash;
} | {
    Script: ScriptHash;
};
export { Bool, Int } from '../../types/basic/index';
//# sourceMappingURL=index.d.ts.map