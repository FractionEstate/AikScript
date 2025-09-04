"use strict";
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
exports.TypeMapper = void 0;
const ts = __importStar(require("typescript"));
class TypeMapper {
    /**
     * Map TypeScript type references to Aiken types
     */
    static mapTypeReference(typeName) {
        switch (typeName) {
            case 'string':
                return 'ByteArray';
            case 'number':
                return 'Int';
            case 'boolean':
                return 'Bool';
            case 'bigint':
                return 'Int';
            case 'POSIXTime':
                return 'POSIXTime';
            case 'PubKeyHash':
                return 'PubKeyHash';
            case 'ScriptHash':
                return 'ScriptHash';
            case 'AssetName':
                return 'ByteArray';
            case 'PolicyId':
                return 'ByteArray';
            case 'Address':
                return 'Address';
            case 'ScriptContext':
                return 'ScriptContext';
            default:
                return typeName;
        }
    }
    /**
     * Transform a TypeScript type node to Aiken type string
     */
    static transformTypeNode(typeNode) {
        if (ts.isTypeReferenceNode(typeNode)) {
            const typeName = typeNode.typeName.getText();
            const mappedType = this.mapTypeReference(typeName);
            // Handle generic types
            if (typeNode.typeArguments && typeNode.typeArguments.length > 0) {
                const typeArgs = typeNode.typeArguments.map(arg => this.transformTypeNode(arg));
                return `${mappedType}<${typeArgs.join(', ')}>`;
            }
            return mappedType;
        }
        // Handle inline object types (type literals)
        if (ts.isTypeLiteralNode(typeNode)) {
            const members = typeNode.members
                .filter((member) => ts.isPropertySignature(member))
                .map(member => {
                const name = member.name?.getText() || '';
                const type = member.type ? this.transformTypeNode(member.type) : 'Void';
                return `${name}: ${type}`;
            })
                .join(', ');
            return `{ ${members} }`;
        }
        if (ts.isArrayTypeNode(typeNode)) {
            return `List<${this.transformTypeNode(typeNode.elementType)}>`;
        }
        if (ts.isUnionTypeNode(typeNode)) {
            // Handle union types - for Aiken we might need to create sum types
            const unionTypes = typeNode.types.map((t) => this.transformTypeNode(t));
            return unionTypes.join(' | ');
        }
        if (ts.isLiteralTypeNode(typeNode)) {
            if (ts.isStringLiteral(typeNode.literal)) {
                return `"${typeNode.literal.text}"`;
            }
            if (ts.isNumericLiteral(typeNode.literal)) {
                return typeNode.literal.text;
            }
            if (typeNode.literal.kind === ts.SyntaxKind.TrueKeyword) {
                return 'True';
            }
            if (typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) {
                return 'False';
            }
        }
        // Handle void type
        if (typeNode.kind === ts.SyntaxKind.VoidKeyword) {
            return 'Void';
        }
        // Handle undefined type
        if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) {
            return 'Void';
        }
        return 'Void';
    }
    /**
     * Transform a custom type definition to Aiken type definition
     */
    static transformTypeDefinition(type) {
        let definition = '';
        if (type.declaration && ts.isTypeAliasDeclaration(type.declaration)) {
            definition = `type ${type.name} = ${this.transformTypeNode(type.declaration.type)}`;
        }
        else if (type.declaration && ts.isInterfaceDeclaration(type.declaration)) {
            const fields = type.declaration.members
                .filter((member) => ts.isPropertySignature(member))
                .map((member) => {
                const name = member.name?.getText() || '';
                const type = member.type ? this.transformTypeNode(member.type) : 'Void';
                return `${name}: ${type}`;
            })
                .join(',\n  ');
            definition = `type ${type.name} {\n  ${fields}\n}`;
        }
        return definition;
    }
    /**
     * Check if a type should be wrapped in Option<T> for datums
     */
    static shouldWrapInOption(type) {
        return !type.startsWith('Option<') && type !== 'Void';
    }
    /**
     * Wrap a type in Option<T> if needed
     */
    static wrapInOption(type) {
        if (this.shouldWrapInOption(type)) {
            return `Option<${type}>`;
        }
        return type;
    }
}
exports.TypeMapper = TypeMapper;
//# sourceMappingURL=types.js.map