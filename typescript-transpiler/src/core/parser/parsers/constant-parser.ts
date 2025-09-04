// Constant parser for AikScript
// Following aiken-lang patterns for modular organization

import * as ts from 'typescript';
import { ConstantDefinition } from '../interfaces';

export class ConstantParser {
  /**
   * Parses constant declaration
   */
  parse(node: ts.VariableDeclaration): ConstantDefinition {
    return {
      name: node.name.getText(),
      typeAnnotation: node.type ? this.generateTypeDefinition(node.type) : undefined,
      value: node.initializer ? node.initializer.getText() : '',
      isPublic: this.isPublicDeclaration(node),
      docs: this.extractJSDoc(node),
    };
  }

  /**
   * Generates type definition string from TypeScript type
   */
  private generateTypeDefinition(type: ts.TypeNode): string {
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
        default:
          return typeName;
      }
    }
    return type.getText();
  }

  /**
   * Checks if a declaration is public
   */
  private isPublicDeclaration(node: ts.VariableDeclaration): boolean {
    const parent = node.parent?.parent as ts.VariableStatement;
    const modifiers = parent?.modifiers;
    if (!modifiers) return false;

    return modifiers.some(
      (mod: ts.ModifierLike) =>
        mod.kind === ts.SyntaxKind.ExportKeyword || mod.kind === ts.SyntaxKind.PublicKeyword
    );
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
