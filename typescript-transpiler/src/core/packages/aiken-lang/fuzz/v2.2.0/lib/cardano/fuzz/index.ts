// Cardano Fuzz Library v2.2.0
// Cardano-specific fuzzing utilities for property-based testing

import { Int, ByteArray, Data } from '@/types/basic/index';
import { Fuzzer, Option } from '@aiken/fuzz';

// Re-export core fuzz types
export { Fuzzer, Option } from '@aiken/fuzz';

// Cardano-specific types
export declare type Address = {
  payment_credential: Credential;
  stake_credential: Option<Credential>;
};

export declare type Credential = VerificationKeyCredential | ScriptCredential;

export declare type VerificationKeyCredential = {
  type: 'VerificationKey';
  hash: ByteArray;
};

export declare type ScriptCredential = {
  type: 'Script';
  hash: ByteArray;
};

export declare type Certificate = {
  type: string;
  data: Data;
};

export declare type Datum = Data;

export declare type Withdrawals = {
  [key: string]: Int;
};

// Address fuzzers
export declare function address(): Fuzzer<Address>;
export declare function credential(): Fuzzer<Credential>;

// Certificate fuzzers
export declare function certificate(): Fuzzer<Certificate>;

// Governance fuzzers
export declare function delegate(): Fuzzer<{ type: string; data: Data }>;
export declare function delegate_representative(): Fuzzer<{ type: string; data: Data }>;

// Datum fuzzers
export declare function datum(): Fuzzer<Datum>;

// Withdrawal fuzzers
export declare function withdrawals_with(): Fuzzer<Withdrawals>;

// Utility functions for Cardano types
export declare function pub_key_hash(): Fuzzer<ByteArray>;
export declare function script_hash(): Fuzzer<ByteArray>;
export declare function asset_name(): Fuzzer<ByteArray>;
export declare function policy_id(): Fuzzer<ByteArray>;
export declare function tx_hash(): Fuzzer<ByteArray>;
export declare function output_reference(): Fuzzer<{ tx_hash: ByteArray; output_index: Int }>;

// Collection fuzzers for Cardano types
export declare function addresses(): Fuzzer<Address[]>;
export declare function credentials(): Fuzzer<Credential[]>;
export declare function certificates(): Fuzzer<Certificate[]>;
