import { Bool, ByteArray, contract, datum, PubKeyHash, ScriptContext, validator } from '../types';

@contract('NFTMinting')
export class NFTMintingContract {
  @datum
  public mintDatum: any = {
    owner: null as any,
    tokenName: null as any,
    metadata: null as any,
  };

  @validator('mint')
  mint(
    datum: { owner: PubKeyHash; tokenName: ByteArray; metadata: ByteArray },
    redeemer: void,
    ctx: ScriptContext
  ): Bool {
    const tx = ctx.transaction;

    return tx.isSignedBy(datum.owner);
  }
}
