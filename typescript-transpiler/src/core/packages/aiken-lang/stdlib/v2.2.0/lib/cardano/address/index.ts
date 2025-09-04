// Cardano Address Module
// TypeScript declarations for Cardano address operations

import { ByteArray } from '@/types/basic/index';

// Address types
export declare type Address = ByteArray;
export declare type PaymentCredential = ByteArray;
export declare type StakeCredential = ByteArray;

// Address construction functions
export declare function addressFromScript(scriptHash: ByteArray): Address;
export declare function addressFromVerificationKey(pubKeyHash: ByteArray): Address;
export declare function addressWithDelegationKey(address: Address, stakeKeyHash: ByteArray): Address;
export declare function addressWithDelegationScript(address: Address, stakeScriptHash: ByteArray): Address;
