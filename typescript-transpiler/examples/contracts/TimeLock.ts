import { Bool, contract, datum, POSIXTime, PubKeyHash, ScriptContext, validator } from '../../src/types';

@contract("TimeLock")
export class TimeLockContract {
    [key: string]: unknown; // Add index signature for decorator compatibility

    @datum
    public lockDatum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash } = {
        lockUntil: BigInt(0) as POSIXTime,
        owner: "" as PubKeyHash,
        beneficiary: "" as PubKeyHash
    };

    @validator("spend")
    unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner) ||
            (tx.isSignedBy(datum.beneficiary) && (tx.validityRange.start || BigInt(0)) > datum.lockUntil);
    }
}
