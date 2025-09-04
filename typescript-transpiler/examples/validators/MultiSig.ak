use ../../src/types

type MultiSigDatum {
requiredSignatures: Int,
signatories: List<PubKeyHash>,
transactionHash: String
}

const tx: unknown = ctx.transaction

validator validateTransaction {
  spend(datum: MultiSigDatum, redeemer: any, ctx: ScriptContext) -> Bool {
    const tx = ctx.transaction;
    // Test property access
    return tx.isSignedBy(datum.signatories[0]);
  }
}
