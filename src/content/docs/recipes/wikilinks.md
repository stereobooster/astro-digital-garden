---
title: Wikilinks
tags: [link]
sidebar:
  label: Wikilinks 🚧
---

## Intro

:::caution
Work in progress
:::

Basic idea is to take plugin similar to [remark-wiki-link](https://github.com/landakram/remark-wiki-link) and then use `BrainDB` to resolve links with `pageResolver`. Which would look something like this:

```ts
[
  wikiLinkPlugin,
  {
    linkResolver: (slug) => bdb.documentsSync({ slug })[0]?.url();
  },
],
```

Related:

- [micromark-extension-wiki-link](https://github.com/landakram/micromark-extension-wiki-link)
- [mdast-util-wiki-link](https://github.com/landakram/mdast-util-wiki-link)

## Example

```md
[[backlinks]] [[404|Example of broken link]]
```

[[backlinks]] [[404|Example of broken link]]
