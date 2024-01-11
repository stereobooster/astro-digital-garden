---
title: Add last modified time
---

## Instalation

```js
// remark-modified-time.mjs
import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { remarkModifiedTime } from "./remark-modified-time.mjs";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
});
```

Based on: https://docs.astro.build/en/recipes/modified-time/

## Starlight

Starlight already has this feature, so no additional work required.
