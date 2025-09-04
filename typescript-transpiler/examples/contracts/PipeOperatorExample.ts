// Pipe Operator Example for AikScript
// This demonstrates the |> pipe operator for function composition

// Utility functions for demonstration
export function double(x: number): number {
  return x * 2;
}

export function addOne(x: number): number {
  return x + 1;
}

export function square(x: number): number {
  return x * x;
}

export function toString(x: number): string {
  return x.toString();
}

export function addPrefix(prefix: string, value: string): string {
  return prefix + value;
}

// Function using pipe operators
export function processNumber(input: number): string {
  // @pipe input |> double |> addOne |> square |> toString |> addPrefix("Result: ")
  return addPrefix("Result: ", toString(square(addOne(double(input)))));
}

export function complexPipeline(input: number): string {
  // @pipe input |> double |> addOne |> square |> toString |> addPrefix("Final: ")
  return addPrefix("Final: ", toString(square(addOne(double(input)))));
}

export function conditionalPipeline(input: number): string {
  // Pipeline with conditional logic
  if (input > 10) {
    // @pipe input |> double |> toString |> addPrefix("Big: ")
    return addPrefix("Big: ", toString(double(input)));
  } else {
    // @pipe input |> addOne |> toString |> addPrefix("Small: ")
    return addPrefix("Small: ", toString(addOne(input)));
  }
}

// Test functions
export function testProcessNumber(): boolean {
  return processNumber(3) === "Result: 49"; // (3 * 2 + 1)^2 = 49
}

export function testComplexPipeline(): boolean {
  return complexPipeline(2) === "Final: 25"; // (2 * 2 + 1)^2 = 25
}

export function testConditionalPipeline(): boolean {
  return conditionalPipeline(15) === "Big: 30" && // 15 * 2 = 30
         conditionalPipeline(5) === "Small: 6";   // 5 + 1 = 6
}
