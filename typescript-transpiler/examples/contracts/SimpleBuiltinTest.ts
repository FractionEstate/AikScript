// Test contract for builtin functions
// This will be transpiled to test builtin function support

import {
  bData,
  blake2b_256,
  constrData,
  decodeUtf8,
  encodeUtf8,
  headList,
  iData,
  nullList,
  serialiseData,
  verifyEd25519Signature
} from '../../src/types';

export class SimpleBuiltinTest {
  // Simple spend validator using builtin functions
  spend(datum: any, redeemer: any, ctx: any) {
    // Test basic data operations
    const intData = iData(BigInt(42));
    const byteData = bData(new Uint8Array(Buffer.from("test")));

    // Test cryptographic hash
    const hash = blake2b_256(new Uint8Array(Buffer.from("hello")));

    // Test list operations
    const list = [1, 2, 3];
    const head = headList(list);
    const isEmpty = nullList([]);

    // Test string operations
    const encoded = encodeUtf8("world");
    const decoded = decodeUtf8(encoded);

    // Test signature verification
    const isValid = verifyEd25519Signature("pubkey" as any, new Uint8Array(Buffer.from("message")), new Uint8Array(Buffer.from("signature")));

    return head > 0 && !isEmpty && isValid;
  }

  // Simple mint validator
  mint(redeemer: any, policyId: any, ctx: any) {
    // Test data construction
    const data = constrData(BigInt(0), [iData(BigInt(1)), bData(new Uint8Array(Buffer.from("mint")))]);
    const serialized = serialiseData(data);

    return true;
  }
}
