import { Bool, PubKeyHash, ScriptContext } from '../types';
export declare class SimpleMultiSigContract {
    [key: string]: unknown;
    datum: {
        owner1: PubKeyHash;
        owner2: PubKeyHash;
    };
    spend(datum: {
        owner1: PubKeyHash;
        owner2: PubKeyHash;
    }, redeemer: void, ctx: ScriptContext): Bool;
}
//# sourceMappingURL=SimpleMultiSig.d.ts.map