---
title: SVG pan and zoom
tags: [component]
---

## Instalation

```bash title="Instal dependencies…"
pnpm add svg-pan-zoom-gesture
```

```ts
// src/components/svgpanzoom.ts
import "svg-pan-zoom-gesture/css/SvgPanZoomUi.css";
import { SvgPanZoomUi } from "svg-pan-zoom-gesture";

document
  .querySelectorAll(
    ".sl-markdown-content > svg:not(.icon)," +
    ".sl-markdown-content > p > svg:not(.icon)," +
    ".sl-markdown-content img[src$='.svg' i]"
  )
  .forEach((element) => {
    const container = document.createElement("div");
    container.className = "svg-pan-zoom";
    element.replaceWith(container);
    container.append(element);
    // @ts-expect-error
    new SvgPanZoomUi({ element, container }).on();
  });
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

- style svg-pan-zoom buttons
- provide container in HTML, instead of generating it on the fly
