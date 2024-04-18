---
title: Recently changed pages
tags: [page, component]
---

## Instalation

### BrainDB

See [[braindb]]

### The rest

```astro
//src/components/RecentChanges.astro
---
import { bdb } from "@lib/braindb.mjs";
import type { Document } from "@braindb/core";

const docs = await bdb.documents({ sort: ["updated_at", "desc"] });

const docsByDate = new Map<string, Document[]>();
docs.forEach((doc) => {
  if (doc.frontmatter().tags) {
    const date = doc.updatedAt().toISOString().split("T")[0];
    docsByDate.set(date, docsByDate.get(date) || []);
    docsByDate.get(date)?.push(doc);
  }
});
const dates = Array.from(docsByDate.keys()).map((d) => [
  d,
  d.split("-").reverse().join("."),
]);
---

<div class="column-list">
  <span>
    {
      dates.map(([key, title]) => (
        <p>
          <b>{title}</b>
          <ul>
            {docsByDate.get(key)?.map((doc) => (
              <li>
                <a href={doc.url()}>{doc.title()}</a>
              </li>
            ))}
          </ul>
        </p>
      ))
    }
  </span>
</div>
```

## Example

See [[recent]].