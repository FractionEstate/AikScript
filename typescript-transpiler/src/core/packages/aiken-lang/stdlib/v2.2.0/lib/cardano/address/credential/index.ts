// Cardano Address Credential Module
// TypeScript declarations for Cardano address credential operations

import { ByteArray } from '@/types/basic/index';

// Credential Types
export declare type Credential =
  | { type: 'VerificationKey'; hash: ByteArray }
  | { type: 'Script'; hash: ByteArray };

// Credential Functions
export declare function credentialFromVerificationKey(hash: ByteArray): Credential;
export declare function credentialFromScript(hash: ByteArray): Credential;
export declare function credentialIsVerificationKey(credential: Credential): boolean;
export declare function credentialIsScript(credential: Credential): boolean;
export declare function credentialHash(credential: Credential): ByteArray;
