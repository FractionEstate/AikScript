import { Bool, POSIXTime, PubKeyHash, ScriptContext } from '../types';
export declare class TimeLockContract {
    [key: string]: unknown;
    lockDatum: {
        lockUntil: POSIXTime;
        owner: PubKeyHash;
        beneficiary: PubKeyHash;
    };
    unlock(datum: {
        lockUntil: POSIXTime;
        owner: PubKeyHash;
        beneficiary: PubKeyHash;
    }, redeemer: void, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=TimeLock.d.ts.map