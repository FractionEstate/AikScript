// Aiken Math Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/math.ak

import { Int } from './primitive/index';

// Mathematical functions
export declare function abs(value: Int): Int;
export declare function clamp(value: Int, min: Int, max: Int): Int;
export declare function gcd(a: Int, b: Int): Int;
export declare function isSqrt(value: Int): boolean;
export declare function log(value: Int, base: Int): Int;
export declare function log2(value: Int): Int;
export declare function max(a: Int, b: Int): Int;
export declare function min(a: Int, b: Int): Int;
export declare function pow(base: Int, exponent: Int): Int;
export declare function sqrt(value: Int): Int;
