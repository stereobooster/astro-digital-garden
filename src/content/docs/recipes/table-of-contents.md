---
title: Table of contents
tags: [component, markdown]
---

## Starlight

Starlight already has this feature, so no additional work required. But you can [override default one](https://starlight.astro.build/reference/overrides/#tableofcontents)

## "Snake" table of contents

See:

- https://kld.dev/building-table-of-contents/
- https://kld.dev/toc-animation/

### Implementation

Checkout in the sourcecode how to implement:

- [src/components/TOC.astro](https://github.com/stereobooster/astro-digital-garden/tree/main/src/components/TOC.astro)
- [src/components/TOCHelper.ts](https://github.com/stereobooster/astro-digital-garden/tree/main/src/components/TOCHelper.ts)
- [src/components/TOCHeading.astro](https://github.com/stereobooster/astro-digital-garden/tree/main/src/components/TOCHeading.astro)
- [src/toc.js](https://github.com/stereobooster/astro-digital-garden/tree/main/src/components/toc.js)

TODO:

- [ ] fix bug: it crashes if there are missing header levels, like `h4` directly in `h2`

### Satrlight specific config

```astro
// src/components/TableOfContents.astro
---
import type { Props } from "@astrojs/starlight/props";
import TOC from "./TOC.astro";
---

<TOC {...Astro.props} />
```

```js
// astro.config.mjs
export default defineConfig({
  integrations: [
    starlight({
      components: {
        TableOfContents: "./src/components/TableOfContents.astro",
      },
    }),
  ],
});
```
