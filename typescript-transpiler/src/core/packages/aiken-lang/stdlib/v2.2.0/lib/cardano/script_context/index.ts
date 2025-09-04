// Cardano Script Context Module
// TypeScript declarations for Cardano script context operations

import { ByteArray } from '@/types/basic/index';
import { Credential } from '../address/index';
import { PolicyId } from '../assets/index';
import { Certificate } from '../certificate/index';
import { ProposalProcedure, Voter } from '../governance/index';

// Script Context Types
export declare type Redeemer = unknown; // Simplified for now

export declare type ScriptInfo =
  | { type: 'Minting'; policyId: PolicyId }
  | { type: 'Spending'; output: { transactionId: ByteArray; outputIndex: number }; datum?: unknown }
  | { type: 'Withdrawing'; credential: Credential }
  | { type: 'Publishing'; certificate: Certificate }
  | { type: 'Voting'; voter: Voter; governanceActionId: { transactionId: ByteArray; actionIndex: number } }
  | { type: 'Proposing'; proposal: ProposalProcedure };

export declare type ScriptContext = {
  transaction: unknown; // Would be Transaction type, but avoiding circular dependency
  redeemer: Redeemer;
  info: ScriptInfo;
};

// Script Context Functions
export declare function scriptContext(transaction: unknown, redeemer: Redeemer, info: ScriptInfo): ScriptContext;
export declare function scriptInfoIsMinting(info: ScriptInfo): info is { type: 'Minting'; policyId: PolicyId };
export declare function scriptInfoIsSpending(info: ScriptInfo): info is { type: 'Spending'; output: { transactionId: ByteArray; outputIndex: number }; datum?: unknown };
export declare function scriptInfoIsWithdrawing(info: ScriptInfo): info is { type: 'Withdrawing'; credential: Credential };
export declare function scriptInfoIsPublishing(info: ScriptInfo): info is { type: 'Publishing'; certificate: Certificate };
export declare function scriptInfoIsVoting(info: ScriptInfo): info is { type: 'Voting'; voter: Voter; governanceActionId: { transactionId: ByteArray; actionIndex: number } };
export declare function scriptInfoIsProposing(info: ScriptInfo): info is { type: 'Proposing'; proposal: ProposalProcedure };
