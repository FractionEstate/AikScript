import { cborDiagnostic, cborSerialise, cborDeserialise } from '@aiken/cbor';
import { ByteArray } from '@/types/basic/index';

// Helper function to create ByteArray from hex string
function hexToByteArray(hex: string): ByteArray {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes as ByteArray;
}

// ------------------------------------------------------------------ diagnostic

describe('cborDiagnostic', () => {
  test('diagnostic_1', () => {
    expect(cborDiagnostic(42)).toBe('42');
  });

  test('diagnostic_2', () => {
    expect(cborDiagnostic(hexToByteArray('a1b2'))).toBe("h'A1B2'");
  });

  test('diagnostic_3', () => {
    expect(cborDiagnostic([1, 2, 3])).toBe('[_ 1, 2, 3]');
  });

  test('diagnostic_4', () => {
    expect(cborDiagnostic([])).toBe('[]');
  });

  test('diagnostic_5', () => {
    expect(cborDiagnostic([1, 2])).toBe('[_ 1, 2]');
  });

  test('diagnostic_6', () => {
    expect(cborDiagnostic([1, hexToByteArray('ff'), 3])).toBe('[_ 1, h\'FF\', 3]');
  });

  test('diagnostic_7', () => {
    expect(cborDiagnostic([[1, hexToByteArray('ff')]])).toBe('[_ [_ 1, h\'FF\']]');
  });

  test('diagnostic_7_alt', () => {
    expect(cborDiagnostic({ '1': hexToByteArray('ff') })).toBe('{_ 1: h\'FF\' }');
  });

  test('diagnostic_8', () => {
    expect(cborDiagnostic({ some: 42 })).toBe('121([_ 42])');
  });

  test('diagnostic_9', () => {
    expect(cborDiagnostic(null)).toBe('122([])');
  });

  test('diagnostic_10', () => {
    const xs: Array<[number, number]> = [];
    expect(cborDiagnostic(xs)).toBe('[]');
  });

  test('diagnostic_10_alt', () => {
    const xs: Record<string, number> = {};
    expect(cborDiagnostic(xs)).toBe('{}');
  });

  test('diagnostic_11', () => {
    const foo = { foo: 'A' };
    expect(cborDiagnostic(foo)).toBe('121([_ 121([])])');
  });

  test('diagnostic_12', () => {
    const foo = { foo: { B: 42 } };
    expect(cborDiagnostic(foo)).toBe('121([_ 122([_ 42])])');
  });

  test('diagnostic_13', () => {
    const baz = { a0: 14, b0: hexToByteArray('ff') };
    expect(cborDiagnostic(baz)).toBe('121([_ 14, h\'FF\'])');
  });

  test('diagnostic_14', () => {
    expect(cborDiagnostic([0])).toBe('[_ 0]');
  });

  test('diagnostic_15', () => {
    expect(cborDiagnostic(-42)).toBe('-42');
  });

  test('diagnostic_16', () => {
    expect(cborDiagnostic([-1, 0, 1])).toBe('[_ -1, 0, 1]');
  });
});

// ------------------------------------------------------------------ serialise

describe('cborSerialise', () => {
  test('serialise_1', () => {
    expect(cborSerialise(42)).toEqual(hexToByteArray('182a'));
  });

  test('serialise_2', () => {
    expect(cborSerialise(hexToByteArray('a1b2'))).toEqual(hexToByteArray('42a1b2'));
  });

  test('serialise_3', () => {
    expect(cborSerialise([])).toEqual(hexToByteArray('80'));
  });

  test('serialise_4', () => {
    expect(cborSerialise([1, 2])).toEqual(hexToByteArray('9f0102ff'));
  });

  test('serialise_5', () => {
    expect(cborSerialise([1, hexToByteArray('ff'), 3])).toEqual(hexToByteArray('9f0141ff03ff'));
  });

  test('serialise_6', () => {
    expect(cborSerialise([[1, hexToByteArray('ff')]])).toEqual(hexToByteArray('9f9f0141ffffff'));
  });

  test('serialise_7', () => {
    expect(cborSerialise({ some: 42 })).toEqual(hexToByteArray('d8799f182aff'));
  });

  test('serialise_8', () => {
    expect(cborSerialise(null)).toEqual(hexToByteArray('d87a80'));
  });

  test('serialise_9', () => {
    expect(cborSerialise({ '1': hexToByteArray('ff') })).toEqual(hexToByteArray('a10141ff'));
  });
});

// ------------------------------------------------------------------ deserialise

describe('cborDeserialise', () => {
  test('unit_deserialise_not_enough_bytes_1', () => {
    expect(cborDeserialise(hexToByteArray(''))).toBeNull();
  });

  test('unit_deserialise_not_enough_bytes_2', () => {
    expect(cborDeserialise(hexToByteArray('82'))).toBeNull();
  });

  test('unit_deserialise_non_empty_leftovers', () => {
    expect(cborDeserialise(hexToByteArray('811442'))).toBeNull();
  });

  test('unit_deserialise_invalid_header', () => {
    expect(cborDeserialise(hexToByteArray('f1'))).toBeNull();
  });

  test('unit_deserialise_invalid_uint', () => {
    expect(cborDeserialise(hexToByteArray('1d0013bdae'))).toBeNull();
  });

  test('bench_deserialise_script_context', () => {
    const result = cborDeserialise(hexToByteArray('d8799fd8799f9fd8799fd8799f5820000000000000000000000000000000000000000000000000000000000000000000ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a000f4240d87980d87a80ffffff9fd8799fd8799f5820000000000000000000000000000000000000000000000000000000000000000000ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a000f4240d87980d87a80ffffff9fd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd87a80ffa140a1401a000f4240d87a9f5820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ecffd87a80ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffffffffa340a1401a000f4240581c0c8eaf490c53afbf27e3d84a3b57da51fbafe5aa78443fcec2dc262ea14561696b656e182a581c12593b4cbf7fdfd8636db99fe356437cd6af8539aadaa0a401964874a14474756e611b00005af3107a4000d87980d87a80ffd8799fd8799fd87a9f581c00000000000000000000000000000000000000000000000000000000ffd8799fd8799fd8799f581c00000000000000000000000000000000000000000000000000000000ffffffffa240a1401a000f4240581c0c8eaf490c53afbf27e3d84a3b57da51fbafe5aa78443fcec2dc262ea14763617264616e6f01d87980d8799f581c68ad54b3a8124d9fe5caaaf2011a85d72096e696a2fb3d7f86c41717ffffff182aa2581c0c8eaf490c53afbf27e3d84a3b57da51fbafe5aa78443fcec2dc262ea24561696b656e2d4763617264616e6f01581c12593b4cbf7fdfd8636db99fe356437cd6af8539aadaa0a401964874a14474756e611b00005af3107a400080a0d8799fd8799fd87980d87a80ffd8799fd87b80d87a80ffff80a2d8799f581c0c8eaf490c53afbf27e3d84a3b57da51fbafe5aa78443fcec2dc262effd87980d8799f581c12593b4cbf7fdfd8636db99fe356437cd6af8539aadaa0a401964874ff182aa15820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ecd879805820e757985e48e43a95a185ddba08c814bc20f81cb68544ac937a9b992e4e6c38a0a080d87a80d87a80ff182ad8799f581c12593b4cbf7fdfd8636db99fe356437cd6af8539aadaa0a401964874ffff'));
    expect(result).not.toBeNull();
  });
});
