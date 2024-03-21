---
title: Recently changed pages
tags: [page, component]
---

## Instalation

### BrainDB

See [[braindb]]

### The rest

```bash title="Instal dependencies…"
pnpm add @stereobooster/remark-wiki-link
```

```astro
//src/components/RecentChanges.astro
---
import { getEntry } from "astro:content";
import LinkPage from "./LinkPage.astro";
import { bdb } from "../lib/braindb.mjs";
import type { CollectionEntry } from "astro:content";

const docs = (await bdb.documents({ sort: ["updated_at", "desc"] }))
  .slice(0, 10)
  .map((d) => d.url().replace(/^\/|\/$/gi, ""))
  .filter(Boolean)
  .map((slug) => getEntry("docs", slug));

const recent = (await Promise.all(docs)).filter(Boolean) as Array<
  CollectionEntry<"docs">
>;
---

{recent.map((doc) => <LinkPage entry={doc} />)}
```