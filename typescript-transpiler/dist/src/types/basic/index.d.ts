export type POSIXTime = bigint;
export type PubKeyHash = string & {
    __brand: 'PubKeyHash';
};
export type ScriptHash = string & {
    __brand: 'ScriptHash';
};
export type AssetName = string & {
    __brand: 'AssetName';
};
export type PolicyId = string & {
    __brand: 'PolicyId';
};
export type Ada = bigint & {
    __brand: 'Ada';
};
export type Percentage = number & {
    __brand: 'Percentage';
};
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type Void = undefined;
export type String = string;
export type Data = Int | ByteArray | Data[] | Map<Data, Data> | ConstrData;
export type Datum = unknown;
export type Redeemer = unknown;
export type Script = string;
export interface ConstrData {
    tag: Int;
    fields: Data[];
}
export declare function pubKeyHash(hash: string): PubKeyHash;
export declare function scriptHash(hash: string): ScriptHash;
export declare function ada(amount: bigint): Ada;
export declare function assetName(name: string): AssetName;
export declare function policyId(id: string): PolicyId;
//# sourceMappingURL=index.d.ts.map