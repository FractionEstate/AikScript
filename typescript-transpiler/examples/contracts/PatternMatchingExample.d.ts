export type Result<T, E> = {
    Ok: T;
} | {
    Error: E;
};
export type Option<T> = {
    Some: T;
} | {
    None: {};
};
export declare function processResult<T, E>(result: Result<T, E>): string;
export declare function handleOption<T>(option: Option<T>): T | null;
export declare function matchNumber(n: number): string;
export declare function matchList<T>(list: T[]): string;
export declare function testProcessResult(): boolean;
export declare function testHandleOption(): boolean;
export declare function testMatchNumber(): boolean;
//# sourceMappingURL=PatternMatchingExample.d.ts.map