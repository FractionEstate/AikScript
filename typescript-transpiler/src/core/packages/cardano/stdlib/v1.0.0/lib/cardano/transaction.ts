// Cardano Transaction Module
// TypeScript declarations for cardano stdlib transaction functions

// Basic types
type ByteArray = Uint8Array;
type Int = bigint;

// Transaction types
export declare type POSIXTime = Int;
export declare type ValidityRange = { start: POSIXTime; end?: POSIXTime };
export declare type Input = { transaction_id: ByteArray; output_index: Int };
export declare type Output = { address: ByteArray; amount: unknown; datum?: unknown };
export declare type Transaction = {
  inputs: Input[];
  outputs: Output[];
  validity_range: ValidityRange;
  fee: Int;
  network_id?: Int;
  collateral_inputs?: Input[];
  required_signers?: ByteArray[];
  reference_inputs?: Input[];
  collateral_output?: Output;
  total_collateral?: Int;
  certificates?: unknown[];
  withdrawals?: unknown[];
  mint?: unknown;
  script_data_hash?: ByteArray;
  auxiliary_data_hash?: ByteArray;
};
