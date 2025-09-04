// Expect Expressions Example for AikScript
// This demonstrates expect expressions for safe error handling

// Types for expect examples
export type Result<T, E> = { Ok: T } | { Error: E };
export type Option<T> = { Some: T } | { None: {} };

// Function with expect expression
export function safeUnwrap<T>(option: Option<T>): T {
  // @expect option.Some, "Expected Some value but found None"
  return option.hasOwnProperty('Some') ? (option as { Some: T }).Some : null as any;
}

export function getUserName(user: Option<string>): string {
  // @expect user, "User not found"
  return user.hasOwnProperty('Some') ? (user as { Some: string }).Some : "Unknown";
}

export function processResult<T>(result: Result<T, string>): T {
  if (result.hasOwnProperty('Ok')) {
    return (result as { Ok: T }).Ok;
  } else {
    // @expect result.Error, "Operation failed"
    throw new Error((result as { Error: string }).Error);
  }
}

// Test functions
export function testSafeUnwrap(): boolean {
  const someValue: Option<number> = { Some: 42 };
  const noneValue: Option<number> = { None: {} };

  return safeUnwrap(someValue) === 42;
}

export function testGetUserName(): boolean {
  const user: Option<string> = { Some: "Alice" };
  const noUser: Option<string> = { None: {} };

  return getUserName(user) === "Alice";
}
