---
title: Faceted search
tags: [page]
sidebar:
  label: Faceted search 🚷
---

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

- [InstantSearch](https://github.com/algolia/instantsearch)
  - [pagefind-instantsearch](https://github.com/stereobooster/pagefind-instantsearch)
- write own simple components

## TODO

- [ ] start with simplest option: text search and tags as facets, InstantSearch as UI
- [ ] try to implement custom components for faceting UI
  - maybe implement UI in the same manner as [@pagefind/modular-ui](https://www.npmjs.com/package/@pagefind/modular-ui)

## Related

- [[search-for-static-website]]
