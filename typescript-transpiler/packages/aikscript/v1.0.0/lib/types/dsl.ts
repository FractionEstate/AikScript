// @aikscript/types v1.0.0 - DSL Types
// Domain-specific language types for AikScript smart contracts

import { Bool, Int, ByteArray, PubKeyHash, ScriptHash, Datum } from './basic';

// ===== SCRIPT CONTEXT TYPES =====

// Transaction and output types (simplified for AikScript)
export interface Transaction {
  id: ByteArray;
  inputs: TxIn[];
  outputs: TxOut[];
  fee: Int;
  validityRange: ValidityRange;
  isSignedBy: (pubKeyHash: PubKeyHash) => Bool;
}

export interface TxIn {
  txOutRef: TxOutRef;
  redeemer?: unknown;
}

export interface TxOut {
  address: Address;
  value: Value;
  datum?: Datum;
}

export interface TxOutRef {
  txId: ByteArray;
  index: Int;
}

export interface ValidityRange {
  start?: Int;
  end?: Int;
}

export interface Address {
  paymentCredential: Credential;
  stakeCredential?: Credential;
}

export type Credential =
  | { type: 'PubKeyHash'; hash: PubKeyHash }
  | { type: 'ScriptHash'; hash: ScriptHash };

export interface Value {
  // Simplified value representation
  lovelace: Int;
  assets: Map<ByteArray, Map<ByteArray, Int>>;
}

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

// ===== DSL DECORATORS =====

// Import decorator implementations
import { contract as contractImpl, datum as datumImpl, validator as validatorImpl } from './decorators';

// Re-export decorators
export const contract = contractImpl;
export const datum = datumImpl;
export const validator = validatorImpl;
