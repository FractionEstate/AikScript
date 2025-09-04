use ../../src/types

const tx: unknown = ctx.transaction

fn unlock(datum: {
  lockUntil: POSIXTime,
  owner: PubKeyHash,
  beneficiary: PubKeyHash
}, redeemer: void, ctx: ScriptContext) -> Bool
{
let tx = ctx.transaction

        tx.isSignedBy(datum.owner) || (tx.isSignedBy(datum.beneficiary)  &&  (tx.validityRange.start || BigInt(0)) > datum.lockUntil)
}
