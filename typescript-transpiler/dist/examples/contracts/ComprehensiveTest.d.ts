import { Bool, ByteArray, ScriptContext } from '../../src/types';
export declare class ComprehensiveTestContract {
    [key: string]: unknown;
    testDatum: {
        data: ByteArray;
        key: ByteArray;
        value: ByteArray;
        root: ByteArray;
        scriptHash: ByteArray;
        vkHash: ByteArray;
    };
    testAllFunctions(datum: typeof this.testDatum, redeemer: unknown, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=ComprehensiveTest.d.ts.map