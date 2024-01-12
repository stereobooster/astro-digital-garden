---
title: Icons for external links
tags: [markdown]
---

## Instalation

```bash title="Instal dependencies…"
pnpm add rehype-external-links
```

```js
// astro.config.mjs
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" }, // ⤴
          contentProperties: { "aria-hidden": true, class: "no-select" },
        },
      ],
    ],
  },
});
```

```css
.no-select {
  user-select: none;
}
```

Based on: [Astro recipes](https://docs.astro.build/en/recipes/external-links/)

## Example

```md
// example.md
https://example.com
```

https://example.com

## Further improvements

- Possible to impelement with pure CSS, something like `a[rel=nofollow]:after {content: " ↗"}`
- One more idea is to add `favicon` of the target instead of `↗`.
