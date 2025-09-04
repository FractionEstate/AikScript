import { TypeScriptToAikenTranspiler } from '../src/core/transpiler';

describe('TypeScriptToAikenTranspiler', () => {
  let transpiler: TypeScriptToAikenTranspiler;

  beforeEach(() => {
    transpiler = new TypeScriptToAikenTranspiler();
  });

  test('should parse simple contract', () => {
    const sourceCode = `
      import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from '../src/types';

      @contract("TimeLock")
      export class TimeLockContract {
        @datum
        public lockDatum: any = {
          lockUntil: null as any,
          owner: null as any,
          beneficiary: null as any
        };

        @validator("spend")
        unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash; beneficiary: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
          return true;
        }
      }
    `;

    const ast = transpiler.parse(sourceCode);

    // Don't try to JSON.stringify - just check the structure
    expect(ast.contracts).toHaveLength(1);
    expect(ast.contracts[0].name).toBe('TimeLock');
    expect(ast.contracts[0].datums).toHaveLength(1);
    expect(ast.contracts[0].validators).toHaveLength(1);
  });

  test('should transform contract to Aiken AST', () => {
    const sourceCode = `
      import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from '../src/types';

      @contract("TimeLock")
      export class TimeLockContract {
        @datum
        public lockDatum: any = {
          lockUntil: null as any,
          owner: null as any
        };

        @validator("spend")
        unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
          return true;
        }
      }
    `;

    const tsAst = transpiler.parse(sourceCode);
    const aikenAst = transpiler.transform(tsAst);

    expect(aikenAst.contracts).toHaveLength(1);
    expect(aikenAst.contracts[0].name).toBe('TimeLock');
    expect(aikenAst.contracts[0].datums).toHaveLength(1);
    expect(aikenAst.contracts[0].datums[0].fields).toHaveLength(2);
  });

  test('should generate Aiken code', () => {
    const sourceCode = `
      import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from '../src/types';

      @contract("TimeLock")
      export class TimeLockContract {
        @datum
        public lockDatum: any = {
          lockUntil: null as any,
          owner: null as any
        };

        @validator("spend")
        unlock(datum: { lockUntil: POSIXTime; owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
          return true;
        }
      }
    `;

    const tsAst = transpiler.parse(sourceCode);
    const aikenAst = transpiler.transform(tsAst);
    const generatedCode = transpiler.generate(aikenAst);

    expect(generatedCode).toContain('pub type LockDatum');
    expect(generatedCode).toContain('fn unlock');
    expect(generatedCode).toContain('lockUntil: POSIXTime');
    expect(generatedCode).toContain('owner: PubKeyHash');
  });

  test('should handle invalid TypeScript syntax', () => {
    const invalidSourceCode = `
      import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from '../src/types';

      @contract("InvalidContract")
      export class InvalidContract {
        @datum
        public invalidDatum: any = {
          // Missing closing brace
          lockUntil: null as any,
          owner: null as any
    `;

    expect(() => {
      transpiler.parse(invalidSourceCode);
    }).toThrow();
  });

  test('should handle empty contract', () => {
    const emptyContractCode = `
      import { contract } from '../src/types';

      @contract("EmptyContract")
      export class EmptyContract {
      }
    `;

    const tsAst = transpiler.parse(emptyContractCode);
    const aikenAst = transpiler.transform(tsAst);
    const generatedCode = transpiler.generate(aikenAst);

    expect(generatedCode).toContain('validator EmptyContract');
    expect(generatedCode).toContain('pub type EmptyContract');
  });

  test('should handle contract with multiple validators', () => {
    const multiValidatorCode = `
      import { contract, datum, validator, Bool, POSIXTime, PubKeyHash, ScriptContext } from '../src/types';

      @contract("MultiValidatorContract")
      export class MultiValidatorContract {
        @datum
        public datum: any = {
          owner: null as any
        };

        @validator("spend")
        spend(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
          return true;
        }

        @validator("mint")
        mint(redeemer: void, policyId: any, ctx: ScriptContext): Bool {
          return true;
        }
      }
    `;

    const tsAst = transpiler.parse(multiValidatorCode);
    const aikenAst = transpiler.transform(tsAst);
    const generatedCode = transpiler.generate(aikenAst);

    expect(generatedCode).toContain('fn spend');
    expect(generatedCode).toContain('fn mint');
  });
});
