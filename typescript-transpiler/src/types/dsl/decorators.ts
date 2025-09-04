// AikScript DSL Decorator Implementations
// These decorators are used to mark TypeScript classes and methods for Aiken code generation

// Contract metadata interface
interface ContractMetadata {
  name: string;
  class: new (...args: unknown[]) => Record<string, unknown>;
  datums: string[];
  validators: Array<{
    method: string;
    purpose: string;
  }>;
}

// Global registry to store contract metadata
const contractRegistry = new Map<string, ContractMetadata>();

// Contract decorator - marks a class as a smart contract
export function contract(name: string) {
  return function <T extends new (...args: unknown[]) => Record<string, unknown>>(target: T): T {
    // Store contract metadata
    contractRegistry.set(name, {
      name,
      class: target,
      datums: [],
      validators: []
    });

    // Return the original constructor
    return target;
  };
}

// Datum decorator - marks a property as containing datum data
export function datum(target: Record<string, unknown>, propertyKey: string): void {
  const contractName = target.constructor.name;
  const contract = contractRegistry.get(contractName);

  if (contract) {
    contract.datums.push(propertyKey);
  }
}

// Validator decorator - marks a method as a validator function
export function validator(purpose: string) {
  return function (target: Record<string, unknown>, propertyKey: string, _descriptor: PropertyDescriptor): void {
    const contractName = target.constructor.name;
    const contract = contractRegistry.get(contractName);

    if (contract) {
      contract.validators.push({
        method: propertyKey,
        purpose
      });
    }
  };
}

// Helper function to get contract metadata
export function getContractMetadata(name: string): ContractMetadata | undefined {
  return contractRegistry.get(name);
}

// Helper function to get all registered contracts
export function getAllContracts(): ContractMetadata[] {
  return Array.from(contractRegistry.values());
}
