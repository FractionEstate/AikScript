module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    // Package mappings - these will be resolved by the package structure
    '^@aiken/collection$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/collection/index.ts',
    '^@aiken/crypto$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/crypto/index.ts',
    '^@aiken/math$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/math/index.ts',
    '^@aiken/cbor$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/cbor/index.ts',
    '^@aiken/primitive$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/primitive/index.ts',
    '^@aiken/interval$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/interval.ts',
    '^@aiken/option$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/option.ts',
    '^@aiken/rational$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/aiken/math/rational.ts',
    '^@aiken/fuzz$': '<rootDir>/packages/aiken-lang/fuzz/v2.2.0/lib/aiken/fuzz/index.ts',
    '^@aiken/prelude$': '<rootDir>/packages/aiken-lang/prelude/v1.0.0/lib/aiken/index.ts',
    '^@aiken/merkle-patricia-forestry$': '<rootDir>/packages/aiken-lang/merkle-patricia-forestry/v2.1.0/lib/aiken/merkle-patricia-forestry/index.ts',
    '^@aiken/helpers$': '<rootDir>/packages/aiken-lang/merkle-patricia-forestry/v2.1.0/lib/aiken/merkle-patricia-forestry/helpers.ts',
    '^@aiken/merkling$': '<rootDir>/packages/aiken-lang/merkle-patricia-forestry/v2.1.0/lib/aiken/merkle-patricia-forestry/merkling.ts',
    '^@cardano/address$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/address/index.ts',
    '^@cardano/assets$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/assets/index.ts',
    '^@cardano/transaction$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/transaction/index.ts',
    '^@cardano/certificate$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/certificate/index.ts',
    '^@cardano/governance$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/governance/index.ts',
    '^@cardano/script_context$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/script_context/index.ts',
    '^@cardano/credential$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/address/credential/index.ts',
    '^@cardano/protocol_parameters$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/governance/protocol_parameters/index.ts',
    '^@cardano/voter$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/governance/voter/index.ts',
    '^@cardano/output_reference$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/transaction/output_reference/index.ts',
    '^@cardano/script_purpose$': '<rootDir>/packages/aiken-lang/stdlib/v2.2.0/lib/cardano/transaction/script_purpose/index.ts',
    '^@cardano/fuzz$': '<rootDir>/packages/aiken-lang/fuzz/v2.2.0/lib/cardano/fuzz/index.ts',
    '^@aikscript/types$': '<rootDir>/packages/aikscript/v1.0.0/lib/types/index.ts'
  }
};
