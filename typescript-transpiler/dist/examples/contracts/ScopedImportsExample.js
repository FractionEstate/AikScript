"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedImportsExampleContract = void 0;
// Example demonstrating the new scoped import structure
const types_1 = require("../../src/types");
// Import from specific modules using scoped imports
const collection = __importStar(require("../../src/aiken/collection"));
const crypto = __importStar(require("../../src/aiken/crypto"));
const math = __importStar(require("../../src/aiken/math"));
const cbor = __importStar(require("../../src/aiken/cbor"));
const address = __importStar(require("../../src/cardano/address"));
const assets = __importStar(require("../../src/cardano/assets"));
const mpf = __importStar(require("../../src/merkle-patricia-forestry"));
let ScopedImportsExampleContract = class ScopedImportsExampleContract {
    constructor() {
        this.exampleDatum = {
            data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            key: new Uint8Array([0x12, 0x34]),
            value: new Uint8Array([0xab, 0xcd]),
            root: new Uint8Array(32)
        };
    }
    testScopedImports(datum, redeemer, ctx) {
        const tx = ctx.transaction;
        // Use functions from scoped imports
        const sliced = mpf.sliceByteArray(datum.data, 0n, 8n);
        const firstNibble = mpf.nibble(datum.data, 0n);
        const combined = mpf.combineHashes(datum.root, sliced);
        // Use crypto functions
        const hash1 = crypto.blake2b_256(datum.data);
        const hash2 = crypto.sha3_256(datum.data);
        // Use math functions
        const absResult = math.abs(-42n);
        const clamped = math.clamp(15n, 0n, 10n);
        // Use collection functions
        const testList = [1n, 2n, 3n, 4n, 5n];
        const allPositive = collection.listAll(testList, (x) => x > 0n);
        // Use CBOR functions
        const diagnostic = cbor.diagnostic(datum.data);
        // Use address functions
        address.fromScript(datum.key);
        // Use asset functions
        assets.fromAsset(datum.key, new Uint8Array([0x41]), 1000n);
        // Simple validation
        const rootHash = Array.from(datum.root).map((b) => b.toString(16).padStart(2, '0')).join('');
        return tx.isSignedBy(rootHash) &&
            sliced.length === 8 &&
            firstNibble >= 0n &&
            combined.length === 32 &&
            hash1.length === 32 &&
            hash2.length === 32 &&
            absResult === 42n &&
            clamped === 10n &&
            allPositive === true &&
            diagnostic.length > 0;
    }
};
exports.ScopedImportsExampleContract = ScopedImportsExampleContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], ScopedImportsExampleContract.prototype, "exampleDatum", void 0);
__decorate([
    (0, types_1.validator)("scoped"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Boolean)
], ScopedImportsExampleContract.prototype, "testScopedImports", null);
exports.ScopedImportsExampleContract = ScopedImportsExampleContract = __decorate([
    (0, types_1.contract)("ScopedImportsExample")
], ScopedImportsExampleContract);
//# sourceMappingURL=ScopedImportsExample.js.map