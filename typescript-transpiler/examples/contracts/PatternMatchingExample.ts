// Pattern Matching Example for AikScript
// This demonstrates when expressions and pattern matching

// Types for pattern matching
export type Result<T, E> = { Ok: T } | { Error: E };
export type Option<T> = { Some: T } | { None: {} };

// Function with pattern matching using when expressions
export function processResult<T, E>(result: Result<T, E>): string {
  // @when result
  if (result.hasOwnProperty('Ok')) {
    const value = (result as { Ok: T }).Ok;
    return `Success: ${value}`;
  } else {
    const error = (result as { Error: E }).Error;
    return `Error: ${error}`;
  }
}

export function handleOption<T>(option: Option<T>): T | null {
  // @when option
  if (option.hasOwnProperty('Some')) {
    return (option as { Some: T }).Some;
  } else {
    return null;
  }
}

export function matchNumber(n: number): string {
  // @when n
  if (n === 0) {
    return "zero";
  } else if (n > 0) {
    return "positive";
  } else {
    return "negative";
  }
}

export function matchList<T>(list: T[]): string {
  // @when list
  if (list.length === 0) {
    return "empty list";
  } else if (list.length === 1) {
    return `single element: ${list[0]}`;
  } else if (list.length === 2) {
    return `two elements: ${list[0]}, ${list[1]}`;
  } else {
    return `many elements: ${list.length} total`;
  }
}

// Test functions
export function testProcessResult(): boolean {
  const okResult: Result<string, string> = { Ok: "success" };
  const errorResult: Result<string, string> = { Error: "failure" };

  return processResult(okResult) === "Success: success" &&
         processResult(errorResult) === "Error: failure";
}

export function testHandleOption(): boolean {
  const someOption: Option<number> = { Some: 42 };
  const noneOption: Option<number> = { None: {} };

  return handleOption(someOption) === 42 &&
         handleOption(noneOption) === null;
}

export function testMatchNumber(): boolean {
  return matchNumber(0) === "zero" &&
         matchNumber(5) === "positive" &&
         matchNumber(-3) === "negative";
}
