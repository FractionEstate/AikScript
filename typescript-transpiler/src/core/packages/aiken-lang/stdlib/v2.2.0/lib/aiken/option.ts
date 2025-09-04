// Aiken Option Module
// TypeScript declarations for Aiken option operations

// Option Type (already available in TypeScript as T | undefined, but we provide utilities)
export declare type Option<T> = T | undefined;

// Option Inspection Functions
export declare function isNone<T>(option: Option<T>): boolean;
export declare function isSome<T>(option: Option<T>): boolean;

// Option Construction Functions
export declare function some<T>(value: T): Option<T>;
export declare function none<T>(): Option<T>;

// Option Combination Functions
export declare function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U>;
export declare function orElse<T>(option: Option<T>, defaultValue: T): T;
export declare function map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U>;
export declare function filter<T>(option: Option<T>, predicate: (value: T) => boolean): Option<T>;

// Option Utilities
export declare function unwrap<T>(option: Option<T>): T;
export declare function unwrapOr<T>(option: Option<T>, defaultValue: T): T;
export declare function unwrapOrElse<T>(option: Option<T>, fn: () => T): T;

// Option Comparison
export declare function optionEqual<T>(left: Option<T>, right: Option<T>, compare: (a: T, b: T) => boolean): boolean;
