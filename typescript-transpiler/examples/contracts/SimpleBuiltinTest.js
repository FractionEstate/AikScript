"use strict";
// Test contract for builtin functions
// This will be transpiled to test builtin function support
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleBuiltinTest = void 0;
class SimpleBuiltinTest {
    // Simple spend validator using builtin functions
    spend(_datum, _redeemer, _ctx) {
        return true;
    }
    // Simple mint validator
    mint(_redeemer, _policyId, _ctx) {
        return true;
    }
}
exports.SimpleBuiltinTest = SimpleBuiltinTest;
//# sourceMappingURL=SimpleBuiltinTest.js.map