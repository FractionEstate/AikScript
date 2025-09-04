"use strict";
// Aiken Standard Library v2.2.0 - Main Exports
// TypeScript declarations matching aiken-lang/stdlib structure
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bls12_381 = exports.pairs = exports.list = exports.dict = void 0;
// Re-export all modules
__exportStar(require("./collection"), exports);
__exportStar(require("./crypto"), exports);
__exportStar(require("./math"), exports);
__exportStar(require("./cbor"), exports);
// Re-export collection submodules
exports.dict = __importStar(require("./collection/dict"));
exports.list = __importStar(require("./collection/list"));
exports.pairs = __importStar(require("./collection/pairs"));
// Re-export crypto submodules
exports.bls12_381 = __importStar(require("./crypto/bls12_381/index"));
// Re-export primitive types and functions
__exportStar(require("./primitive/index"), exports);
__exportStar(require("./primitive/bytearray"), exports);
//# sourceMappingURL=index.js.map