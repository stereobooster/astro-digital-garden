---
title: Add icons to external links
---

## Instalation

```bash title="Instal dependencies…"
pnpm add rehype-external-links
```

```js
// astro.config.mjs
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" }, // ⤴ 
        },
      ],
    ],
  },
});
```

Source: https://docs.astro.build/en/recipes/external-links/
