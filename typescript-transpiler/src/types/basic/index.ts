// Basic Cardano type definitions for AikScript
// Following aiken-lang patterns for modular organization

// Fundamental types
export type POSIXTime = bigint;
export type PubKeyHash = string & { __brand: 'PubKeyHash' };
export type ScriptHash = string & { __brand: 'ScriptHash' };
export type AssetName = string & { __brand: 'AssetName' };
export type PolicyId = string & { __brand: 'PolicyId' };
export type Ada = bigint & { __brand: 'Ada' };
export type Percentage = number & { __brand: 'Percentage' };
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type Void = undefined;
export type String = string;
export type Data = Int | ByteArray | Data[] | Map<Data, Data> | ConstrData; // Plutus Data type

// Datum and redeemer types
export type Datum = unknown;
export type Redeemer = unknown;

// Script types
export type Script = string;

// Plutus Data constructors
export interface ConstrData {
  tag: Int;
  fields: Data[];
}

// Utility functions for basic types
export function pubKeyHash(hash: string): PubKeyHash {
  return hash as PubKeyHash;
}

export function scriptHash(hash: string): ScriptHash {
  return hash as ScriptHash;
}

export function ada(amount: bigint): Ada {
  return amount as Ada;
}

export function assetName(name: string): AssetName {
  return name as AssetName;
}

export function policyId(id: string): PolicyId {
  return id as PolicyId;
}
