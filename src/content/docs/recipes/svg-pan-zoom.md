---
title: SVG pan and zoom
tags: [component]
---

## Instalation

```bash title="Instal dependencies…"
pnpm add svg-pan-zoom
```

```ts
// src/components/svgpanzoom.ts
import svgPanZoom from "svg-pan-zoom";

try {
  svgPanZoom(".sl-markdown-content svg", {
    zoomEnabled: true,
    controlIconsEnabled: false,
  });
} catch (e) {}
```

### Starlight specific code

```astro
src/components/PageFrame.astro
---
import type { Props } from "@astrojs/starlight/props";
import Default from "@astrojs/starlight/components/PageFrame.astro";
---

<Default {...Astro.props}>
  <slot name="header" slot="header" />
  <slot name="sidebar" slot="sidebar" />
  <slot />
</Default>

<script>
  import "./svgpanzoom.ts";
</script>
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      components: {
        PageFrame: "./src/components/PageFrame.astro",
      },
    }),
  ],
});
```

## Further improvements

- Implement user experience similar to Google maps, e.g. use two fingers on mobile for pan, to prevent scroll trap.
- Bug: On small SVGs controls may cover part of the image
