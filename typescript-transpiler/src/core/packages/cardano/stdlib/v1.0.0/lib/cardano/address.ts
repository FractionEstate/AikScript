// Cardano Address Module
// TypeScript declarations for cardano stdlib address functions

// Basic types (imported from aiken stdlib)
type ByteArray = Uint8Array;

// Address types
export declare type Address = ByteArray;
export declare type PaymentCredential = { verification_key: ByteArray } | { script: ByteArray };
export declare type StakeCredential = { verification_key: ByteArray } | { script: ByteArray };

// Address construction functions
export declare function fromVerificationKey(vkey: ByteArray): Address;
export declare function fromScript(script: ByteArray): Address;
export declare function withDelegationKey(address: Address, stakeVkey: ByteArray): Address;
export declare function withDelegationScript(address: Address, stakeScript: ByteArray): Address;
