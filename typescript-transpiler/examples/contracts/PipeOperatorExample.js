"use strict";
// Pipe Operator Example for AikScript
// This demonstrates the |> pipe operator for function composition
Object.defineProperty(exports, "__esModule", { value: true });
exports.double = double;
exports.addOne = addOne;
exports.square = square;
exports.toString = toString;
exports.addPrefix = addPrefix;
exports.processNumber = processNumber;
exports.complexPipeline = complexPipeline;
exports.conditionalPipeline = conditionalPipeline;
exports.testProcessNumber = testProcessNumber;
exports.testComplexPipeline = testComplexPipeline;
exports.testConditionalPipeline = testConditionalPipeline;
// Utility functions for demonstration
function double(x) {
    return x * 2;
}
function addOne(x) {
    return x + 1;
}
function square(x) {
    return x * x;
}
function toString(x) {
    return x.toString();
}
function addPrefix(prefix, value) {
    return prefix + value;
}
// Function using pipe operators
function processNumber(input) {
    // @pipe input |> double |> addOne |> square |> toString |> addPrefix("Result: ")
    return addPrefix("Result: ", toString(square(addOne(double(input)))));
}
function complexPipeline(input) {
    // @pipe input |> double |> addOne |> square |> toString |> addPrefix("Final: ")
    return addPrefix("Final: ", toString(square(addOne(double(input)))));
}
function conditionalPipeline(input) {
    // Pipeline with conditional logic
    if (input > 10) {
        // @pipe input |> double |> toString |> addPrefix("Big: ")
        return addPrefix("Big: ", toString(double(input)));
    }
    else {
        // @pipe input |> addOne |> toString |> addPrefix("Small: ")
        return addPrefix("Small: ", toString(addOne(input)));
    }
}
// Test functions
function testProcessNumber() {
    return processNumber(3) === "Result: 49"; // (3 * 2 + 1)^2 = 49
}
function testComplexPipeline() {
    return complexPipeline(2) === "Final: 25"; // (2 * 2 + 1)^2 = 25
}
function testConditionalPipeline() {
    return conditionalPipeline(15) === "Big: 30" && // 15 * 2 = 30
        conditionalPipeline(5) === "Small: 6"; // 5 + 1 = 6
}
//# sourceMappingURL=PipeOperatorExample.js.map