// Aiken Primitive Int Module
// TypeScript declarations for aiken-lang/stdlib/primitive/int.ak

import { ByteArray, String } from '@aikscript/types';

// Int conversion functions
export declare function intFromByteArrayBigEndian(bytes: ByteArray): bigint;
export declare function intFromByteArrayLittleEndian(bytes: ByteArray): bigint;
export declare function intFromUtf8(str: String): bigint;
export declare function intToString(value: bigint): String;

// Int comparison
export declare function intCompare(a: bigint, b: bigint): number;

// Int arithmetic
export declare function intAbs(value: bigint): bigint;
export declare function intMax(a: bigint, b: bigint): bigint;
export declare function intMin(a: bigint, b: bigint): bigint;
export declare function intPow(base: bigint, exponent: bigint): bigint;
export declare function intSqrt(value: bigint): bigint;
export declare function intModulo(dividend: bigint, divisor: bigint): bigint;
export declare function intDivide(dividend: bigint, divisor: bigint): bigint;
