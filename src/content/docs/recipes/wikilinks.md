---
title: Wikilinks
tags: [link]
sidebar:
  label: Wikilinks 🚧
---

## Option 1

:::caution
Haven't tested it yet
:::

```bash title="Instal dependencies…"
pnpm add @portaljs/remark-wiki-link
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

import wikiLinkPlugin from "@portaljs/remark-wiki-link";
import { getPermalinks } from "@portaljs/remark-wiki-link";

const permalinks = await getPermalinks("src/content");

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [
        wikiLinkPlugin,
        {
          pathFormat: "obsidian-short",
          permalinks,
        },
      ],
    ],
  },
});
```

Read more about configuration [here](https://github.com/datopian/portaljs/tree/main/packages/remark-wiki-link). Note: [datopian/remark-wiki-link-plus](https://github.com/datopian/remark-wiki-link-plus) is deprecated

## Option 2

:::caution
WIP
:::

Basic idea is to take plugin similar to [remark-wiki-link](https://github.com/landakram/remark-wiki-link) and then use `BrainDB` to resolve links with `pageResolver`. Which would look something like this:

```ts
[
  wikiLinkPlugin,
  {
    pageResolver: (slug) => bdb.findBy({ slug })?.url()
  },
],
```

Related:

- [micromark-extension-wiki-link](https://github.com/landakram/micromark-extension-wiki-link)
- [mdast-util-wiki-link](https://github.com/landakram/mdast-util-wiki-link)
