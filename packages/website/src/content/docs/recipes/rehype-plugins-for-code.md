---
title: Rehype Plugins for Code
tags: [markdown]
description: How to use Rehype code plugins with Astro or Starlight
---

If you want to use a Rehype plugin with Astro to process code blocks (**aka** code fences), like those in Markdown:

````md
```
something
```
````

Or like this in HTML:

```html
<pre>
    <code>something</code>
</pre>
```

You may need to use special configuration because Astro (and Starlight) comes with a built-in [[syntax-highlighting|code highlighter]].

## Astro

To use it with Astro, you need to disable the built-in syntax highlighting and apply your plugin afterward:

```js {2, 6, 8-9}
// astro.config.mjs
import { rehypeShiki, markdownConfigDefaults } from "@astrojs/markdown-remark";

export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      yourPlugin,
      [rehypeShiki, markdownConfigDefaults.shikiConfig],
    ],
  },
});
```

## Starlight

**Important** use Starlight [v0.22+](https://github.com/withastro/starlight/discussions/1259#discussioncomment-9300105)

```js {5}
// astro.config.mjs
export default defineConfig({
  integrations: [starlight({})],
  markdown: {
    rehypePlugins: [yourPlugin],
  },
});
```
