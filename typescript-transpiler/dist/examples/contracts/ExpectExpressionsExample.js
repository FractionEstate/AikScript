"use strict";
// Expect Expressions Example for AikScript
// This demonstrates expect expressions for safe error handling
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeUnwrap = safeUnwrap;
exports.getUserName = getUserName;
exports.processResult = processResult;
exports.testSafeUnwrap = testSafeUnwrap;
exports.testGetUserName = testGetUserName;
// @expect option.Some, "Expected Some value but found None"
function safeUnwrap(option) {
    return option.hasOwnProperty('Some') ? option.Some : null;
}
// @expect user, "User not found"
function getUserName(user) {
    return user.hasOwnProperty('Some') ? user.Some : "Unknown";
}
// @expect result.Error, "Operation failed"
function processResult(result) {
    if (result.hasOwnProperty('Ok')) {
        return result.Ok;
    }
    else {
        throw new Error(result.Error);
    }
}
// Test functions
function testSafeUnwrap() {
    const someValue = { Some: 42 };
    const noneValue = { None: {} };
    return safeUnwrap(someValue) === 42;
}
function testGetUserName() {
    const user = { Some: "Alice" };
    const noUser = { None: {} };
    return getUserName(user) === "Alice";
}
//# sourceMappingURL=ExpectExpressionsExample.js.map