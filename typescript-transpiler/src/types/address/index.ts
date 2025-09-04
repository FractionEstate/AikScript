// Address and credential type definitions for AikScript
// Following aiken-lang patterns for modular organization

import { PubKeyHash, ScriptHash } from '../basic/index';

// Address types
export type Address = string & { __brand: 'Address' };
export type Credential = VerificationKeyCredential | ScriptCredential;

export interface AddressDetails {
  paymentCredential: Credential;
  stakeCredential?: Credential;
}

// Credential types
export interface VerificationKeyCredential {
  __brand: 'VerificationKeyCredential';
  hash: PubKeyHash;
}

export interface ScriptCredential {
  __brand: 'ScriptCredential';
  hash: ScriptHash;
}
