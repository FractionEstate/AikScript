import { Bool, PubKeyHash, ScriptContext } from '../../src/types';
export declare class TestMultiSigContract {
    [key: string]: unknown;
    lockDatum: {
        owner1: PubKeyHash;
        owner2: PubKeyHash;
    };
    unlock(datum: {
        owner1: PubKeyHash;
        owner2: PubKeyHash;
    }, redeemer: void, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=TestMultiSig.d.ts.map