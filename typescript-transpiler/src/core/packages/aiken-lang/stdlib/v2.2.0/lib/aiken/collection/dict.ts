// Aiken Collection - Dict Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/collection/dict.ak

import { ByteArray, Int } from '@aikscript/types';

// Dictionary type
export declare type Dict = unknown;

// Dict operations
export declare const dictEmpty: Dict;
export declare function dictInsert(dict: Dict, key: ByteArray, value: unknown): Dict;
export declare function dictGet(dict: Dict, key: ByteArray): unknown;
export declare function dictDelete(dict: Dict, key: ByteArray): Dict;
export declare function dictSize(dict: Dict): Int;
export declare function dictHasKey(dict: Dict, key: ByteArray): boolean;
export declare function dictKeys(dict: Dict): ByteArray[];
export declare function dictValues(dict: Dict): unknown[];
export declare function dictFilter(dict: Dict, predicate: (key: ByteArray, value: unknown) => boolean): Dict;
export declare function dictMap(dict: Dict, mapper: (key: ByteArray, value: unknown) => unknown): Dict;
