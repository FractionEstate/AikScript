import * as ts from 'typescript';
import { ParserResult, FunctionDefinition } from '../interfaces/index';
/**
 * Parser for function declarations and method declarations
 */
export declare class FunctionParser {
    /**
     * Parses a function declaration
     */
    parseFunctionDeclaration(node: ts.FunctionDeclaration): ParserResult;
    /**
     * Parses a method declaration
     */
    parseMethodDeclaration(node: ts.MethodDeclaration): ParserResult;
    /**
     * Checks if a method is a validator method (has @validator decorator)
     */
    isValidatorMethod(node: ts.MethodDeclaration): boolean;
    /**
     * Gets the validator name from the @validator decorator
     */
    getValidatorName(node: ts.MethodDeclaration): string | null;
    /**
     * Parses validator method parameters
     */
    parseValidatorParameters(node: ts.MethodDeclaration): ParserResult[];
    /**
     * Parses a function declaration (alias for parseFunctionDeclaration)
     */
    parseFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration): FunctionDefinition;
    /**
     * Parses a validator method
     */
    parseValidator(node: ts.MethodDeclaration): FunctionDefinition;
    /**
     * Converts ParserResult to FunctionDefinition
     */
    private convertToFunctionDefinition;
}
//# sourceMappingURL=function-parser.d.ts.map