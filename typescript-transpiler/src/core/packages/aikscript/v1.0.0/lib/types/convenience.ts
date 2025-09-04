// @aikscript/types v1.0.0 - Convenience Types
// Utility types and functions for common patterns
// Consolidated from legacy convenience declarations

import { Int, Bool } from './basic';

// ===== OPTION TYPE =====

// Option type for handling optional values
export type Option<T> = { type: 'Some'; value: T } | { type: 'None' };

// Option constructors
export const Some = <T>(value: T): Option<T> => ({ type: 'Some', value });
export const None: Option<never> = { type: 'None' };

// ===== RATIONAL TYPE =====

// Rational type for mathematical operations
export interface Rational {
  numerator: Int;
  denominator: Int;
}

// ===== DICTIONARY TYPE =====

// Dictionary/Map type with generic parameters
export interface Dict<K, V> {
  readonly _keyType: K;
  readonly _valueType: V;
}

// ===== ORDERING TYPE =====

// Ordering type for comparison results
export type Ordering = 'Less' | 'Equal' | 'Greater';

// ===== FUZZING UTILITIES =====

// Fuzzer type for property-based testing
export declare type Fuzzer<a> = (seed: Int) => Option<{ seed: Int; value: a }>;

// Fuzzing utility functions
export declare function fuzzInt(): Int;
export declare function fuzzByteArray(): Uint8Array;
export declare function fuzzString(): string;
export declare function fuzzBool(): Bool;
export declare function fuzzOption<T>(fuzzer: () => T): Option<T>;
export declare function fuzzList<T>(fuzzer: () => T): T[];
export declare function fuzzLabel(label: string): void;

// ===== COLLECTION OPERATIONS =====

// List operations
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
export declare function listPush<T>(list: T[], item: T): T[];
export declare function listRange(start: Int, end: Int): Int[];

// ===== DICTIONARY OPERATIONS =====

export declare function dictNew<K, V>(): Dict<K, V>;
export declare function dictInsert<K, V>(dict: Dict<K, V>, key: K, value: V): Dict<K, V>;
export declare function dictGet<K, V>(dict: Dict<K, V>, key: K): Option<V>;
export declare function dictDelete<K, V>(dict: Dict<K, V>, key: K): Dict<K, V>;
export declare function dictHasKey<K, V>(dict: Dict<K, V>, key: K): Bool;
export declare function dictSize<K, V>(dict: Dict<K, V>): Int;

// ===== OPTION OPERATIONS =====

export declare function optionMap<T, U>(option: Option<T>, mapper: (value: T) => U): Option<U>;
export declare function optionIsSome<T>(option: Option<T>): Bool;
export declare function optionIsNone<T>(option: Option<T>): Bool;
export declare function optionUnwrap<T>(option: Option<T>): T;
export declare function optionUnwrapOr<T>(option: Option<T>, defaultValue: T): T;
export declare function optionUnwrapOrElse<T>(option: Option<T>, defaultFn: () => T): T;

// ===== RATIONAL OPERATIONS =====

export declare function rationalFromInt(value: Int): Rational;
export declare function rationalAdd(a: Rational, b: Rational): Rational;
export declare function rationalSubtract(a: Rational, b: Rational): Rational;
export declare function rationalMultiply(a: Rational, b: Rational): Rational;
export declare function rationalDivide(a: Rational, b: Rational): Option<Rational>;
export declare function rationalCompare(a: Rational, b: Rational): Ordering;
export declare function rationalTruncate(rational: Rational): Int;
export declare function rationalCeil(rational: Rational): Int;
export declare function rationalFloor(rational: Rational): Int;
