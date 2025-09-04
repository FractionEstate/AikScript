"use strict";
// Constant parser for AikScript
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
exports.ConstantParser = void 0;
const ts = __importStar(require("typescript"));
class ConstantParser {
    /**
     * Parses constant declaration
     */
    parse(node) {
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
    generateTypeDefinition(type) {
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
    isPublicDeclaration(node) {
        const parent = node.parent?.parent;
        const modifiers = parent?.modifiers;
        if (!modifiers)
            return false;
        return modifiers.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword || mod.kind === ts.SyntaxKind.PublicKeyword);
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
exports.ConstantParser = ConstantParser;
//# sourceMappingURL=constant-parser.js.map