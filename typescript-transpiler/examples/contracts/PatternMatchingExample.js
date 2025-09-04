"use strict";
// Pattern Matching Example for AikScript
// This demonstrates when expressions and pattern matching
Object.defineProperty(exports, "__esModule", { value: true });
exports.processResult = processResult;
exports.handleOption = handleOption;
exports.matchNumber = matchNumber;
exports.matchList = matchList;
exports.testProcessResult = testProcessResult;
exports.testHandleOption = testHandleOption;
exports.testMatchNumber = testMatchNumber;
// Function with pattern matching using when expressions
function processResult(result) {
    // @when result
    if (result.hasOwnProperty('Ok')) {
        const value = result.Ok;
        return `Success: ${value}`;
    }
    else {
        const error = result.Error;
        return `Error: ${error}`;
    }
}
function handleOption(option) {
    // @when option
    if (option.hasOwnProperty('Some')) {
        return option.Some;
    }
    else {
        return null;
    }
}
function matchNumber(n) {
    // @when n
    if (n === 0) {
        return "zero";
    }
    else if (n > 0) {
        return "positive";
    }
    else {
        return "negative";
    }
}
function matchList(list) {
    // @when list
    if (list.length === 0) {
        return "empty list";
    }
    else if (list.length === 1) {
        return `single element: ${list[0]}`;
    }
    else if (list.length === 2) {
        return `two elements: ${list[0]}, ${list[1]}`;
    }
    else {
        return `many elements: ${list.length} total`;
    }
}
// Test functions
function testProcessResult() {
    const okResult = { Ok: "success" };
    const errorResult = { Error: "failure" };
    return processResult(okResult) === "Success: success" &&
        processResult(errorResult) === "Error: failure";
}
function testHandleOption() {
    const someOption = { Some: 42 };
    const noneOption = { None: {} };
    return handleOption(someOption) === 42 &&
        handleOption(noneOption) === null;
}
function testMatchNumber() {
    return matchNumber(0) === "zero" &&
        matchNumber(5) === "positive" &&
        matchNumber(-3) === "negative";
}
//# sourceMappingURL=PatternMatchingExample.js.map