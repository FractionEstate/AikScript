// Cardano Governance Module
// TypeScript declarations for cardano stdlib governance functions

// Basic types
type ByteArray = Uint8Array;
type Int = bigint;

// Governance types
export declare type ProtocolParameters = {
  min_fee_a: Int;
  min_fee_b: Int;
  max_block_size: Int;
  max_tx_size: Int;
  max_bh_size: Int;
  key_deposit: Int;
  pool_deposit: Int;
  max_epoch: Int;
  n_opt: Int;
  pool_pledge_influence: number;
  expansion_rate: number;
  treasury_growth_rate: number;
  d: number;
  extra_entropy: ByteArray;
  protocol_version: [Int, Int];
  min_pool_cost: Int;
  ada_per_utxo_byte: Int;
  cost_models: unknown;
  execution_costs: unknown;
  max_tx_ex_mem: Int;
  max_tx_ex_steps: Int;
  max_block_ex_mem: Int;
  max_block_ex_steps: Int;
  max_val_size: Int;
  collateral_percent: Int;
  max_collateral_inputs: Int;
};

export declare type Voter = { committee_hot_key: ByteArray } | { drep_key: ByteArray } | { drep_script: ByteArray } | { stake_pool_key: ByteArray };
