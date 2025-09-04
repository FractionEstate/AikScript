// Constant definition generation for AikScript
// Following aiken-lang patterns for modular organization

import { AikenConstant } from '../../transpiler';

/**
 * Generates Aiken constant definitions from AikenConstant objects
 */
export class ConstantGenerator {
  /**
   * Generate constant definition
   */
  generate(constant: AikenConstant): string {
    const lines: string[] = [];

    // Add docs
    if (constant.docs && constant.docs.length > 0) {
      constant.docs.forEach(doc => {
        lines.push(`/// ${doc}`);
      });
    }

    let definition = '';
    if (constant.isPublic) {
      definition += 'pub ';
    }
    definition += `const ${constant.name}: ${constant.type} = ${constant.value}`;

    lines.push(definition);
    return lines.join('\n');
  }
}
