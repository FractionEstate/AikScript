// Aiken Standard Library - Primitive Types
// TypeScript declarations for aiken-lang/stdlib/lib/aiken/primitive/

// Fundamental types
export type Bool = boolean;
export type Int = bigint;
export type ByteArray = Uint8Array;
export type String = string;

// Re-export for backward compatibility
export { Bool as bool, Int as int, ByteArray as bytearray, String as string };
