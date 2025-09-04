// Cardano Certificate Module
// TypeScript declarations for Cardano certificate operations

import { ByteArray } from '@aikscript/types';
import { Credential } from '../address/index';

// Certificate Types
export declare type StakePoolId = ByteArray;

export declare type Delegate = ByteArray; // Simplified for now

export declare type Certificate =
  | { type: 'RegisterCredential'; credential: Credential; deposit?: never }
  | { type: 'UnregisterCredential'; credential: Credential; refund?: never }
  | { type: 'DelegateCredential'; credential: Credential; delegate: Delegate }
  | { type: 'RegisterAndDelegateCredential'; credential: Credential; delegate: Delegate; deposit: bigint }
  | { type: 'RegisterDelegateRepresentative'; delegate_representative: Credential; deposit: bigint }
  | { type: 'UpdateDelegateRepresentative'; delegate_representative: Credential }
  | { type: 'UnregisterDelegateRepresentative'; delegate_representative: Credential; refund: bigint }
  | { type: 'VoteDelegateRepresentative'; delegate_representative: Credential; voter: Credential }
  | { type: 'RegisterStakePool'; stake_pool_id: StakePoolId }
  | { type: 'RetireStakePool'; stake_pool_id: StakePoolId; epoch: number };

// Certificate Functions
export declare function certificateIsRegistration(cert: Certificate): boolean;
export declare function certificateIsDelegation(cert: Certificate): boolean;
export declare function certificateIsStakePool(cert: Certificate): boolean;
export declare function certificateIsDelegateRepresentative(cert: Certificate): boolean;
