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
    this.addMapping('push', { aikenName: 'list.push', importName: 'list' });
    this.addMapping('concat', { aikenName: 'list.concat', importName: 'list' });
    this.addMapping('length', { aikenName: 'list.length', importName: 'list' });
    this.addMapping('slice', { aikenName: 'list.slice', importName: 'list' });
    this.addMapping('indexOf', { aikenName: 'list.find', importName: 'list' });
    this.addMapping('includes', { aikenName: 'list.any', importName: 'list' });
    this.addMapping('filter', { aikenName: 'list.filter', importName: 'list' });
    this.addMapping('map', { aikenName: 'list.map', importName: 'list' });
    this.addMapping('foldl', { aikenName: 'list.foldl', importName: 'list' });
    this.addMapping('foldr', { aikenName: 'list.foldr', importName: 'list' });
    this.addMapping('reverse', { aikenName: 'list.reverse', importName: 'list' });
    this.addMapping('head', { aikenName: 'list.head', importName: 'list' });
    this.addMapping('tail', { aikenName: 'list.tail', importName: 'list' });
    this.addMapping('isEmpty', { aikenName: 'list.is_empty', importName: 'list' });

    // String operations
    this.addMapping('toString', { aikenName: 'encode_utf8', importName: 'encodeUtf8' });
    this.addMapping('charAt', { aikenName: 'string.char_at', importName: 'string' });
    this.addMapping('substring', { aikenName: 'string.slice', importName: 'string' });
    this.addMapping('stringLength', { aikenName: 'string.length', importName: 'string' });
    this.addMapping('stringConcat', { aikenName: 'string.concat', importName: 'string' });
    this.addMapping('stringContains', { aikenName: 'string.contains', importName: 'string' });
    this.addMapping('stringSplit', { aikenName: 'string.split', importName: 'string' });

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
