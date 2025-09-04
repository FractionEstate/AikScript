// Aiken Prelude v1.0.0
// Fundamental types and functions automatically available in all Aiken programs

import { Bool, Int, ByteArray, String, Void, Data } from '@aikscript/types';

// ===== BASIC TYPES =====

// Boolean type and operations
export { Bool } from '@aikscript/types';
export declare function not(b: Bool): Bool;
export declare function and(a: Bool, b: Bool): Bool;
export declare function or(a: Bool, b: Bool): Bool;

// Integer type and basic operations
export { Int } from '@aikscript/types';
export declare function add(a: Int, b: Int): Int;
export declare function subtract(a: Int, b: Int): Int;
export declare function multiply(a: Int, b: Int): Int;
export declare function divide(a: Int, b: Int): Int;
export declare function modulo(a: Int, b: Int): Int;
export declare function negate(x: Int): Int;

// Comparison operations
export declare function equal<T>(a: T, b: T): Bool;
export declare function notEqual<T>(a: T, b: T): Bool;
export declare function lessThan(a: Int, b: Int): Bool;
export declare function lessThanOrEqual(a: Int, b: Int): Bool;
export declare function greaterThan(a: Int, b: Int): Bool;
export declare function greaterThanOrEqual(a: Int, b: Int): Bool;

// ===== BYTEARRAY OPERATIONS =====
export { ByteArray } from '@aikscript/types';
export declare function byteArrayLength(bytes: ByteArray): Int;
export declare function byteArrayConcat(a: ByteArray, b: ByteArray): ByteArray;
export declare function byteArraySlice(bytes: ByteArray, start: Int, end: Int): ByteArray;

// ===== STRING OPERATIONS =====
export { String } from '@aikscript/types';
export declare function stringLength(str: String): Int;
export declare function stringConcat(a: String, b: String): String;

// ===== DATA TYPE =====
export { Data } from '@aikscript/types';

// ===== VOID TYPE =====
export { Void } from '@aikscript/types';

// ===== UTILITY FUNCTIONS =====
export declare function identity<T>(x: T): T;
export declare function constant<T>(x: T): () => T;

// ===== LIST OPERATIONS =====
export declare function listLength<T>(list: T[]): Int;
export declare function listHead<T>(list: T[]): T;
export declare function listTail<T>(list: T[]): T[];
export declare function listIsEmpty<T>(list: T[]): Bool;
export declare function listAppend<T>(list: T[], elem: T): T[];

// ===== OPTION TYPE =====
export declare type Option<T> = { Some: T } | { None: void };
export declare function isSome<T>(option: Option<T>): Bool;
export declare function isNone<T>(option: Option<T>): Bool;
export declare function unwrap<T>(option: Option<T>): T;
export declare function unwrapOr<T>(option: Option<T>, defaultValue: T): T;

// ===== RESULT TYPE =====
export declare type Result<T, E> = { Ok: T } | { Error: E };
export declare function isOk<T, E>(result: Result<T, E>): Bool;
export declare function isError<T, E>(result: Result<T, E>): Bool;

// ===== DEBUGGING =====
export declare function trace<T>(message: String, value: T): T;
