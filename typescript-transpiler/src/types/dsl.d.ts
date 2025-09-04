// TypeScript declarations for TypeScript-to-Aiken DSL
// This file tells TypeScript about our custom decorators and syntax

declare global {
  // Contract decorator - Class decorator
  function contract(name: string): <T extends new (...args: unknown[]) => Record<string, unknown>>(target: T) => T;

  // Datum decorator - Property decorator
  function datum(target: Record<string, unknown>, propertyKey: string | symbol): void;

  // Validator decorator - Method decorator
  function validator(
    purpose: string
  ): <T extends (...args: unknown[]) => unknown>(target: Record<string, unknown>, propertyKey: string | symbol, descriptor: PropertyDescriptor) => T;
}

export {};
