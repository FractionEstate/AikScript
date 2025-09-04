// Aiken Fuzz Library v2.2.0
// Comprehensive fuzzing and property-based testing utilities

import { Bool, Int, ByteArray, Data } from '@/types/basic/index';

// Core fuzzing types
export declare type Fuzzer<a> = (seed: Int) => Option<{ seed: Int; value: a }>;
export declare type Option<a> = None | Some<a>;
export declare type Some<a> = { Some: a };
export declare type None = 'None';

// Primitive fuzzers
export declare function bool(): Fuzzer<Bool>;
export declare function constant<a>(value: a): Fuzzer<a>;
export declare function byte(): Fuzzer<Int>;
export declare function int(): Fuzzer<Int>;
export declare function int_between(min: Int, max: Int): Fuzzer<Int>;
export declare function int_at_least(min: Int): Fuzzer<Int>;
export declare function bytearray(): Fuzzer<ByteArray>;
export declare function bytearray_between(min: Int, max: Int): Fuzzer<ByteArray>;
export declare function bytearray_fixed(length: Int): Fuzzer<ByteArray>;
export declare function data(): Fuzzer<Data>;

// Combinators
export declare function map<a, b>(fuzzer: Fuzzer<a>, fn: (a: a) => b): Fuzzer<b>;
export declare function map2<a, b, c>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fn: (a: a, b: b) => c): Fuzzer<c>;
export declare function map3<a, b, c, d>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fuzzerC: Fuzzer<c>, fn: (a: a, b: b, c: c) => d): Fuzzer<d>;
export declare function map4<a, b, c, d, e>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fuzzerC: Fuzzer<c>, fuzzerD: Fuzzer<d>, fn: (a: a, b: b, c: c, d: d) => e): Fuzzer<e>;
export declare function and_then<a, b>(fuzzer: Fuzzer<a>, fn: (a: a) => Fuzzer<b>): Fuzzer<b>;

// Collection fuzzers
export declare function list<a>(elementFuzzer: Fuzzer<a>): Fuzzer<a[]>;
export declare function list_between<a>(elementFuzzer: Fuzzer<a>, min: Int, max: Int): Fuzzer<a[]>;
export declare function set_between<a>(elementFuzzer: Fuzzer<a>, min: Int, max: Int): Fuzzer<a[]>;
export declare function option<a>(elementFuzzer: Fuzzer<a>): Fuzzer<Option<a>>;

// Utility functions
export declare function rand(): Fuzzer<Int>;
export declare function one_of<a>(fuzzers: Fuzzer<a>[]): Fuzzer<a>;
export declare function frequency<a>(weightedFuzzers: { weight: Int; fuzzer: Fuzzer<a> }[]): Fuzzer<a>;

// Additional combinators
export declare function such_that<a>(fuzzer: Fuzzer<a>, predicate: (a: a) => Bool): Fuzzer<a>;
export declare function tuple<a, b>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>): Fuzzer<[a, b]>;
export declare function tuple3<a, b, c>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fuzzerC: Fuzzer<c>): Fuzzer<[a, b, c]>;
export declare function tuple4<a, b, c, d>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fuzzerC: Fuzzer<c>, fuzzerD: Fuzzer<d>): Fuzzer<[a, b, c, d]>;
export declare function tuple5<a, b, c, d, e>(fuzzerA: Fuzzer<a>, fuzzerB: Fuzzer<b>, fuzzerC: Fuzzer<c>, fuzzerD: Fuzzer<d>, fuzzerE: Fuzzer<e>): Fuzzer<[a, b, c, d, e]>;

// Collection utilities
export declare function list_at_least<a>(elementFuzzer: Fuzzer<a>, min: Int): Fuzzer<a[]>;
export declare function list_at_most<a>(elementFuzzer: Fuzzer<a>, max: Int): Fuzzer<a[]>;
export declare function int_at_most(max: Int): Fuzzer<Int>;
export declare function bytearray_at_least(min: Int): Fuzzer<ByteArray>;
export declare function bytearray_at_most(max: Int): Fuzzer<ByteArray>;
