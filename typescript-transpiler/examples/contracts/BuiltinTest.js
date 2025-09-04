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
exports.BuiltinTestContract = void 0;
const types_1 = require("../../src/types");
let BuiltinTestContract = class BuiltinTestContract {
    constructor() {
        this.testDatum = {
            owner: "",
            amount: BigInt(0),
            data: null
        };
    }
    spend(datum, redeemer, ctx) {
        const tx = ctx.transaction;
        // Convert PubKeyHash to ByteArray for crypto functions
        const ownerBytes = new Uint8Array(Buffer.from(datum.owner, 'hex'));
        // Test cryptographic functions
        const hash1 = (0, types_1.sha256)(ownerBytes);
        const hash2 = (0, types_1.blake2b_256)(ownerBytes);
        const hash3 = (0, types_1.keccak_256)(ownerBytes);
        // Test data conversion functions
        const intData = (0, types_1.iData)(datum.amount);
        const byteData = (0, types_1.bData)(ownerBytes);
        const constrDatum = (0, types_1.constrData)(BigInt(0), [intData, byteData]);
        // Test list operations
        const dataList = (0, types_1.listData)([intData, byteData]);
        const listLength = (0, types_1.lengthOfByteString)(ownerBytes);
        // Test string operations
        const encoded = (0, types_1.encodeUtf8)("test");
        const decoded = (0, types_1.decodeUtf8)(encoded);
        // Test signature verification
        const ownerHex = Buffer.from(ownerBytes).toString('hex');
        const isValidSig = (0, types_1.verifyEd25519Signature)(ownerHex, hash1, ownerBytes);
        // Test bitwise operations
        const bitCount = (0, types_1.countSetBits)(datum.amount);
        const firstBit = (0, types_1.findFirstSetBit)(datum.amount);
        // Test debugging
        (0, types_1.trace)("Debug message", true);
        // Main validation logic
        return tx.isSignedBy(datum.owner) &&
            datum.amount > BigInt(0) &&
            listLength > BigInt(0) &&
            bitCount >= BigInt(0);
    }
    mint(redeemer, policyId, ctx) {
        // Test data operations
        const redeemerData = (0, types_1.constrData)(BigInt(1), []);
        const serialized = (0, types_1.serialiseData)(redeemerData);
        // Test list operations
        const emptyList = (0, types_1.mkNilData)();
        const isEmpty = (0, types_1.nullList)([emptyList]);
        return isEmpty;
    }
};
exports.BuiltinTestContract = BuiltinTestContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], BuiltinTestContract.prototype, "testDatum", void 0);
__decorate([
    (0, types_1.validator)("spend"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0, Object]),
    __metadata("design:returntype", Boolean)
], BuiltinTestContract.prototype, "spend", null);
__decorate([
    (0, types_1.validator)("mint"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [void 0, Object, Object]),
    __metadata("design:returntype", Boolean)
], BuiltinTestContract.prototype, "mint", null);
exports.BuiltinTestContract = BuiltinTestContract = __decorate([
    (0, types_1.contract)("BuiltinTest")
], BuiltinTestContract);
//# sourceMappingURL=BuiltinTest.js.map