import fs from 'fs';
import path from 'path';

const draftFolder = path.resolve(__dirname, `..`, `content`, `draft`);

const fileName = process.argv[2] ?? `untitled`;

const folder = path.resolve(draftFolder, fileName);

const markdownTpl = `---
title: ${fileName}
tags:
  - Untagged
date: ${new Date().toISOString()}
---`;

fs.mkdirSync(folder);
fs.writeFileSync(path.resolve(folder, `index.md`), markdownTpl);
