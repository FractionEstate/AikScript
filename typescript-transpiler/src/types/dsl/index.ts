// DSL decorators for AikScript smart contract development
// Following aiken-lang patterns for modular organization

// Contract decorator
export function contract(name: string) {
  return function <T extends new (...args: unknown[]) => object>(target: T): T {
    // Store contract metadata
    (target as Record<string, unknown>).__contractName = name;
    return target;
  };
}

// Datum decorator
export function datum(target: Record<string, unknown>, propertyKey: string): void {
  const constructor = target.constructor as unknown as Record<string, unknown>;
  const datums = (constructor.__datums as string[]) || [];
  datums.push(propertyKey);
  constructor.__datums = datums;
}

// Validator decorator
export function validator(purpose: string) {
  return function (target: Record<string, unknown>, propertyKey: string, descriptor: PropertyDescriptor): void {
    const constructor = target.constructor as unknown as Record<string, unknown>;
    const validators = (constructor.__validators as unknown[]) || [];
    validators.push({
      name: propertyKey,
      purpose,
      implementation: descriptor.value,
    });
    constructor.__validators = validators;
  };
}
