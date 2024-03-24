---
title: Anchors for headings
tags: [markdown]
---

## Introduction

There are different opinions on what is the best approach for those links. See:

- [markdown-it-anchor#82](https://github.com/valeriangalliat/markdown-it-anchor/issues/82#issuecomment-788268457)
- [Are your Anchor Links Accessible?](https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/)

## Installation

```bash title="Instal dependencies…"
pnpm add rehype-autolink-headings @astrojs/markdown-remark
```

### Anchor before

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
  },
});
```

```css
// src/styles/custom.css
.sl-markdown-content :is(h1, h2, h3, h4, h5, h6) {
  a {
    color: var(--sl-color-black);
    text-decoration: none;
    font-size: 1.5rem;
    margin-left: calc(-1rem - 4px);
    padding-right: 4px;
  }

  &:hover a {
    color: var(--sl-color-accent);
  }

  .icon.icon-link::after {
    content: "#";
  }
}
```

### Anchor after

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
  },
});
```

```css
// src/styles/custom.css
.sl-markdown-content :is(h1, h2, h3, h4, h5, h6) {
  a {
    color: var(--sl-color-black);
    text-decoration: none;
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }

  &:hover a {
    color: var(--sl-color-accent);
  }

  .icon.icon-link::after {
    content: "#";
  }
}
```

## See also

- [Anchor Links for Headings](https://github.com/withastro/starlight/discussions/1239)
- [Add links to Starlight headings](https://hideoo.dev/notes/starlight-heading-links)
- [withastro#5610](https://github.com/withastro/docs/pull/5610/files)
