// @aikscript/types v1.0.0 - Core Types Package
// Fundamental Cardano and Aiken type definitions
// This package provides the foundation for all other AikScript packages

// ===== FUNDAMENTAL TYPES =====

// Primitive types
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type String = string;
export type Void = undefined;

// Branded types for type safety
export type POSIXTime = bigint & { __brand: 'POSIXTime' };
export type PubKeyHash = string & { __brand: 'PubKeyHash' };
export type ScriptHash = string & { __brand: 'ScriptHash' };
export type AssetName = string & { __brand: 'AssetName' };
export type PolicyId = string & { __brand: 'PolicyId' };
export type Ada = bigint & { __brand: 'Ada' };
export type Percentage = number & { __brand: 'Percentage' };

// ===== PLUTUS DATA TYPES =====

// Plutus Data type (recursive)
export type Data = Int | ByteArray | Data[] | Map<Data, Data> | ConstrData;

// Constructor data for Plutus
export interface ConstrData {
  tag: Int;
  fields: Data[];
}

// ===== SCRIPT TYPES =====

// Datum and redeemer types
export type Datum = unknown;
export type Redeemer = unknown;
export type Script = string;

// ===== UTILITY FUNCTIONS =====

// Branded type constructors
export function posixTime(value: bigint): POSIXTime {
  return value as POSIXTime;
}

export function pubKeyHash(hash: string): PubKeyHash {
  return hash as PubKeyHash;
}

export function scriptHash(hash: string): ScriptHash {
  return hash as ScriptHash;
}

export function assetName(name: string): AssetName {
  return name as AssetName;
}

export function policyId(id: string): PolicyId {
  return id as PolicyId;
}

export function ada(amount: bigint): Ada {
  return amount as Ada;
}

export function percentage(value: number): Percentage {
  return value as Percentage;
}
