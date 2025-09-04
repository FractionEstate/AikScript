import { Bool, PubKeyHash, ScriptContext } from '../../src/types';
export declare class BuiltinTestContract {
    [key: string]: unknown;
    testDatum: {
        owner: PubKeyHash;
        amount: bigint;
        data: unknown;
    };
    spend(datum: {
        owner: PubKeyHash;
        amount: bigint;
        data: unknown;
    }, redeemer: void, ctx: ScriptContext): Bool;
    mint(redeemer: void, policyId: unknown, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=BuiltinTest.d.ts.map