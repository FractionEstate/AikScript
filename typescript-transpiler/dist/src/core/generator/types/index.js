"use strict";
// Type definition generation for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGenerator = void 0;
/**
 * Generates Aiken type definitions from AikenType objects
 */
class TypeGenerator {
    /**
     * Generate type definition
     */
    generate(type) {
        const lines = [];
        // Add docs
        if (type.docs && type.docs.length > 0) {
            type.docs.forEach(doc => {
                lines.push(`/// ${doc}`);
            });
        }
        // Check if this is a simple type alias (no braces in definition)
        const isSimpleAlias = !type.definition.includes('{') && !type.definition.includes('|');
        let typeDeclaration = '';
        if (type.isOpaque) {
            typeDeclaration += 'pub opaque type ';
        }
        else if (type.isPublic) {
            typeDeclaration += 'pub type ';
        }
        else {
            typeDeclaration += 'type ';
        }
        typeDeclaration += type.name;
        // Handle generic types
        if (type.typeParams && type.typeParams.length > 0) {
            typeDeclaration += `<${type.typeParams.join(', ')}>`;
        }
        if (isSimpleAlias) {
            // For simple type aliases, use = syntax
            typeDeclaration += ` = ${type.definition}`;
            lines.push(typeDeclaration);
        }
        else {
            // For complex types (records, unions), use { } syntax
            typeDeclaration += ' {';
            lines.push(typeDeclaration);
            // Parse the definition and convert to Aiken syntax
            const aikenDefinition = this.convertToAikenSyntax(type.definition);
            if (aikenDefinition.trim()) {
                lines.push(aikenDefinition);
            }
            lines.push('}');
        }
        return lines.join('\n');
    }
    /**
     * Convert TypeScript-like syntax to Aiken syntax
     */
    convertToAikenSyntax(definition) {
        // Handle record types (objects with properties)
        if (definition.includes('{') && definition.includes(':')) {
            // If it's already properly formatted, clean it up
            if (definition.startsWith('{') && definition.endsWith('}')) {
                // Extract content between braces
                const content = definition.slice(1, -1).trim();
                // Clean up formatting - ensure proper line breaks and indentation
                const lines = content
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0);
                return lines.join('\n');
            }
            // Otherwise, it's likely a type alias that doesn't need extra formatting
            return definition;
        }
        // Handle union types - they should be used directly
        if (definition.includes('|')) {
            return definition;
        }
        // Handle primitive types and type references - they should be used directly
        return definition;
    }
}
exports.TypeGenerator = TypeGenerator;
//# sourceMappingURL=index.js.map