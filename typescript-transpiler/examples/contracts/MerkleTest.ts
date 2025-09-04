import {
  Bool, contract, datum, ByteArray, ScriptContext, validator,
  // Merkle Patricia Forestry functions
  sliceByteArray, nibble, nibbles, suffix, combineHashes,
  merkle4, merkle8, merkle16, sparseMerkle4, sparseMerkle8, sparseMerkle16,
  nullHash, nullHash2, nullHash4, nullHash8,
  // Additional cryptographic functions
  sha2_256, sha3_256, verifyEcdsaSignature, verifySchnorrSignature,
  // Mathematical functions
  mathAbs, mathClamp, mathGcd, mathIsSqrt, mathLog, mathLog2,
  // List functions
  listPush, listRange, listRepeat, listAll, listAny,
  // CBOR functions
  cborDiagnostic, cborSerialise, cborDeserialise,
  // Address functions
  addressFromScript, addressFromVerificationKey,
  // Asset functions
  valueFromAsset, valueFromAssetList, valueZero, valueAdd, valueSubtract, valueGetAsset, valueIsZero,
  PubKeyHash, Int
} from '../../src/types';

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
    const rootHash = Array.from(datum.root).map(b => b.toString(16).padStart(2, '0')).join('') as PubKeyHash;
    return tx.isSignedBy(rootHash) && firstNibble >= 0;
  }
}
