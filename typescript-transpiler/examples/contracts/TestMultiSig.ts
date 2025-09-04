import { Bool, contract, datum, PubKeyHash, ScriptContext, validator } from '@aikscript/types';

@contract("TestMultiSig")
export class TestMultiSigContract {
    [key: string]: unknown; // Add index signature for decorator compatibility

    @datum
    public lockDatum: { owner1: PubKeyHash; owner2: PubKeyHash } = {
        owner1: "" as PubKeyHash,
        owner2: "" as PubKeyHash
    };

    @validator("spend")
    unlock(datum: { owner1: PubKeyHash; owner2: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner1) && tx.isSignedBy(datum.owner2);
    }
}
