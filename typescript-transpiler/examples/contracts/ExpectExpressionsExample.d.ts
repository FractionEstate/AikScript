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
export declare function safeUnwrap<T>(option: Option<T>): T;
export declare function getUserName(user: Option<string>): string;
export declare function processResult<T>(result: Result<T, string>): T;
export declare function testSafeUnwrap(): boolean;
export declare function testGetUserName(): boolean;
//# sourceMappingURL=ExpectExpressionsExample.d.ts.map