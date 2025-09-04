import { Bool, Int, POSIXTime, PubKeyHash, ScriptContext } from '../../src/types';
export declare class TokenVestingContract {
    [key: string]: unknown;
    vestingDatum: {
        beneficiary: PubKeyHash;
        totalAmount: Int;
        releasedAmount: Int;
        startTime: POSIXTime;
        duration: Int;
    };
    release(datum: {
        beneficiary: PubKeyHash;
        totalAmount: Int;
        releasedAmount: Int;
        startTime: POSIXTime;
        duration: Int;
    }, redeemer: void, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=TokenVesting.d.ts.map