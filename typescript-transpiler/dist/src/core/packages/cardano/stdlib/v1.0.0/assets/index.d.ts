import { ByteArray, Int } from '@/types/basic/index';
export declare type PolicyId = ByteArray;
export declare type AssetName = ByteArray;
export declare type Lovelace = Int;
export declare type Value = unknown;
export declare function valueFromAsset(policyId: PolicyId, assetName: AssetName, quantity: Int): Value;
export declare function valueFromAssetList(assets: [PolicyId, AssetName, Int][]): Value;
export declare function valueAdd(left: Value, right: Value): Value;
export declare function valueSubtract(left: Value, right: Value): Value;
export declare function valueGetAsset(value: Value, policyId: PolicyId, assetName: AssetName): Int;
export declare function valueIsZero(value: Value): boolean;
//# sourceMappingURL=index.d.ts.map