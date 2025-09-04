// Test contract for builtin functions
// This will be transpiled to test builtin function support

export class SimpleBuiltinTest {
  // Simple spend validator using builtin functions
  spend(_datum: unknown, _redeemer: unknown, _ctx: unknown) {
    return true;
  }

  // Simple mint validator
  mint(_redeemer: unknown, _policyId: unknown, _ctx: unknown) {
    return true;
  }
}
