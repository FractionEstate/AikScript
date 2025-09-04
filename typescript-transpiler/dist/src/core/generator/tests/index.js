"use strict";
// Test definition generation for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestGenerator = void 0;
/**
 * Generates Aiken test definitions from AikenTest objects
 */
class TestGenerator {
    /**
     * Generate test definition
     */
    generate(test) {
        const lines = [];
        // Add docs
        if (test.docs && test.docs.length > 0) {
            test.docs.forEach(doc => {
                lines.push(`/// ${doc}`);
            });
        }
        lines.push(`test ${test.name}() {`);
        lines.push(test.body);
        lines.push('}');
        return lines.join('\n');
    }
}
exports.TestGenerator = TestGenerator;
//# sourceMappingURL=index.js.map