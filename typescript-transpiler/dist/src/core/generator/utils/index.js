"use strict";
// Utility functions for AikScript code generation
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorUtils = void 0;
/**
 * Utility functions for code generation
 */
class GeneratorUtils {
    /**
     * Map type names to Aiken equivalents
     */
    static mapTypeToAiken(typeName) {
        switch (typeName) {
            case 'boolean':
                return 'Bool';
            case 'number':
                return 'Int';
            case 'string':
                return 'String';
            default:
                return typeName;
        }
    }
    /**
     * Convert function body from TypeScript to Aiken syntax
     */
    static convertFunctionBodyToAiken(body) {
        return body
            .replace(/const\s+/g, 'let ') // Convert const to let
            .replace(/let\s+/g, 'let ') // Keep let as is
            .replace(/===\s*true/g, '') // Remove === true
            .replace(/===\s*false/g, ' == False') // Convert === false
            .replace(/===\s*([^f])/g, ' == $1') // Convert === to ==
            .replace(/!==\s*([^f])/g, ' != $1') // Convert !== to !=
            .replace(/&&/g, ' && ') // Ensure spaces around &&
            .replace(/\s*\|\|\s*/g, ' || ') // Ensure spaces around || operator
            .replace(/!/g, ' !') // Ensure space before !
            .replace(/if\s*\(/g, 'if ') // Remove parentheses from if
            .replace(/\)\s*{/g, ' {') // Remove closing paren from if
            .replace(/else\s*if\s*\(/g, 'else if ') // Remove parentheses from else if
            .replace(/}\s*else\s*{/g, '} else {') // Clean up else
            .replace(/return\s+/g, '') // Remove return keyword (Aiken uses implicit return)
            .replace(/;/g, '') // Remove semicolons
            .replace(/undefined/g, 'None') // Convert undefined to None
            .replace(/null/g, 'None') // Convert null to None
            .replace(/Date\.now\(\)/g, 'get_current_time()') // Convert Date.now() to Aiken function
            .replace(/typeof\s+(\w+)\s*===\s*['"]string['"]/g, 'is_string($1)') // Convert typeof checks
            .replace(/typeof\s+(\w+)\s*===\s*['"]number['"]/g, 'is_int($1)') // Convert typeof checks
            .replace(/typeof\s+(\w+)\s*===\s*['"]boolean['"]/g, 'is_bool($1)') // Convert typeof checks
            .replace(/JSON\.stringify/g, 'to_string') // Convert JSON.stringify to Aiken function
            .replace(/\.\.\./g, '..') // Convert spread operator
            .replace(/`([^`]*)`/g, '"$1"') // Convert template literals to regular strings
            .replace(/(\w+)\.(\w+)/g, '$1.$2') // Keep property access as is
            .replace(/\/\/.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/(\w+)\.hasOwnProperty\('([^']+)'\)/g, '$1 is $2') // Convert hasOwnProperty to pattern matching
            .replace(/(\w+)\.length/g, 'length($1)') // Convert .length to length() function
            .replace(/(\w+)\[(\d+)\]/g, 'index($1, $2)') // Convert array access to index function
            .replace(/{\s*/g, '') // Remove opening braces
            .replace(/\s*}/g, '') // Remove closing braces
            .trim();
    }
    /**
     * Check if a function body contains conditional logic
     */
    static isConditionalFunction(body) {
        return body.includes('if') && body.includes('else');
    }
}
exports.GeneratorUtils = GeneratorUtils;
//# sourceMappingURL=index.js.map