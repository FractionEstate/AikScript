use ../../src/types

const tx: unknown = ctx.transaction

validator unlock {
  spend(datum: {
  lockUntil: POSIXTime,
  owner: PubKeyHash,
  beneficiary: PubKeyHash
}, redeemer: void, ctx: ScriptContext) -> Bool {
    const tx = ctx.transaction;

        return tx.isSignedBy(datum.owner) ||
            (tx.isSignedBy(datum.beneficiary) && (tx.validityRange.start || BigInt(0)) > datum.lockUntil);
  }
}
