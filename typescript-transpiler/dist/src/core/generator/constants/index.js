"use strict";
// Constant definition generation for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantGenerator = void 0;
/**
 * Generates Aiken constant definitions from AikenConstant objects
 */
class ConstantGenerator {
    /**
     * Generate constant definition
     */
    generate(constant) {
        const lines = [];
        // Add docs
        if (constant.docs && constant.docs.length > 0) {
            constant.docs.forEach(doc => {
                lines.push(`/// ${doc}`);
            });
        }
        let definition = '';
        if (constant.isPublic) {
            definition += 'pub ';
        }
        definition += `const ${constant.name}: ${constant.type} = ${constant.value}`;
        lines.push(definition);
        return lines.join('\n');
    }
}
exports.ConstantGenerator = ConstantGenerator;
//# sourceMappingURL=index.js.map