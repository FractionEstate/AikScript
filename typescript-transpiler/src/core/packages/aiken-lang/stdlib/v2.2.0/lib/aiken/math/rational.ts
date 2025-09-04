// Aiken Math Rational Module
// TypeScript declarations for Aiken rational number operations

// Rational Type
export declare type Rational = {
  numerator: bigint;
  denominator: bigint;
};

// Rational Construction Functions
export declare function rational(numerator: bigint, denominator: bigint): Rational;
export declare function rationalFromInt(value: bigint): Rational;
export declare function rationalFromString(value: string): Rational | undefined;

// Rational Operations
export declare function rationalAdd(left: Rational, right: Rational): Rational;
export declare function rationalSubtract(left: Rational, right: Rational): Rational;
export declare function rationalMultiply(left: Rational, right: Rational): Rational;
export declare function rationalDivide(left: Rational, right: Rational): Rational;
export declare function rationalNegate(rational: Rational): Rational;
export declare function rationalInverse(rational: Rational): Rational;

// Rational Comparison
export declare function rationalEqual(left: Rational, right: Rational): boolean;
export declare function rationalCompare(left: Rational, right: Rational): 'Less' | 'Equal' | 'Greater';

// Rational Utilities
export declare function rationalReduce(rational: Rational): Rational;
export declare function rationalToFloat(rational: Rational): number;
export declare function rationalToString(rational: Rational): string;
export declare function rationalIsZero(rational: Rational): boolean;
export declare function rationalIsPositive(rational: Rational): boolean;
export declare function rationalIsNegative(rational: Rational): boolean;

// Rational Constants
export declare const rationalZero: Rational;
export declare const rationalOne: Rational;
