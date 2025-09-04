// Import statement generation for AikScript
// Following aiken-lang patterns for modular organization

import { AikenImport } from '../../transpiler';

/**
 * Generates Aiken import statements from AikenImport objects
 */
export class ImportGenerator {
  /**
   * Generate import statement
   */
  generate(imp: AikenImport): string {
    let result = `use ${imp.module}`;

    if (imp.alias) {
      result += ` as ${imp.alias}`;
    }

    if (imp.exposing && imp.exposing.length > 0) {
      result += `.{${imp.exposing.join(', ')}}`;
    }

    return result;
  }
}
