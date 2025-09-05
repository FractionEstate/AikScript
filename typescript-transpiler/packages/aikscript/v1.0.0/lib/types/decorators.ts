// AikScript DSL Decorators
// TypeScript decorator implementations for AikScript contracts

/**
 * Contract decorator - marks a class as an AikScript contract
 * @param name The name of the contract
 */
export function contract(_name: string) {
  return function <T extends new (...args: unknown[]) => object>(target: T): T {
    // Marker decorator - metadata is read at compile time by the transpiler
    return target;
  };
}

/**
 * Datum decorator - marks a property as contract datum
 */
export function datum(_target: object, _propertyKey: string) {
  // Marker decorator - metadata is read at compile time by the transpiler
}

/**
 * Validator decorator - marks a method as a contract validator
 * @param purpose The purpose of the validator (spend, mint, etc.)
 */
export function validator(_purpose: string) {
  return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
    // Marker decorator - metadata is read at compile time by the transpiler
    return descriptor;
  };
}
