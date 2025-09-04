"use strict";
// Cardano-specific type definitions for TypeScript-to-Aiken DSL
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyId = exports.assetName = exports.ada = exports.scriptHash = exports.pubKeyHash = exports.validator = exports.datum = exports.contract = void 0;
// Decorators for DSL
function contract(name) {
    return function (constructor) {
        // Store contract metadata
        constructor.__contractName = name;
    };
}
exports.contract = contract;
function datum(target, propertyKey) {
    const datums = target.constructor.__datums || [];
    datums.push(propertyKey);
    target.constructor.__datums = datums;
}
exports.datum = datum;
function validator(purpose) {
    return function (target, propertyKey, descriptor) {
        const validators = target.constructor.__validators || [];
        validators.push({
            name: propertyKey,
            purpose,
            implementation: descriptor.value
        });
        target.constructor.__validators = validators;
    };
}
exports.validator = validator;
// Utility functions
function pubKeyHash(hash) {
    return hash;
}
exports.pubKeyHash = pubKeyHash;
function scriptHash(hash) {
    return hash;
}
exports.scriptHash = scriptHash;
function ada(amount) {
    return amount;
}
exports.ada = ada;
function assetName(name) {
    return name;
}
exports.assetName = assetName;
function policyId(id) {
    return id;
}
exports.policyId = policyId;
//# sourceMappingURL=cardano.js.map