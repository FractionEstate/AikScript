// Merkle Patricia Forestry Merkling Module
// TypeScript declarations for internal MPF merkling functions

import { ByteArray } from '@/types/basic/index';

// Constants
export declare const nullHash: ByteArray;
export declare const nullHash2: ByteArray;
export declare const nullHash4: ByteArray;
export declare const nullHash8: ByteArray;

// Merkle Tree Functions
export declare function merkle16(branch: number, root: ByteArray, siblings: ByteArray[]): ByteArray;
export declare function sparseMerkle16(indices: number[], values: ByteArray[], siblings: ByteArray[]): ByteArray;

// Utility Functions
export declare function getBit(index: number, bit: number): boolean;
export declare function setBit(index: number, bit: number, value: boolean): number;
