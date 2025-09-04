/**
 * Builtin function mappings and utilities for TypeScript-to-Aiken transpiler
 * This module handles the mapping of TypeScript/JavaScript functions to Aiken builtin functions
 */

export interface BuiltinMapping {
  aikenName: string;
  importName?: string;
}

export class BuiltinRegistry {
  private mappings: Map<string, BuiltinMapping> = new Map();
  private usedBuiltins: Set<string> = new Set();

  constructor() {
    this.initializeMappings();
  }

  private initializeMappings(): void {
    // Array/List operations
    this.addMapping('push', { aikenName: 'cons_list', importName: 'mkCons' });
    this.addMapping('concat', { aikenName: 'append_bytearray', importName: 'appendByteString' });
    this.addMapping('length', {
      aikenName: 'length_of_bytearray',
      importName: 'lengthOfByteString',
    });
    this.addMapping('slice', { aikenName: 'slice_bytearray', importName: 'sliceByteString' });
    this.addMapping('indexOf', { aikenName: 'index_bytearray', importName: 'indexByteString' });

    // String operations
    this.addMapping('toString', { aikenName: 'encode_utf8', importName: 'encodeUtf8' });
    this.addMapping('charAt', { aikenName: 'index_bytearray', importName: 'indexByteString' });
    this.addMapping('substring', { aikenName: 'slice_bytearray', importName: 'sliceByteString' });

    // Math operations (simplified implementations)
    this.addMapping('Math.abs', { aikenName: 'if_then_else', importName: 'ifThenElse' });
    this.addMapping('Math.max', { aikenName: 'if_then_else', importName: 'ifThenElse' });
    this.addMapping('Math.min', { aikenName: 'if_then_else', importName: 'ifThenElse' });

    // Cryptographic functions
    this.addMapping('sha256', { aikenName: 'blake2b_256', importName: 'blake2b_256' });
    this.addMapping('sha3_256', { aikenName: 'sha3_256', importName: 'sha3_256' });
    this.addMapping('keccak256', { aikenName: 'keccak_256', importName: 'keccak_256' });
    this.addMapping('ripemd160', { aikenName: 'ripemd_160', importName: 'ripemd_160' });

    // Data conversion functions
    this.addMapping('Buffer.from', { aikenName: 'b_data', importName: 'bData' });
    this.addMapping('parseInt', {
      aikenName: 'bytearray_to_integer',
      importName: 'byteStringToInteger',
    });
    this.addMapping('BigInt', {
      aikenName: 'integer_to_bytearray',
      importName: 'integerToByteString',
    });

    // Boolean operations
    this.addMapping('Boolean', { aikenName: 'if_then_else', importName: 'ifThenElse' });

    // Pair operations
    this.addMapping('fst', { aikenName: 'fst_pair', importName: 'fstPair' });
    this.addMapping('snd', { aikenName: 'snd_pair', importName: 'sndPair' });

    // List operations
    this.addMapping('head', { aikenName: 'head_list', importName: 'headList' });
    this.addMapping('tail', { aikenName: 'tail_list', importName: 'tailList' });
    this.addMapping('isEmpty', { aikenName: 'null_list', importName: 'nullList' });

    // Data operations
    this.addMapping('chooseData', { aikenName: 'choose_data', importName: 'chooseData' });
    this.addMapping('constrData', { aikenName: 'constr_data', importName: 'constrData' });
    this.addMapping('mapData', { aikenName: 'map_data', importName: 'mapData' });
    this.addMapping('listData', { aikenName: 'list_data', importName: 'listData' });
    this.addMapping('iData', { aikenName: 'i_data', importName: 'iData' });
    this.addMapping('bData', { aikenName: 'b_data', importName: 'bData' });
    this.addMapping('unConstrData', { aikenName: 'un_constr_data', importName: 'unConstrData' });
    this.addMapping('unMapData', { aikenName: 'un_map_data', importName: 'unMapData' });
    this.addMapping('unListData', { aikenName: 'un_list_data', importName: 'unListData' });
    this.addMapping('unIData', { aikenName: 'un_i_data', importName: 'unIData' });
    this.addMapping('unBData', { aikenName: 'un_b_data', importName: 'unBData' });
    this.addMapping('equalsData', { aikenName: 'equals_data', importName: 'equalsData' });
    this.addMapping('serialiseData', { aikenName: 'serialise_data', importName: 'serialiseData' });

    // BLS12-381 operations
    this.addMapping('blsG1Add', { aikenName: 'bls12_381_g1_add', importName: 'bls12_381_G1_Add' });
    this.addMapping('blsG1Neg', { aikenName: 'bls12_381_g1_neg', importName: 'bls12_381_G1_Neg' });
    this.addMapping('blsG1ScalarMul', {
      aikenName: 'bls12_381_g1_scalar_mul',
      importName: 'bls12_381_G1_ScalarMul',
    });
    this.addMapping('blsG1Equal', {
      aikenName: 'bls12_381_g1_equal',
      importName: 'bls12_381_G1_Equal',
    });
    this.addMapping('blsG1Compress', {
      aikenName: 'bls12_381_g1_compress',
      importName: 'bls12_381_G1_Compress',
    });
    this.addMapping('blsG1Uncompress', {
      aikenName: 'bls12_381_g1_uncompress',
      importName: 'bls12_381_G1_Uncompress',
    });
    this.addMapping('blsG1HashToGroup', {
      aikenName: 'bls12_381_g1_hash_to_group',
      importName: 'bls12_381_G1_HashToGroup',
    });

    // Bitwise operations
    this.addMapping('readBit', { aikenName: 'read_bit', importName: 'readBit' });
    this.addMapping('writeBits', { aikenName: 'write_bits', importName: 'writeBits' });
    this.addMapping('countSetBits', { aikenName: 'count_set_bits', importName: 'countSetBits' });
    this.addMapping('findFirstSetBit', {
      aikenName: 'find_first_set_bit',
      importName: 'findFirstSetBit',
    });

    // Signature verification
    this.addMapping('verifyEd25519Signature', {
      aikenName: 'verify_ed25519_signature',
      importName: 'verifyEd25519Signature',
    });
    this.addMapping('verifyEcdsaSecp256k1Signature', {
      aikenName: 'verify_ecdsa_secp256k1_signature',
      importName: 'verifyEcdsaSecp256k1Signature',
    });
    this.addMapping('verifySchnorrSecp256k1Signature', {
      aikenName: 'verify_schnorr_secp256k1_signature',
      importName: 'verifySchnorrSecp256k1Signature',
    });

    // Debugging
    this.addMapping('console.log', { aikenName: 'debug', importName: 'trace' });
    this.addMapping('trace', { aikenName: 'debug', importName: 'trace' });

    // Integer arithmetic functions
    this.addMapping('addInteger', { aikenName: 'add_integer', importName: 'addInteger' });
    this.addMapping('subtractInteger', {
      aikenName: 'subtract_integer',
      importName: 'subtractInteger',
    });
    this.addMapping('multiplyInteger', {
      aikenName: 'multiply_integer',
      importName: 'multiplyInteger',
    });
    this.addMapping('divideInteger', { aikenName: 'divide_integer', importName: 'divideInteger' });
    this.addMapping('quotientInteger', {
      aikenName: 'quotient_integer',
      importName: 'quotientInteger',
    });
    this.addMapping('remainderInteger', {
      aikenName: 'remainder_integer',
      importName: 'remainderInteger',
    });
    this.addMapping('modInteger', { aikenName: 'mod_integer', importName: 'modInteger' });
    this.addMapping('equalsInteger', { aikenName: 'equals_integer', importName: 'equalsInteger' });
    this.addMapping('lessThanInteger', {
      aikenName: 'less_than_integer',
      importName: 'lessThanInteger',
    });
    this.addMapping('lessThanEqualsInteger', {
      aikenName: 'less_than_equals_integer',
      importName: 'lessThanEqualsInteger',
    });

    // ByteString comparison functions
    this.addMapping('equalsByteString', {
      aikenName: 'equals_bytearray',
      importName: 'equalsByteString',
    });
    this.addMapping('lessThanByteString', {
      aikenName: 'less_than_bytearray',
      importName: 'lessThanByteString',
    });
    this.addMapping('lessThanEqualsByteString', {
      aikenName: 'less_than_equals_bytearray',
      importName: 'lessThanEqualsByteString',
    });

    // Additional ByteString functions
    this.addMapping('replicateByte', { aikenName: 'replicate_byte', importName: 'replicateByte' });

    // BLS12-381 G2 operations
    this.addMapping('blsG2Add', { aikenName: 'bls12_381_g2_add', importName: 'bls12_381_G2_Add' });
    this.addMapping('blsG2Neg', { aikenName: 'bls12_381_g2_neg', importName: 'bls12_381_G2_Neg' });
    this.addMapping('blsG2ScalarMul', {
      aikenName: 'bls12_381_g2_scalar_mul',
      importName: 'bls12_381_G2_ScalarMul',
    });
    this.addMapping('blsG2Equal', {
      aikenName: 'bls12_381_g2_equal',
      importName: 'bls12_381_G2_Equal',
    });
    this.addMapping('blsG2Compress', {
      aikenName: 'bls12_381_g2_compress',
      importName: 'bls12_381_G2_Compress',
    });
    this.addMapping('blsG2Uncompress', {
      aikenName: 'bls12_381_g2_uncompress',
      importName: 'bls12_381_G2_Uncompress',
    });
    this.addMapping('blsG2HashToGroup', {
      aikenName: 'bls12_381_g2_hash_to_group',
      importName: 'bls12_381_G2_HashToGroup',
    });

    // BLS12-381 Miller loop operations
    this.addMapping('blsMillerLoop', {
      aikenName: 'bls12_381_miller_loop',
      importName: 'bls12_381_MillerLoop',
    });
    this.addMapping('blsMulMlResult', {
      aikenName: 'bls12_381_mul_ml_result',
      importName: 'bls12_381_MulMlResult',
    });
    this.addMapping('blsFinalVerify', {
      aikenName: 'bls12_381_final_verify',
      importName: 'bls12_381_FinalVerify',
    });

    // Additional data constructors
    this.addMapping('mkPairData', { aikenName: 'mk_pair_data', importName: 'mkPairData' });
    this.addMapping('mkNilData', { aikenName: 'mk_nil_data', importName: 'mkNilData' });
    this.addMapping('mkNilPairData', {
      aikenName: 'mk_nil_pair_data',
      importName: 'mkNilPairData',
    });

    // Additional utility functions
    this.addMapping('chooseUnit', { aikenName: 'choose_unit', importName: 'chooseUnit' });
    this.addMapping('unconstrIndex', { aikenName: 'unconstr_index', importName: 'unconstrIndex' });
    this.addMapping('unconstrFields', {
      aikenName: 'unconstr_fields',
      importName: 'unconstrFields',
    });

    // Aiken Stdlib - Collections
    this.addMapping('list.filter', { aikenName: 'list.filter', importName: 'listFilter' });
    this.addMapping('list.map', { aikenName: 'list.map', importName: 'listMap' });
    this.addMapping('list.length', { aikenName: 'list.length', importName: 'listLength' });
    this.addMapping('list.head', { aikenName: 'list.head', importName: 'listHead' });
    this.addMapping('list.tail', { aikenName: 'list.tail', importName: 'listTail' });
    this.addMapping('list.isEmpty', { aikenName: 'list.is_empty', importName: 'listIsEmpty' });
    this.addMapping('list.find', { aikenName: 'list.find', importName: 'listFind' });
    this.addMapping('list.any', { aikenName: 'list.any', importName: 'listAny' });
    this.addMapping('list.all', { aikenName: 'list.all', importName: 'listAll' });
    this.addMapping('list.count', { aikenName: 'list.count', importName: 'listCount' });

    // Aiken Stdlib - Dictionary
    this.addMapping('dict.new', { aikenName: 'dict.new', importName: 'dictNew' });
    this.addMapping('dict.insert', { aikenName: 'dict.insert', importName: 'dictInsert' });
    this.addMapping('dict.get', { aikenName: 'dict.get', importName: 'dictGet' });
    this.addMapping('dict.delete', { aikenName: 'dict.delete', importName: 'dictDelete' });
    this.addMapping('dict.hasKey', { aikenName: 'dict.has_key', importName: 'dictHasKey' });
    this.addMapping('dict.size', { aikenName: 'dict.size', importName: 'dictSize' });

    // Aiken Stdlib - Option
    this.addMapping('option.map', { aikenName: 'option.map', importName: 'optionMap' });
    this.addMapping('option.isSome', { aikenName: 'option.is_some', importName: 'optionIsSome' });
    this.addMapping('option.isNone', { aikenName: 'option.is_none', importName: 'optionIsNone' });
    this.addMapping('option.unwrap', { aikenName: 'option.unwrap', importName: 'optionUnwrap' });
    this.addMapping('option.unwrapOr', {
      aikenName: 'option.unwrap_or',
      importName: 'optionUnwrapOr',
    });
    this.addMapping('option.unwrapOrElse', {
      aikenName: 'option.unwrap_or_else',
      importName: 'optionUnwrapOrElse',
    });

    // Aiken Stdlib - Rational
    this.addMapping('rational.fromInt', {
      aikenName: 'rational.from_int',
      importName: 'rationalFromInt',
    });
    this.addMapping('rational.add', { aikenName: 'rational.add', importName: 'rationalAdd' });
    this.addMapping('rational.subtract', {
      aikenName: 'rational.subtract',
      importName: 'rationalSubtract',
    });
    this.addMapping('rational.multiply', {
      aikenName: 'rational.multiply',
      importName: 'rationalMultiply',
    });
    this.addMapping('rational.divide', {
      aikenName: 'rational.divide',
      importName: 'rationalDivide',
    });
    this.addMapping('rational.compare', {
      aikenName: 'rational.compare',
      importName: 'rationalCompare',
    });
    this.addMapping('rational.truncate', {
      aikenName: 'rational.truncate',
      importName: 'rationalTruncate',
    });
    this.addMapping('rational.ceil', { aikenName: 'rational.ceil', importName: 'rationalCeil' });
    this.addMapping('rational.floor', { aikenName: 'rational.floor', importName: 'rationalFloor' });

    // Aiken Stdlib - ByteArray
    this.addMapping('bytearray.compare', {
      aikenName: 'bytearray.compare',
      importName: 'byteArrayCompare',
    });
    this.addMapping('bytearray.isEmpty', {
      aikenName: 'bytearray.is_empty',
      importName: 'byteArrayIsEmpty',
    });
    this.addMapping('bytearray.concat', {
      aikenName: 'bytearray.concat',
      importName: 'byteArrayConcat',
    });
    this.addMapping('bytearray.slice', {
      aikenName: 'bytearray.slice',
      importName: 'byteArraySlice',
    });
    this.addMapping('bytearray.toHex', {
      aikenName: 'bytearray.to_hex',
      importName: 'byteArrayToHex',
    });
    this.addMapping('bytearray.fromHex', {
      aikenName: 'bytearray.from_hex',
      importName: 'byteArrayFromHex',
    });

    // Aiken Stdlib - Integer
    this.addMapping('int.compare', { aikenName: 'int.compare', importName: 'intCompare' });
    this.addMapping('int.abs', { aikenName: 'int.abs', importName: 'intAbs' });
    this.addMapping('int.sign', { aikenName: 'int.sign', importName: 'intSign' });
    this.addMapping('int.min', { aikenName: 'int.min', importName: 'intMin' });
    this.addMapping('int.max', { aikenName: 'int.max', importName: 'intMax' });
    this.addMapping('int.clamp', { aikenName: 'int.clamp', importName: 'intClamp' });

    // Aiken Stdlib - String
    this.addMapping('string.length', { aikenName: 'string.length', importName: 'stringLength' });
    this.addMapping('string.isEmpty', {
      aikenName: 'string.is_empty',
      importName: 'stringIsEmpty',
    });
    this.addMapping('string.concat', { aikenName: 'string.concat', importName: 'stringConcat' });
    this.addMapping('string.slice', { aikenName: 'string.slice', importName: 'stringSlice' });
    this.addMapping('string.compare', { aikenName: 'string.compare', importName: 'stringCompare' });
    this.addMapping('string.toByteArray', {
      aikenName: 'string.to_bytearray',
      importName: 'stringToByteArray',
    });
    this.addMapping('string.fromByteArray', {
      aikenName: 'string.from_bytearray',
      importName: 'stringFromByteArray',
    });

    // Aiken Stdlib - CBOR
    this.addMapping('cbor.encode', { aikenName: 'cbor.encode', importName: 'cborEncode' });
    this.addMapping('cbor.decode', { aikenName: 'cbor.decode', importName: 'cborDecode' });
    this.addMapping('cbor.diagnostic', {
      aikenName: 'cbor.diagnostic',
      importName: 'cborDiagnostic',
    });

    // Aiken Stdlib - Transaction
    this.addMapping('transactionId', { aikenName: 'transaction_id', importName: 'transactionId' });
    this.addMapping('outputReference', {
      aikenName: 'output_reference',
      importName: 'outputReference',
    });

    // Aiken Stdlib - Value
    this.addMapping('value.new', { aikenName: 'value.new', importName: 'valueNew' });
    this.addMapping('value.addAsset', {
      aikenName: 'value.add_asset',
      importName: 'valueAddAsset',
    });
    this.addMapping('value.quantityOf', {
      aikenName: 'value.quantity_of',
      importName: 'valueQuantityOf',
    });
    this.addMapping('value.isZero', { aikenName: 'value.is_zero', importName: 'valueIsZero' });

    // Aiken Stdlib - Address
    this.addMapping('address.fromCredential', {
      aikenName: 'address.from_credential',
      importName: 'addressFromCredential',
    });
    this.addMapping('address.paymentCredential', {
      aikenName: 'address.payment_credential',
      importName: 'addressPaymentCredential',
    });
    this.addMapping('address.stakeCredential', {
      aikenName: 'address.stake_credential',
      importName: 'addressStakeCredential',
    });

    // Aiken Stdlib - Fuzzing
    this.addMapping('fuzz.int', { aikenName: 'fuzz.int', importName: 'fuzzInt' });
    this.addMapping('fuzz.byteArray', { aikenName: 'fuzz.bytearray', importName: 'fuzzByteArray' });
    this.addMapping('fuzz.string', { aikenName: 'fuzz.string', importName: 'fuzzString' });
    this.addMapping('fuzz.bool', { aikenName: 'fuzz.bool', importName: 'fuzzBool' });
    this.addMapping('fuzz.option', { aikenName: 'fuzz.option', importName: 'fuzzOption' });
    this.addMapping('fuzz.list', { aikenName: 'fuzz.list', importName: 'fuzzList' });
    this.addMapping('fuzz.label', { aikenName: 'fuzz.label', importName: 'fuzzLabel' });
  }

  private addMapping(functionName: string, mapping: BuiltinMapping): void {
    this.mappings.set(functionName, mapping);
  }

  /**
   * Get builtin mapping for a function name
   */
  getMapping(functionName: string): BuiltinMapping | null {
    // Direct mapping
    if (this.mappings.has(functionName)) {
      return this.mappings.get(functionName)!;
    }

    // Handle method calls on objects (e.g., array.length, string.toString)
    if (functionName.includes('.')) {
      const parts = functionName.split('.');
      if (parts.length === 2) {
        const [obj, method] = parts;

        // Handle array methods
        if (obj === 'array' || obj === 'list') {
          const arrayMappings: { [key: string]: BuiltinMapping } = {
            length: { aikenName: 'length_of_bytearray', importName: 'lengthOfByteString' },
            push: { aikenName: 'cons_list', importName: 'mkCons' },
            concat: { aikenName: 'append_bytearray', importName: 'appendByteString' },
            slice: { aikenName: 'slice_bytearray', importName: 'sliceByteString' },
            indexOf: { aikenName: 'index_bytearray', importName: 'indexByteString' },
          };
          if (arrayMappings[method]) {
            return arrayMappings[method];
          }
        }

        // Handle string methods
        if (obj === 'string' || obj === 'str') {
          const stringMappings: { [key: string]: BuiltinMapping } = {
            length: { aikenName: 'length_of_bytearray', importName: 'lengthOfByteString' },
            slice: { aikenName: 'slice_bytearray', importName: 'sliceByteString' },
            charAt: { aikenName: 'index_bytearray', importName: 'indexByteString' },
            toString: { aikenName: 'encode_utf8', importName: 'encodeUtf8' },
          };
          if (stringMappings[method]) {
            return stringMappings[method];
          }
        }

        // Handle Math methods
        if (obj === 'Math') {
          const mathMappings: { [key: string]: BuiltinMapping } = {
            abs: { aikenName: 'if_then_else', importName: 'ifThenElse' },
            max: { aikenName: 'if_then_else', importName: 'ifThenElse' },
            min: { aikenName: 'if_then_else', importName: 'ifThenElse' },
          };
          if (mathMappings[method]) {
            return mathMappings[method];
          }
        }

        // Handle Buffer methods
        if (obj === 'Buffer') {
          const bufferMappings: { [key: string]: BuiltinMapping } = {
            from: { aikenName: 'b_data', importName: 'bData' },
          };
          if (bufferMappings[method]) {
            return bufferMappings[method];
          }
        }

        // Handle console methods
        if (obj === 'console') {
          const consoleMappings: { [key: string]: BuiltinMapping } = {
            log: { aikenName: 'debug', importName: 'trace' },
          };
          if (consoleMappings[method]) {
            return consoleMappings[method];
          }
        }
      }
    }

    return null;
  }

  /**
   * Mark a builtin function as used
   */
  markAsUsed(functionName: string): void {
    const mapping = this.getMapping(functionName);
    if (mapping) {
      this.usedBuiltins.add(mapping.importName || mapping.aikenName);
    }
  }

  /**
   * Get all used builtin import names
   */
  getUsedImports(): string[] {
    return Array.from(this.usedBuiltins);
  }

  /**
   * Check if a function name is a builtin
   */
  isBuiltin(functionName: string): boolean {
    return this.getMapping(functionName) !== null;
  }

  /**
   * Reset used builtins tracking
   */
  reset(): void {
    this.usedBuiltins.clear();
  }
}
