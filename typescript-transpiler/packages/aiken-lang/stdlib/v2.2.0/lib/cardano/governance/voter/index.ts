// Cardano Governance Voter Module
// TypeScript declarations for Cardano voter operations

import { ByteArray } from '@aikscript/types';
import { Credential } from '../../address/index';

// Voter Types
export declare type ConstitutionalCommitteeMember = Credential;
export declare type DelegateRepresentative = Credential;
export declare type StakePool = ByteArray;

export declare type Voter =
  | { type: 'ConstitutionalCommitteeMember'; credential: Credential }
  | { type: 'DelegateRepresentative'; credential: Credential }
  | { type: 'StakePool'; poolId: ByteArray };

// Voter Functions
export declare function constitutionalCommitteeMember(credential: Credential): Voter;
export declare function delegateRepresentative(credential: Credential): Voter;
export declare function stakePool(poolId: ByteArray): Voter;
export declare function voterCompare(left: Voter, right: Voter): 'Less' | 'Equal' | 'Greater';
