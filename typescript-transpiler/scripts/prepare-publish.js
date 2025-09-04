#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Preparing AikScript for publishing...');

// Run tests
console.log('📋 Running tests...');
execSync('npm test', { stdio: 'inherit' });

// Build the project
console.log('🔨 Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Check if user is logged in to npm
try {
  execSync('npm whoami', { stdio: 'pipe' });
  console.log('✅ NPM authentication confirmed');
} catch (error) {
  console.log('❌ Please login to NPM first: npm login');
  process.exit(1);
}

// Dry run publish
console.log('📦 Performing dry-run publish...');
execSync('npm publish --dry-run', { stdio: 'inherit' });

console.log('\\n🎉 Ready to publish!');
console.log('Run: npm publish');
console.log('\\n📚 After publishing, users can install with:');
console.log('npm install -g aikscript');
