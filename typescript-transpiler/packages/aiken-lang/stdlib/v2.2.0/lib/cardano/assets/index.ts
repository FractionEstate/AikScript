// Cardano Assets Module
// TypeScript declarations for Cardano asset and value operations

import { ByteArray, Int } from '@aikscript/types';

// Asset types
export declare type PolicyId = ByteArray;
export declare type AssetName = ByteArray;
export declare type Lovelace = Int;
export declare type Value = Map<PolicyId, Map<AssetName, bigint>>;

// Constants
export declare const adaPolicyId: PolicyId;
export declare const adaAssetName: AssetName;

// Asset construction and operations
export declare function valueFromAsset(policyId: PolicyId, assetName: AssetName, quantity: Int): Value;
export declare function valueFromAssetList(assets: [PolicyId, AssetName, Int][]): Value;
export declare function valueAdd(left: Value, right: Value): Value;
export declare function valueSubtract(left: Value, right: Value): Value;
export declare function valueGetAsset(value: Value, policyId: PolicyId, assetName: AssetName): Int;
export declare function valueIsZero(value: Value): boolean;
export declare function valueIsPositive(value: Value): boolean;

// ADA/Lovelace specific functions
export declare function ada(lovelace: Lovelace): Value;
export declare function lovelaceToAda(lovelace: Lovelace): number;
export declare function adaToLovelace(ada: number): Lovelace;

// Asset-specific operations
export declare function assetClass(policyId: PolicyId, assetName: AssetName): { policyId: PolicyId; assetName: AssetName };
export declare function valueSetAsset(value: Value, assetClass: { policyId: PolicyId; assetName: AssetName }, quantity: bigint): Value;
export declare function valueMultiply(value: Value, factor: bigint): Value;
