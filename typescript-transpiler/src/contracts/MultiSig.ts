import { Bool, contract, datum, PubKeyHash, ScriptContext, validator } from '../types';

interface MultiSigDatum {
  requiredSignatures: number;
  signatories: PubKeyHash[];
  transactionHash: string;
}

@contract('MultiSigWallet')
export class MultiSigWalletContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public multiSigDatum: MultiSigDatum = {
    requiredSignatures: 0,
    signatories: [],
    transactionHash: '',
  };

  @validator('spend')
  validateTransaction(datum: MultiSigDatum, redeemer: unknown, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    // Test property access
    return tx.isSignedBy(datum.signatories[0]);
  }
}
