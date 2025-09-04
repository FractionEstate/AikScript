// Cardano Governance Protocol Parameters Module
// TypeScript declarations for Cardano protocol parameters

import { ByteArray } from '@/types/basic/index';

// Protocol Parameters Types
export declare type Rational = { numerator: bigint; denominator: bigint };

export declare type ScriptExecutionPrices = {
  memory: Rational;
  cpu: Rational;
};

export declare type ExecutionUnits = {
  memory: bigint;
  cpu: bigint;
};

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
  poolPledgeInfluence?: Rational;
  expansionRate?: Rational;
  treasuryGrowthRate?: Rational;
  d?: Rational;
  extraEntropy?: ByteArray;
  protocolVersion?: { major: number; minor: number };
  minPoolCost?: bigint;
  adaPerUtxoByte?: bigint;
  costModels?: unknown;
  priceMem?: Rational;
  priceStep?: Rational;
  maxTxExMem?: bigint;
  maxTxExSteps?: bigint;
  maxBlockExMem?: bigint;
  maxBlockExSteps?: bigint;
  maxValSize?: number;
  collateralPercent?: Rational;
  maxCollateralInputs?: number;
  plutusCostModels?: unknown;
  moveInstantaneousRewardsInSafeZone?: boolean;
};

// Protocol Parameters Functions
export declare function protocolParametersUpdate(): ProtocolParametersUpdate;
export declare function scriptExecutionPrices(memory: Rational, cpu: Rational): ScriptExecutionPrices;
export declare function executionUnits(memory: bigint, cpu: bigint): ExecutionUnits;
