// Type parser for AikScript
// Following aiken-lang patterns for modular organization

import * as ts from 'typescript';
import { TypeDefinition } from '../interfaces';

export class TypeParser {
  /**
   * Parses type alias declaration
   */
  parseTypeAlias(node: ts.TypeAliasDeclaration): TypeDefinition {
    const typeDef = this.generateTypeDefinition(node.type);

    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: typeDef,
      isOpaque: false,
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Parses interface declaration
   */
  parseInterface(node: ts.InterfaceDeclaration): TypeDefinition {
    const fields = node.members
      .filter(ts.isPropertySignature)
      .map(member => {
        const name = member.name.getText();
        const type = member.type ? this.generateTypeDefinition(member.type) : 'Void';
        return `${name}: ${type}`;
      })
      .join(',\n');

    return {
      name: node.name.getText(),
      typeParams: node.typeParameters?.map(tp => tp.name.getText()),
      definition: fields ? `{\n${fields}\n}` : '{}',
      isOpaque: false,
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Generates type definition string from TypeScript type
   */
  private generateTypeDefinition(type: ts.TypeNode): string {
    // Handle literal types (string literals, number literals, etc.)
    if (ts.isLiteralTypeNode(type)) {
      if (ts.isStringLiteral(type.literal)) {
        return type.literal.text;
      }
      if (ts.isNumericLiteral(type.literal)) {
        return type.literal.text;
      }
      return type.literal.getText();
    }

    // Map TypeScript types to Aiken types
    if (ts.isTypeReferenceNode(type)) {
      const typeName = type.typeName.getText();
      switch (typeName) {
        case 'boolean':
        case 'Bool':
          return 'Bool';
        case 'number':
        case 'Int':
          return 'Int';
        case 'string':
        case 'String':
          return 'String';
        case 'Uint8Array':
        case 'ByteArray':
          return 'ByteArray';
        case 'PubKeyHash':
          return 'PubKeyHash';
        case 'ScriptHash':
          return 'ScriptHash';
        case 'AssetName':
          return 'AssetName';
        case 'PolicyId':
          return 'PolicyId';
        case 'POSIXTime':
          return 'POSIXTime';
        case 'ScriptContext':
          return 'ScriptContext';
        case 'Address':
          return 'Address';
        default:
          return typeName;
      }
    }

    // Handle union types
    if (ts.isUnionTypeNode(type)) {
      const unionTypes = type.types.map(t => this.generateTypeDefinition(t));
      return unionTypes.join(' | ');
    }

    // Handle array types
    if (ts.isArrayTypeNode(type)) {
      const elementType = this.generateTypeDefinition(type.elementType);
      return `List<${elementType}>`;
    }

    // Handle tuple types
    if (ts.isTupleTypeNode(type)) {
      const elementTypes = type.elements.map(t => this.generateTypeDefinition(t));
      return `(${elementTypes.join(', ')})`;
    }

    return type.getText();
  }

  /**
   * Checks if a declaration is public
   */
  private isPublicDeclaration(node: ts.Declaration): boolean {
    return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
  }

  /**
   * Extracts JSDoc comments
   */
  private extractJSDoc(node: ts.Node): string[] | undefined {
    const jsDoc = ts.getJSDocCommentsAndTags(node);
    if (jsDoc.length > 0) {
      return jsDoc.map(doc => doc.comment?.toString() || '');
    }
    return undefined;
  }
}
