"use strict";
// Main exports for the TypeScript-to-Aiken transpiler
// Following aiken-lang patterns for modular organization
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptToAikenTranspiler = void 0;
// Core transpiler engine
__exportStar(require("./core/index"), exports);
// Version-controlled packages
__exportStar(require("./core/packages/index"), exports);
// Type system
__exportStar(require("./types/index"), exports);
// CLI interface
__exportStar(require("./cli/index"), exports);
// Legacy exports for backward compatibility
var transpiler_1 = require("./core/transpiler");
Object.defineProperty(exports, "TypeScriptToAikenTranspiler", { enumerable: true, get: function () { return transpiler_1.TypeScriptToAikenTranspiler; } });
//# sourceMappingURL=index.js.map