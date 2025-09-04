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

    // Check the new AST structure
    expect(ast.functions).toBeDefined();
    expect(ast.functions.length).toBeGreaterThan(0);
    expect(ast.types).toBeDefined();
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

    // Check that we have functions and types in the new structure
    expect(aikenAst.functions).toBeDefined();
    expect(aikenAst.functions.length).toBeGreaterThan(0);
    expect(aikenAst.types).toBeDefined();
  });

  test('should generate Aiken code', () => {
    const sourceCode = `
      export function testFunction(): boolean {
        return true;
      }
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);
    const aikenAst = transpiler.transform(ast);
    const aikenCode = transpiler.generate(aikenAst);

    expect(aikenCode).toContain('fn testFunction');
    expect(aikenCode).toContain('-> Bool');
  });

  test('should handle empty contract', () => {
    const sourceCode = `
      // Empty module
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);

    expect(ast.functions).toHaveLength(0);
    expect(ast.types).toHaveLength(0);
  });

  test('should handle contract with multiple validators', () => {
    const sourceCode = `
      export function validator1(): boolean {
        return true;
      }

      export function validator2(): boolean {
        return false;
      }
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);

    expect(ast.functions).toHaveLength(2);
    expect(ast.functions[0].name).toBe('validator1');
    expect(ast.functions[1].name).toBe('validator2');
  });
});
