// Aiken Interval Module
// TypeScript declarations for Aiken interval operations

// Interval Types
export declare type IntervalBoundType<T> =
  | { type: 'Finite'; value: T }
  | { type: 'NegativeInfinity' }
  | { type: 'PositiveInfinity' };

export declare type IntervalBound<T> = {
  boundType: IntervalBoundType<T>;
  isInclusive: boolean;
};

export declare type Interval<T> = {
  lowerBound: IntervalBound<T>;
  upperBound: IntervalBound<T>;
};

// Interval Construction Functions
export declare function interval<T>(lowerBound: IntervalBound<T>, upperBound: IntervalBound<T>): Interval<T>;
export declare function finiteBound<T>(value: T, isInclusive: boolean): IntervalBound<T>;
export declare function negativeInfinityBound<T>(isInclusive: boolean): IntervalBound<T>;
export declare function positiveInfinityBound<T>(isInclusive: boolean): IntervalBound<T>;

// Interval Operations
export declare function intervalContains<T>(interval: Interval<T>, value: T): boolean;
export declare function intervalIsEmpty<T>(interval: Interval<T>): boolean;
export declare function intervalOverlaps<T>(left: Interval<T>, right: Interval<T>): boolean;
export declare function intervalUnion<T>(left: Interval<T>, right: Interval<T>): Interval<T>;
export declare function intervalIntersection<T>(left: Interval<T>, right: Interval<T>): Interval<T>;

// Common Intervals
export declare function intervalAlways<T>(): Interval<T>;
export declare function intervalNever<T>(): Interval<T>;
export declare function intervalFrom<T>(value: T): Interval<T>;
export declare function intervalUpTo<T>(value: T): Interval<T>;
