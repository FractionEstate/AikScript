import { Int, Bool } from '../primitive/index';
export declare function listPush<T>(list: T[], elem: T): T[];
export declare function listRange(from: Int, to: Int): Int[];
export declare function listRepeat<T>(elem: T, nTimes: Int): T[];
export declare function listAll<T>(list: T[], predicate: (elem: T) => Bool): Bool;
export declare function listAny<T>(list: T[], predicate: (elem: T) => Bool): Bool;
export declare function listFilter<T>(list: T[], predicate: (elem: T) => Bool): T[];
export declare function listMap<T, U>(list: T[], mapper: (elem: T) => U): U[];
export declare function listLength<T>(list: T[]): Int;
export declare function listHead<T>(list: T[]): T;
export declare function listTail<T>(list: T[]): T[];
export declare function listIsEmpty<T>(list: T[]): Bool;
export declare function listFind<T>(list: T[], predicate: (elem: T) => Bool): T | undefined;
export declare function listCount<T>(list: T[], predicate: (elem: T) => Bool): Int;
//# sourceMappingURL=collection.d.ts.map