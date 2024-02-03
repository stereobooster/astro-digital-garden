---
title: Wikilinks
tags: [link]
---

## Instalation

### BrainDB

See [[braindb]]

### The rest

```bash title="Instal dependencies…"
pnpm add @stereobooster/remark-wiki-link
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import { wikiLinkPlugin } from "@stereobooster/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [
        wikiLinkPlugin,
        {
          aliasDivider: "|",
          linkTemplate: ({ permalink, alias }) => {
            // TODO: permalink may contain anchor
            const doc = bdb.documentsSync({ slug: permalink })[0];
            if (doc) {
              return {
                hName: "a",
                hProperties: { href: doc.url() },
                hChildren: [
                  {
                    type: "text",
                    value:
                      permalink === alias ? doc.frontmatter().title : alias,
                  },
                ],
              };
            } else {
              return {
                hName: "span",
                hProperties: {
                  class: "broken-link",
                  title: `Can't resolve link to ${permalink}`,
                },
                hChildren: [{ type: "text", value: alias }],
              };
            }
          },
        },
      ],
    ],
  },
});
```

## Example

```md
[[backlinks]] [[404|Example of broken link]]
```

[[backlinks]] [[404|Example of broken link]]

## Further improvements

- support anchors in wikilinks (`[[page#anchor]]`, `[[page#anchor|alias]]`)
- check that anchors correspond to some header in target document
- what about ambiguous links (`bdb.documentsSync({ slug: permalink }).length > 1`)?
- image wikilinks (`![[some.jpg]]`)
