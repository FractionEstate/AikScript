import { Bool, contract, datum, PubKeyHash, ScriptContext, validator } from '../types';

interface MultiSigDatum {
  requiredSignatures: number;
  signatories: PubKeyHash[];
  transactionHash: string;
}

@contract("MultiSigWallet")
export class MultiSigWalletContract {
  @datum
  public multiSigDatum: MultiSigDatum = {
    requiredSignatures: 0,
    signatories: [],
    transactionHash: ""
  };

  @validator("spend")
  validateTransaction(datum: MultiSigDatum, redeemer: any, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    // Test property access
    return tx.isSignedBy(datum.signatories[0]);
  }
}
