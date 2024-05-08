---
title: Rehype plugins for code
tags: [markdown]
---

If you want to use rehype plugin with Astro for processing code blocks (**aka** code fences), like this in Markodwn:

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

You may need to use special configuration, because Astro (and Starlight) comes with built-in [[syntax-highlighting|code highlighter]].

## Astro

To use with Astro, you need to disable built-in syntax highlighting and put it after your plugin:

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
