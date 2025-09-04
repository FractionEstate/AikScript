import { Bool, ByteArray, ScriptContext } from "../../src/types";
export declare class MerkleTestContract {
    [key: string]: unknown;
    testDatum: {
        root: ByteArray;
        data: ByteArray;
    };
    testMerkleFunctions(datum: {
        root: ByteArray;
        data: ByteArray;
    }, redeemer: unknown, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=MerkleTest.d.ts.map