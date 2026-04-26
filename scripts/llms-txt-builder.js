#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const DOCS_JSON = 'docs.json';
const OUTPUT_FILE = 'llms.txt';
const SRC_DIR = path.resolve(process.cwd(), '.gitbook');

async function readJson(filePath) {
  const fullFilePath = path.resolve(SRC_DIR, filePath);
  return JSON.parse(await fs.readFile(fullFilePath, 'utf-8'));
}

async function extractFrontmatter(filePath) {
  try {
    const fullFilePath = path.resolve(SRC_DIR, filePath);
    const content = await fs.readFile(fullFilePath, 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) return {};
    
    const lines = match[1].split(/\r?\n/);
    const result = {};
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      if (!line.trim()) { // skip empty lines
        i++;
        continue;
      }
      
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) {
        i++;
        continue;
      }
      
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      
      // YAML block scalar indicators: >-, >+, >, |-, |+, |
      const blockMatch = value.match(/^([>|])([-+]?)$/);
      
      if (blockMatch) {
        const style = blockMatch[1]; // > or |
        const chomp = blockMatch[2]; // -, +, or undefined
        
        i++; // Skip current line
        
        const blockLines = [];
        let contentIndent = null;
        
        while (i < lines.length) {
        // go through line until hit next key: non-empty line with no leading whitespace (column 0)
          const l = lines[i];
          if (l.trim() && !l.startsWith(' ') && !l.startsWith('\t')) {
            break;
          }
          
          if (contentIndent === null && l.trim()) {
            // get indentation from first non-empty line
            contentIndent = l.length - l.trimStart().length;
          }
          
          if (contentIndent !== null) {
            const currentIndent = l.length - l.trimStart().length;
            // if de-dented past the content level, it's a new key
            if (l.trim() && currentIndent < contentIndent) {
              break;
            }
            blockLines.push(l.slice(contentIndent));
          } else {
            blockLines.push(l);
          }
          i++;
        }
        
        let text = blockLines.join('\n');
        
        if (style === '>') {
          // replace misc newlines and whitespace with single space
          text = text.replace(/([^\n])\n([^\n])/g, '$1 $2');
        }
        
        // handle chomping
        if (chomp === '-') {
          text = text.replace(/\s+$/, '');
        } else if (chomp !== '+') {
          text = text.replace(/\n$/, '');
        }
        
        result[key] = text;
      } else {
        let finalValue = value;
        if ((finalValue.startsWith('"') && finalValue.endsWith('"')) || 
            (finalValue.startsWith("'") && finalValue.endsWith("'"))) {
          finalValue = finalValue.slice(1, -1);
        }
        result[key] = finalValue;
        i++;
      }
    }
    
    return result;
  } catch (e) {
    return {};
  }
}

async function getPageInfo(pageRef) {
  const pagePath = typeof pageRef === 'string' ? pageRef : pageRef?.page;
  if (!pagePath) return null;
  
  const filePath = pagePath.endsWith('.mdx') ? pagePath : `${pagePath}.mdx`;
  const fullPath = path.resolve(SRC_DIR, filePath);
  const fm = await extractFrontmatter(fullPath);
  
  const title = (typeof pageRef === 'object' && pageRef?.title) 
    ? pageRef.title 
    : (fm.title || path.basename(pagePath));
    
  return {
    title,
    description: fm.description || '',
    path: pagePath,
  };
}

async function processPages(pages, level, output) {
  // main recursive traversal of docs.json's navigation.languages[0]
  for (const item of pages) {
    if (!item) continue;
    
    if (typeof item === 'string') {
      const info = await getPageInfo(item);
      processPage(info, level, output);
    } else if (typeof item === 'object') {
      if (item.group && Array.isArray(item.pages)) {
        await processPages(item.pages, level + 1, output);
      } else if (item.page) {
        const info = await getPageInfo(item);
        processPage(info, level, output);
      }
    }
  }
}

function processPage(info, level, output) {
  if (info) {
    const indent = '  '.repeat(level);
    let itemLine = `${indent}- [${info.title}](${info.path})`;
    if (info.description) {
      itemLine = `${itemLine}: ${info.description}`;
    }
    output.push(itemLine);
  }
}

async function fileExists(filePath) {
  try {
    const fullFilePath = path.resolve(SRC_DIR, filePath);
    await fs.access(fullFilePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // fail fast checks
  if (!(await fileExists(DOCS_JSON))) {
    console.error(`Error: ${DOCS_JSON} not found in current directory`);
    process.exit(1);
  }

  const docs = await readJson(DOCS_JSON);
  
  if (!docs.navigation?.languages || !Array.isArray(docs.navigation.languages)) {
    console.error('Error: Invalid docs.json structure - missing navigation.languages');
    process.exit(1);
  }

  const enLang = docs.navigation.languages.find(l => l.language === 'en');
  if (!enLang) {
    console.error('Error: No English (language: "en") configuration found');
    process.exit(1);
  }

  // array will build contents, where each item is 1 line in llms.txt
  const output = [];

  const indexFm = await extractFrontmatter('index.mdx');
  output.push(`# Injective Docs\n`);
  if (indexFm.description) {
    output.push(`> ${indexFm.description}\n`);
  }

  if (Array.isArray(enLang.groups)) {
    // note that the top level group in ours is redundant, so skip to level below
    for (const group of enLang.groups[0].pages) {
      if (typeof group === 'string' && group !== 'index') {
        console.log(`top level string: ${group}`);
        const info = await getPageInfo(group);
        processPage(info, 0, output);
        continue;
      }
      
      if (!group.group) {
        continue;
      }
      
      output.push(`## ${group.group}`);
      output.push('');
      
      if (Array.isArray(group.pages)) {
        await processPages(group.pages, 0, output);
      }
      
      output.push('');
    }
  }

  // Add attribution footer
  output.push(`\n> Documentation maintained by [Injective Labs'](https://injective.com/build) Developer Relations Team\n`);
  output.push(`> Last updated on: ${(new Date()).toISOString().split('T')[0]}\n`);

  const fullFilePath = path.resolve(SRC_DIR, OUTPUT_FILE);
  await fs.writeFile(fullFilePath, output.join('\n'), 'utf-8');
  console.log(`✓ Generated ${fullFilePath}`);
}

await main();
