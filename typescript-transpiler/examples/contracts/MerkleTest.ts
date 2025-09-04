import {
  Bool, contract, datum, ByteArray, ScriptContext, validator,
  PubKeyHash, Int
} from "../../src/types";

// Import Merkle Patricia Forestry functions
import {
  sliceByteArray, nibble, nibbles, suffix, combineHashes,
  merkle4, merkle8, merkle16, sparseMerkle4, sparseMerkle8, sparseMerkle16,
  nullHash, nullHash2, nullHash4, nullHash8
} from "@aiken/merkle-patricia-forestry";

// Import cryptographic functions
import { sha2_256, sha3_256, verifyEd25519Signature, verifyEcdsaSignature, verifySchnorrSignature } from "@aiken/crypto";

// Import mathematical functions
import { abs, clamp, gcd, isSqrt, log, log2 } from "@aiken/math";

// Import list functions
import { listPush, listRange, listRepeat, listAll, listAny } from "@aiken/collection";

// Import CBOR functions
import { cborDiagnostic, cborSerialise, cborDeserialise } from "@aiken/cbor";

// Import address functions
import { addressFromScript, addressFromVerificationKey } from "@cardano/address";

// Import asset functions
import { valueFromAsset, valueFromAssetList, valueAdd, valueSubtract, valueGetAsset, valueIsZero } from "@cardano/assets";

@contract("MerkleTest")
export class MerkleTestContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public testDatum: { root: ByteArray; data: ByteArray } = {
    root: new Uint8Array(32),
    data: new Uint8Array()
  };

  @validator("test")
  testMerkleFunctions(datum: { root: ByteArray; data: ByteArray }, redeemer: unknown, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;

    // Test byte array slicing
    const sliced = sliceByteArray(datum.data, 0n, 16n);

    // Test nibble extraction
    const firstNibble = nibble(datum.data, 0n);

    // Test hash combination
    const combined = combineHashes(datum.root, sliced);

    // Simple validation logic - convert ByteArray to PubKeyHash
    const rootHash = Array.from(datum.root).map((b: number) => b.toString(16).padStart(2, '0')).join('') as PubKeyHash;
    return tx.isSignedBy(rootHash) && firstNibble >= 0;
  }
}
