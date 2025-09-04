// Cardano Address Module
// TypeScript declarations for Cardano address operations

import { ByteArray } from '@/types/basic/index';

// Address types
export declare type Address = ByteArray;
export declare type Credential = { verificationKeyHash: ByteArray } | { scriptHash: ByteArray };
export declare type PaymentCredential = Credential;
export declare type StakeCredential = Credential;

// Submodules
export * as credential from './credential/index';

// Address construction functions
export declare function addressFromCredential(paymentCredential: Credential, stakeCredential?: StakeCredential): Address;
export declare function addressFromScript(scriptHash: ByteArray, stakeCredential?: StakeCredential): Address;
export declare function addressFromVerificationKey(pubKeyHash: ByteArray, stakeCredential?: StakeCredential): Address;

// Address validation functions
export declare function addressIsScript(address: Address): boolean;
export declare function addressIsVerificationKey(address: Address): boolean;

// Address extraction functions
export declare function addressPaymentCredential(address: Address): Credential;
export declare function addressStakeCredential(address: Address): StakeCredential | undefined;

// Credential functions
export declare function credentialFromScript(scriptHash: ByteArray): Credential;
export declare function credentialFromVerificationKey(pubKeyHash: ByteArray): Credential;
