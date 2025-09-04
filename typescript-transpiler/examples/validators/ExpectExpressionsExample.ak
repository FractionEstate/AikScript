pub type Result<T, E> {
Ok: T
} | {
Error: E
}

pub type Option<T> {
Some: T
} | {
None: {
}
}

const someValue: Option = { Some: 42 }

const noneValue: Option = { None: {} }

const user: Option = { Some: "Alice" }

const noUser: Option = { None: {} }

pub fn safeUnwrap<T>(option: Option) -> T
{
{
  option is Some ? (option as { Some: T }).Some : None as any
}

expect(option.Some, "Expected Some value but found None")
}

pub fn getUserName(user: Option) -> String
{
{
  user is Some ? (user as { Some: string }).Some : "Unknown"
}

expect(user, "User not found")
}

pub fn processResult<T>(result: Result) -> T
{
{
  if result is Ok {
    (result as { Ok: T }).Ok
  } else {
    throw new Error((result as { Error: string }).Error)
  }
}

expect(result.Error, "Operation failed")
}

pub fn testSafeUnwrap() -> Bool
{
{
  let someValue: Option<number> = { Some: 42 }
  let noneValue: Option<number> = { None: {} }

  safeUnwrap(someValue)  == 42
}

expect(result.Error, "Operation failed")
}

pub fn testGetUserName() -> Bool
{
{
  let user: Option<string> = { Some: "Alice" }
  let noUser: Option<string> = { None: {} }

  getUserName(user)  == "Alice"
}

expect(result.Error, "Operation failed")
}
