import { ByteArray } from '@/types/basic/index';
export declare type Address = ByteArray;
export declare type PaymentCredential = ByteArray;
export declare type StakeCredential = ByteArray;
export declare function addressFromScript(scriptHash: ByteArray): Address;
export declare function addressFromVerificationKey(pubKeyHash: ByteArray): Address;
export declare function addressWithDelegationKey(address: Address, stakeKeyHash: ByteArray): Address;
export declare function addressWithDelegationScript(address: Address, stakeScriptHash: ByteArray): Address;
//# sourceMappingURL=index.d.ts.map