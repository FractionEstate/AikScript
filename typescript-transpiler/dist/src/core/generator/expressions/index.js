"use strict";
// Expression generation for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionGenerator = void 0;
/**
 * Generates various Aiken expressions (when, pipe, expect)
 */
class ExpressionGenerator {
    /**
     * Generate when expression
     */
    generateWhenExpression(whenExpr) {
        const lines = [];
        lines.push(`when ${whenExpr.expression} {`);
        whenExpr.clauses.forEach(clause => {
            const pattern = this.generatePattern(clause.pattern);
            const guard = clause.guard ? ` if ${clause.guard}` : '';
            lines.push(`  ${pattern}${guard} => ${clause.body.replace(/\/\/ matched /, '')},`);
        });
        lines.push('}');
        return lines.join('\n');
    }
    /**
     * Generate pipe expression
     */
    generatePipeExpression(pipeExpr) {
        const lines = [];
        let currentValue = pipeExpr.initialValue;
        pipeExpr.operations.forEach(op => {
            if (op.args && op.args.length > 0) {
                currentValue = `${op.functionName}(${currentValue}, ${op.args.join(', ')})`;
            }
            else {
                currentValue = `${op.functionName}(${currentValue})`;
            }
        });
        lines.push(currentValue);
        return lines.join('\n');
    }
    /**
     * Generate expect expression
     */
    generateExpectExpression(expectExpr) {
        const errorMessage = expectExpr.errorMessage || 'Expected value but found None';
        return `expect(${expectExpr.expression}, "${errorMessage}")`;
    }
    /**
     * Generate pattern for when clause
     */
    generatePattern(pattern) {
        const pat = pattern;
        switch (pat.type) {
            case 'wildcard':
                return '_';
            case 'literal':
                return String(pat.value || '');
            case 'variable':
                return String(pat.name || '_');
            case 'constructor': {
                const constructorName = String(pat.constructor || '');
                if (constructorName === 'Ok') {
                    return 'Ok(value)';
                }
                else if (constructorName === 'Error') {
                    return 'Error(error)';
                }
                else if (constructorName === 'Some') {
                    return 'Some(value)';
                }
                else if (constructorName === 'None') {
                    return 'None';
                }
                const args = pat.args;
                return `${constructorName}(${args?.map((arg) => this.generatePattern(arg)).join(', ') || ''})`;
            }
            case 'tuple': {
                const tupleArgs = pat.args;
                return `(${tupleArgs?.map((arg) => this.generatePattern(arg)).join(', ') || ''})`;
            }
            case 'list': {
                const listArgs = pat.args;
                return `[${listArgs?.map((arg) => this.generatePattern(arg)).join(', ') || ''}]`;
            }
            default:
                return String(pat.value || '_');
        }
    }
}
exports.ExpressionGenerator = ExpressionGenerator;
//# sourceMappingURL=index.js.map