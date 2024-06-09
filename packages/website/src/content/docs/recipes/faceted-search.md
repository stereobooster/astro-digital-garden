---
title: Faceted search
tags: [page]
sidebar:
  label: Faceted search 🚷
description: Faceted search is a method of searching through data by using "facets" (data attributes), to gradually narrow down a large data set. In case of markdown notes data attributes can come from front matter.
---

Faceted search is a method of searching through data by using "facets" (data attributes), to gradually narrow down a large data set. In case of markdown notes data attributes can come from front matter.

## Options

### Core

- expose full content as JSON, similar to what I did in [graph.json](https://github.com/stereobooster/astro-digital-garden/blob/main/src/pages/graph.json.ts) + [facets](https://github.com/stereobooster/facets)
  - **cons**: not scalable for text search
- add filters to HTML (`data-pagefind-filter`) in hidden div + [pagefind](https://pagefind.app/docs/filtering/)
  - **cons**: there are issues related to faceting, see [Discussion: Pagefind as general faceting search engine](https://github.com/CloudCannon/pagefind/discussions/512)
- hybrid solution: use pagefind for text search and facets lib for faceting

Other less-feasible options:

- [SQLite WASM + HTTP range](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
  - I read somewhere that SQLite's text index is not optimal for this use-case (that is why the author tried to use tantivy - see next line)
- [tantivy compiled to WASM](https://github.com/quickwit-oss/tantivy/pull/1067)

### UI

- ~~[InstantSearch](https://github.com/algolia/instantsearch)~~
  - ~~[pagefind-instantsearch](https://github.com/stereobooster/pagefind-instantsearch)~~
- write own simple components

## TODO

- [x] I created [basic proof of convept using facets and InstantSearch](https://github.com/stereobooster/astro-digital-garden/tree/faceted-search-experiment). I don't like it, though. It supports facets for:
  - tags
  - date
- [ ] I still can use `facets` or `pagefind`, but I need different UI.
  - Use something slim, like Preact or Solid. But I can't find good components library. Or give up and use React. Then I can use `shadcn/ui` and many others
  - Maybe implement custom pagefind UI ([@pagefind/modular-ui](https://www.npmjs.com/package/@pagefind/modular-ui))
- [ ] Other potential fields for facets
  - maybe `stage` field (make it a separate field instead of emojis in title 🧠, 🚷, 🚧)
  - maybe tasks count (closed, open, total)
- [ ] Sort by
  - date
  - title
  - task count

## Related

- [[search-for-static-website]]
