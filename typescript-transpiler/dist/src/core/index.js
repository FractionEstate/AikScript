"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptToAikenTranspiler = exports.BuiltinRegistry = exports.TypeMapper = exports.CodeGenerator = exports.ValidatorTransformer = exports.ExpressionTransformer = exports.AikenTransformer = exports.TypeScriptParser = void 0;
// Core transpiler engine exports
var parser_1 = require("./parser/parser");
Object.defineProperty(exports, "TypeScriptParser", { enumerable: true, get: function () { return parser_1.TypeScriptParser; } });
var transformer_1 = require("./transformer/transformer");
Object.defineProperty(exports, "AikenTransformer", { enumerable: true, get: function () { return transformer_1.AikenTransformer; } });
var expressions_1 = require("./transformer/expressions");
Object.defineProperty(exports, "ExpressionTransformer", { enumerable: true, get: function () { return expressions_1.ExpressionTransformer; } });
var validators_1 = require("./transformer/validators");
Object.defineProperty(exports, "ValidatorTransformer", { enumerable: true, get: function () { return validators_1.ValidatorTransformer; } });
var generator_1 = require("./generator/generator");
Object.defineProperty(exports, "CodeGenerator", { enumerable: true, get: function () { return generator_1.CodeGenerator; } });
var types_1 = require("./types/types");
Object.defineProperty(exports, "TypeMapper", { enumerable: true, get: function () { return types_1.TypeMapper; } });
var builtins_1 = require("./types/builtins");
Object.defineProperty(exports, "BuiltinRegistry", { enumerable: true, get: function () { return builtins_1.BuiltinRegistry; } });
var transpiler_1 = require("./transpiler");
Object.defineProperty(exports, "TypeScriptToAikenTranspiler", { enumerable: true, get: function () { return transpiler_1.TypeScriptToAikenTranspiler; } });
//# sourceMappingURL=index.js.map