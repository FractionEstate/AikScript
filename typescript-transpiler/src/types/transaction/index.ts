// Transaction-related type definitions for AikScript
// Following aiken-lang patterns for modular organization

import { Ada, PubKeyHash, Bool, POSIXTime, Datum, Script } from '../basic/index';
import { Address } from '../address/index';
import { Value } from '../value/index';

// Transaction input/output types
export interface TxInput {
  transactionId: string;
  outputIndex: number;
  address: Address;
  amount: Value;
  datum?: Datum;
  referenceScript?: Script;
}

export interface TxOutput {
  address: Address;
  amount: Value;
  datum?: Datum;
  referenceScript?: Script;
}

export interface ValidityRange {
  start?: POSIXTime;
  end?: POSIXTime;
}

export interface Transaction {
  inputs: TxInput[];
  outputs: TxOutput[];
  fee: Ada;
  validityRange: ValidityRange;
  signatories: PubKeyHash[];
  mint?: Value;
  collateral?: TxInput[];
  collateralReturn?: TxOutput;
  totalCollateral?: Ada;
  isSignedBy(pubKeyHash: PubKeyHash): Bool;
}

// Transaction ID and output reference types
export interface TransactionId {
  __brand: 'TransactionId';
  value: Uint8Array;
}

export interface OutputReference {
  transactionId: TransactionId;
  outputIndex: bigint;
}

export interface TxOutRef {
  transactionId: string;
  outputIndex: number;
}
