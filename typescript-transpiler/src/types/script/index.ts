// Script context and purpose type definitions for AikScript
// Following aiken-lang patterns for modular organization

import { Transaction, TxOutRef } from '../transaction/index';
import { Credential } from '../address/index';

// Script context
export interface ScriptContext {
  transaction: Transaction;
  purpose: ScriptPurpose;
  spendingTxOutRef?: TxOutRef;
}

// Script purposes
export type ScriptPurpose =
  | { type: 'spend'; txOutRef: TxOutRef }
  | { type: 'mint'; policyId: string }
  | { type: 'withdraw'; stakeCredential: Credential }
  | { type: 'publish' };
