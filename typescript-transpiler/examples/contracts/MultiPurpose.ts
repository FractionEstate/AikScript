import { Bool, contract, Credential, datum, PolicyId, validator, ScriptContext } from '@aikscript/types';

@contract("MultiPurpose")
export class MultiPurposeContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public contractDatum: { owner: string; totalSupply: number } = {
    owner: "",
    totalSupply: 0
  };

  @validator("spend")
  spend(datum: { owner: string; totalSupply: number }, redeemer: void, ctx: ScriptContext): Bool {
    return true;
  }

  @validator("mint")
  mintToken(_redeemer: { amount: number }, _policyId: PolicyId, _ctx: ScriptContext): Bool {
    return true;
  }

  @validator("withdraw")
  withdraw(_redeemer: { amount: number }, _credential: Credential, _ctx: ScriptContext): Bool {
    return true;
  }

  @validator("publish")
  publish(): Bool {
    return true;
  }
}
