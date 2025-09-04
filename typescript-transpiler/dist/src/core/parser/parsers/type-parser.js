"use strict";
// Type parser for AikScript
// Following aiken-lang patterns for modular organization
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeParser = void 0;
const ts = __importStar(require("typescript"));
class TypeParser {
    /**
     * Parses type alias declaration
     */
    parseTypeAlias(node) {
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
    parseInterface(node) {
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
    generateTypeDefinition(type) {
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
    isPublicDeclaration(node) {
        return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
    }
    /**
     * Extracts JSDoc comments
     */
    extractJSDoc(node) {
        const jsDoc = ts.getJSDocCommentsAndTags(node);
        if (jsDoc.length > 0) {
            return jsDoc.map(doc => doc.comment?.toString() || '');
        }
        return undefined;
    }
}
exports.TypeParser = TypeParser;
//# sourceMappingURL=type-parser.js.map