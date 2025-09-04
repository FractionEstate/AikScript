// Cardano Transaction Output Reference Module
// TypeScript declarations for Cardano transaction output references

import { ByteArray } from '@/types/basic/index';

// Output Reference Types
export declare type OutputReference = {
  transactionId: ByteArray;
  outputIndex: number;
};

// Output Reference Functions
export declare function outputReference(transactionId: ByteArray, outputIndex: number): OutputReference;
export declare function outputReferenceIsEqual(left: OutputReference, right: OutputReference): boolean;
