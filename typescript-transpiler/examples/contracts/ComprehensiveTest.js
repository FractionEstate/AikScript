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
exports.ComprehensiveTestContract = void 0;
const types_1 = require("../../src/types");
let ComprehensiveTestContract = class ComprehensiveTestContract {
    constructor() {
        this.testDatum = {
            data: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
            key: new Uint8Array([0x12, 0x34, 0x56, 0x78]),
            value: new Uint8Array([0xab, 0xcd, 0xef]),
            root: new Uint8Array(32),
            scriptHash: new Uint8Array(28),
            vkHash: new Uint8Array(28)
        };
    }
    testAllFunctions(datum, redeemer, ctx) {
        const tx = ctx.transaction;
        // Test Merkle Patricia Forestry functions
        const sliced = (0, types_1.sliceByteArray)(datum.data, 0n, 8n);
        const firstNibble = (0, types_1.nibble)(datum.data, 0n);
        const nibblesData = (0, types_1.nibbles)(datum.data, 0n, 4n);
        const suffixed = (0, types_1.suffix)(datum.data, 4n);
        const combined = (0, types_1.combineHashes)(datum.root, sliced);
        // Test merkle tree functions
        const merkle4Result = (0, types_1.merkle4)(0n, combined, types_1.nullHash, types_1.nullHash);
        const merkle8Result = (0, types_1.merkle8)(0n, combined, types_1.nullHash4, types_1.nullHash2, types_1.nullHash);
        const merkle16Result = (0, types_1.merkle16)(0n, combined, types_1.nullHash8, types_1.nullHash4, types_1.nullHash2, types_1.nullHash);
        // Test sparse merkle functions
        const sparseMerkle4Result = (0, types_1.sparseMerkle4)(0n, combined, 1n, types_1.nullHash);
        const sparseMerkle8Result = (0, types_1.sparseMerkle8)(0n, combined, 2n, types_1.nullHash);
        const sparseMerkle16Result = (0, types_1.sparseMerkle16)(0n, combined, 4n, types_1.nullHash);
        // Test additional cryptographic functions
        const sha2Hash = (0, types_1.sha2_256)(datum.data);
        const sha3Hash = (0, types_1.sha3_256)(datum.data);
        // Test mathematical functions
        const absResult = (0, types_1.mathAbs)(-42n);
        const clampResult = (0, types_1.mathClamp)(15n, 0n, 10n);
        const gcdResult = (0, types_1.mathGcd)(42n, 14n);
        const isSqrtResult = (0, types_1.mathIsSqrt)(25n, 5n);
        const logResult = (0, types_1.mathLog)(100n, 10n);
        const log2Result = (0, types_1.mathLog2)(256n);
        // Test list functions
        const testList = [1n, 2n, 3n, 4n, 5n];
        const allPositive = (0, types_1.listAll)(testList, (x) => x > 0n);
        const anyEven = (0, types_1.listAny)(testList, (x) => x % 2n === 0n);
        // Test CBOR functions
        const diagnostic = (0, types_1.cborDiagnostic)(datum.data);
        const serialised = (0, types_1.cborSerialise)(datum.data);
        (0, types_1.cborDeserialise)(serialised); // Test deserialisation
        // Test address functions
        const scriptAddress = (0, types_1.addressFromScript)(datum.scriptHash);
        const vkAddress = (0, types_1.addressFromVerificationKey)(datum.vkHash);
        // Test asset functions
        const singleAsset = (0, types_1.valueFromAsset)(datum.scriptHash, new Uint8Array([0x41, 0x42]), 1000n);
        const assetList = [{ policyId: datum.scriptHash, assets: [{ name: new Uint8Array([0x41]), quantity: 500n }] }];
        const multiAsset = (0, types_1.valueFromAssetList)(assetList);
        const addedValue = (0, types_1.valueAdd)(singleAsset, multiAsset);
        const subtractedValue = (0, types_1.valueSubtract)(addedValue, singleAsset);
        const assetQuantity = (0, types_1.valueGetAsset)(subtractedValue, datum.scriptHash, new Uint8Array([0x41]));
        const isZeroValue = (0, types_1.valueIsZero)(types_1.valueZero);
        // Comprehensive validation
        return (sliced.length === 8 &&
            firstNibble >= 0n &&
            nibblesData.length === 4 &&
            suffixed.length === datum.data.length - 4 &&
            combined.length === 32 &&
            merkle4Result.length === 32 &&
            merkle8Result.length === 32 &&
            merkle16Result.length === 32 &&
            sparseMerkle4Result.length === 32 &&
            sparseMerkle8Result.length === 32 &&
            sparseMerkle16Result.length === 32 &&
            sha2Hash.length === 32 &&
            sha3Hash.length === 32 &&
            absResult === 42n &&
            clampResult === 10n &&
            gcdResult === 14n &&
            isSqrtResult === true &&
            logResult === 2n &&
            log2Result === 8n &&
            allPositive === true &&
            anyEven === true &&
            diagnostic.length > 0 &&
            serialised.length > 0 &&
            scriptAddress !== undefined &&
            vkAddress !== undefined &&
            assetQuantity === 500n &&
            isZeroValue === true);
    }
};
exports.ComprehensiveTestContract = ComprehensiveTestContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], ComprehensiveTestContract.prototype, "testDatum", void 0);
__decorate([
    (0, types_1.validator)("comprehensive"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Boolean)
], ComprehensiveTestContract.prototype, "testAllFunctions", null);
exports.ComprehensiveTestContract = ComprehensiveTestContract = __decorate([
    (0, types_1.contract)("ComprehensiveTest")
], ComprehensiveTestContract);
//# sourceMappingURL=ComprehensiveTest.js.map