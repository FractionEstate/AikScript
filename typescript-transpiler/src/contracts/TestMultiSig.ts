import { Bool, contract, datum, PubKeyHash, ScriptContext, validator } from '../types';

@contract("TestMultiSig")
export class TestMultiSigContract {
    @datum
    public lockDatum: any = {
        owner1: null as any,
        owner2: null as any
    };

    @validator("spend")
    unlock(datum: { owner1: PubKeyHash; owner2: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner1) && tx.isSignedBy(datum.owner2);
    }
}
