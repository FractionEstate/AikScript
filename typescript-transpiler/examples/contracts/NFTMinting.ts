import { Bool, ByteArray, contract, datum, PubKeyHash, ScriptContext, validator } from '@aikscript/types';

@contract("NFTMinting")
export class NFTMintingContract {
    [key: string]: unknown; // Add index signature for decorator compatibility

    @datum
    public mintDatum: { owner: PubKeyHash; tokenName: ByteArray; metadata: ByteArray } = {
        owner: "" as PubKeyHash,
        tokenName: new Uint8Array(),
        metadata: new Uint8Array()
    };

    @validator("mint")
    mint(datum: { owner: PubKeyHash; tokenName: ByteArray; metadata: ByteArray }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner);
    }
}
