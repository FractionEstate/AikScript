import {
  Bool,
  contract,
  datum,
  Int,
  POSIXTime,
  PubKeyHash,
  ScriptContext,
  validator,
} from '../types';

@contract('TokenVesting')
export class TokenVestingContract {
  @datum
  public vestingDatum: any = {
    beneficiary: null as any,
    totalAmount: null as any,
    releasedAmount: null as any,
    startTime: null as any,
    duration: null as any,
  };

  @validator('spend')
  release(
    datum: {
      beneficiary: PubKeyHash;
      totalAmount: Int;
      releasedAmount: Int;
      startTime: POSIXTime;
      duration: Int;
    },
    redeemer: void,
    ctx: ScriptContext
  ): Bool {
    const tx = ctx.transaction;
    const now = tx.validityRange.start || BigInt(0);

    return tx.isSignedBy(datum.beneficiary) && now >= datum.startTime + datum.duration;
  }
}
