import { ByteArray } from '@/types/basic/index';
export declare function blake2b_224(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function sha2_256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;
export declare type VerificationKey = ByteArray;
export declare type Signature = ByteArray;
export declare function verifyEd25519Signature(vk: VerificationKey, msg: ByteArray, sig: Signature): boolean;
//# sourceMappingURL=crypto.d.ts.map