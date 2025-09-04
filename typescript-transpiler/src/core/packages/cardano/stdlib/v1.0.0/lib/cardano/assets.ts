// Cardano Assets Module
// TypeScript declarations for cardano stdlib asset functions

// Basic types
type ByteArray = Uint8Array;
type Int = bigint;

// Asset types
export declare type Lovelace = Int;
export declare type PolicyId = ByteArray;
export declare type AssetName = ByteArray;
export declare type Value = Map<PolicyId, Map<AssetName, Int>>;

// Asset operations
export declare function fromAsset(policyId: PolicyId, assetName: AssetName, amount: Int): Value;
export declare function fromAssetList(assets: [PolicyId, AssetName, Int][]): Value;
export declare function add(left: Value, right: Value): Value;
export declare function subtract(left: Value, right: Value): Value;
export declare function getAsset(value: Value, policyId: PolicyId, assetName: AssetName): Int;
export declare function isZero(value: Value): boolean;
