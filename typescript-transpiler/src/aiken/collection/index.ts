// Aiken Collection Module
// Functions from aiken-lang/stdlib/lib/aiken/collection/

import { Int, Bool, ByteArray } from '../../types/basic/index';

// List operations
export declare function listPush<T>(list: T[], elem: T): T[];
export declare function listRange(from: Int, to: Int): Int[];
export declare function listRepeat<T>(elem: T, nTimes: Int): T[];
export declare function listAll<T>(list: T[], predicate: (elem: T) => Bool): Bool;
export declare function listAny<T>(list: T[], predicate: (elem: T) => Bool): Bool;

// Dictionary operations
export declare type Dict = unknown;
export declare const dictEmpty: Dict;
export declare function dictInsert(dict: Dict, key: ByteArray, value: unknown): Dict;
export declare function dictGet(dict: Dict, key: ByteArray): unknown;
export declare function dictDelete(dict: Dict, key: ByteArray): Dict;
export declare function dictSize(dict: Dict): Int;

// Re-export from utility for backward compatibility
export {
  listFilter,
  listMap,
  listLength,
  listHead,
  listTail,
  listIsEmpty,
  listFind,
  listCount
} from '../../types/utility/index';
