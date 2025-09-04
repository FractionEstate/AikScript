import { ByteArray, Int, Bool } from '@/types/basic/index';
export declare type TransactionId = ByteArray;
export declare type Transaction = {
    id: TransactionId;
    inputs: Input[];
    outputs: Output[];
    validityRange: ValidityRange;
    fee: Lovelace;
    mint: Value;
    certificates: Certificate[];
    withdrawals: Withdrawal[];
    metadata: Metadata;
};
export declare type Input = {
    transactionId: TransactionId;
    outputIndex: Int;
};
export declare type Output = {
    address: Address;
    value: Value;
    datum: Datum;
};
export declare type ValidityRange = {
    start: POSIXTime;
    end: POSIXTime;
};
export declare type Certificate = unknown;
export declare type Withdrawal = unknown;
export declare type Metadata = unknown;
export declare type Datum = unknown;
export declare type Address = ByteArray;
export declare type Value = unknown;
export declare type Lovelace = Int;
export declare type POSIXTime = Int;
export declare function transactionIsSignedBy(tx: Transaction, pubKeyHash: ByteArray): Bool;
//# sourceMappingURL=index.d.ts.map