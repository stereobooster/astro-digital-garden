---
title: Alphabetical index
tags: [page]
---

## Implementation in Starlight

```astro
//src/components/Alphabetical.astro
---
import { getCollection } from "astro:content";

const firstChar = (str: string) => String.fromCodePoint(str.codePointAt(0)!);

const docs = await getCollection("docs");
type Docs = typeof docs;
const docsByChar = new Map<string, Docs>();
docs.forEach((doc) => {
  if (doc.data.tags) {
    const char = firstChar(doc.data.title).toUpperCase();
    docsByChar.set(char, docsByChar.get(char) || []);
    docsByChar.get(char)?.push(doc);
  }
});
const comparator = new Intl.Collator("en");
const charsSorted = [...docsByChar.keys()].sort(comparator.compare);
---

{
  charsSorted.map((char) => (
    <>
      <h3>{char}</h3>
      <ul>
        {docsByChar.get(char)?.map((doc) => (
          <li>
            <a href={`/${doc.slug}`}>{doc.data.title}</a>
          </li>
        ))}
      </ul>
    </>
  ))
}
```

```mdx
//src/content/docs/alphabetical.mdx
---
title: Alphabetical index
tableOfContents: false
prev: false
next: false
---
import Alphabetical from "@components/Alphabetical.astro";

<Alphabetical />
```

## Example

See [[alphabetical]].