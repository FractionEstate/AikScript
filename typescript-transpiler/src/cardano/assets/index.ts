// Cardano Assets Module
// Functions from aiken-lang/stdlib/lib/cardano/assets/

import { ByteArray, Int } from '../../types/basic/index';

// Asset types
export declare type Lovelace = Int;
export declare type PolicyId = ByteArray;
export declare type AssetName = ByteArray;

export declare const ada_policy_id: PolicyId;
export declare const ada_asset_name: AssetName;

// Value type for multi-asset support
export declare type Value = unknown; // Opaque type in Aiken

// Value construction
export declare function fromAsset(policyId: PolicyId, assetName: AssetName, quantity: Int): Value;
export declare function fromAssetList(assets: Array<{ policyId: PolicyId; assets: Array<{ name: AssetName; quantity: Int }> }>): Value;

export declare const zero: Value;

// Value operations
export declare function add(a: Value, b: Value): Value;
export declare function subtract(a: Value, b: Value): Value;
export declare function getAsset(value: Value, policyId: PolicyId, assetName: AssetName): Int;
export declare function isZero(value: Value): boolean;

// Re-export types
export type { Int } from '../../types/basic/index';
