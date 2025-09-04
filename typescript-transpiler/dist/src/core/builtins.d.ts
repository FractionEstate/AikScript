/**
 * Builtin function mappings and utilities for TypeScript-to-Aiken transpiler
 * This module handles the mapping of TypeScript/JavaScript functions to Aiken builtin functions
 */
export interface BuiltinMapping {
    aikenName: string;
    importName?: string;
}
export declare class BuiltinRegistry {
    private mappings;
    private usedBuiltins;
    constructor();
    private initializeMappings;
    private addMapping;
    /**
     * Get builtin mapping for a function name
     */
    getMapping(functionName: string): BuiltinMapping | null;
    /**
     * Mark a builtin function as used
     */
    markAsUsed(functionName: string): void;
    /**
     * Get all used builtin import names
     */
    getUsedImports(): string[];
    /**
     * Check if a function name is a builtin
     */
    isBuiltin(functionName: string): boolean;
    /**
     * Reset used builtins tracking
     */
    reset(): void;
}
//# sourceMappingURL=builtins.d.ts.map