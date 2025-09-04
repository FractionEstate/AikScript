// Aiken Collection - Pairs Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/collection/pairs.ak

import { ByteArray } from '@aikscript/types';

// Pairs operations
export declare function pairsGetAll<T>(pairs: [ByteArray, T][], key: ByteArray): T[];
export declare function pairsGetFirst<T>(pairs: [ByteArray, T][], key: ByteArray): T | undefined;
export declare function pairsGetLast<T>(pairs: [ByteArray, T][], key: ByteArray): T | undefined;
export declare function pairsFindAll<T>(pairs: [ByteArray, T][], predicate: (key: ByteArray, value: T) => boolean): [ByteArray, T][];
export declare function pairsFindFirst<T>(pairs: [ByteArray, T][], predicate: (key: ByteArray, value: T) => boolean): [ByteArray, T] | undefined;
export declare function pairsFindLast<T>(pairs: [ByteArray, T][], predicate: (key: ByteArray, value: T) => boolean): [ByteArray, T] | undefined;
export declare function pairsHasKey<T>(pairs: [ByteArray, T][], key: ByteArray): boolean;
export declare function pairsKeys<T>(pairs: [ByteArray, T][]): ByteArray[];
export declare function pairsValues<T>(pairs: [ByteArray, T][]): T[];
export declare function pairsDeleteAll<T>(pairs: [ByteArray, T][], key: ByteArray): [ByteArray, T][];
export declare function pairsDeleteFirst<T>(pairs: [ByteArray, T][], key: ByteArray): [ByteArray, T][];
export declare function pairsDeleteLast<T>(pairs: [ByteArray, T][], key: ByteArray): [ByteArray, T][];
export declare function pairsInsertByAscendingKey<T>(pairs: [ByteArray, T][], key: ByteArray, value: T): [ByteArray, T][];
export declare function pairsMap<T, U>(pairs: [ByteArray, T][], mapper: (key: ByteArray, value: T) => U): [ByteArray, U][];
export declare function pairsFoldl<T, U>(pairs: [ByteArray, T][], initial: U, reducer: (acc: U, key: ByteArray, value: T) => U): U;
export declare function pairsFoldr<T, U>(pairs: [ByteArray, T][], initial: U, reducer: (acc: U, key: ByteArray, value: T) => U): U;
