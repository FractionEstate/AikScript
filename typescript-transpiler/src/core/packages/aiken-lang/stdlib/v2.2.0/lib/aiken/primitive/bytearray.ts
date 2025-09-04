// Aiken Primitive - ByteArray Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/primitive/bytearray.ak

import { Int, Bool } from './index';

// ByteArray operations
export declare function bytearrayFromIntBigEndian(value: Int): Uint8Array;
export declare function bytearrayFromIntLittleEndian(value: Int): Uint8Array;
export declare function bytearrayFromString(str: string): Uint8Array;
export declare function bytearrayToIntBigEndian(bytes: Uint8Array): Int;
export declare function bytearrayToIntLittleEndian(bytes: Uint8Array): Int;
export declare function bytearrayToString(bytes: Uint8Array): string;
export declare function bytearrayToHex(bytes: Uint8Array): string;
export declare function bytearrayLength(bytes: Uint8Array): Int;
export declare function bytearrayIsEmpty(bytes: Uint8Array): Bool;
export declare function bytearrayAt(bytes: Uint8Array, index: Int): number;
export declare function bytearrayPush(bytes: Uint8Array, byte: number): Uint8Array;
export declare function bytearrayConcat(left: Uint8Array, right: Uint8Array): Uint8Array;
export declare function bytearraySlice(bytes: Uint8Array, start: Int, end: Int): Uint8Array;
export declare function bytearrayTake(bytes: Uint8Array, count: Int): Uint8Array;
export declare function bytearrayDrop(bytes: Uint8Array, count: Int): Uint8Array;
export declare function bytearrayCompare(left: Uint8Array, right: Uint8Array): Int;
export declare function bytearrayStartsWith(bytes: Uint8Array, prefix: Uint8Array): Bool;
export declare function bytearrayIndexOf(bytes: Uint8Array, search: Uint8Array): Int;
export declare function bytearrayTestBit(bytes: Uint8Array, index: Int): Bool;
