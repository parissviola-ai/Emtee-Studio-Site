#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROOM_DIR = path.join(ROOT, "public", "rooms");
const SEARCH_DIRS = ["app", "components", "data", "docs", "public"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".html",
  ".txt",
]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const IGNORE_DIR_NAMES = new Set(["node_modules", ".git", ".next", "archive"]);

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIR_NAMES.has(entry.name)) continue;
      results.push(...walk(fullPath));
      continue;
    }
    results.push(fullPath);
  }

  return results;
}

function normalizeToPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativeFromRoot(filePath) {
  return normalizeToPosix(path.relative(ROOT, filePath));
}

function roomPublicPath(fileName) {
  return `/rooms/${fileName}`;
}

function collectSearchFiles() {
  const files = [];

  for (const searchDir of SEARCH_DIRS) {
    const fullDir = path.join(ROOT, searchDir);

    try {
      if (!statSync(fullDir).isDirectory()) continue;
    } catch {
      continue;
    }

    for (const filePath of walk(fullDir)) {
      const ext = path.extname(filePath).toLowerCase();
      if (TEXT_EXTENSIONS.has(ext)) files.push(filePath);
    }
  }

  return files;
}

function main() {
  const searchFiles = collectSearchFiles().map((filePath) => ({
    filePath,
    relativePath: relativeFromRoot(filePath),
    content: readFileSync(filePath, "utf8"),
  }));
  const roomFiles = readdirSync(ROOM_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const report = roomFiles.map((fileName) => {
    const publicPath = roomPublicPath(fileName);
    const references = searchFiles
      .filter(({ content }) => content.includes(publicPath))
      .map(({ relativePath }) => relativePath);

    return {
      fileName,
      publicPath,
      references,
    };
  });

  const used = report.filter((item) => item.references.length > 0);
  const unused = report.filter((item) => item.references.length === 0);

  console.log(`Scanned ${roomFiles.length} image assets in public/rooms`);
  console.log(`Referenced: ${used.length}`);
  console.log(`Unreferenced: ${unused.length}`);

  if (unused.length === 0) {
    console.log("\nNo unreferenced room images found.");
    return;
  }

  console.log("\nUnreferenced room images:");
  for (const item of unused) {
    console.log(`- ${item.fileName}`);
  }
}

main();
