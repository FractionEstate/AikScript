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
    // Complete List operations
    this.addMapping('push', { aikenName: 'list.push', importName: 'list' });
    this.addMapping('concat', { aikenName: 'list.concat', importName: 'list' });
    this.addMapping('length', { aikenName: 'list.length', importName: 'list' });
    this.addMapping('slice', { aikenName: 'list.slice', importName: 'list' });
    this.addMapping('indexOf', { aikenName: 'list.index_of', importName: 'list' });
    this.addMapping('includes', { aikenName: 'list.has', importName: 'list' });
    this.addMapping('filter', { aikenName: 'list.filter', importName: 'list' });
    this.addMapping('map', { aikenName: 'list.map', importName: 'list' });
    this.addMapping('foldl', { aikenName: 'list.foldl', importName: 'list' });
    this.addMapping('foldr', { aikenName: 'list.foldr', importName: 'list' });
    this.addMapping('reverse', { aikenName: 'list.reverse', importName: 'list' });
    this.addMapping('head', { aikenName: 'list.head', importName: 'list' });
    this.addMapping('tail', { aikenName: 'list.tail', importName: 'list' });
    this.addMapping('isEmpty', { aikenName: 'list.is_empty', importName: 'list' });
    this.addMapping('last', { aikenName: 'list.last', importName: 'list' });
    this.addMapping('delete', { aikenName: 'list.delete', importName: 'list' });
    this.addMapping('drop', { aikenName: 'list.drop', importName: 'list' });
    this.addMapping('dropWhile', { aikenName: 'list.drop_while', importName: 'list' });
    this.addMapping('filterMap', { aikenName: 'list.filter_map', importName: 'list' });
    this.addMapping('init', { aikenName: 'list.init', importName: 'list' });
    this.addMapping('partition', { aikenName: 'list.partition', importName: 'list' });
    this.addMapping('span', { aikenName: 'list.span', importName: 'list' });
    this.addMapping('take', { aikenName: 'list.take', importName: 'list' });
    this.addMapping('takeWhile', { aikenName: 'list.take_while', importName: 'list' });
    this.addMapping('unique', { aikenName: 'list.unique', importName: 'list' });
    this.addMapping('flatMap', { aikenName: 'list.flat_map', importName: 'list' });
    this.addMapping('forEach', { aikenName: 'list.for_each', importName: 'list' });
    this.addMapping('indexedMap', { aikenName: 'list.indexed_map', importName: 'list' });
    this.addMapping('map2', { aikenName: 'list.map2', importName: 'list' });
    this.addMapping('map3', { aikenName: 'list.map3', importName: 'list' });
    this.addMapping('sort', { aikenName: 'list.sort', importName: 'list' });
    this.addMapping('unzip', { aikenName: 'list.unzip', importName: 'list' });
    this.addMapping('difference', { aikenName: 'list.difference', importName: 'list' });
    this.addMapping('zip', { aikenName: 'list.zip', importName: 'list' });
    this.addMapping('reduce', { aikenName: 'list.reduce', importName: 'list' });
    this.addMapping('indexedFoldr', { aikenName: 'list.indexed_foldr', importName: 'list' });
    this.addMapping('foldl2', { aikenName: 'list.foldl2', importName: 'list' });
    this.addMapping('all', { aikenName: 'list.all', importName: 'list' });
    this.addMapping('any', { aikenName: 'list.any', importName: 'list' });
    this.addMapping('at', { aikenName: 'list.at', importName: 'list' });
    this.addMapping('count', { aikenName: 'list.count', importName: 'list' });
    this.addMapping('find', { aikenName: 'list.find', importName: 'list' });
    this.addMapping('has', { aikenName: 'list.has', importName: 'list' });
    this.addMapping('range', { aikenName: 'list.range', importName: 'list' });
    this.addMapping('repeat', { aikenName: 'list.repeat', importName: 'list' });

    // Dict operations
    this.addMapping('Dict.empty', { aikenName: 'dict.new', importName: 'dict' });
    this.addMapping('Dict.get', { aikenName: 'dict.get', importName: 'dict' });
    this.addMapping('Dict.insert', { aikenName: 'dict.insert', importName: 'dict' });
    this.addMapping('Dict.delete', { aikenName: 'dict.delete', importName: 'dict' });
    this.addMapping('Dict.hasKey', { aikenName: 'dict.has_key', importName: 'dict' });
    this.addMapping('Dict.isEmpty', { aikenName: 'dict.is_empty', importName: 'dict' });
    this.addMapping('Dict.keys', { aikenName: 'dict.keys', importName: 'dict' });
    this.addMapping('Dict.size', { aikenName: 'dict.size', importName: 'dict' });
    this.addMapping('Dict.values', { aikenName: 'dict.values', importName: 'dict' });
    this.addMapping('Dict.filter', { aikenName: 'dict.filter', importName: 'dict' });
    this.addMapping('Dict.insertWith', { aikenName: 'dict.insert_with', importName: 'dict' });
    this.addMapping('Dict.map', { aikenName: 'dict.map', importName: 'dict' });
    this.addMapping('Dict.pop', { aikenName: 'dict.pop', importName: 'dict' });
    this.addMapping('Dict.union', { aikenName: 'dict.union', importName: 'dict' });
    this.addMapping('Dict.unionWith', { aikenName: 'dict.union_with', importName: 'dict' });
    this.addMapping('Dict.foldl', { aikenName: 'dict.foldl', importName: 'dict' });
    this.addMapping('Dict.foldr', { aikenName: 'dict.foldr', importName: 'dict' });
    this.addMapping('Dict.toPairs', { aikenName: 'dict.to_pairs', importName: 'dict' });
    this.addMapping('Dict.fromPairs', { aikenName: 'dict.from_pairs', importName: 'dict' });
    this.addMapping('Dict.fromAscendingPairs', { aikenName: 'dict.from_ascending_pairs', importName: 'dict' });
    this.addMapping('Dict.fromAscendingPairsWith', { aikenName: 'dict.from_ascending_pairs_with', importName: 'dict' });
    this.addMapping('Dict.find', { aikenName: 'dict.find', importName: 'dict' });

    // Pairs operations
    this.addMapping('Pairs.getAll', { aikenName: 'pairs.get_all', importName: 'pairs' });
    this.addMapping('Pairs.getFirst', { aikenName: 'pairs.get_first', importName: 'pairs' });
    this.addMapping('Pairs.getLast', { aikenName: 'pairs.get_last', importName: 'pairs' });
    this.addMapping('Pairs.findAll', { aikenName: 'pairs.find_all', importName: 'pairs' });
    this.addMapping('Pairs.findFirst', { aikenName: 'pairs.find_first', importName: 'pairs' });
    this.addMapping('Pairs.findLast', { aikenName: 'pairs.find_last', importName: 'pairs' });
    this.addMapping('Pairs.hasKey', { aikenName: 'pairs.has_key', importName: 'pairs' });
    this.addMapping('Pairs.keys', { aikenName: 'pairs.keys', importName: 'pairs' });
    this.addMapping('Pairs.values', { aikenName: 'pairs.values', importName: 'pairs' });
    this.addMapping('Pairs.deleteAll', { aikenName: 'pairs.delete_all', importName: 'pairs' });
    this.addMapping('Pairs.deleteFirst', { aikenName: 'pairs.delete_first', importName: 'pairs' });
    this.addMapping('Pairs.deleteLast', { aikenName: 'pairs.delete_last', importName: 'pairs' });
    this.addMapping('Pairs.insertByAscendingKey', { aikenName: 'pairs.insert_by_ascending_key', importName: 'pairs' });
    this.addMapping('Pairs.insertWithByAscendingKey', { aikenName: 'pairs.insert_with_by_ascending_key', importName: 'pairs' });
    this.addMapping('Pairs.map', { aikenName: 'pairs.map', importName: 'pairs' });
    this.addMapping('Pairs.repsertByAscendingKey', { aikenName: 'pairs.repsert_by_ascending_key', importName: 'pairs' });
    this.addMapping('Pairs.foldl', { aikenName: 'pairs.foldl', importName: 'pairs' });
    this.addMapping('Pairs.foldr', { aikenName: 'pairs.foldr', importName: 'pairs' });

    // ByteArray operations
    this.addMapping('byteArrayFromIntBigEndian', { aikenName: 'bytearray.from_int_big_endian', importName: 'bytearray' });
    this.addMapping('byteArrayFromIntLittleEndian', { aikenName: 'bytearray.from_int_little_endian', importName: 'bytearray' });
    this.addMapping('byteArrayFromString', { aikenName: 'bytearray.from_string', importName: 'bytearray' });
    this.addMapping('byteArrayPush', { aikenName: 'bytearray.push', importName: 'bytearray' });
    this.addMapping('byteArrayAt', { aikenName: 'bytearray.at', importName: 'bytearray' });
    this.addMapping('byteArrayIndexOf', { aikenName: 'bytearray.index_of', importName: 'bytearray' });
    this.addMapping('byteArrayIsEmpty', { aikenName: 'bytearray.is_empty', importName: 'bytearray' });
    this.addMapping('byteArrayLength', { aikenName: 'bytearray.length', importName: 'bytearray' });
    this.addMapping('byteArrayTestBit', { aikenName: 'bytearray.test_bit', importName: 'bytearray' });
    this.addMapping('byteArrayDrop', { aikenName: 'bytearray.drop', importName: 'bytearray' });
    this.addMapping('byteArraySlice', { aikenName: 'bytearray.slice', importName: 'bytearray' });
    this.addMapping('byteArrayTake', { aikenName: 'bytearray.take', importName: 'bytearray' });
    this.addMapping('byteArrayConcat', { aikenName: 'bytearray.concat', importName: 'bytearray' });
    this.addMapping('byteArrayCompare', { aikenName: 'bytearray.compare', importName: 'bytearray' });
    this.addMapping('byteArrayFoldl', { aikenName: 'bytearray.foldl', importName: 'bytearray' });
    this.addMapping('byteArrayFoldr', { aikenName: 'bytearray.foldr', importName: 'bytearray' });
    this.addMapping('byteArrayReduce', { aikenName: 'bytearray.reduce', importName: 'bytearray' });
    this.addMapping('byteArrayToIntBigEndian', { aikenName: 'bytearray.to_int_big_endian', importName: 'bytearray' });
    this.addMapping('byteArrayToIntLittleEndian', { aikenName: 'bytearray.to_int_little_endian', importName: 'bytearray' });
    this.addMapping('byteArrayToString', { aikenName: 'bytearray.to_string', importName: 'bytearray' });
    this.addMapping('byteArrayToHex', { aikenName: 'bytearray.to_hex', importName: 'bytearray' });
    this.addMapping('byteArrayStartsWith', { aikenName: 'bytearray.starts_with', importName: 'bytearray' });

    // String operations
    this.addMapping('stringFromByteArray', { aikenName: 'string.from_bytearray', importName: 'string' });
    this.addMapping('stringFromInt', { aikenName: 'string.from_int', importName: 'string' });
    this.addMapping('stringConcat', { aikenName: 'string.concat', importName: 'string' });
    this.addMapping('stringJoin', { aikenName: 'string.join', importName: 'string' });
    this.addMapping('stringToByteArray', { aikenName: 'string.to_bytearray', importName: 'string' });

    // Int operations
    this.addMapping('intCompare', { aikenName: 'int.compare', importName: 'int' });
    this.addMapping('intFromByteArrayBigEndian', { aikenName: 'int.from_bytearray_big_endian', importName: 'int' });
    this.addMapping('intFromByteArrayLittleEndian', { aikenName: 'int.from_bytearray_little_endian', importName: 'int' });
    this.addMapping('intFromUtf8', { aikenName: 'int.from_utf8', importName: 'int' });
    this.addMapping('intToString', { aikenName: 'int.to_string', importName: 'int' });

    // Math operations
    this.addMapping('Math.abs', { aikenName: 'int.abs', importName: 'int' });
    this.addMapping('Math.max', { aikenName: 'int.max', importName: 'int' });
    this.addMapping('Math.min', { aikenName: 'int.min', importName: 'int' });
    this.addMapping('Math.pow', { aikenName: 'int.pow', importName: 'int' });
    this.addMapping('Math.sqrt', { aikenName: 'int.sqrt', importName: 'int' });
    this.addMapping('Math.modulo', { aikenName: 'int.modulo', importName: 'int' });
    this.addMapping('Math.divide', { aikenName: 'int.divide', importName: 'int' });

    // Cryptographic functions
    this.addMapping('sha256', { aikenName: 'blake2b_256', importName: 'blake2b_256' });
    this.addMapping('sha3_256', { aikenName: 'sha3_256', importName: 'sha3_256' });
    this.addMapping('keccak256', { aikenName: 'keccak_256', importName: 'keccak_256' });
    this.addMapping('ripemd160', { aikenName: 'ripemd_160', importName: 'ripemd_160' });
    this.addMapping('blake2b_224', { aikenName: 'blake2b_224', importName: 'blake2b_224' });
    this.addMapping('blake2b_256', { aikenName: 'blake2b_256', importName: 'blake2b_256' });

    // Merkle Patricia Forestry functions
    this.addMapping('sliceByteArray', { aikenName: 'slice_bytearray', importName: 'sliceByteArray' });
    this.addMapping('nibble', { aikenName: 'nibble', importName: 'nibble' });
    this.addMapping('nibbles', { aikenName: 'nibbles', importName: 'nibbles' });
    this.addMapping('suffix', { aikenName: 'suffix', importName: 'suffix' });
    this.addMapping('combineHashes', { aikenName: 'combine', importName: 'combineHashes' });
    this.addMapping('merkle4', { aikenName: 'merkle_4', importName: 'merkle4' });
    this.addMapping('merkle8', { aikenName: 'merkle_8', importName: 'merkle8' });
    this.addMapping('merkle16', { aikenName: 'merkle_16', importName: 'merkle16' });
    this.addMapping('sparseMerkle4', { aikenName: 'sparse_merkle_4', importName: 'sparseMerkle4' });
    this.addMapping('sparseMerkle8', { aikenName: 'sparse_merkle_8', importName: 'sparseMerkle8' });
    this.addMapping('sparseMerkle16', { aikenName: 'sparse_merkle_16', importName: 'sparseMerkle16' });

    // Null hash constants
    this.addMapping('nullHash', { aikenName: 'nullHash', importName: undefined });
    this.addMapping('nullHash2', { aikenName: 'nullHash2', importName: undefined });
    this.addMapping('nullHash4', { aikenName: 'nullHash4', importName: undefined });
    this.addMapping('nullHash8', { aikenName: 'nullHash8', importName: undefined });

    // Merkle Patricia Forestry functions
    this.addMapping('mpfFromRoot', { aikenName: 'mpf_from_root', importName: undefined });
    this.addMapping('mpfIsEmpty', { aikenName: 'mpf_is_empty', importName: undefined });
    this.addMapping('mpfHas', { aikenName: 'mpf_has', importName: undefined });
    this.addMapping('mpfMiss', { aikenName: 'mpf_miss', importName: undefined });
    this.addMapping('mpfInsert', { aikenName: 'mpf_insert', importName: undefined });
    this.addMapping('mpfDelete', { aikenName: 'mpf_delete', importName: undefined });
    this.addMapping('mpfUpdate', { aikenName: 'mpf_update', importName: undefined });
    this.addMapping('mpfRoot', { aikenName: 'mpf_root', importName: undefined });
    this.addMapping('mpfEmpty', { aikenName: 'mpf_empty', importName: undefined });

    // Data conversion functions
    this.addMapping('Buffer.from', { aikenName: 'b_data', importName: 'bData' });
    this.addMapping('parseInt', {
      aikenName: 'bytearray_to_integer',
      importName: 'byteStringToInteger',
    });
    this.addMapping('toHex', { aikenName: 'encode_base16', importName: 'encodeBase16' });
    this.addMapping('fromHex', { aikenName: 'decode_base16', importName: 'decodeBase16' });

    // Data constructors
    this.addMapping('iData', { aikenName: 'i_data', importName: 'iData' });
    this.addMapping('bData', { aikenName: 'b_data', importName: 'bData' });
    this.addMapping('constrData', { aikenName: 'constr_data', importName: 'constrData' });
    this.addMapping('listData', { aikenName: 'list_data', importName: 'listData' });
    this.addMapping('mapData', { aikenName: 'map_data', importName: 'mapData' });

    // Utility functions
    this.addMapping('lengthOfByteString', {
      aikenName: 'length_of_bytearray',
      importName: 'lengthOfByteString',
    });
    this.addMapping('indexByteString', {
      aikenName: 'index_bytearray',
      importName: 'indexByteString',
    });
    this.addMapping('sliceByteString', {
      aikenName: 'slice_bytearray',
      importName: 'sliceByteString',
    });
    this.addMapping('appendByteString', {
      aikenName: 'append_bytearray',
      importName: 'appendByteString',
    });
    this.addMapping('equalsByteString', {
      aikenName: 'equals_bytearray',
      importName: 'equalsByteString',
    });

    // Pair/Tuple operations
    this.addMapping('fst', { aikenName: 'pair.fst', importName: 'pair' });
    this.addMapping('snd', { aikenName: 'pair.snd', importName: 'pair' });

    // Option/Maybe operations
    this.addMapping('Some', { aikenName: 'option.some', importName: 'option' });
    this.addMapping('None', { aikenName: 'option.none', importName: 'option' });
    this.addMapping('isSome', { aikenName: 'option.is_some', importName: 'option' });
    this.addMapping('isNone', { aikenName: 'option.is_none', importName: 'option' });
    this.addMapping('unwrap', { aikenName: 'option.unwrap', importName: 'option' });
    this.addMapping('unwrapOr', { aikenName: 'option.unwrap_or', importName: 'option' });

    // Dict/Map operations
    this.addMapping('Dict.empty', { aikenName: 'dict.new', importName: 'dict' });
    this.addMapping('Dict.get', { aikenName: 'dict.get', importName: 'dict' });
    this.addMapping('Dict.insert', { aikenName: 'dict.insert', importName: 'dict' });
    this.addMapping('Dict.delete', { aikenName: 'dict.delete', importName: 'dict' });
    this.addMapping('Dict.size', { aikenName: 'dict.size', importName: 'dict' });
    this.addMapping('Dict.keys', { aikenName: 'dict.keys', importName: 'dict' });
    this.addMapping('Dict.values', { aikenName: 'dict.values', importName: 'dict' });

    // Control flow and utilities
    this.addMapping('trace', { aikenName: 'trace', importName: 'trace' });
    this.addMapping('fail', { aikenName: 'fail', importName: 'fail' });
    this.addMapping('todo', { aikenName: 'todo', importName: 'todo' });

    // Comparison operations
    this.addMapping('equals', { aikenName: '==', importName: undefined });
    this.addMapping('notEquals', { aikenName: '!=', importName: undefined });
    this.addMapping('lessThan', { aikenName: '<', importName: undefined });
    this.addMapping('lessThanOrEqual', { aikenName: '<=', importName: undefined });
    this.addMapping('greaterThan', { aikenName: '>', importName: undefined });
    this.addMapping('greaterThanOrEqual', { aikenName: '>=', importName: undefined });

    // Logical operations
    this.addMapping('and', { aikenName: '&&', importName: undefined });
    this.addMapping('or', { aikenName: '||', importName: undefined });
    this.addMapping('not', { aikenName: '!', importName: undefined });

    // Pipe operations
    this.addMapping('pipe', { aikenName: '|>', importName: undefined });
    this.addMapping('pipeReverse', { aikenName: '<|', importName: undefined });

    // Expect operations
    this.addMapping('expect', { aikenName: 'expect', importName: undefined });
    this.addMapping('expectJust', { aikenName: 'expect', importName: undefined });

    // ===== MISSING STDLIB INTEGRATIONS =====

    // CBOR operations
    this.addMapping('cborDiagnostic', { aikenName: 'cbor.diagnostic', importName: 'cbor' });
    this.addMapping('cborDeserialise', { aikenName: 'cbor.deserialise', importName: 'cbor' });
    this.addMapping('cborSerialise', { aikenName: 'cbor.serialise', importName: 'cbor' });

    // BLS12-381 G1 operations (complete)
    this.addMapping('bls12_381_g1_add', { aikenName: 'bls12_381_g1_add', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_sub', { aikenName: 'bls12_381_g1_sub', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_scalar_mul', { aikenName: 'bls12_381_g1_scale', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_neg', { aikenName: 'bls12_381_g1_neg', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_compress', { aikenName: 'bls12_381_g1_compress', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_decompress', { aikenName: 'bls12_381_g1_decompress', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_hash_to_curve', { aikenName: 'bls12_381_g1_hash_to_group', importName: 'bls12_381_g1' });
    this.addMapping('bls12_381_g1_equal', { aikenName: 'bls12_381_g1_equal', importName: 'bls12_381_g1' });

    // BLS12-381 G2 operations (complete)
    this.addMapping('bls12_381_g2_add', { aikenName: 'bls12_381_g2_add', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_sub', { aikenName: 'bls12_381_g2_sub', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_scalar_mul', { aikenName: 'bls12_381_g2_scale', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_neg', { aikenName: 'bls12_381_g2_neg', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_compress', { aikenName: 'bls12_381_g2_compress', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_decompress', { aikenName: 'bls12_381_g2_decompress', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_hash_to_curve', { aikenName: 'bls12_381_g2_hash_to_group', importName: 'bls12_381_g2' });
    this.addMapping('bls12_381_g2_equal', { aikenName: 'bls12_381_g2_equal', importName: 'bls12_381_g2' });

    // BLS12-381 Scalar operations (complete)
    this.addMapping('bls12_381_scalar_new', { aikenName: 'bls12_381_scalar_new', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_from_bytearray_big_endian', { aikenName: 'bls12_381_scalar_from_bytearray_big_endian', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_from_bytearray_little_endian', { aikenName: 'bls12_381_scalar_from_bytearray_little_endian', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_scale', { aikenName: 'bls12_381_scalar_scale', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_scale2', { aikenName: 'bls12_381_scalar_scale2', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_add', { aikenName: 'bls12_381_scalar_add', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_div', { aikenName: 'bls12_381_scalar_div', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_mul', { aikenName: 'bls12_381_scalar_mul', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_neg', { aikenName: 'bls12_381_scalar_neg', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_recip', { aikenName: 'bls12_381_scalar_recip', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_sub', { aikenName: 'bls12_381_scalar_sub', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_to_int', { aikenName: 'bls12_381_scalar_to_int', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_to_bytearray_big_endian', { aikenName: 'bls12_381_scalar_to_bytearray_big_endian', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_to_bytearray_little_endian', { aikenName: 'bls12_381_scalar_to_bytearray_little_endian', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_from_integer', { aikenName: 'bls12_381_scalar_from_integer', importName: 'bls12_381_scalar' });
    this.addMapping('bls12_381_scalar_inv', { aikenName: 'bls12_381_scalar_recip', importName: 'bls12_381_scalar' });

    // BLS12-381 Pairing
    this.addMapping('bls12_381_miller_loop', { aikenName: 'bls12_381_miller_loop', importName: 'bls12_381' });
    this.addMapping('bls12_381_mul_ml_result', { aikenName: 'bls12_381_mul_ml_result', importName: 'bls12_381' });
    this.addMapping('bls12_381_final_verify', { aikenName: 'bls12_381_final_verify', importName: 'bls12_381' });

    // Interval operations (complete)
    this.addMapping('intervalAfter', { aikenName: 'interval.after', importName: 'interval' });
    this.addMapping('intervalEntirelyAfter', { aikenName: 'interval.entirely_after', importName: 'interval' });
    this.addMapping('intervalBefore', { aikenName: 'interval.before', importName: 'interval' });
    this.addMapping('intervalEntirelyBefore', { aikenName: 'interval.entirely_before', importName: 'interval' });
    this.addMapping('intervalBetween', { aikenName: 'interval.between', importName: 'interval' });
    this.addMapping('intervalEntirelyBetween', { aikenName: 'interval.entirely_between', importName: 'interval' });
    this.addMapping('intervalContains', { aikenName: 'interval.contains', importName: 'interval' });
    this.addMapping('intervalIsEmpty', { aikenName: 'interval.is_empty', importName: 'interval' });
    this.addMapping('intervalIsEntirelyAfter', { aikenName: 'interval.is_entirely_after', importName: 'interval' });
    this.addMapping('intervalIsEntirelyBefore', { aikenName: 'interval.is_entirely_before', importName: 'interval' });
    this.addMapping('intervalHull', { aikenName: 'interval.hull', importName: 'interval' });
    this.addMapping('intervalIntersection', { aikenName: 'interval.intersection', importName: 'interval' });
    this.addMapping('intervalMax', { aikenName: 'interval.max', importName: 'interval' });
    this.addMapping('intervalMin', { aikenName: 'interval.min', importName: 'interval' });
    this.addMapping('intervalMember', { aikenName: 'interval.member', importName: 'interval' });
    this.addMapping('intervalSingleton', { aikenName: 'interval.singleton', importName: 'interval' });
    this.addMapping('intervalFrom', { aikenName: 'interval.from', importName: 'interval' });
    this.addMapping('intervalTo', { aikenName: 'interval.to', importName: 'interval' });

    // Rational math operations (complete)
    this.addMapping('rationalFromInt', { aikenName: 'rational.from_int', importName: 'rational' });
    this.addMapping('rationalNew', { aikenName: 'rational.new', importName: 'rational' });
    this.addMapping('rationalNumerator', { aikenName: 'rational.numerator', importName: 'rational' });
    this.addMapping('rationalDenominator', { aikenName: 'rational.denominator', importName: 'rational' });
    this.addMapping('rationalAbs', { aikenName: 'rational.abs', importName: 'rational' });
    this.addMapping('rationalNegate', { aikenName: 'rational.negate', importName: 'rational' });
    this.addMapping('rationalReciprocal', { aikenName: 'rational.reciprocal', importName: 'rational' });
    this.addMapping('rationalReduce', { aikenName: 'rational.reduce', importName: 'rational' });
    this.addMapping('rationalAdd', { aikenName: 'rational.add', importName: 'rational' });
    this.addMapping('rationalDiv', { aikenName: 'rational.div', importName: 'rational' });
    this.addMapping('rationalMultiply', { aikenName: 'rational.mul', importName: 'rational' });
    this.addMapping('rationalSubtract', { aikenName: 'rational.sub', importName: 'rational' });
    this.addMapping('rationalCompare', { aikenName: 'rational.compare', importName: 'rational' });
    this.addMapping('rationalCompareWith', { aikenName: 'rational.compare_with', importName: 'rational' });
    this.addMapping('rationalArithmeticMean', { aikenName: 'rational.arithmetic_mean', importName: 'rational' });
    this.addMapping('rationalGeometricMean', { aikenName: 'rational.geometric_mean', importName: 'rational' });
    this.addMapping('rationalCeil', { aikenName: 'rational.ceil', importName: 'rational' });
    this.addMapping('rationalFloor', { aikenName: 'rational.floor', importName: 'rational' });
    this.addMapping('rationalPow', { aikenName: 'rational.pow', importName: 'rational' });
    this.addMapping('rationalProperFraction', { aikenName: 'rational.proper_fraction', importName: 'rational' });
    this.addMapping('rationalRound', { aikenName: 'rational.round', importName: 'rational' });
    this.addMapping('rationalRoundEven', { aikenName: 'rational.round_even', importName: 'rational' });
    this.addMapping('rationalTruncate', { aikenName: 'rational.truncate', importName: 'rational' });
    this.addMapping('rationalFromInteger', { aikenName: 'rational.from_int', importName: 'rational' });

    // ===== PLUTUS BUILTINS FROM AIKEN PRELUDE =====

    // Integer arithmetic operations (Plutus builtins)
    this.addMapping('addInteger', { aikenName: 'add_integer', importName: 'addInteger' });
    this.addMapping('subtractInteger', { aikenName: 'subtract_integer', importName: 'subtractInteger' });
    this.addMapping('multiplyInteger', { aikenName: 'multiply_integer', importName: 'multiplyInteger' });
    this.addMapping('divideInteger', { aikenName: 'divide_integer', importName: 'divideInteger' });
    this.addMapping('moduloInteger', { aikenName: 'modulo_integer', importName: 'moduloInteger' });
    this.addMapping('quotientInteger', { aikenName: 'quotient_integer', importName: 'quotientInteger' });
    this.addMapping('remainderInteger', { aikenName: 'remainder_integer', importName: 'remainderInteger' });
    this.addMapping('equalsInteger', { aikenName: 'equals_integer', importName: 'equalsInteger' });
    this.addMapping('lessThanInteger', { aikenName: 'less_than_integer', importName: 'lessThanInteger' });
    this.addMapping('lessThanEqualsInteger', { aikenName: 'less_than_equals_integer', importName: 'lessThanEqualsInteger' });

    // ByteArray operations (Plutus builtins)
    this.addMapping('appendByteArray', { aikenName: 'append_bytearray', importName: 'appendByteArray' });
    this.addMapping('consByteArray', { aikenName: 'cons_bytearray', importName: 'consByteArray' });
    this.addMapping('sliceByteArray', { aikenName: 'slice_bytearray', importName: 'sliceByteArray' });
    this.addMapping('lengthOfByteArray', { aikenName: 'length_of_bytearray', importName: 'lengthOfByteArray' });
    this.addMapping('indexByteArray', { aikenName: 'index_bytearray', importName: 'indexByteArray' });
    this.addMapping('equalsByteArray', { aikenName: 'equals_bytearray', importName: 'equalsByteArray' });
    this.addMapping('lessThanByteArray', { aikenName: 'less_than_bytearray', importName: 'lessThanByteArray' });
    this.addMapping('lessThanEqualsByteArray', { aikenName: 'less_than_equals_bytearray', importName: 'lessThanEqualsByteArray' });

    // Cryptographic hash functions (Plutus builtins)
    this.addMapping('blake2b_256', { aikenName: 'blake2b_256', importName: 'blake2b_256' });
    this.addMapping('sha2_256', { aikenName: 'sha2_256', importName: 'sha2_256' });
    this.addMapping('sha3_256', { aikenName: 'sha3_256', importName: 'sha3_256' });
    this.addMapping('keccak_256', { aikenName: 'keccak_256', importName: 'keccak_256' });
    this.addMapping('blake2b_224', { aikenName: 'blake2b_224', importName: 'blake2b_224' });
    this.addMapping('ripemd_160', { aikenName: 'ripemd_160', importName: 'ripemd_160' });

    // Signature verification (Plutus builtins)
    this.addMapping('verifyEd25519Signature', { aikenName: 'verify_ed25519_signature', importName: 'verifyEd25519Signature' });
    this.addMapping('verifyEcdsaSecp256k1Signature', { aikenName: 'verify_ecdsa_secp256k1_signature', importName: 'verifyEcdsaSecp256k1Signature' });
    this.addMapping('verifySchnorrSecp256k1Signature', { aikenName: 'verify_schnorr_secp256k1_signature', importName: 'verifySchnorrSecp256k1Signature' });

    // Data constructors (Plutus builtins)
    this.addMapping('iData', { aikenName: 'i_data', importName: 'iData' });
    this.addMapping('bData', { aikenName: 'b_data', importName: 'bData' });
    this.addMapping('constrData', { aikenName: 'constr_data', importName: 'constrData' });
    this.addMapping('listData', { aikenName: 'list_data', importName: 'listData' });
    this.addMapping('mapData', { aikenName: 'map_data', importName: 'mapData' });

    // Data manipulation (Plutus builtins)
    this.addMapping('equalsData', { aikenName: 'equals_data', importName: 'equalsData' });
    this.addMapping('serialiseData', { aikenName: 'serialise_data', importName: 'serialiseData' });
    this.addMapping('chooseData', { aikenName: 'choose_data', importName: 'chooseData' });
    this.addMapping('unConstrData', { aikenName: 'un_constr_data', importName: 'unConstrData' });
    this.addMapping('unMapData', { aikenName: 'un_map_data', importName: 'unMapData' });
    this.addMapping('unListData', { aikenName: 'un_list_data', importName: 'unListData' });
    this.addMapping('unIData', { aikenName: 'un_i_data', importName: 'unIData' });
    this.addMapping('unBData', { aikenName: 'un_b_data', importName: 'unBData' });

    // Additional Plutus builtins from prelude
    this.addMapping('nullList', { aikenName: 'null_list', importName: 'nullList' });
    this.addMapping('headList', { aikenName: 'head_list', importName: 'headList' });
    this.addMapping('tailList', { aikenName: 'tail_list', importName: 'tailList' });
    this.addMapping('chooseList', { aikenName: 'choose_list', importName: 'chooseList' });
    this.addMapping('mkCons', { aikenName: 'mk_cons', importName: 'mkCons' });
    this.addMapping('chooseUnit', { aikenName: 'choose_unit', importName: 'chooseUnit' });
    this.addMapping('trace', { aikenName: 'trace', importName: 'trace' });
    this.addMapping('fstPair', { aikenName: 'fst_pair', importName: 'fstPair' });
    this.addMapping('sndPair', { aikenName: 'snd_pair', importName: 'sndPair' });
    this.addMapping('ifThenElse', { aikenName: 'if_then_else', importName: 'ifThenElse' });

    // ===== MISSING STDLIB INTEGRATIONS =====

    // Additional cryptographic functions from stdlib
    this.addMapping('sha2_256', { aikenName: 'sha2_256', importName: 'sha2_256' });
    this.addMapping('sha3_256', { aikenName: 'sha3_256', importName: 'sha3_256' });
    this.addMapping('verifyEcdsaSignature', { aikenName: 'verifyEcdsaSignature', importName: 'verifyEcdsaSignature' });
    this.addMapping('verifySchnorrSignature', { aikenName: 'verifySchnorrSignature', importName: 'verifySchnorrSignature' });

    // Mathematical functions from stdlib
    this.addMapping('mathAbs', { aikenName: 'mathAbs', importName: 'mathAbs' });
    this.addMapping('mathClamp', { aikenName: 'mathClamp', importName: 'mathClamp' });
    this.addMapping('mathGcd', { aikenName: 'mathGcd', importName: 'mathGcd' });
    this.addMapping('mathIsSqrt', { aikenName: 'mathIsSqrt', importName: 'mathIsSqrt' });
    this.addMapping('mathLog', { aikenName: 'mathLog', importName: 'mathLog' });
    this.addMapping('mathLog2', { aikenName: 'mathLog2', importName: 'mathLog2' });

    // List functions from stdlib
    this.addMapping('listPush', { aikenName: 'listPush', importName: 'listPush' });
    this.addMapping('listRange', { aikenName: 'listRange', importName: 'listRange' });
    this.addMapping('listRepeat', { aikenName: 'listRepeat', importName: 'listRepeat' });
    this.addMapping('listAll', { aikenName: 'listAll', importName: 'listAll' });
    this.addMapping('listAny', { aikenName: 'listAny', importName: 'listAny' });

    // Dictionary functions from stdlib
    this.addMapping('dictEmptyStd', { aikenName: 'dictEmptyStd', importName: 'dictEmptyStd' });
    this.addMapping('dictInsertStd', { aikenName: 'dictInsertStd', importName: 'dictInsertStd' });
    this.addMapping('dictGetStd', { aikenName: 'dictGetStd', importName: 'dictGetStd' });
    this.addMapping('dictDeleteStd', { aikenName: 'dictDeleteStd', importName: 'dictDeleteStd' });
    this.addMapping('dictSizeStd', { aikenName: 'dictSizeStd', importName: 'dictSizeStd' });

    // CBOR functions from stdlib
    this.addMapping('cborDiagnostic', { aikenName: 'cborDiagnostic', importName: 'cborDiagnostic' });
    this.addMapping('cborSerialise', { aikenName: 'cborSerialise', importName: 'cborSerialise' });
    this.addMapping('cborDeserialise', { aikenName: 'cborDeserialise', importName: 'cborDeserialise' });

    // Address functions from cardano stdlib
    this.addMapping('addressFromScript', { aikenName: 'addressFromScript', importName: 'addressFromScript' });
    this.addMapping('addressFromVerificationKey', { aikenName: 'addressFromVerificationKey', importName: 'addressFromVerificationKey' });
    this.addMapping('addressWithDelegationKey', { aikenName: 'addressWithDelegationKey', importName: 'addressWithDelegationKey' });
    this.addMapping('addressWithDelegationScript', { aikenName: 'addressWithDelegationScript', importName: 'addressWithDelegationScript' });

    // Asset functions from cardano stdlib
    this.addMapping('valueFromAsset', { aikenName: 'valueFromAsset', importName: 'valueFromAsset' });
    this.addMapping('valueFromAssetList', { aikenName: 'valueFromAssetList', importName: 'valueFromAssetList' });
    this.addMapping('valueZero', { aikenName: 'valueZero', importName: 'valueZero' });
    this.addMapping('valueAdd', { aikenName: 'valueAdd', importName: 'valueAdd' });
    this.addMapping('valueSubtract', { aikenName: 'valueSubtract', importName: 'valueSubtract' });
    this.addMapping('valueGetAsset', { aikenName: 'valueGetAsset', importName: 'valueGetAsset' });
    this.addMapping('valueIsZero', { aikenName: 'valueIsZero', importName: 'valueIsZero' });
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
      const mapping = this.mappings.get(functionName);
      return mapping || null;
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
