import { Int, Bool } from '../basic/index.js';
export type Option<T> = {
    type: 'Some';
    value: T;
} | {
    type: 'None';
};
export declare const Some: <T>(value: T) => Option<T>;
export declare const None: Option<never>;
export interface Rational {
    numerator: Int;
    denominator: Int;
}
export interface Dict<K, V> {
    readonly _keyType: K;
    readonly _valueType: V;
}
export type Ordering = 'Less' | 'Equal' | 'Greater';
export declare function fuzzInt(): Int;
export declare function fuzzByteArray(): Uint8Array;
export declare function fuzzString(): string;
export declare function fuzzBool(): Bool;
export declare function fuzzOption<T>(fuzzer: () => T): Option<T>;
export declare function fuzzList<T>(fuzzer: () => T): T[];
export declare function fuzzLabel(label: string): void;
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
export declare function dictNew<K, V>(): Dict<K, V>;
export declare function dictInsert<K, V>(dict: Dict<K, V>, key: K, value: V): Dict<K, V>;
export declare function dictGet<K, V>(dict: Dict<K, V>, key: K): Option<V>;
export declare function dictDelete<K, V>(dict: Dict<K, V>, key: K): Dict<K, V>;
export declare function dictHasKey<K, V>(dict: Dict<K, V>, key: K): Bool;
export declare function dictSize<K, V>(dict: Dict<K, V>): Int;
export declare function optionMap<T, U>(option: Option<T>, mapper: (value: T) => U): Option<U>;
export declare function optionIsSome<T>(option: Option<T>): Bool;
export declare function optionIsNone<T>(option: Option<T>): Bool;
export declare function optionUnwrap<T>(option: Option<T>): T;
export declare function optionUnwrapOr<T>(option: Option<T>, defaultValue: T): T;
export declare function optionUnwrapOrElse<T>(option: Option<T>, defaultFn: () => T): T;
export declare function rationalFromInt(value: Int): Rational;
export declare function rationalAdd(a: Rational, b: Rational): Rational;
export declare function rationalSubtract(a: Rational, b: Rational): Rational;
export declare function rationalMultiply(a: Rational, b: Rational): Rational;
export declare function rationalDivide(a: Rational, b: Rational): Option<Rational>;
export declare function rationalCompare(a: Rational, b: Rational): Ordering;
export declare function rationalTruncate(rational: Rational): Int;
export declare function rationalCeil(rational: Rational): Int;
export declare function rationalFloor(rational: Rational): Int;
//# sourceMappingURL=index.d.ts.map