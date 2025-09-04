// Aiken CBOR Module
// Functions from aiken-lang/stdlib/lib/aiken/cbor/

import { ByteArray, Data } from '../../types/basic/index';

// CBOR operations
export declare function diagnostic(data: Data): string;
export declare function serialise(data: Data): ByteArray;
export declare function deserialise(bytes: ByteArray): Data | undefined;

// Re-export types
export { Data } from '../../types/basic/index';
