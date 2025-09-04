import { Bool, contract, datum, POSIXTime, PubKeyHash, ScriptContext, validator } from 'aikscript';

@contract("TimeLock")
export class TimeLockContract {
    @datum
    public lockDatum: any = {
        lockUntil: null as any,
        owner: null as any,
        beneficiary: null as any
    };

    @validator("spend")
    unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner) ||
            (tx.isSignedBy(datum.beneficiary) && (tx.validityRange.start || BigInt(0)) > datum.lockUntil);
    }
}
