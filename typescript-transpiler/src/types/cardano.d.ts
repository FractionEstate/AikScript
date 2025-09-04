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
export interface TxInput {
    transactionId: string;
    outputIndex: number;
    address: Address;
    amount: Value;
    datum?: Datum;
    referenceScript?: Script;
}
export interface TxOutput {
    address: Address;
    amount: Value;
    datum?: Datum;
    referenceScript?: Script;
}
export interface ValidityRange {
    start?: POSIXTime;
    end?: POSIXTime;
}
export interface Transaction {
    inputs: TxInput[];
    outputs: TxOutput[];
    fee: Ada;
    validityRange: ValidityRange;
    signatories: PubKeyHash[];
    mint?: Value;
    collateral?: TxInput[];
    collateralReturn?: TxOutput;
    totalCollateral?: Ada;
    isSignedBy(pubKeyHash: PubKeyHash): Bool;
}
export interface Value {
    ada: Ada;
    assets: Map<PolicyId, Map<AssetName, bigint>>;
}
export type Address = string & {
    __brand: 'Address';
};
export type Credential = PubKeyHash | ScriptHash;
export interface AddressDetails {
    paymentCredential: Credential;
    stakeCredential?: Credential;
}
export interface ScriptContext {
    transaction: Transaction;
    purpose: ScriptPurpose;
    spendingTxOutRef?: TxOutRef;
}
export interface TxOutRef {
    transactionId: string;
    outputIndex: number;
}
export type ScriptPurpose = {
    type: 'spend';
    txOutRef: TxOutRef;
} | {
    type: 'mint';
    policyId: PolicyId;
} | {
    type: 'withdraw';
    stakeCredential: Credential;
} | {
    type: 'publish';
};
export type Datum = any;
export type Redeemer = any;
export type Script = string;
export declare function contract(name: string): (constructor: Function) => void;
export declare function datum(target: any, propertyKey: string): void;
export declare function validator(purpose: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function pubKeyHash(hash: string): PubKeyHash;
export declare function scriptHash(hash: string): ScriptHash;
export declare function ada(amount: bigint): Ada;
export declare function assetName(name: string): AssetName;
export declare function policyId(id: string): PolicyId;
//# sourceMappingURL=cardano.d.ts.map