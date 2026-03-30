#!/usr/bin/env node

// Iterates over all *.md and *.mdx files at sets their `updatedAt` front matter YAML fields
// to the date of their last git commit.
// Use ALL=1 to force run on all files,
// otherwise will only run on files that have changes from the `main` branch

const { execSync } = require('child_process');
const fs = require('fs');

const ALL_MODE = process.env.ALL === '1';

function exec(cmd, options = {}) {
  try {
    return execSync(cmd, { 
      encoding: 'utf-8', 
      cwd: process.cwd(),
      ...options 
    }).trim();
  } catch (e) {
    if (options.ignoreError) return '';
    throw new Error(`Command failed: ${cmd}\n${e.stderr || e.message}`);
  }
}

function getMarkdownFiles() {
  const allFiles = ALL_MODE 
    ? exec("git ls-files .gitbook/**/*.md .gitbook/**/*.mdx ':!:.gitbook/redirects/*'")
    : exec("git diff --name-only main...HEAD -- ':(exclude).gitbook/redirects/*' '*.md' '*.mdx'");
  
  if (!allFiles) return [];
  
  return allFiles.split('\n').filter(f => f.trim() && fs.existsSync(f));
}

function getLastCommitDate(file) {
  const dateStr = exec(`git log --follow -1 --format="%ai" -- ${JSON.stringify(file)}`);
  if (!dateStr) throw new Error(`No git history for ${file}`);
  return dateStr.split(' ')[0];
}

function updateFrontMatter(content, date) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    // create new YAML frontmatter
    return `---\nupdatedAt: "${date}"\n---\n\n${content}`;
  }
  
  let fm = match[1];
  const lines = fm.split('\n');
  let updatedAtFound = false;
  
  const newLines = lines.map(line => {
    if (line.startsWith('updatedAt:')) {
      // replace existing key in YAML frontmatter
      updatedAtFound = true;
      return `updatedAt: "${date}"`;
    }
    return line;
  });
  
  if (!updatedAtFound) {
    newLines.push(`updatedAt: "${date}"`);
  }
  
  const newFm = newLines.join('\n');
  return content.replace(frontMatterRegex, `---\n${newFm}\n---`);
}

function processFile(file) {
  console.log(`Processing: ${file}`);
  
  const date = getLastCommitDate(file);
  const content = fs.readFileSync(file, 'utf-8');
  const updated = updateFrontMatter(content, date);
  
  if (content !== updated) {
    fs.writeFileSync(file, updated, 'utf-8');
    console.log(`  ✓ Updated updatedAt: ${date}`);
  } else {
    console.log(`  → No changes needed`);
  }
}

function main() {
  try {
    exec('git rev-parse --git-dir', { ignoreError: false });
  } catch (e) {
    // fail fast if not in a git repo
    console.error('Error: Not a git repository');
    process.exit(1);
  }
  
  const files = getMarkdownFiles();
  
  if (files.length === 0) {
    // fail fast if nothing to be done
    console.log('No markdown files found to process.');
    process.exit(0);
  }
  
  let errors = 0;
  
  for (const file of files) {
    try {
      processFile(file);
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
      errors++;
    }
  }
  
  if (errors > 0) {
    console.error(`\nCompleted with ${errors} error(s)`);
    process.exit(1);
  }
  
  console.log('\nDone.');
}

main();
