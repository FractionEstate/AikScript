import { Bool, ByteArray, ScriptContext } from '../../src/types';
export declare class ScopedImportsExampleContract {
    [key: string]: unknown;
    exampleDatum: {
        data: ByteArray;
        key: ByteArray;
        value: ByteArray;
        root: ByteArray;
    };
    testScopedImports(datum: typeof this.exampleDatum, redeemer: unknown, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=ScopedImportsExample.d.ts.map