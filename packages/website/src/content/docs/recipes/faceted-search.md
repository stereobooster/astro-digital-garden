---
title: Faceted search
tags: [page]
sidebar:
  label: Faceted search 🚷
description: Faceted search is a method of searching through data by using "facets" (data attributes) to gradually narrow down a large data set. In the case of markdown notes, data attributes can come from front matter
---

Faceted search is a method of searching through data by using "facets" (data attributes) to gradually narrow down a large data set. In the case of markdown notes, data attributes can come from front matter.

## Options

### Core

- Expose full content as JSON, similar to what I did in [graph.json](https://github.com/stereobooster/astro-digital-garden/blob/main/packages/website/src/pages/graph.json.ts) + [facets](https://github.com/stereobooster/facets)
  - **Cons**: Not scalable for text search.
- Add filters to HTML (`data-pagefind-filter`) in a hidden div + [pagefind](https://pagefind.app/docs/filtering/)
  - **Cons**: There are issues related to faceting. See [Discussion: Pagefind as a General Faceting Search Engine](https://github.com/CloudCannon/pagefind/discussions/512).
- Hybrid solution: Use Pagefind for text search and facets library for faceting.

Other less feasible options:

- [SQLite WASM + HTTP Range](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
  - I read somewhere that SQLite's text index is not optimal for this use case (that is why the author tried to use Tantivy - see next line).
- [Tantivy Compiled to WASM](https://github.com/quickwit-oss/tantivy/pull/1067).

### UI

- ~~[InstantSearch](https://github.com/algolia/instantsearch)~~
  - ~~[Pagefind-InstantSearch](https://github.com/stereobooster/pagefind-instantsearch)~~
- Write your own simple components.

## TODO

- [x] I created [a basic proof of concept using facets and InstantSearch](https://github.com/stereobooster/astro-digital-garden/tree/faceted-search-experiment). I don't like it, though. It supports facets for:
  - Tags
  - Date
- [ ] I can still use `facets` or `pagefind`, but I need a different UI.
  - Use something slim, like Preact or Solid. However, I can't find a good components library. Or give up and use React. Then I can use `shadcn/ui` and many others.
    - Maybe there are options in [Components for Web](https://stereobooster.com/posts/components-for-web/).
  - Maybe implement a custom Pagefind UI ([@pagefind/modular-ui](https://www.npmjs.com/package/@pagefind/modular-ui)).
- [ ] Other potential fields for facets:
  - Maybe a `stage` field (make it a separate field instead of using emojis in the title 🧠, 🚷, 🚧).
  - Maybe a task count (closed, open, total).
- [ ] Sort by:
  - Date
  - Title
  - Task count

## Related

- [[search-for-static-website]]
