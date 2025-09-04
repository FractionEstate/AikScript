// Cardano Address Module
// Functions from aiken-lang/stdlib/lib/cardano/address/

import { ByteArray } from '../../types/basic/index';

// Address types
export declare type Address = {
  payment_credential: PaymentCredential;
  stake_credential?: StakeCredential;
};

export declare type PaymentCredential = Credential;
export declare type StakeCredential = Referenced<Credential>;

export declare type Credential =
  | { VerificationKey: VerificationKeyHash }
  | { Script: ScriptHash };

export declare type VerificationKeyHash = ByteArray;
export declare type ScriptHash = ByteArray;
export declare type VerificationKey = ByteArray;
export declare type Script = ByteArray;

export declare type Referenced<T> =
  | { Inline: T }
  | { Pointer: { slot_number: number; transaction_index: number; certificate_index: number } };

// Address construction functions
export declare function fromScript(script: ByteArray): Address;
export declare function fromVerificationKey(vk: ByteArray): Address;
export declare function withDelegationKey(addr: Address, vk: ByteArray): Address;
export declare function withDelegationScript(addr: Address, script: ByteArray): Address;

// Re-export types
export type { ByteArray } from '../../types/basic/index';
