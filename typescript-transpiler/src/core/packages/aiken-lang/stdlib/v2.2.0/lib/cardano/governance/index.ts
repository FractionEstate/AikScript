// Cardano Governance Module
// TypeScript declarations for Cardano governance operations

import { ByteArray } from '@/types/basic/index';
import { Credential } from '../address/index';

// Governance Types
export declare type GovernanceActionId = { transactionId: ByteArray; actionIndex: number };

export declare type Voter = Credential;

export declare type Vote = 'Yes' | 'No' | 'Abstain';

export declare type ProtocolVersion = { major: number; minor: number };

export declare type ProtocolParametersUpdate = {
  minFeeA?: bigint;
  minFeeB?: bigint;
  maxBlockSize?: number;
  maxTxSize?: number;
  maxBhSize?: number;
  keyDeposit?: bigint;
  poolDeposit?: bigint;
  maxEpoch?: number;
  nOpt?: number;
  poolPledgeInfluence?: number;
  expansionRate?: number;
  treasuryGrowthRate?: number;
  d?: number;
  extraEntropy?: ByteArray;
  protocolVersion?: ProtocolVersion;
  minPoolCost?: bigint;
  adaPerUtxoByte?: bigint;
  costModels?: unknown;
  priceMem?: number;
  priceStep?: number;
  maxTxExMem?: bigint;
  maxTxExSteps?: bigint;
  maxBlockExMem?: bigint;
  maxBlockExSteps?: bigint;
  maxValSize?: number;
  collateralPercent?: number;
  maxCollateralInputs?: number;
};

export declare type GovernanceAction =
  | { type: 'ProtocolParameters'; ancestor?: GovernanceActionId; newParameters: ProtocolParametersUpdate; guardrails?: ByteArray }
  | { type: 'HardFork'; ancestor?: GovernanceActionId; newVersion: ProtocolVersion }
  | { type: 'TreasuryWithdrawal'; beneficiaries: Map<Credential, bigint>; guardrails?: ByteArray }
  | { type: 'NoConfidence'; expiredAction?: GovernanceActionId }
  | { type: 'UpdateCommittee'; newMembers: Map<Credential, number>; threshold: number }
  | { type: 'NewConstitution'; newConstitution: { script?: ByteArray; anchor?: unknown } };

export declare type ProposalProcedure = {
  deposit: bigint;
  returnAddress: Credential;
  governanceAction: GovernanceAction;
};

// Submodules
export * as protocolParameters from './protocol_parameters/index';
export * as voter from './voter/index';

// Governance Functions
export declare function governanceActionId(txId: ByteArray, actionIndex: number): GovernanceActionId;
export declare function proposalProcedure(deposit: bigint, returnAddress: Credential, action: GovernanceAction): ProposalProcedure;
