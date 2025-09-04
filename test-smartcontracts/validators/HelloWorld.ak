use aikscript

const tx: unknown = ctx.transaction

validator hello {
  spend(datum: {
  owner: PubKeyHash
}, redeemer: void, ctx: ScriptContext) -> Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
