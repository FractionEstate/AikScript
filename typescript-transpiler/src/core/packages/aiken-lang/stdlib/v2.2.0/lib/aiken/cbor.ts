// Aiken CBOR Module
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/cbor.ak

import { ByteArray } from './primitive/index';

// CBOR serialization functions
export declare function cborDiagnostic(data: unknown): string;
export declare function cborSerialise(data: unknown): ByteArray;
export declare function cborDeserialise(bytes: ByteArray): unknown;
