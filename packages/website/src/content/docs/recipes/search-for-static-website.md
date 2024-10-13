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

- For [Pagefind](https://pagefind.app/), see [Starlight](https://github.com/withastro/starlight/)
  - [Uses generated HTML](https://github.com/withastro/starlight/blob/d2822a1127c622e086ad8877a07adad70d8c3aab/packages/starlight/index.ts#L61-L72)
- [Minisearch](https://github.com/Barnabas/astro-minisearch/)
  - [Uses source files](https://github.com/Barnabas/astro-minisearch/blob/main/demo/src/pages/search.json.js#L11-L17)
- [Fuse](https://github.com/johnny-mh/blog2/tree/main/packages/astro-fuse)
  - Can use [source files](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnSource.ts)
  - And [generated HTML](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnOutput.ts)
- [Lunr](https://github.com/jackcarey/astro-lunr)
  - [Uses generated HTML](https://github.com/jackcarey/astro-lunr/blob/master/src/index.ts)
- [Flexsearch](https://github.com/nextapps-de/flexsearch)
  - **TODO** Need to find an example of integration with Astro.
- [Orama](https://docs.oramasearch.com/open-source/plugins/plugin-astro)
  - [Uses generated HTML](https://github.com/oramasearch/orama/blob/main/packages/plugin-astro/src/index.ts)
