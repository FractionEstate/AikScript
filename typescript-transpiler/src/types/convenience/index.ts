// Convenience functions for AikScript
// TypeScript implementations using existing UPLC builtins
// Following aiken-lang patterns for modular organization

import { Int, Bool } from '../basic/index.js';
import {
  lessThanInteger,
  subtractInteger,
  addInteger,
  multiplyInteger,
  divideInteger,
  remainderInteger,
  equalsInteger,
  encodeUtf8,
  decodeUtf8,
  appendByteString,
  sliceByteString,
  lengthOfByteString,
  equalsByteString,
  indexByteString
} from '../builtin/index.js';

/**
 * Mathematical convenience functions using existing UPLC builtins
 */

// Absolute value
export function convenienceAbs(value: Int): Int {
  return lessThanInteger(value, BigInt(0)) ? subtractInteger(BigInt(0), value) : value;
}

// Minimum of two integers
export function convenienceMin(a: Int, b: Int): Int {
  return lessThanInteger(a, b) ? a : b;
}

// Maximum of two integers
export function convenienceMax(a: Int, b: Int): Int {
  return lessThanInteger(a, b) ? b : a;
}

// Clamp value between min and max
export function convenienceClamp(value: Int, minVal: Int, maxVal: Int): Int {
  if (lessThanInteger(value, minVal)) return minVal;
  if (lessThanInteger(maxVal, value)) return maxVal;
  return value;
}

// Sign function (-1, 0, or 1)
export function convenienceSign(value: Int): Int {
  if (lessThanInteger(value, BigInt(0))) return -1n;
  if (lessThanInteger(0n, value)) return 1n;
  return 0n;
}

// Compare two integers
export function convenienceCompare(a: Int, b: Int): Int {
  if (lessThanInteger(a, b)) return BigInt(-1);
  if (lessThanInteger(b, a)) return BigInt(1);
  return BigInt(0);
}

// Power function (exponentiation by squaring for positive integer exponents)
export function conveniencePow(base: Int, exponent: Int): Int {
  if (equalsInteger(exponent, BigInt(0))) return BigInt(1);
  if (equalsInteger(exponent, BigInt(1))) return base;

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
export function convenienceIsEven(value: Int): Bool {
  return equalsInteger(remainderInteger(value, BigInt(2)), BigInt(0));
}

// Check if number is odd
export function convenienceIsOdd(value: Int): Bool {
  return equalsInteger(remainderInteger(value, BigInt(2)), BigInt(1));
}

// Factorial (for small integers to avoid overflow)
export function convenienceFactorial(n: Int): Int {
  if (lessThanInteger(n, BigInt(0))) return BigInt(0); // Error case
  if (equalsInteger(n, BigInt(0)) || equalsInteger(n, BigInt(1))) return BigInt(1);

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
export function convenienceStringLength(str: string): Int {
  return lengthOfByteString(encodeUtf8(str));
}

// Concatenate two strings
export function convenienceStringConcat(a: string, b: string): string {
  return decodeUtf8(appendByteString(encodeUtf8(a), encodeUtf8(b)));
}

// Check if string contains substring
export function convenienceStringContains(haystack: string, needle: string): Bool {
  const haystackBytes = encodeUtf8(haystack);
  const needleBytes = encodeUtf8(needle);
  const haystackLen = lengthOfByteString(haystackBytes);
  const needleLen = lengthOfByteString(needleBytes);

  if (lessThanInteger(haystackLen, needleLen)) return false;

  let i = 0n;
  const maxStart = subtractInteger(haystackLen, needleLen);

  while (lessThanInteger(i, addInteger(maxStart, 1n))) {
    const slice = sliceByteString(haystackBytes, i, addInteger(i, needleLen));
    if (equalsByteString(slice, needleBytes)) return true;
    i = addInteger(i, 1n);
  }

  return false;
}

// Compare two strings lexicographically
export function convenienceStringCompare(a: string, b: string): Int {
  const aBytes = encodeUtf8(a);
  const bBytes = encodeUtf8(b);
  const aLen = lengthOfByteString(aBytes);
  const bLen = lengthOfByteString(bBytes);

  let i = BigInt(0);
  const maxLen = convenienceMin(aLen, bLen);

  while (lessThanInteger(i, maxLen)) {
    const aByte = indexByteString(aBytes, i);
    const bByte = indexByteString(bBytes, i);

    if (lessThanInteger(BigInt(aByte), BigInt(bByte))) return BigInt(-1);
    if (lessThanInteger(BigInt(bByte), BigInt(aByte))) return BigInt(1);

    i = addInteger(i, BigInt(1));
  }

  if (lessThanInteger(aLen, bLen)) return BigInt(-1);
  if (lessThanInteger(bLen, aLen)) return BigInt(1);
  return BigInt(0);
}

// Check if string starts with prefix
export function convenienceStringStartsWith(str: string, prefix: string): Bool {
  const strBytes = encodeUtf8(str);
  const prefixBytes = encodeUtf8(prefix);
  const prefixLen = lengthOfByteString(prefixBytes);

  if (lessThanInteger(lengthOfByteString(strBytes), prefixLen)) return false;

  const strPrefix = sliceByteString(strBytes, 0n, prefixLen);
  return equalsByteString(strPrefix, prefixBytes);
}

// Check if string ends with suffix
export function convenienceStringEndsWith(str: string, suffix: string): Bool {
  const strBytes = encodeUtf8(str);
  const suffixBytes = encodeUtf8(suffix);
  const strLen = lengthOfByteString(strBytes);
  const suffixLen = lengthOfByteString(suffixBytes);

  if (lessThanInteger(strLen, suffixLen)) return false;

  const start = subtractInteger(strLen, suffixLen);
  const strSuffix = sliceByteString(strBytes, start, strLen);
  return equalsByteString(strSuffix, suffixBytes);
}

// Substring function
export function convenienceSubstring(str: string, start: Int, end: Int): string {
  const strBytes = encodeUtf8(str);
  const strLen = lengthOfByteString(strBytes);
  const clampedStart = convenienceMax(BigInt(0), convenienceMin(start, strLen));
  const clampedEnd = convenienceMax(clampedStart, convenienceMin(end, strLen));

  const resultBytes = sliceByteString(strBytes, clampedStart, clampedEnd);
  return decodeUtf8(resultBytes);
}

// Split string by delimiter (returns array of strings)
export function convenienceStringSplit(str: string, _delimiter: string): string[] {
  // For now, return the string as a single element array
  // TODO: Implement proper string splitting using available builtins
  return [str];
}
