import * as ts from 'typescript';
/**
 * Type mapping utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript types to Aiken types
 */
interface TypeDefinition {
    name: string;
    declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration;
}
export declare class TypeMapper {
    /**
     * Map TypeScript type references to Aiken types
     */
    static mapTypeReference(typeName: string): string;
    /**
     * Transform a TypeScript type node to Aiken type string
     */
    static transformTypeNode(typeNode: ts.TypeNode): string;
    /**
     * Transform a custom type definition to Aiken type definition
     */
    static transformTypeDefinition(type: TypeDefinition): string;
    /**
     * Check if a type should be wrapped in Option<T> for datums
     */
    static shouldWrapInOption(type: string): boolean;
    /**
     * Wrap a type in Option<T> if needed
     */
    static wrapInOption(type: string): string;
}
export {};
//# sourceMappingURL=types.d.ts.map