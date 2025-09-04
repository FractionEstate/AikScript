// Aiken Crypto - BLS12-381 Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/crypto/bls12_381/

import { ByteArray } from '@/types/basic/index';

// BLS12-381 types
export declare type G1Element = ByteArray;
export declare type G2Element = ByteArray;
export declare type Scalar = ByteArray;

// BLS12-381 operations
export declare function bls12_381_g1_compress(element: G1Element): ByteArray;
export declare function bls12_381_g1_uncompress(bytes: ByteArray): G1Element;
export declare function bls12_381_g2_compress(element: G2Element): ByteArray;
export declare function bls12_381_g2_uncompress(bytes: ByteArray): G2Element;
export declare function bls12_381_scalar_from_int(value: bigint): Scalar;
export declare function bls12_381_scalar_from_bytearray(bytes: ByteArray): Scalar;
export declare function bls12_381_g1_add(left: G1Element, right: G1Element): G1Element;
export declare function bls12_381_g1_scalar_mul(element: G1Element, scalar: Scalar): G1Element;
export declare function bls12_381_g2_add(left: G2Element, right: G2Element): G2Element;
export declare function bls12_381_g2_scalar_mul(element: G2Element, scalar: Scalar): G2Element;
export declare function bls12_381_pairing(g1: G1Element, g2: G2Element): ByteArray;
