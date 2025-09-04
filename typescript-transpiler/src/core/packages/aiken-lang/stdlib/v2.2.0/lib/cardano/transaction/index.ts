// Cardano Transaction Module
// TypeScript declarations for Cardano transaction types

import { ByteArray } from '@/types/basic/index';
import { Address } from '../address/index';
import { Value } from '../assets/index';

// Transaction Types
export declare type TransactionId = ByteArray;
export declare type OutputReference = { transactionId: TransactionId; outputIndex: number };
export declare type TxIn = OutputReference;
export declare type TxOut = { address: Address; value: Value; datum?: unknown; referenceScript?: ByteArray };

// Script Purpose Types
export declare type ScriptPurpose =
  | { type: 'Mint'; policyId: ByteArray }
  | { type: 'Spend'; outputReference: OutputReference }
  | { type: 'Withdraw'; credential: ByteArray }
  | { type: 'Publish'; certificate: unknown }
  | { type: 'Vote'; voter: unknown; governanceActionId: { transactionId: ByteArray; actionIndex: number } }
  | { type: 'Propose'; proposal: unknown };

// Submodules
export * as outputReferenceModule from './output_reference/index';
export * as scriptPurposeModule from './script_purpose/index';

// Transaction Functions
export declare function outputReference(transactionId: TransactionId, outputIndex: number): OutputReference;
export declare function txIn(outputReference: OutputReference): TxIn;
export declare function txOut(address: Address, value: Value, datum?: unknown, referenceScript?: ByteArray): TxOut;

// Transaction Validation
export declare function outputReferenceIsEqual(left: OutputReference, right: OutputReference): boolean;
