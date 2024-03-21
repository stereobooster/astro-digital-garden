---
title: BrainDB
tags: [link]
---

[BrainDB](https://github.com/stereobooster/braindb) is a library that allows to treat your content as database. It can be used to:

- [[backlinks|show backlinks]]
- [[wikilinks|resolve wikilinks]]
- [[content-graph-visualization|vizualize content as graph]]
- [[detect-broken-links|detect internal broken links]]
- [[recently-changed-pages|show recently changed pages]]

Related:

- [Markdown tools](https://stereobooster.com/posts/markdown-tools/)
- [Portable markdown links](https://stereobooster.com/posts/portable-markdown-links/)

## Installation

```bash title="Instal dependencies…"
pnpm add @braindb/core github-slugger
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: [
        "fsevents",
        "@node-rs/xxhash-wasm32-wasi",
        "@napi-rs/simple-git-darwin-x64",
      ],
    },
  },
});
```

```js
// src/lib/braindb.mjs
import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
const generateSlug = (filePath) => {
  const withoutFileExt = filePath.replace(
    new RegExp(path.extname(filePath) + "$"),
    ""
  );
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug = rawSlugSegments
    // Slugify each route segment to handle capitalization and spaces.
    // Note: using `slug` instead of `new Slugger()` means no slug deduping.
    .map((segment) => githubSlug(segment))
    .join("/")
    .replace(/\/index$/, "");

  return slug;
};

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/docs"),
  url: (filePath, _frontmatter) => `${generateSlug(filePath)}/`,
  git: process.cwd()
});

bdb.start();
```
