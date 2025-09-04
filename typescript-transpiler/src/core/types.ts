import * as ts from 'typescript';

/**
 * Type mapping utilities for TypeScript-to-Aiken transpiler
 * This module handles the conversion of TypeScript types to Aiken types
 */

interface TypeDefinition {
  name: string;
  declaration: ts.TypeAliasDeclaration | ts.InterfaceDeclaration;
}

export class TypeMapper {
  /**
   * Map TypeScript type references to Aiken types
   */
  static mapTypeReference(typeName: string): string {
    switch (typeName) {
      case 'string':
        return 'ByteArray';
      case 'number':
        return 'Int';
      case 'boolean':
        return 'Bool';
      case 'bigint':
        return 'Int';
      case 'POSIXTime':
        return 'POSIXTime';
      case 'PubKeyHash':
        return 'PubKeyHash';
      case 'ScriptHash':
        return 'ScriptHash';
      case 'AssetName':
        return 'ByteArray';
      case 'PolicyId':
        return 'ByteArray';
      case 'Address':
        return 'Address';
      case 'ScriptContext':
        return 'ScriptContext';
      default:
        return typeName;
    }
  }

  /**
   * Transform a TypeScript type node to Aiken type string
   */
  static transformTypeNode(typeNode: ts.TypeNode): string {
    if (ts.isTypeReferenceNode(typeNode)) {
      const typeName = typeNode.typeName.getText();
      const mappedType = this.mapTypeReference(typeName);

      // Handle generic types
      if (typeNode.typeArguments && typeNode.typeArguments.length > 0) {
        const typeArgs = typeNode.typeArguments.map(arg => this.transformTypeNode(arg));
        return `${mappedType}<${typeArgs.join(', ')}>`;
      }

      return mappedType;
    }

    // Handle inline object types (type literals)
    if (ts.isTypeLiteralNode(typeNode)) {
      const members = typeNode.members
        .filter((member): member is ts.PropertySignature => ts.isPropertySignature(member))
        .map(member => {
          const name = member.name?.getText() || '';
          const type = member.type ? this.transformTypeNode(member.type) : 'Void';
          return `${name}: ${type}`;
        })
        .join(', ');

      return `{ ${members} }`;
    }

    if (ts.isArrayTypeNode(typeNode)) {
      return `List<${this.transformTypeNode(typeNode.elementType)}>`;
    }

    if (ts.isUnionTypeNode(typeNode)) {
      // Handle union types - for Aiken we might need to create sum types
      const unionTypes = typeNode.types.map((t: ts.TypeNode) => this.transformTypeNode(t));
      return unionTypes.join(' | ');
    }

    if (ts.isLiteralTypeNode(typeNode)) {
      if (ts.isStringLiteral(typeNode.literal)) {
        return `"${typeNode.literal.text}"`;
      }
      if (ts.isNumericLiteral(typeNode.literal)) {
        return typeNode.literal.text;
      }
      if (typeNode.literal.kind === ts.SyntaxKind.TrueKeyword) {
        return 'True';
      }
      if (typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) {
        return 'False';
      }
    }

    // Handle void type
    if (typeNode.kind === ts.SyntaxKind.VoidKeyword) {
      return 'Void';
    }

    // Handle undefined type
    if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) {
      return 'Void';
    }

    return 'Void';
  }

  /**
   * Transform a custom type definition to Aiken type definition
   */
  static transformTypeDefinition(type: TypeDefinition): string {
    let definition = '';

    if (type.declaration && ts.isTypeAliasDeclaration(type.declaration)) {
      definition = `type ${type.name} = ${this.transformTypeNode(type.declaration.type)}`;
    } else if (type.declaration && ts.isInterfaceDeclaration(type.declaration)) {
      const fields = type.declaration.members
        .filter((member: ts.TypeElement) => ts.isPropertySignature(member))
        .map((member: ts.PropertySignature) => {
          const name = member.name?.getText() || '';
          const type = member.type ? this.transformTypeNode(member.type) : 'Void';
          return `${name}: ${type}`;
        })
        .join(',\n  ');

      definition = `type ${type.name} {\n  ${fields}\n}`;
    }

    return definition;
  }

  /**
   * Check if a type should be wrapped in Option<T> for datums
   */
  static shouldWrapInOption(type: string): boolean {
    return !type.startsWith('Option<') && type !== 'Void';
  }

  /**
   * Wrap a type in Option<T> if needed
   */
  static wrapInOption(type: string): string {
    if (this.shouldWrapInOption(type)) {
      return `Option<${type}>`;
    }
    return type;
  }
}
