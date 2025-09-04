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
exports.TokenVestingContract = void 0;
const types_1 = require("../../src/types");
let TokenVestingContract = class TokenVestingContract {
    constructor() {
        this.vestingDatum = {
            beneficiary: "",
            totalAmount: BigInt(0),
            releasedAmount: BigInt(0),
            startTime: BigInt(0),
            duration: BigInt(0)
        };
    }
    release(datum, redeemer, ctx) {
        const tx = ctx.transaction;
        const now = tx.validityRange.start || BigInt(0);
        return tx.isSignedBy(datum.beneficiary) && now >= (datum.startTime + datum.duration);
    }
};
exports.TokenVestingContract = TokenVestingContract;
__decorate([
    types_1.datum,
    __metadata("design:type", Object)
], TokenVestingContract.prototype, "vestingDatum", void 0);
__decorate([
    (0, types_1.validator)("spend"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, void 0, Object]),
    __metadata("design:returntype", Boolean)
], TokenVestingContract.prototype, "release", null);
exports.TokenVestingContract = TokenVestingContract = __decorate([
    (0, types_1.contract)("TokenVesting")
], TokenVestingContract);
//# sourceMappingURL=TokenVesting.js.map