#!/usr/bin/env node

// Main CLI entry point for AikScript
// Following aiken-lang patterns for modular organization

import { Command } from 'commander';
import { handleCompile } from './commands/compile';
import { handleInit } from './commands/init';

const program = new Command();

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
  .action(handleCompile);

// Init command
program
  .command('init <projectName>')
  .description('Initialize a new TypeScript Aiken project with standard Aiken structure')
  .option('-t, --template <template>', 'Project template', 'basic')
  .action(handleInit);

// Parse command line arguments
program.parse();
