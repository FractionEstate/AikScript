// Transaction types for AikScript
// Following aiken-lang patterns for modular organization

import { ByteArray, PubKeyHash } from '../basic/index';

export interface Transaction {
  id: ByteArray;
  inputs: TxIn[];
  outputs: TxOut[];
  fee: bigint;
  validityRange: { start?: bigint; end?: bigint };
  signatories: PubKeyHash[];
  // Add other transaction fields as needed
  isSignedBy(pubKeyHash: PubKeyHash): boolean;
}

export interface TxIn {
  txId: ByteArray;
  outputIndex: number;
}

export interface TxOut {
  address: ByteArray;
  value: unknown; // TODO: Use proper Value type from cardano package
  datum?: unknown;
}

export interface TxOutRef {
  txId: ByteArray;
  outputIndex: number;
}
