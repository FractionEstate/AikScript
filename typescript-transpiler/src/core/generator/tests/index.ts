// Test definition generation for AikScript
// Following aiken-lang patterns for modular organization

import { AikenTest } from '../../transpiler';

/**
 * Generates Aiken test definitions from AikenTest objects
 */
export class TestGenerator {
  /**
   * Generate test definition
   */
  generate(test: AikenTest): string {
    const lines: string[] = [];

    // Add docs
    if (test.docs && test.docs.length > 0) {
      test.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    lines.push(`test ${test.name}() {`);
    lines.push(test.body);
    lines.push('}');

    return lines.join('\n');
  }
}
