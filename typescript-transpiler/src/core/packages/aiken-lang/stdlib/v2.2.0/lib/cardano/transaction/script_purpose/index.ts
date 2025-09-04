// Cardano Transaction Script Purpose Module
// TypeScript declarations for Cardano transaction script purposes

import { ByteArray } from '@/types/basic/index';

// Script Purpose Types
export declare type ScriptPurpose =
  | { type: 'Mint'; policyId: ByteArray }
  | { type: 'Spend'; outputReference: { transactionId: ByteArray; outputIndex: number } }
  | { type: 'Withdraw'; credential: ByteArray }
  | { type: 'Publish'; certificate: unknown }
  | { type: 'Vote'; voter: unknown; governanceActionId: { transactionId: ByteArray; actionIndex: number } }
  | { type: 'Propose'; proposal: unknown };

// Script Purpose Functions
export declare function scriptPurposeMint(policyId: ByteArray): ScriptPurpose;
export declare function scriptPurposeSpend(outputReference: { transactionId: ByteArray; outputIndex: number }): ScriptPurpose;
export declare function scriptPurposeWithdraw(credential: ByteArray): ScriptPurpose;
export declare function scriptPurposePublish(certificate: unknown): ScriptPurpose;
export declare function scriptPurposeVote(voter: unknown, governanceActionId: { transactionId: ByteArray; actionIndex: number }): ScriptPurpose;
export declare function scriptPurposePropose(proposal: unknown): ScriptPurpose;
