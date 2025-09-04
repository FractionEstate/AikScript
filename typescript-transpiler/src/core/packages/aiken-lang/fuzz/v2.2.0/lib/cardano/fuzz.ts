// Cardano Fuzz Module
// TypeScript declarations for Cardano-specific fuzz testing

import { Fuzzer } from '../aiken/fuzz/index';

// Address Fuzzers
export declare function address(): Fuzzer<unknown>; // Fuzzer for Address
export declare function credential(): Fuzzer<unknown>; // Fuzzer for Credential
export declare function stakeCredential(): Fuzzer<unknown>; // Fuzzer for StakeCredential

// Asset Fuzzers
export declare function policyId(): Fuzzer<Uint8Array>; // Fuzzer for PolicyId
export declare function assetName(): Fuzzer<Uint8Array>; // Fuzzer for AssetName
export declare function lovelace(): Fuzzer<bigint>; // Fuzzer for Lovelace
export declare function value(): Fuzzer<unknown>; // Fuzzer for Value

// Transaction Fuzzers
export declare function transactionId(): Fuzzer<Uint8Array>; // Fuzzer for TransactionId
export declare function outputReference(): Fuzzer<unknown>; // Fuzzer for OutputReference
export declare function txInput(): Fuzzer<unknown>; // Fuzzer for TxInput
export declare function txOutput(): Fuzzer<unknown>; // Fuzzer for TxOut
export declare function datum(): Fuzzer<unknown>; // Fuzzer for Datum

// Certificate Fuzzers
export declare function certificate(): Fuzzer<unknown>; // Fuzzer for Certificate
export declare function stakePoolId(): Fuzzer<Uint8Array>; // Fuzzer for StakePoolId

// Governance Fuzzers
export declare function governanceAction(): Fuzzer<unknown>; // Fuzzer for GovernanceAction
export declare function proposalProcedure(): Fuzzer<unknown>; // Fuzzer for ProposalProcedure
export declare function voter(): Fuzzer<unknown>; // Fuzzer for Voter

// Script Context Fuzzer
export declare function scriptContext(): Fuzzer<unknown>; // Fuzzer for ScriptContext

// Complex Fuzzers
export declare function transaction(): Fuzzer<unknown>; // Fuzzer for Transaction
export declare function scriptPurpose(): Fuzzer<unknown>; // Fuzzer for ScriptPurpose
