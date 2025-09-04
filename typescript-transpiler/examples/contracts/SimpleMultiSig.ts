import { Bool, contract, datum, PubKeyHash, ScriptContext, validator } from '../../src/types';

@contract("SimpleMultiSig")
export class SimpleMultiSigContract {
    [key: string]: unknown; // Add index signature for decorator compatibility

    @datum
    public datum: { owner1: PubKeyHash; owner2: PubKeyHash } = {
        owner1: "" as PubKeyHash,
        owner2: "" as PubKeyHash
    };

    @validator("spend")
    spend(datum: { owner1: PubKeyHash; owner2: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner1) && tx.isSignedBy(datum.owner2);
    }
}
