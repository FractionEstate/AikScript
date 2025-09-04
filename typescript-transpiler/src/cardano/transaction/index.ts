// Cardano Transaction Module
// Functions from aiken-lang/stdlib/lib/cardano/transaction/

import { ByteArray, Int } from '../../types/basic/index';

// Transaction types
export declare type TransactionId = ByteArray;

export declare type Transaction = {
  inputs: Input[];
  reference_inputs: Input[];
  outputs: Output[];
  fee: Lovelace;
  mint?: Value;
  certificates: Certificate[];
  withdrawals: Array<{ credential: Credential; amount: Lovelace }>;
  validity_range: ValidityRange;
  extra_signatories: VerificationKeyHash[];
  redeemers: Array<{ purpose: ScriptPurpose; redeemer: Redeemer }>;
  datums: Map<DataHash, Data>;
  id: TransactionId;
  votes: Array<{ voter: Voter; governance_action_id: GovernanceActionId; vote: Vote }>;
  proposal_procedures: ProposalProcedure[];
  current_treasury_amount?: Lovelace;
  treasury_donation?: Lovelace;
};

export declare type ValidityRange = {
  start?: POSIXTime;
  end?: POSIXTime;
};

export declare type Input = {
  output_reference: OutputReference;
  output: Output;
};

export declare type OutputReference = {
  transaction_id: TransactionId;
  output_index: Int;
};

export declare type Output = {
  address: Address;
  amount: Value;
  datum?: Datum;
  reference_script?: Script;
};

// Placeholder types (would need full definitions from stdlib)
export declare type Lovelace = Int;
export declare type Value = unknown;
export declare type Certificate = unknown;
export declare type Credential = unknown;
export declare type ScriptPurpose = unknown;
export declare type Redeemer = unknown;
export declare type DataHash = ByteArray;
export declare type Data = unknown;
export declare type Voter = unknown;
export declare type GovernanceActionId = unknown;
export declare type Vote = unknown;
export declare type ProposalProcedure = unknown;
export declare type POSIXTime = bigint;
export declare type VerificationKeyHash = ByteArray;
export declare type Address = unknown;
export declare type Datum = unknown;
export declare type Script = unknown;

// Re-export types
export type { Int, ByteArray } from '../../types/basic/index';
