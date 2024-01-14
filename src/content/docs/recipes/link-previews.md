---
title: Link previews
tags: [component]
sidebar:
  label: Link previews 🚧
---

## Options

First of all we need popover library, for example:

- [Floating UI](https://floating-ui.com/)
- [Popper](https://popper.js.org/)
- [Tippy.js](https://atomiks.github.io/tippyjs/)

Then we need to decide how to fetch content for the page, for example:

- fetch HTML and extract header (`h1`) and content (`.sl-markdown-content`) with `DOMParser`
- fetch HTML and extract metadata, for example OpenGraph tags, like `title`, `description` and `image`
- fetch special JSON file (which needs to be generated upfront)

## Implementation

```bash title="Instal dependencies…"
pnpm add @floating-ui/dom
```

```astro
// src/components/LinkPreview.astro
---
---
<div id="linkpreview" role="tooltip"></div>
<style>
  #linkpreview {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    max-height: 400px;
    overflow: hidden;
    z-index: var(--sl-z-index-skiplink);
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: var(--sl-shadow-md);
    color: var(--sl-color-text);
    background-color: var(--sl-color-bg);
  }
</style>
<script>
  import "./preview.ts";
</script>
```

```ts
//src/components/preview.ts
import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

const tooltip = document.querySelector("#linkpreview") as HTMLElement;

const elements = document.querySelectorAll("a");

tooltip.addEventListener("mouseleave", hideLinkPreview);

function hideLinkPreview() {
  tooltip.style.display = "";
}

async function showLinkPreview(e: MouseEvent | FocusEvent) {
  const start = `${window.location.protocol}//${window.location.host}`;
  const target = e.target as HTMLElement;
  const href = target?.closest("a")?.href || "";

  const hrefWithoutAnchor = href.replace(new URL(href).hash, "");
  const locationWithoutAnchor = window.location.href.replace(
    window.location.hash,
    ""
  );

  if (hrefWithoutAnchor === locationWithoutAnchor || !href.startsWith(start)) {
    hideLinkPreview();
    return;
  }

  const text = await fetch(href).then((x) => x.text());
  const doc = new DOMParser().parseFromString(text, "text/html");
  const h1 = doc.querySelector("h1")?.innerText;
  const content = (doc.querySelector(".sl-markdown-content") as HTMLElement)
    ?.innerHTML;
  tooltip.innerHTML = `<h1>${h1}</h1>${content}`;

  tooltip.style.display = "block";
  computePosition(target, tooltip, {
    middleware: [offset(10), autoPlacement()],
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}

const events = [
  ["mouseenter", showLinkPreview],
  ["mouseleave", hideLinkPreview],
  ["focus", showLinkPreview],
  ["blur", hideLinkPreview],
] as const;

Array.from(elements).forEach((element) => {
  events.forEach(([event, listener]) => {
    element.addEventListener(event, listener);
  });
});
```

### Starlight specific code

```astro
//src/components/PageFrame.astro
---
import type { Props } from "@astrojs/starlight/props";
import Default from "@astrojs/starlight/components/PageFrame.astro";
import LinkPreview from "./LinkPreview.astro";
---

<Default {...Astro.props}>
  <slot name="header" slot="header" />
  <slot name="sidebar" slot="sidebar" />
  <slot />
</Default>

<LinkPreview />
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

- If link has anchor, show in preview specified section
