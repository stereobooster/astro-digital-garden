---
title: About digital gardens
prev: false
next: false
---

[Digital garden](https://github.com/MaggieAppleton/digital-gardeners) aka [Second brain](https://www.ssp.sh/brain/), [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), personal wiki, personal knowledge management.

There are different aspects of a digital garden. It can be seen as a way to take notes just for yourself, but for me, it's more interesting as a way to organize knowledge and publish it as a (static) website.

There are different editors (note-taking applications): [Obsidian](https://obsidian.md/), [Foam](https://foambubble.github.io/foam/), [Roam Research](https://roamresearch.com/) to name few. But again, I am more interested in the publishing part - assuming you already created content with an editor of your choice.

My previous articles on the subject:

- https://stereobooster.com/posts/digital-garden-as-static-website/
- https://stereobooster.com/posts/useful-modern-tools-for-static-websites/
- https://stereobooster.com/posts/portable-markdown-links/
- https://stereobooster.com/posts/markdown-tools/
- https://stereobooster.com/posts/what-i-miss-in-markdown/

**TODO**:

- collect all ideas from posts above and rewrite for this website
- recipes section - small articles about how to implement one specific feature, for example:
  - components
    - link previews
    - page link - which would show title (link), tags, last modified etc.
    - github edit link
    - SEO, SMO
      - [astro-seo](https://github.com/jonasmerlin/astro-seo)
      - [@astrolib/seo](https://github.com/onwidget/astrolib/tree/main/packages/seo)
    - sortable tables, for example
      - [kryogenix/sorttable](https://www.kryogenix.org/code/browser/sorttable/)
      - [hubspot/sortable](https://github.hubspot.com/sortable/docs/welcome/)
      - [LeeWannacott/table-sort-js](https://github.com/LeeWannacott/table-sort-js)
      - [List.js](https://listjs.com/examples/table/)
    - search for static website
      - [orama](https://docs.oramasearch.com/open-source/plugins/plugin-astro)
        - [uses generated HTML](https://github.com/oramasearch/orama/blob/main/packages/plugin-astro/src/index.ts)
      - for pagefind see [starlight](https://github.com/withastro/starlight/)
        - [uses generated HTML](https://github.com/withastro/starlight/blob/d2822a1127c622e086ad8877a07adad70d8c3aab/packages/starlight/index.ts#L61-L72)
      - [minisearch](https://github.com/Barnabas/astro-minisearch/)
        - [uses source files](https://github.com/Barnabas/astro-minisearch/blob/main/demo/src/pages/search.json.js#L11-L17)
      - [fuse](https://github.com/johnny-mh/blog2/tree/main/packages/astro-fuse)
        - can use [source files](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnSource.ts)
        - and [generated HTML](https://github.com/johnny-mh/blog2/blob/main/packages/astro-fuse/src/basedOnOutput.ts)
      - [lunr](https://github.com/jackcarey/astro-lunr)
        - [uses generated HTML](https://github.com/jackcarey/astro-lunr/blob/master/src/index.ts)
    - lazy embeded video
      - `astro-lazy-youtube-embed`
      - `@astro-community/astro-embed-youtube`
    - social images autogenration
      - Example in [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/pages/og-image/%5Bslug%5D.png.ts)
      - Example in [astro-paper](https://github.com/satnaing/astro-paper/pull/15/files)
  - Links
    - backlinks
    - content graph
    - link resolution
      - wiki links, PML
  - pages
    - last modified
    - faceted search
