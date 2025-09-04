#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function bumpVersion(type = 'patch') {
  const packagePath = path.join(__dirname, '..', 'typescript-transpiler', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  const [major, minor, patch] = packageJson.version.split('.').map(Number);

  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }

  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`Version bumped to ${newVersion}`);

  // Commit the version change
  execSync('git add typescript-transpiler/package.json', { stdio: 'inherit' });
  execSync(`git commit -m "Bump version to ${newVersion}"`, { stdio: 'inherit' });

  // Create and push tag
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  execSync(`git push origin main v${newVersion}`, { stdio: 'inherit' });

  console.log(`Tag v${newVersion} created and pushed`);
  console.log('GitHub Action will automatically publish to NPM');
}

const type = process.argv[2] || 'patch';
bumpVersion(type);
