// Import parser for AikScript
// Following aiken-lang patterns for modular organization

import * as ts from 'typescript';
import { ImportDeclaration } from '../interfaces';

export class ImportParser {
  /**
   * Parses import declaration
   */
  parse(node: ts.ImportDeclaration): ImportDeclaration {
    const module = node.moduleSpecifier.getText().replace(/['"]/g, '');
    return {
      module,
    };
  }
}
