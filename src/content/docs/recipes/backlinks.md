---
title: Backlinks
tags: [link]
---

## Installation

### BrainDB

See [[braindb]]

### The rest

```astro
// src/components/Backlinks.astro
---
import { bdb } from "../lib/braindb.mjs";
import type { CollectionEntry } from "astro:content";
interface Props {
  entry: CollectionEntry<"docs">;
}
const { entry } = Astro.props;

const doc = await bdb.findDocument(`/${entry.id}`);
---
<div>
  <b>Backlinks:</b>
  {
    doc &&
      doc.documentsFrom().map((x) => (
        <li>
          <a href={x.url()}>{x.title()}</a>
        </li>
      ))
  }
</div>
```

### Satrlight specific config

```astro
// src/components/MarkdownContent.astro
---
import type { Props } from "@astrojs/starlight/props";
import Default from "@astrojs/starlight/components/MarkdownContent.astro";
import Backlinks from "./Backlinks.astro";
---

<Default {...Astro.props}>
  <slot />
</Default>

<Backlinks entry={Astro.props.entry}/>
```

```js
// astro.config.mjs
export default defineConfig({
  integrations: [
    starlight({
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
    })
  ]
})
```

Related:

- [starlight#1335](https://github.com/withastro/starlight/discussions/1335)
