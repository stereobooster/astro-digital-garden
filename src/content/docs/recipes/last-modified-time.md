---
title: Last modified time
tags: [markdown]
---

## Starlight

Starlight already has this feature, **but** value not exposed in content collection e.g. if you set

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    starlight({
      lastUpdated: true,
    }),
  ],
});
```

You would see `Last updated:` on the page, but at the same time `page.data.lastUpdated` would be `undefined`

## Implementation

### Option 1

```js
// remark-modified-time.mjs
import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastUpdated = result.toString();
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

Based on: [Astro recipes](https://docs.astro.build/en/recipes/modified-time/)

**But** value accessible only after `render` e.g.

```ts
const { remarkPluginFrontmatter } = await page.render();
console.log(remarkPluginFrontmatter.lastUpdated);
```

You may need something, like this:

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    lastUpdated: z.string().transform((str) => new Date(str)),
  }),
});
```

### Option 2

Install [[braindb]], then you can do something like this:

```ts
const doc = (await bdb.documents({ slug }))[0];
doc.updatedAt();
```
