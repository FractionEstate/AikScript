"use strict";
// Cardano-specific type definitions for TypeScript-to-Aiken DSL
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = void 0;
exports.contract = contract;
exports.datum = datum;
exports.validator = validator;
exports.pubKeyHash = pubKeyHash;
exports.scriptHash = scriptHash;
exports.ada = ada;
exports.assetName = assetName;
exports.policyId = policyId;
exports.convenienceAbs = convenienceAbs;
exports.convenienceMin = convenienceMin;
exports.convenienceMax = convenienceMax;
exports.convenienceClamp = convenienceClamp;
exports.convenienceSign = convenienceSign;
exports.conveniencePow = conveniencePow;
exports.convenienceIsEven = convenienceIsEven;
exports.convenienceIsOdd = convenienceIsOdd;
exports.convenienceFactorial = convenienceFactorial;
exports.convenienceStringLength = convenienceStringLength;
exports.convenienceStringConcat = convenienceStringConcat;
exports.convenienceStringContains = convenienceStringContains;
exports.convenienceStringCompare = convenienceStringCompare;
exports.convenienceStringStartsWith = convenienceStringStartsWith;
exports.convenienceStringEndsWith = convenienceStringEndsWith;
exports.convenienceSubstring = convenienceSubstring;
exports.convenienceStringSplit = convenienceStringSplit;
exports.createInterval = createInterval;
exports.createBls12_381_G1Element = createBls12_381_G1Element;
exports.createBls12_381_G2Element = createBls12_381_G2Element;
exports.createBls12_381_Scalar = createBls12_381_Scalar;
exports.convenienceCompare = convenienceCompare;
// Decorators for DSL
function contract(name) {
    return function (target) {
        // Store contract metadata
        target.__contractName = name;
        return target;
    };
}
function datum(target, propertyKey) {
    const datums = target.constructor.__datums || [];
    datums.push(propertyKey);
    target.constructor.__datums = datums;
}
function validator(purpose) {
    return function (target, propertyKey, descriptor) {
        const validators = target.constructor.__validators || [];
        validators.push({
            name: propertyKey,
            purpose,
            implementation: descriptor.value,
        });
        target.constructor.__validators = validators;
    };
}
// Utility functions
function pubKeyHash(hash) {
    return hash;
}
function scriptHash(hash) {
    return hash;
}
function ada(amount) {
    return amount;
}
function assetName(name) {
    return name;
}
function policyId(id) {
    return id;
}
const Some = (value) => ({ type: 'Some', value });
exports.Some = Some;
exports.None = { type: 'None' };
// ============================================================================
// CONVENIENCE FUNCTIONS - TypeScript implementations using existing builtins
// ============================================================================
/**
 * Mathematical convenience functions using existing UPLC builtins
 */
// Absolute value
function convenienceAbs(value) {
    return lessThanInteger(value, BigInt(0)) ? subtractInteger(BigInt(0), value) : value;
}
// Minimum of two integers
function convenienceMin(a, b) {
    return lessThanInteger(a, b) ? a : b;
}
// Maximum of two integers
function convenienceMax(a, b) {
    return lessThanInteger(a, b) ? b : a;
}
// Clamp value between min and max
function convenienceClamp(value, minVal, maxVal) {
    if (lessThanInteger(value, minVal))
        return minVal;
    if (lessThanInteger(maxVal, value))
        return maxVal;
    return value;
}
// Sign function (-1, 0, or 1)
function convenienceSign(value) {
    if (lessThanInteger(value, 0n))
        return -1n;
    if (lessThanInteger(0n, value))
        return 1n;
    return 0n;
}
// Power function (exponentiation by squaring for positive integer exponents)
function conveniencePow(base, exponent) {
    if (equalsInteger(exponent, BigInt(0)))
        return BigInt(1);
    if (equalsInteger(exponent, BigInt(1)))
        return base;
    let result = BigInt(1);
    let currentExponent = exponent;
    while (lessThanInteger(BigInt(0), currentExponent)) {
        if (equalsInteger(remainderInteger(currentExponent, BigInt(2)), BigInt(1))) {
            result = multiplyInteger(result, base);
        }
        base = multiplyInteger(base, base);
        currentExponent = divideInteger(currentExponent, BigInt(2));
    }
    return result;
}
// Check if number is even
function convenienceIsEven(value) {
    return equalsInteger(remainderInteger(value, BigInt(2)), BigInt(0));
}
// Check if number is odd
function convenienceIsOdd(value) {
    return equalsInteger(remainderInteger(value, BigInt(2)), BigInt(1));
}
// Factorial (for small integers to avoid overflow)
function convenienceFactorial(n) {
    if (lessThanInteger(n, BigInt(0)))
        return BigInt(0); // Error case
    if (equalsInteger(n, BigInt(0)) || equalsInteger(n, BigInt(1)))
        return BigInt(1);
    let result = BigInt(1);
    let i = BigInt(2);
    while (lessThanInteger(i, addInteger(n, BigInt(1)))) {
        result = multiplyInteger(result, i);
        i = addInteger(i, BigInt(1));
    }
    return result;
}
/**
 * String convenience functions using existing builtins
 */
// Get string length
function convenienceStringLength(str) {
    return lengthOfByteString(encodeUtf8(str));
}
// Concatenate two strings
function convenienceStringConcat(a, b) {
    return decodeUtf8(appendByteString(encodeUtf8(a), encodeUtf8(b)));
}
// Check if string contains substring
function convenienceStringContains(haystack, needle) {
    const haystackBytes = encodeUtf8(haystack);
    const needleBytes = encodeUtf8(needle);
    const haystackLen = lengthOfByteString(haystackBytes);
    const needleLen = lengthOfByteString(needleBytes);
    if (lessThanInteger(haystackLen, needleLen))
        return false;
    let i = 0n;
    const maxStart = subtractInteger(haystackLen, needleLen);
    while (lessThanEqualsInteger(i, maxStart)) {
        const slice = sliceByteString(haystackBytes, i, addInteger(i, needleLen));
        if (equalsByteString(slice, needleBytes))
            return true;
        i = addInteger(i, 1n);
    }
    return false;
}
// Compare two strings lexicographically
function convenienceStringCompare(a, b) {
    const aBytes = encodeUtf8(a);
    const bBytes = encodeUtf8(b);
    const aLen = lengthOfByteString(aBytes);
    const bLen = lengthOfByteString(bBytes);
    let i = BigInt(0);
    const maxLen = convenienceMin(aLen, bLen);
    while (lessThanInteger(i, maxLen)) {
        const aByte = indexByteString(aBytes, i);
        const bByte = indexByteString(bBytes, i);
        if (lessThanInteger(BigInt(aByte), BigInt(bByte)))
            return BigInt(-1);
        if (lessThanInteger(BigInt(bByte), BigInt(aByte)))
            return BigInt(1);
        i = addInteger(i, BigInt(1));
    }
    if (lessThanInteger(aLen, bLen))
        return BigInt(-1);
    if (lessThanInteger(bLen, aLen))
        return BigInt(1);
    return BigInt(0);
}
// Check if string starts with prefix
function convenienceStringStartsWith(str, prefix) {
    const strBytes = encodeUtf8(str);
    const prefixBytes = encodeUtf8(prefix);
    const prefixLen = lengthOfByteString(prefixBytes);
    if (lessThanInteger(lengthOfByteString(strBytes), prefixLen))
        return false;
    const strPrefix = sliceByteString(strBytes, 0n, prefixLen);
    return equalsByteString(strPrefix, prefixBytes);
}
// Check if string ends with suffix
function convenienceStringEndsWith(str, suffix) {
    const strBytes = encodeUtf8(str);
    const suffixBytes = encodeUtf8(suffix);
    const strLen = lengthOfByteString(strBytes);
    const suffixLen = lengthOfByteString(suffixBytes);
    if (lessThanInteger(strLen, suffixLen))
        return false;
    const start = subtractInteger(strLen, suffixLen);
    const strSuffix = sliceByteString(strBytes, start, strLen);
    return equalsByteString(strSuffix, suffixBytes);
}
// Get substring
function convenienceSubstring(str, start, end) {
    const strBytes = encodeUtf8(str);
    const strLen = lengthOfByteString(strBytes);
    const clampedStart = convenienceMax(BigInt(0), convenienceMin(start, strLen));
    const clampedEnd = convenienceMax(clampedStart, convenienceMin(end, strLen));
    const resultBytes = sliceByteString(strBytes, clampedStart, clampedEnd);
    return decodeUtf8(resultBytes);
}
// Split string by delimiter (returns array of strings)
function convenienceStringSplit(str, _delimiter) {
    // For now, return the string as a single element array
    // TODO: Implement proper string splitting using available builtins
    return [str];
}
// Utility Functions for New Types
function createInterval(lowerBound, upperBound, lowerInclusive = true, upperInclusive = true) {
    return { lowerBound, upperBound, lowerInclusive, upperInclusive };
}
function createBls12_381_G1Element(value) {
    return value;
}
function createBls12_381_G2Element(value) {
    return value;
}
function createBls12_381_Scalar(value) {
    return value;
}
// Compare two integers
function convenienceCompare(a, b) {
    if (lessThanInteger(a, b))
        return BigInt(-1);
    if (lessThanInteger(b, a))
        return BigInt(1);
    return BigInt(0);
}
//# sourceMappingURL=cardano.js.map