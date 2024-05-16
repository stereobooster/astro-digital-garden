---
title: Search for static website
tags: [component]
description: Different options for full-text search for static websites without backend or third-party services
---

## Starlight

> By default, Starlight sites include full-text search powered by Pagefind, which is a fast and low-bandwidth search tool for static sites.
> 
> -- [Starlight Site Search](https://starlight.astro.build/guides/site-search/)

## Astro

- for [pagefind](https://pagefind.app/) see [starlight](https://github.com/withastro/starlight/)
  - [uses generated HTML](https://github.com/withastro/starlight/blob/d2822a1127c622e086ad8877a07adad70d8c3aab/packages/starlight/index.ts#L61-L72)
- [minisearch](https://github.com/Barnabas/astro-minisearch/)
  - [uses source files](https://github.com/Barnabas/astro-minisearch/blob/main/demo/src/pages/search.json.js#L11-L17)
- [fuse](https://github.com/johnny-mh/blog2/tree/main/packages/astro-fuse)
  - can use [source files](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnSource.ts)
  - and [generated HTML](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnOutput.ts)
- [lunr](https://github.com/jackcarey/astro-lunr)
  - [uses generated HTML](https://github.com/jackcarey/astro-lunr/blob/master/src/index.ts)
- [flexsearch](https://github.com/nextapps-de/flexsearch)
  - **TODO** need to find example of integration with Astro
- [orama](https://docs.oramasearch.com/open-source/plugins/plugin-astro)
  - [uses generated HTML](https://github.com/oramasearch/orama/blob/main/packages/plugin-astro/src/index.ts)
