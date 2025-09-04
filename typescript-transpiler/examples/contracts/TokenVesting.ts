import { Bool, contract, datum, Int, POSIXTime, PubKeyHash, ScriptContext, validator } from '@aikscript/types';

@contract("TokenVesting")
export class TokenVestingContract {
    [key: string]: unknown; // Add index signature for decorator compatibility

    @datum
    public vestingDatum: { beneficiary: PubKeyHash; totalAmount: Int; releasedAmount: Int; startTime: POSIXTime; duration: Int } = {
        beneficiary: "" as PubKeyHash,
        totalAmount: BigInt(0),
        releasedAmount: BigInt(0),
        startTime: BigInt(0) as POSIXTime,
        duration: BigInt(0)
    };

    @validator("spend")
    release(datum: { beneficiary: PubKeyHash; totalAmount: Int; releasedAmount: Int; startTime: POSIXTime; duration: Int }, redeemer: void, ctx: ScriptContext): Bool {
        const tx = ctx.transaction;
        const now = tx.validityRange.start || BigInt(0);

        return tx.isSignedBy(datum.beneficiary) && now >= (datum.startTime + datum.duration);
    }
}
