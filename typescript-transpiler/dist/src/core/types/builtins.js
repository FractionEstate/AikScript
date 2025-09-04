"use strict";
/**
 * Builtin function mappings and utilities for TypeScript-to-Aiken transpiler
 * This module handles the mapping of TypeScript/JavaScript functions to Aiken builtin functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinRegistry = void 0;
class BuiltinRegistry {
    constructor() {
        this.mappings = new Map();
        this.usedBuiltins = new Set();
        this.initializeMappings();
    }
    initializeMappings() {
        // Complete List operations
        this.addMapping('push', { aikenName: 'list.push', importName: '@aiken/collection' });
        this.addMapping('concat', { aikenName: 'list.concat', importName: '@aiken/collection' });
        this.addMapping('length', { aikenName: 'list.length', importName: '@aiken/collection' });
        this.addMapping('slice', { aikenName: 'list.slice', importName: '@aiken/collection' });
        this.addMapping('indexOf', { aikenName: 'list.index_of', importName: '@aiken/collection' });
        this.addMapping('includes', { aikenName: 'list.has', importName: '@aiken/collection' });
        this.addMapping('filter', { aikenName: 'list.filter', importName: '@aiken/collection' });
        this.addMapping('map', { aikenName: 'list.map', importName: '@aiken/collection' });
        this.addMapping('foldl', { aikenName: 'list.foldl', importName: '@aiken/collection' });
        this.addMapping('foldr', { aikenName: 'list.foldr', importName: '@aiken/collection' });
        this.addMapping('reverse', { aikenName: 'list.reverse', importName: '@aiken/collection' });
        this.addMapping('head', { aikenName: 'list.head', importName: '@aiken/collection' });
        this.addMapping('tail', { aikenName: 'list.tail', importName: '@aiken/collection' });
        this.addMapping('isEmpty', { aikenName: 'list.is_empty', importName: '@aiken/collection' });
        this.addMapping('last', { aikenName: 'list.last', importName: '@aiken/collection' });
        this.addMapping('delete', { aikenName: 'list.delete', importName: '@aiken/collection' });
        this.addMapping('drop', { aikenName: 'list.drop', importName: '@aiken/collection' });
        this.addMapping('dropWhile', { aikenName: 'list.drop_while', importName: '@aiken/collection' });
        this.addMapping('filterMap', { aikenName: 'list.filter_map', importName: '@aiken/collection' });
        this.addMapping('init', { aikenName: 'list.init', importName: '@aiken/collection' });
        this.addMapping('partition', { aikenName: 'list.partition', importName: '@aiken/collection' });
        this.addMapping('span', { aikenName: 'list.span', importName: '@aiken/collection' });
        this.addMapping('take', { aikenName: 'list.take', importName: '@aiken/collection' });
        this.addMapping('takeWhile', { aikenName: 'list.take_while', importName: '@aiken/collection' });
        this.addMapping('unique', { aikenName: 'list.unique', importName: '@aiken/collection' });
        this.addMapping('flatMap', { aikenName: 'list.flat_map', importName: '@aiken/collection' });
        this.addMapping('forEach', { aikenName: 'list.for_each', importName: '@aiken/collection' });
        this.addMapping('indexedMap', { aikenName: 'list.indexed_map', importName: '@aiken/collection' });
        this.addMapping('map2', { aikenName: 'list.map2', importName: '@aiken/collection' });
        this.addMapping('map3', { aikenName: 'list.map3', importName: '@aiken/collection' });
        this.addMapping('sort', { aikenName: 'list.sort', importName: '@aiken/collection' });
        this.addMapping('unzip', { aikenName: 'list.unzip', importName: '@aiken/collection' });
        this.addMapping('difference', { aikenName: 'list.difference', importName: '@aiken/collection' });
        this.addMapping('zip', { aikenName: 'list.zip', importName: '@aiken/collection' });
        this.addMapping('reduce', { aikenName: 'list.reduce', importName: '@aiken/collection' });
        this.addMapping('indexedFoldr', { aikenName: 'list.indexed_foldr', importName: '@aiken/collection' });
        this.addMapping('foldl2', { aikenName: 'list.foldl2', importName: '@aiken/collection' });
        this.addMapping('all', { aikenName: 'list.all', importName: '@aiken/collection' });
        this.addMapping('any', { aikenName: 'list.any', importName: '@aiken/collection' });
        this.addMapping('at', { aikenName: 'list.at', importName: '@aiken/collection' });
        this.addMapping('count', { aikenName: 'list.count', importName: '@aiken/collection' });
        this.addMapping('find', { aikenName: 'list.find', importName: '@aiken/collection' });
        this.addMapping('has', { aikenName: 'list.has', importName: '@aiken/collection' });
        this.addMapping('range', { aikenName: 'list.range', importName: '@aiken/collection' });
        this.addMapping('repeat', { aikenName: 'list.repeat', importName: '@aiken/collection' });
        // Dict operations
        this.addMapping('Dict.empty', { aikenName: 'dict.new', importName: '@aiken/collection' });
        this.addMapping('Dict.get', { aikenName: 'dict.get', importName: '@aiken/collection' });
        this.addMapping('Dict.insert', { aikenName: 'dict.insert', importName: '@aiken/collection' });
        this.addMapping('Dict.delete', { aikenName: 'dict.delete', importName: '@aiken/collection' });
        this.addMapping('Dict.hasKey', { aikenName: 'dict.has_key', importName: '@aiken/collection' });
        this.addMapping('Dict.isEmpty', { aikenName: 'dict.is_empty', importName: '@aiken/collection' });
        this.addMapping('Dict.keys', { aikenName: 'dict.keys', importName: '@aiken/collection' });
        this.addMapping('Dict.size', { aikenName: 'dict.size', importName: '@aiken/collection' });
        this.addMapping('Dict.values', { aikenName: 'dict.values', importName: '@aiken/collection' });
        this.addMapping('Dict.filter', { aikenName: 'dict.filter', importName: '@aiken/collection' });
        this.addMapping('Dict.insertWith', { aikenName: 'dict.insert_with', importName: '@aiken/collection' });
        this.addMapping('Dict.map', { aikenName: 'dict.map', importName: '@aiken/collection' });
        this.addMapping('Dict.pop', { aikenName: 'dict.pop', importName: '@aiken/collection' });
        this.addMapping('Dict.union', { aikenName: 'dict.union', importName: '@aiken/collection' });
        this.addMapping('Dict.unionWith', { aikenName: 'dict.union_with', importName: '@aiken/collection' });
        this.addMapping('Dict.foldl', { aikenName: 'dict.foldl', importName: '@aiken/collection' });
        this.addMapping('Dict.foldr', { aikenName: 'dict.foldr', importName: '@aiken/collection' });
        this.addMapping('Dict.toPairs', { aikenName: 'dict.to_pairs', importName: '@aiken/collection' });
        this.addMapping('Dict.fromPairs', { aikenName: 'dict.from_pairs', importName: '@aiken/collection' });
        this.addMapping('Dict.fromAscendingPairs', { aikenName: 'dict.from_ascending_pairs', importName: '@aiken/collection' });
        this.addMapping('Dict.fromAscendingPairsWith', { aikenName: 'dict.from_ascending_pairs_with', importName: '@aiken/collection' });
        this.addMapping('Dict.find', { aikenName: 'dict.find', importName: '@aiken/collection' });
        // Pairs operations
        this.addMapping('Pairs.getAll', { aikenName: 'pairs.get_all', importName: '@aiken/collection' });
        this.addMapping('Pairs.getFirst', { aikenName: 'pairs.get_first', importName: '@aiken/collection' });
        this.addMapping('Pairs.getLast', { aikenName: 'pairs.get_last', importName: '@aiken/collection' });
        this.addMapping('Pairs.findAll', { aikenName: 'pairs.find_all', importName: '@aiken/collection' });
        this.addMapping('Pairs.findFirst', { aikenName: 'pairs.find_first', importName: '@aiken/collection' });
        this.addMapping('Pairs.findLast', { aikenName: 'pairs.find_last', importName: '@aiken/collection' });
        this.addMapping('Pairs.hasKey', { aikenName: 'pairs.has_key', importName: '@aiken/collection' });
        this.addMapping('Pairs.keys', { aikenName: 'pairs.keys', importName: '@aiken/collection' });
        this.addMapping('Pairs.values', { aikenName: 'pairs.values', importName: '@aiken/collection' });
        this.addMapping('Pairs.deleteAll', { aikenName: 'pairs.delete_all', importName: '@aiken/collection' });
        this.addMapping('Pairs.deleteFirst', { aikenName: 'pairs.delete_first', importName: '@aiken/collection' });
        this.addMapping('Pairs.deleteLast', { aikenName: 'pairs.delete_last', importName: '@aiken/collection' });
        this.addMapping('Pairs.insertByAscendingKey', { aikenName: 'pairs.insert_by_ascending_key', importName: '@aiken/collection' });
        this.addMapping('Pairs.insertWithByAscendingKey', { aikenName: 'pairs.insert_with_by_ascending_key', importName: '@aiken/collection' });
        this.addMapping('Pairs.map', { aikenName: 'pairs.map', importName: '@aiken/collection' });
        this.addMapping('Pairs.repsertByAscendingKey', { aikenName: 'pairs.repsert_by_ascending_key', importName: '@aiken/collection' });
        this.addMapping('Pairs.foldl', { aikenName: 'pairs.foldl', importName: '@aiken/collection' });
        this.addMapping('Pairs.foldr', { aikenName: 'pairs.foldr', importName: '@aiken/collection' });
        // ByteArray operations
        this.addMapping('byteArrayFromIntBigEndian', { aikenName: 'bytearray.from_int_big_endian', importName: '@aiken/collection' });
        this.addMapping('byteArrayFromIntLittleEndian', { aikenName: 'bytearray.from_int_little_endian', importName: '@aiken/collection' });
        this.addMapping('byteArrayFromString', { aikenName: 'bytearray.from_string', importName: '@aiken/collection' });
        this.addMapping('byteArrayPush', { aikenName: 'bytearray.push', importName: '@aiken/collection' });
        this.addMapping('byteArrayAt', { aikenName: 'bytearray.at', importName: '@aiken/collection' });
        this.addMapping('byteArrayIndexOf', { aikenName: 'bytearray.index_of', importName: '@aiken/collection' });
        this.addMapping('byteArrayIsEmpty', { aikenName: 'bytearray.is_empty', importName: '@aiken/collection' });
        this.addMapping('byteArrayLength', { aikenName: 'bytearray.length', importName: '@aiken/collection' });
        this.addMapping('byteArrayTestBit', { aikenName: 'bytearray.test_bit', importName: '@aiken/collection' });
        this.addMapping('byteArrayDrop', { aikenName: 'bytearray.drop', importName: '@aiken/collection' });
        this.addMapping('byteArraySlice', { aikenName: 'bytearray.slice', importName: '@aiken/collection' });
        this.addMapping('byteArrayTake', { aikenName: 'bytearray.take', importName: '@aiken/collection' });
        this.addMapping('byteArrayConcat', { aikenName: 'bytearray.concat', importName: '@aiken/collection' });
        this.addMapping('byteArrayCompare', { aikenName: 'bytearray.compare', importName: '@aiken/collection' });
        this.addMapping('byteArrayFoldl', { aikenName: 'bytearray.foldl', importName: '@aiken/collection' });
        this.addMapping('byteArrayFoldr', { aikenName: 'bytearray.foldr', importName: '@aiken/collection' });
        this.addMapping('byteArrayReduce', { aikenName: 'bytearray.reduce', importName: '@aiken/collection' });
        this.addMapping('byteArrayToIntBigEndian', { aikenName: 'bytearray.to_int_big_endian', importName: '@aiken/collection' });
        this.addMapping('byteArrayToIntLittleEndian', { aikenName: 'bytearray.to_int_little_endian', importName: '@aiken/collection' });
        this.addMapping('byteArrayToString', { aikenName: 'bytearray.to_string', importName: '@aiken/collection' });
        this.addMapping('byteArrayToHex', { aikenName: 'bytearray.to_hex', importName: '@aiken/collection' });
        this.addMapping('byteArrayStartsWith', { aikenName: 'bytearray.starts_with', importName: '@aiken/collection' });
        // String operations
        this.addMapping('stringFromByteArray', { aikenName: 'string.from_bytearray', importName: '@aiken/collection' });
        this.addMapping('stringFromInt', { aikenName: 'string.from_int', importName: '@aiken/collection' });
        this.addMapping('stringConcat', { aikenName: 'string.concat', importName: '@aiken/collection' });
        this.addMapping('stringJoin', { aikenName: 'string.join', importName: '@aiken/collection' });
        this.addMapping('stringToByteArray', { aikenName: 'string.to_bytearray', importName: '@aiken/collection' });
        // Int operations
        this.addMapping('intCompare', { aikenName: 'int.compare', importName: '@aiken/math' });
        this.addMapping('intFromByteArrayBigEndian', { aikenName: 'int.from_bytearray_big_endian', importName: '@aiken/math' });
        this.addMapping('intFromByteArrayLittleEndian', { aikenName: 'int.from_bytearray_little_endian', importName: '@aiken/math' });
        this.addMapping('intFromUtf8', { aikenName: 'int.from_utf8', importName: '@aiken/math' });
        this.addMapping('intToString', { aikenName: 'int.to_string', importName: '@aiken/math' });
        // Math operations
        this.addMapping('Math.abs', { aikenName: 'int.abs', importName: '@aiken/math' });
        this.addMapping('Math.max', { aikenName: 'int.max', importName: '@aiken/math' });
        this.addMapping('Math.min', { aikenName: 'int.min', importName: '@aiken/math' });
        this.addMapping('Math.pow', { aikenName: 'int.pow', importName: '@aiken/math' });
        this.addMapping('Math.sqrt', { aikenName: 'int.sqrt', importName: '@aiken/math' });
        this.addMapping('Math.modulo', { aikenName: 'int.modulo', importName: '@aiken/math' });
        this.addMapping('Math.divide', { aikenName: 'int.divide', importName: '@aiken/math' });
        // Cryptographic functions
        this.addMapping('sha256', { aikenName: 'blake2b_256', importName: '@aiken/crypto' });
        this.addMapping('sha3_256', { aikenName: 'sha3_256', importName: '@aiken/crypto' });
        this.addMapping('keccak256', { aikenName: 'keccak_256', importName: '@aiken/crypto' });
        this.addMapping('ripemd160', { aikenName: 'ripemd_160', importName: '@aiken/crypto' });
        this.addMapping('blake2b_224', { aikenName: 'blake2b_224', importName: '@aiken/crypto' });
        this.addMapping('blake2b_256', { aikenName: 'blake2b_256', importName: '@aiken/crypto' });
        this.addMapping('verifyEcdsaSignature', { aikenName: 'verify_ecdsa_signature', importName: '@aiken/crypto' });
        this.addMapping('verifyEd25519Signature', { aikenName: 'verify_ed25519_signature', importName: '@aiken/crypto' });
        this.addMapping('verifySchnorrSignature', { aikenName: 'verify_schnorr_signature', importName: '@aiken/crypto' });
        // Merkle Patricia Forestry functions
        this.addMapping('sliceByteArray', { aikenName: 'slice_bytearray', importName: 'merkle-patricia-forestry' });
        this.addMapping('nibble', { aikenName: 'nibble', importName: 'merkle-patricia-forestry' });
        this.addMapping('nibbles', { aikenName: 'nibbles', importName: 'merkle-patricia-forestry' });
        this.addMapping('suffix', { aikenName: 'suffix', importName: 'merkle-patricia-forestry' });
        this.addMapping('combineHashes', { aikenName: 'combine', importName: 'merkle-patricia-forestry' });
        this.addMapping('merkle4', { aikenName: 'merkle_4', importName: 'merkle-patricia-forestry' });
        this.addMapping('merkle8', { aikenName: 'merkle_8', importName: 'merkle-patricia-forestry' });
        this.addMapping('merkle16', { aikenName: 'merkle_16', importName: 'merkle-patricia-forestry' });
        this.addMapping('sparseMerkle4', { aikenName: 'sparse_merkle_4', importName: 'merkle-patricia-forestry' });
        this.addMapping('sparseMerkle8', { aikenName: 'sparse_merkle_8', importName: 'merkle-patricia-forestry' });
        this.addMapping('sparseMerkle16', { aikenName: 'sparse_merkle_16', importName: 'merkle-patricia-forestry' });
        // Null hash constants
        this.addMapping('nullHash', { aikenName: 'null_hash', importName: 'merkle-patricia-forestry' });
        this.addMapping('nullHash2', { aikenName: 'null_hash_2', importName: 'merkle-patricia-forestry' });
        this.addMapping('nullHash4', { aikenName: 'null_hash_4', importName: 'merkle-patricia-forestry' });
        this.addMapping('nullHash8', { aikenName: 'null_hash_8', importName: 'merkle-patricia-forestry' });
        // Merkle Patricia Forestry functions
        this.addMapping('mpfFromRoot', { aikenName: 'from_root', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfIsEmpty', { aikenName: 'is_empty', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfHas', { aikenName: 'has', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfMiss', { aikenName: 'miss', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfInsert', { aikenName: 'insert', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfDelete', { aikenName: 'delete', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfUpdate', { aikenName: 'update', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfRoot', { aikenName: 'root', importName: 'merkle-patricia-forestry' });
        this.addMapping('mpfEmpty', { aikenName: 'empty', importName: 'merkle-patricia-forestry' });
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
        this.addMapping('Dict.empty', { aikenName: 'dict.new', importName: '@aiken/collection' });
        this.addMapping('Dict.get', { aikenName: 'dict.get', importName: '@aiken/collection' });
        this.addMapping('Dict.insert', { aikenName: 'dict.insert', importName: '@aiken/collection' });
        this.addMapping('Dict.delete', { aikenName: 'dict.delete', importName: '@aiken/collection' });
        this.addMapping('Dict.size', { aikenName: 'dict.size', importName: '@aiken/collection' });
        this.addMapping('Dict.keys', { aikenName: 'dict.keys', importName: '@aiken/collection' });
        this.addMapping('Dict.values', { aikenName: 'dict.values', importName: '@aiken/collection' });
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
    addMapping(functionName, mapping) {
        this.mappings.set(functionName, mapping);
    }
    /**
     * Get builtin mapping for a function name
     */
    getMapping(functionName) {
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
                    const arrayMappings = {
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
                    const stringMappings = {
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
                    const mathMappings = {
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
                    const bufferMappings = {
                        from: { aikenName: 'b_data', importName: 'bData' },
                    };
                    if (bufferMappings[method]) {
                        return bufferMappings[method];
                    }
                }
                // Handle console methods
                if (obj === 'console') {
                    const consoleMappings = {
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
    markAsUsed(functionName) {
        const mapping = this.getMapping(functionName);
        if (mapping) {
            this.usedBuiltins.add(mapping.importName || mapping.aikenName);
        }
    }
    /**
     * Get all used builtin import names
     */
    getUsedImports() {
        return Array.from(this.usedBuiltins);
    }
    /**
     * Check if a function name is a builtin
     */
    isBuiltin(functionName) {
        return this.getMapping(functionName) !== null;
    }
    /**
     * Reset used builtins tracking
     */
    reset() {
        this.usedBuiltins.clear();
    }
}
exports.BuiltinRegistry = BuiltinRegistry;
//# sourceMappingURL=builtins.js.map