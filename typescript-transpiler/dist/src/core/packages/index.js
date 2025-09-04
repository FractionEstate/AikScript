"use strict";
// Package Registry
// Main entry point for all version-controlled packages
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
exports.mpf = exports.cardanoStdlib = exports.aikenStdlib = exports.cardano = exports.aikenLang = void 0;
exports.aikenLang = __importStar(require("./aiken-lang/index"));
exports.cardano = __importStar(require("./cardano/index"));
// Direct access to latest versions
var index_1 = require("./aiken-lang/index");
Object.defineProperty(exports, "aikenStdlib", { enumerable: true, get: function () { return index_1.stdlib; } });
var index_2 = require("./cardano/index");
Object.defineProperty(exports, "cardanoStdlib", { enumerable: true, get: function () { return index_2.stdlib; } });
var index_3 = require("./aiken-lang/index");
Object.defineProperty(exports, "mpf", { enumerable: true, get: function () { return index_3.merklePatriciaForestry; } });
//# sourceMappingURL=index.js.map