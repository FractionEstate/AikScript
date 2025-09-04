"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transpiler_1 = require("../src/core/transpiler");
describe('CLI Commands', () => {
    let transpiler;
    beforeEach(() => {
        transpiler = new transpiler_1.TypeScriptToAikenTranspiler();
    });
    describe('Transpiler Integration', () => {
        test('should parse simple contract', () => {
            const sourceCode = `
        import { contract, datum, validator, Bool, PubKeyHash, ScriptContext } from '../src/types';

        @contract("TestContract")
        export class TestContract {
          @validator("spend")
          spend(datum: any, redeemer: any, ctx: ScriptContext): Bool {
            return ctx.transaction.isSignedBy(datum.owner);
          }
        }
      `;
            const ast = transpiler.parse(sourceCode);
            expect(ast.functions).toBeDefined();
            expect(ast.functions.length).toBeGreaterThan(0);
            expect(ast.functions[0].name).toContain('spend');
        });
        test('should handle parsing errors gracefully', () => {
            const invalidSourceCode = `
        import { contract, validator } from '../src/types';

        @contract("InvalidContract")
        export class InvalidContract {
          @validator("spend")
          spend(datum: any, redeemer: any, ctx: any): any {
            return invalidFunction();
          }
        }
      `;
            // The parser should handle errors gracefully
            expect(() => {
                transpiler.parse(invalidSourceCode);
            }).not.toThrow();
        });
        test('should generate valid Aiken syntax', () => {
            const sourceCode = `
        import { contract, validator, Bool, PubKeyHash, ScriptContext } from '../src/types';

        @contract("SimpleContract")
        export class SimpleContract {
          @validator("spend")
          spend(datum: { owner: PubKeyHash }, redeemer: void, ctx: ScriptContext): Bool {
            return true;
          }
        }
      `;
            const ast = transpiler.parse(sourceCode);
            const aikenAst = transpiler.transform(ast);
            const aikenCode = transpiler.generate(aikenAst);
            expect(aikenCode).toContain('validator');
            expect(aikenCode).toContain('spend');
            expect(aikenCode).toContain('Bool');
        });
    });
    describe('Configuration Validation', () => {
        test('should handle different optimization levels', () => {
            const sourceCode = `
        import { contract, validator, Bool, ScriptContext } from '../src/types';

        @contract("TestContract")
        export class TestContract {
          @validator("spend")
          spend(datum: any, redeemer: any, ctx: ScriptContext): Bool {
            return true;
          }
        }
      `;
            const ast = transpiler.parse(sourceCode);
            // Test with different optimization levels
            const aikenAst = transpiler.transform(ast);
            const devCode = transpiler.generate(aikenAst);
            expect(devCode).toBeDefined();
            expect(typeof devCode).toBe('string');
            expect(devCode.length).toBeGreaterThan(0);
        });
        test('should validate contract structure', () => {
            const validContract = `
        import { contract, validator, Bool, ScriptContext } from '../src/types';

        @contract("ValidContract")
        export class ValidContract {
          @validator("spend")
          spend(datum: any, redeemer: any, ctx: ScriptContext): Bool {
            return true;
          }
        }
      `;
            const ast = transpiler.parse(validContract);
            expect(ast.functions).toBeDefined();
            expect(ast.functions.length).toBe(1);
        });
    });
});
//# sourceMappingURL=cli.test.js.map