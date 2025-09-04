import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from 'aikscript';

@contract("HelloWorld")
export class HelloWorldContract {
  @datum
  public data: any = {
    owner: null as any
  };

  @validator("spend")
  hello(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;
    return tx.isSignedBy(datum.owner);
  }
}
