"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTestContract = void 0;
const types_1 = require("../../src/types");
let MerkleTestContract = class MerkleTestContract {
    constructor() {
        this.testDatum = {
            root: new Uint8Array(32),
            data: new Uint8Array()
        };
    }
    testMerkleFunctions(datum, redeemer, ctx) {
        const tx = ctx.transaction;
        // Test byte array slicing
        const sliced = (0, types_1.sliceByteArray)(datum.data, 0n, 16n);
        // Test nibble extraction
        const firstNibble = (0, types_1.nibble)(datum.data, 0n);
        // Test hash combination
        const combined = (0, types_1.combineHashes)(datum.root, sliced);
        // Simple validation logic - convert ByteArray to PubKeyHash
        const rootHash = Array.from(datum.root).map(b => b.toString(16).padStart(2, '0')).join('');
        return tx.isSignedBy(rootHash) && firstNibble >= 0;
    }
};
exports.MerkleTestContract = MerkleTestContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], MerkleTestContract.prototype, "testDatum", void 0);
__decorate([
    (0, types_1.validator)("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Boolean)
], MerkleTestContract.prototype, "testMerkleFunctions", null);
exports.MerkleTestContract = MerkleTestContract = __decorate([
    (0, types_1.contract)("MerkleTest")
], MerkleTestContract);
//# sourceMappingURL=MerkleTest.js.map