#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const PLACEHOLDER = ["__", "FILL:"].join("");
const ROOT = process.cwd();
const TARGETS = ["app", "components", "lib", "scripts", "public", "out"];
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "out",
  "docs",
  "photos",
]);

const binaryExtensions = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
]);

function extension(path) {
  const index = path.lastIndexOf(".");
  return index === -1 ? "" : path.slice(index).toLowerCase();
}

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let stats;
    try {
      stats = statSync(fullPath);
    } catch {
      continue;
    }

    if (stats.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      walk(fullPath, files);
      continue;
    }

    if (binaryExtensions.has(extension(fullPath))) continue;
    files.push(fullPath);
  }

  return files;
}

const findings = [];

for (const target of TARGETS) {
  const absolute = join(ROOT, target);
  for (const file of walk(absolute)) {
    let content;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    if (!content.includes(PLACEHOLDER)) continue;

    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes(PLACEHOLDER)) {
        findings.push({
          file: relative(ROOT, file),
          line: index + 1,
          text: line.trim().slice(0, 120),
        });
      }
    });
  }
}

if (findings.length > 0) {
  console.error(
    `\n✖ Found ${findings.length} unfilled placeholder${
      findings.length === 1 ? "" : "s"
    } (${PLACEHOLDER}):\n`,
  );
  for (const finding of findings) {
    console.error(`  ${finding.file}:${finding.line}`);
    console.error(`    ${finding.text}`);
  }
  console.error(
    "\nFill every value before building. See README.md for the checklist.\n",
  );
  process.exit(1);
}

console.log("✓ No unfilled placeholders found.");
