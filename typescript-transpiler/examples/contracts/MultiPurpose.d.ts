import { Bool, Credential, PolicyId, ScriptContext } from '../../src/types';
export declare class MultiPurposeContract {
    [key: string]: unknown;
    contractDatum: {
        owner: string;
        totalSupply: number;
    };
    spend(datum: {
        owner: string;
        totalSupply: number;
    }, redeemer: void, ctx: ScriptContext): Bool;
    mintToken(_redeemer: {
        amount: number;
    }, _policyId: PolicyId, _ctx: ScriptContext): Bool;
    withdraw(_redeemer: {
        amount: number;
    }, _credential: Credential, _ctx: ScriptContext): Bool;
    publish(): Bool;
}
//# sourceMappingURL=MultiPurpose.d.ts.map