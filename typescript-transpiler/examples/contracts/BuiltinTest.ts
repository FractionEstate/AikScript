import {
  bData,
  blake2b_256,
  Bool,
  constrData,
  contract,
  countSetBits,
  datum,
  decodeUtf8,
  encodeUtf8,
  findFirstSetBit,
  iData,
  keccak_256,
  lengthOfByteString,
  listData,
  mkNilData,
  nullList,
  PubKeyHash,
  ScriptContext,
  serialiseData,
  sha256,
  trace,
  validator,
  verifyEd25519Signature
} from '../../src/types';

@contract("BuiltinTest")
export class BuiltinTestContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public testDatum: { owner: PubKeyHash; amount: bigint; data: unknown } = {
    owner: "" as PubKeyHash,
    amount: BigInt(0),
    data: null
  };

  @validator("spend")
  spend(datum: { owner: PubKeyHash; amount: bigint; data: unknown }, redeemer: void, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;

    // Convert PubKeyHash to ByteArray for crypto functions
    const ownerBytes = new Uint8Array(Buffer.from(datum.owner, 'hex'));

    // Test cryptographic functions
    const hash1 = sha256(ownerBytes);
    const hash2 = blake2b_256(ownerBytes);
    const hash3 = keccak_256(ownerBytes);

    // Test data conversion functions
    const intData = iData(datum.amount);
    const byteData = bData(ownerBytes);
    const constrDatum = constrData(BigInt(0), [intData, byteData]);

    // Test list operations
    const dataList = listData([intData, byteData]);
    const listLength = lengthOfByteString(ownerBytes);

    // Test string operations
    const encoded = encodeUtf8("test");
    const decoded = decodeUtf8(encoded);

    // Test signature verification
    const ownerHex = Buffer.from(ownerBytes).toString('hex');
    const isValidSig = verifyEd25519Signature(ownerHex as PubKeyHash, hash1, ownerBytes);

    // Test bitwise operations
    const bitCount = countSetBits(datum.amount);
    const firstBit = findFirstSetBit(datum.amount);

    // Test debugging
    trace("Debug message", true);

    // Main validation logic
    return tx.isSignedBy(datum.owner) &&
      datum.amount > BigInt(0) &&
      listLength > BigInt(0) &&
      bitCount >= BigInt(0);
  }

  @validator("mint")
  mint(redeemer: void, policyId: unknown, ctx: ScriptContext): Bool {
    // Test data operations
    const redeemerData = constrData(BigInt(1), []);
    const serialized = serialiseData(redeemerData);

    // Test list operations
    const emptyList = mkNilData();
    const isEmpty = nullList([emptyList]);

    return isEmpty;
  }
}
