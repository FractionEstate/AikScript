import {
  Bool, contract, datum, ByteArray, ScriptContext, validator, Int,
  // PolicyId, AssetName,
  // Merkle Patricia Forestry functions
  sliceByteArray, nibble, nibbles, suffix, combineHashes,
  merkle4, merkle8, merkle16, sparseMerkle4, sparseMerkle8, sparseMerkle16,
  nullHash, nullHash2, nullHash4, nullHash8,
  // Additional cryptographic functions
  sha2_256, sha3_256, // verifyEcdsaSignature, verifySchnorrSignature,
  // Mathematical functions
  mathAbs, mathClamp, mathGcd, mathIsSqrt, mathLog, mathLog2,
  // List functions
  listAny, listAll,
  // CBOR functions
  cborDiagnostic, cborSerialise, cborDeserialise,
  // Address functions
  addressFromScript, addressFromVerificationKey,
  // Asset functions
  valueFromAsset, valueFromAssetList, valueZero, valueAdd, valueSubtract, valueGetAsset, valueIsZero,
  PubKeyHash
} from '@aikscript/types';

@contract("ComprehensiveTest")
export class ComprehensiveTestContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public testDatum: {
    data: ByteArray;
    key: ByteArray;
    value: ByteArray;
    root: ByteArray;
    scriptHash: ByteArray;
    vkHash: ByteArray;
  } = {
    data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    key: new Uint8Array([0x12, 0x34, 0x56, 0x78]),
    value: new Uint8Array([0xab, 0xcd, 0xef]),
    root: new Uint8Array(32),
    scriptHash: new Uint8Array(28),
    vkHash: new Uint8Array(28)
  };

  @validator("comprehensive")
  testAllFunctions(datum: typeof this.testDatum, redeemer: unknown, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;

    // Test Merkle Patricia Forestry functions
    const sliced = sliceByteArray(datum.data, 0n, 8n);
    const firstNibble = nibble(datum.data, 0n);
    const nibblesData = nibbles(datum.data, 0n, 4n);
    const suffixed = suffix(datum.data, 4n);
    const combined = combineHashes(datum.root, sliced);

    // Test merkle tree functions
    const merkle4Result = merkle4(0n, combined, nullHash, nullHash);
    const merkle8Result = merkle8(0n, combined, nullHash4, nullHash2, nullHash);
    const merkle16Result = merkle16(0n, combined, nullHash8, nullHash4, nullHash2, nullHash);

    // Test sparse merkle functions
    const sparseMerkle4Result = sparseMerkle4(0n, combined, 1n, nullHash);
    const sparseMerkle8Result = sparseMerkle8(0n, combined, 2n, nullHash);
    const sparseMerkle16Result = sparseMerkle16(0n, combined, 4n, nullHash);

    // Test additional cryptographic functions
    const sha2Hash = sha2_256(datum.data);
    const sha3Hash = sha3_256(datum.data);

    // Test mathematical functions
    const absResult = mathAbs(-42n);
    const clampResult = mathClamp(15n, 0n, 10n);
    const gcdResult = mathGcd(42n, 14n);
    const isSqrtResult = mathIsSqrt(25n, 5n);
    const logResult = mathLog(100n, 10n);
    const log2Result = mathLog2(256n);

    // Test list functions
    const testList = [1n, 2n, 3n, 4n, 5n];
    const allPositive = listAll(testList, (x: Int) => x > 0n);
    const anyEven = listAny(testList, (x: Int) => x % 2n === 0n);

    // Test CBOR functions
    const diagnostic = cborDiagnostic(datum.data);
    const serialised = cborSerialise(datum.data);
    cborDeserialise(serialised); // Test deserialisation

    // Test address functions
    const scriptAddress = addressFromScript(datum.scriptHash);
    const vkAddress = addressFromVerificationKey(datum.vkHash);

    // Test asset functions
    const singleAsset = valueFromAsset(datum.scriptHash, new Uint8Array([0x41, 0x42]), 1000n);
    const multiAsset = valueFromAsset(datum.scriptHash, new Uint8Array([0x41]), 500n); // Simplified for now
    const addedValue = valueAdd(singleAsset, multiAsset);
    const subtractedValue = valueSubtract(addedValue, singleAsset);
    const assetQuantity = valueGetAsset(subtractedValue, datum.scriptHash, new Uint8Array([0x41]));
    const isZeroValue = valueIsZero(valueZero);

    // Comprehensive validation
    return (
      sliced.length === 8 &&
      firstNibble >= 0n &&
      nibblesData.length === 4 &&
      suffixed.length === datum.data.length - 4 &&
      combined.length === 32 &&
      merkle4Result.length === 32 &&
      merkle8Result.length === 32 &&
      merkle16Result.length === 32 &&
      sparseMerkle4Result.length === 32 &&
      sparseMerkle8Result.length === 32 &&
      sparseMerkle16Result.length === 32 &&
      sha2Hash.length === 32 &&
      sha3Hash.length === 32 &&
      absResult === 42n &&
      clampResult === 10n &&
      gcdResult === 14n &&
      isSqrtResult === true &&
      logResult === 2n &&
      log2Result === 8n &&
      allPositive === true &&
      anyEven === true &&
      diagnostic.length > 0 &&
      serialised.length > 0 &&
      scriptAddress !== undefined &&
      vkAddress !== undefined &&
      assetQuantity === 500n &&
      isZeroValue === true
    );
  }
}
