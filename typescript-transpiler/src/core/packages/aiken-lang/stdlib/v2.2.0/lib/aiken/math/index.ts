// Aiken Math Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/math

import { Int } from '@/types/basic/index';

// Basic math functions
export declare function abs(value: Int): Int;
export declare function clamp(value: Int, min: Int, max: Int): Int;
export declare function gcd(a: Int, b: Int): Int;
export declare function isSqrt(value: Int): boolean;
export declare function log(value: Int, base: Int): Int;
export declare function log2(value: Int): Int;
export declare function min(left: Int, right: Int): Int;
export declare function max(left: Int, right: Int): Int;
export declare function pow(base: Int, exponent: Int): Int;
export declare function sqrt(value: Int): Int;

// Trigonometric functions
export declare function sin(angle: Int): Int;
export declare function cos(angle: Int): Int;
export declare function tan(angle: Int): Int;

// Exponential and logarithmic functions
export declare function exp(value: Int): Int;
export declare function ln(value: Int): Int;

// Rounding functions
export declare function floor(value: Int): Int;
export declare function ceil(value: Int): Int;
export declare function round(value: Int): Int;

// Constants
export declare const pi: Int;
export declare const e: Int;

export * from './rational';
