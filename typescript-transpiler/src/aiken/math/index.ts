// Aiken Math Module
// Functions from aiken-lang/stdlib/lib/aiken/math/

import { Int, Bool } from '../../types/basic/index';

// Basic arithmetic
export declare function abs(value: Int): Int;
export declare function gcd(x: Int, y: Int): Int;

// Value clamping and checking
export declare function clamp(value: Int, min: Int, max: Int): Int;
export declare function isSqrt(value: Int, x: Int): Bool;

// Logarithmic functions
export declare function log(value: Int, base: Int): Int;
export declare function log2(value: Int): Int;

// Re-export types
export { Int, Bool } from '../../types/basic/index';
