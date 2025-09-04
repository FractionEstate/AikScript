import { Bool, contract, Credential, datum, PolicyId, validator } from '../../src/types';

@contract("MultiPurpose")
export class MultiPurposeContract {
  @datum
  public contractDatum: any = {
    owner: null as any,
    totalSupply: null as any
  };

  @validator("spend")
  spend(datum: { owner: string; totalSupply: number }, redeemer: void, ctx: any): Bool {
    return true;
  }

  @validator("mint")
  mintToken(redeemer: { amount: number }, policyId: PolicyId, ctx: any): Bool {
    return true;
  }

  @validator("withdraw")
  withdraw(redeemer: { amount: number }, credential: Credential, ctx: any): Bool {
    return true;
  }

  @validator("publish")
  publish(): Bool {
    return true;
  }
}
