---
title: Math support in Markdown
---

## Instalation

```bash title="Instal dependencies…"
pnpm add katex rehype-katex remark-math
```

```js
// astro.config.mjs
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    ssr: {
      noExternal: ["katex"],
    },
  },
});
```

```css
// src/styles/custom.css
@import url(katex/dist/katex.min.css);
```

## Usage

```md
// example.md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are 
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```
