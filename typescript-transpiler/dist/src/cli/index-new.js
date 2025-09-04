#!/usr/bin/env node
"use strict";
// Main CLI entry point for AikScript
// Following aiken-lang patterns for modular organization
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const compile_1 = require("./commands/compile");
const init_1 = require("./commands/init");
const program = new commander_1.Command();
program
    .name('aikscript')
    .description('AikScript: TypeScript-to-Aiken development copilot for Cardano smart contracts')
    .version('1.0.0');
// Compile command
program
    .command('compile <input> [output]')
    .description('Compile TypeScript smart contract to Aiken (standard Aiken structure)')
    .option('-t, --target <target>', 'Target format', 'aiken')
    .option('-o, --optimization <level>', 'Optimization level', 'development')
    .action(compile_1.handleCompile);
// Init command
program
    .command('init <projectName>')
    .description('Initialize a new TypeScript Aiken project with standard Aiken structure')
    .option('-t, --template <template>', 'Project template', 'basic')
    .action(init_1.handleInit);
// Parse command line arguments
program.parse();
//# sourceMappingURL=index-new.js.map