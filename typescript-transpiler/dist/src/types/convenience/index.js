"use strict";
// Utility types and functions for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = void 0;
const Some = (value) => ({ type: 'Some', value });
exports.Some = Some;
exports.None = { type: 'None' };
//# sourceMappingURL=index.js.map