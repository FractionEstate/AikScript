// Script context and purpose type definitions for AikScript
// Following aiken-lang patterns for modular organization

import { Transaction, TxOutRef } from '../transaction/index';
import { Credential } from '../address/index';

// Script context
export interface ScriptContext {
  transaction: Transaction;
  purpose: ScriptPurpose;
  spendingTxOutRef?: TxOutRef;
}

// Script purposes
export type ScriptPurpose =
  | { type: 'spend'; txOutRef: TxOutRef }
  | { type: 'mint'; policyId: string }
  | { type: 'withdraw'; stakeCredential: Credential }
  | { type: 'publish' };

// DSL Decorators - re-export from global declarations
export declare function contract(name: string): <T extends new (...args: unknown[]) => Record<string, unknown>>(target: T) => T;
export declare function datum(target: Record<string, unknown>, propertyKey: string | symbol): void;
export declare function validator(purpose: string): (target: Record<string, unknown>, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
