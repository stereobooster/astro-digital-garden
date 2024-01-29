---
title: Backlinks
tags: [link]
---

## Installation

### BrainDB

```bash title="Instal dependencies…"
pnpm add @braindb/core github-slugger
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
});
```

```js
// src/lib/braindb.ts
import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
const generateSlug = (filePath: string) => {
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
});

bdb.start();
```

### The rest

```astro
// src/components/Backlinks.astro
---
import { bdb } from "../lib/braindb";
import type { CollectionEntry } from "astro:content";
interface Props {
  entry: CollectionEntry<"docs">;
}
const { entry } = Astro.props;

const doc = await bdb.findDocument(`/${entry.id}`);
---
<div>
  <b>Backlinks:</b>
  {
    doc &&
      doc.documentsFrom().map((x) => (
        <li>
          <a href={x.url()}>{x.title()}</a>
        </li>
      ))
  }
</div>
```

### Satrlight specific config

```astro
// src/components/MarkdownContent.astro
---
import type { Props } from "@astrojs/starlight/props";
import Default from "@astrojs/starlight/components/MarkdownContent.astro";
import Backlinks from "./Backlinks.astro";
---

<Default {...Astro.props}>
  <slot />
</Default>

<Backlinks entry={Astro.props.entry}/>
```

```js
// astro.config.mjs
export default defineConfig({
  integrations: [
    starlight({
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
    })
  ]
})
```

Related:

- [starlight#1335](https://github.com/withastro/starlight/discussions/1335)
