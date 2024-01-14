---
title: Recently changed pages
tags: [page, component]
---

## Prerequisites

Need to implement [last modified time](/recipes/last-modified-time/) first.

## Implementation

```astro
//src/components/RecentChanges.astro
---
import { getCollection } from "astro:content";
import LinkPage from "./LinkPage.astro";

const docs = await getCollection("docs");
const recent = docs
  .sort((a, b) => {
    if (
      a.data.lastUpdated instanceof Date &&
      b.data.lastUpdated instanceof Date
    ) {
      return b.data.lastUpdated.getTime() - a.data.lastUpdated.getTime();
    }
    return 0;
  })
  .slice(0, 10);
---

{recent.map((doc) => <LinkPage page={doc} />)}
```