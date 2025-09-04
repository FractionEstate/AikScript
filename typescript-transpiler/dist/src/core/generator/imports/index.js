"use strict";
// Import statement generation for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportGenerator = void 0;
/**
 * Generates Aiken import statements from AikenImport objects
 */
class ImportGenerator {
    /**
     * Generate import statement
     */
    generate(imp) {
        let result = `use ${imp.module}`;
        if (imp.alias) {
            result += ` as ${imp.alias}`;
        }
        if (imp.exposing && imp.exposing.length > 0) {
            result += `.{${imp.exposing.join(', ')}}`;
        }
        return result;
    }
}
exports.ImportGenerator = ImportGenerator;
//# sourceMappingURL=index.js.map