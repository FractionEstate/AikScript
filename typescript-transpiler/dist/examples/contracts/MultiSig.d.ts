import { Bool, PubKeyHash, ScriptContext } from '../../src/types';
interface MultiSigDatum {
    requiredSignatures: number;
    signatories: PubKeyHash[];
    transactionHash: string;
}
export declare class MultiSigWalletContract {
    [key: string]: unknown;
    multiSigDatum: MultiSigDatum;
    validateTransaction(datum: MultiSigDatum, redeemer: unknown, ctx: ScriptContext): Bool;
}
export {};
//# sourceMappingURL=MultiSig.d.ts.map