// Example demonstrating the new scoped import structure
import { contract, datum, validator, Bool, ByteArray, ScriptContext, PubKeyHash } from '../../src/types';

// Import from specific modules using scoped imports
import * as collection from '@aiken/collection';
import * as crypto from '@aiken/crypto';
import * as math from '@aiken/math';
import * as cbor from '@aiken/cbor';
import * as address from '@cardano/address';
import * as assets from '@cardano/assets';
import * as mpf from '@aiken/merkle-patricia-forestry';

@contract("ScopedImportsExample")
export class ScopedImportsExampleContract {
  [key: string]: unknown; // Add index signature for decorator compatibility

  @datum
  public exampleDatum: {
    data: ByteArray;
    key: ByteArray;
    value: ByteArray;
    root: ByteArray;
  } = {
    data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    key: new Uint8Array([0x12, 0x34]),
    value: new Uint8Array([0xab, 0xcd]),
    root: new Uint8Array(32)
  };

  @validator("scoped")
  testScopedImports(datum: typeof this.exampleDatum, redeemer: unknown, ctx: ScriptContext): Bool {
    const tx = ctx.transaction;

    // Use functions from scoped imports
    const sliced = mpf.sliceByteArray(datum.data, 0, 8);
    const hashLeaf = mpf.hashLeaf(datum.key, datum.data);
    const combined = mpf.concatByteArrays(datum.root, sliced);

    // Use crypto functions
    const hash1 = crypto.blake2b_256(datum.data);
    const hash2 = crypto.sha3_256(datum.data);

    // Use math functions
    const absResult = math.abs(-42n);
    const clamped = math.clamp(15n, 0n, 10n);

    // Use collection functions
    const testList = [1n, 2n, 3n, 4n, 5n];
    const allPositive = collection.listAll(testList, (x: bigint) => x > 0n);

    // Use CBOR functions
    const diagnostic = cbor.cborDiagnostic(datum.data);

    // Use address functions
    const scriptAddress = address.addressFromScript(datum.key);

    // Use asset functions
    const adaValue = assets.ada(1000000n);

    // Simple validation
    const rootHash = Array.from(datum.root).map((b: number) => b.toString(16).padStart(2, '0')).join('') as PubKeyHash;
    return tx.isSignedBy(rootHash) &&
           sliced.length === 8 &&
           hashLeaf.length === 32 &&
           combined.length === 32 &&
           hash1.length === 32 &&
           hash2.length === 32 &&
           absResult === 42n &&
           clamped === 10n &&
           allPositive === true &&
           diagnostic.length > 0;
  }
}
