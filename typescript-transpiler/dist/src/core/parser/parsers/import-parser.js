"use strict";
// Import parser for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportParser = void 0;
class ImportParser {
    /**
     * Parses import declaration
     */
    parse(node) {
        const module = node.moduleSpecifier.getText().replace(/['"]/g, '');
        return {
            module,
        };
    }
}
exports.ImportParser = ImportParser;
//# sourceMappingURL=import-parser.js.map