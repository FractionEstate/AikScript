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
exports.MultiPurposeContract = void 0;
const types_1 = require("../../src/types");
let MultiPurposeContract = class MultiPurposeContract {
    constructor() {
        this.contractDatum = {
            owner: "",
            totalSupply: 0
        };
    }
    spend(datum, redeemer, ctx) {
        return true;
    }
    mintToken(_redeemer, _policyId, _ctx) {
        return true;
    }
    withdraw(_redeemer, _credential, _ctx) {
        return true;
    }
    publish() {
        return true;
    }
};
exports.MultiPurposeContract = MultiPurposeContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], MultiPurposeContract.prototype, "contractDatum", void 0);
__decorate([
    (0, types_1.validator)("spend"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0, Object]),
    __metadata("design:returntype", Boolean)
], MultiPurposeContract.prototype, "spend", null);
__decorate([
    (0, types_1.validator)("mint"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Boolean)
], MultiPurposeContract.prototype, "mintToken", null);
__decorate([
    (0, types_1.validator)("withdraw"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Boolean)
], MultiPurposeContract.prototype, "withdraw", null);
__decorate([
    (0, types_1.validator)("publish"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], MultiPurposeContract.prototype, "publish", null);
exports.MultiPurposeContract = MultiPurposeContract = __decorate([
    (0, types_1.contract)("MultiPurpose")
], MultiPurposeContract);
//# sourceMappingURL=MultiPurpose.js.map