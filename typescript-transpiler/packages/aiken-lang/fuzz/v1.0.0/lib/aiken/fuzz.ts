// Aiken Fuzz Module
// TypeScript declarations for aiken-lang-fuzz v1.0.0

import { ByteArray, Int, Bool } from '@aikscript/types';

// Fuzz testing types
export declare type FuzzInput = ByteArray;
export declare type FuzzResult = { success: Bool; data: ByteArray };

// Fuzz testing functions
export declare function fuzzGenerate(seed: Int, size: Int): FuzzInput;
export declare function fuzzRun(input: FuzzInput, testFn: (data: ByteArray) => Bool): FuzzResult;
export declare function fuzzShrink(input: FuzzInput, property: (data: ByteArray) => Bool): FuzzInput;

// Scenario-based fuzzing
export declare function scenarioRun(scenarios: FuzzInput[], testFn: (data: ByteArray) => Bool): FuzzResult[];
export declare function scenarioGenerate(count: Int, generator: (seed: Int) => FuzzInput): FuzzInput[];
