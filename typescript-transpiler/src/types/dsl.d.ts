// TypeScript declarations for TypeScript-to-Aiken DSL
// This file tells TypeScript about our custom decorators and syntax

declare global {
  // Contract decorator - Class decorator
  function contract(name: string): <T extends new (...args: any[]) => {}>(target: T) => T;

  // Datum decorator - Property decorator
  function datum(target: any, context: ClassFieldDecoratorContext): void;

  // Validator decorator - Method decorator
  function validator(
    purpose: string
  ): <T extends (...args: any[]) => any>(target: T, context: ClassMethodDecoratorContext) => T;
}

export {};
