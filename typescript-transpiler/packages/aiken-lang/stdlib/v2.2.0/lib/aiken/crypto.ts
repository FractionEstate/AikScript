// Aiken Crypto Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/crypto.ak

import { ByteArray } from '@aikscript/types';

// Cryptographic functions
export declare function blake2b_224(data: ByteArray): ByteArray;
export declare function blake2b_256(data: ByteArray): ByteArray;
export declare function sha2_256(data: ByteArray): ByteArray;
export declare function sha3_256(data: ByteArray): ByteArray;
export declare function keccak_256(data: ByteArray): ByteArray;

// Ed25519 signature verification
export declare type VerificationKey = ByteArray;
export declare type Signature = ByteArray;
export declare function verifyEd25519Signature(vk: VerificationKey, msg: ByteArray, sig: Signature): boolean;

// ECDSA signature verification
export declare function verifyEcdsaSignature(vk: VerificationKey, msg: ByteArray, sig: Signature): boolean;

// Schnorr signature verification
export declare function verifySchnorrSignature(vk: VerificationKey, msg: ByteArray, sig: Signature): boolean;
