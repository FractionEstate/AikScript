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

  test('should parse and generate expect expressions', () => {
    const sourceCode = `
      export type Option<T> = { Some: T } | { None: {} };

      // @expect user "User not found"
      export function getUserName(user: Option<string>): string {
        return user is { Some: string } ? user.Some : "Unknown";
      }

      // @expect result "Invalid result"
      export function processResult(result: Option<number>): number {
        if (result is { Some: number }) {
          return result.Some;
        } else {
          return 0;
        }
      }

      // @expect value "Value must be positive"
      export function validatePositive(value: number): number {
        return value > 0 ? value : 0;
      }
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);

    console.log('Parsed AST functions:', ast.functions.length);
    ast.functions.forEach((func, index) => {
      console.log(`Function ${index}: ${func.name}, expectExpressions:`, func.expectExpressions);
    });

    const aikenAst = transpiler.transform(ast);
    const aikenCode = transpiler.generate(aikenAst);

    console.log('Generated Aiken code:');
    console.log(aikenCode);

    // Check that expect expressions are parsed
    expect(ast.functions).toHaveLength(3);
    expect(ast.functions[0].expectExpressions).toBeDefined();
    expect(ast.functions[0].expectExpressions!.length).toBe(1);
    expect(ast.functions[0].expectExpressions![0].expression).toBe('user');
    expect(ast.functions[0].expectExpressions![0].errorMessage).toBe('User not found');

    // Check that expect expressions are generated in Aiken code
    expect(aikenCode).toContain('expect(user, "User not found")');
    expect(aikenCode).toContain('expect(result, "Invalid result")');
    expect(aikenCode).toContain('expect(value, "Value must be positive")');

    // Check that the generated Aiken code is valid
    expect(aikenCode).toContain('pub fn getUserName');
    expect(aikenCode).toContain('pub fn processResult');
    expect(aikenCode).toContain('pub fn validatePositive');
  });

  test('should handle conditional pipelines with expect expressions', () => {
    const sourceCode = `
      export type Option<T> = { Some: T } | { None: {} };

      // @expect user "User required"
      export function getUserOrDefault(user: Option<string>): string {
        return user is { Some: string }
          ? user.Some
          : "Default User";
      }

      // @expect data "Data validation failed"
      export function validateAndProcess(data: Option<number>): number {
        if (data is { Some: number }) {
          return data.Some > 0 ? data.Some : 0;
        } else {
          return -1;
        }
      }
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);
    const aikenAst = transpiler.transform(ast);
    const aikenCode = transpiler.generate(aikenAst);

    // Verify expect expressions are properly integrated with conditional logic
    expect(aikenCode).toContain('expect(user, "User required")');
    expect(aikenCode).toContain('expect(data, "Data validation failed")');

    // Verify conditional structures are preserved
    expect(aikenCode).toContain('if data is');
    expect(aikenCode).toContain('data.Some > 0');
  });

  test('should handle complex expect expressions with multiple conditions', () => {
    const sourceCode = `
      export type Result<T, E> = { Ok: T } | { Error: E };

      // @expect result "Operation failed"
      // @expect user "User authentication required"
      export function complexValidation(result: Result<number, string>, user: Option<string>): number {
        if (result is { Ok: number }) {
          if (user is { Some: string }) {
            return result.Ok;
          } else {
            return 0;
          }
        } else {
          return -1;
        }
      }
    `;

    const transpiler = new TypeScriptToAikenTranspiler();
    const ast = transpiler.parse(sourceCode);
    const aikenAst = transpiler.transform(ast);
    const aikenCode = transpiler.generate(aikenAst);

    // Check multiple expect expressions
    expect(ast.functions[0].expectExpressions).toHaveLength(2);
    expect(ast.functions[0].expectExpressions![0].expression).toBe('result');
    expect(ast.functions[0].expectExpressions![1].expression).toBe('user');

    // Verify generated Aiken code contains both expect expressions
    expect(aikenCode).toContain('expect(result, "Operation failed")');
    expect(aikenCode).toContain('expect(user, "User authentication required")');

    // Verify complex conditional logic is preserved
    expect(aikenCode).toContain('if result is');
    expect(aikenCode).toContain('if user is');
  });
});
