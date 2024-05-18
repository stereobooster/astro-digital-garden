---
title: GFM aside
tags: [markdown, gfm]
description: aka admonitions, callouts
---

**aka**: admonitions, callouts

[GitHub flavored markup supports speical style of blockquotes](https://github.com/orgs/community/discussions/16925):

```md
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
```

## Starlight

In Starlight [syntax is different](https://starlight.astro.build/guides/authoring-content/#asides):

```md
:::note
Highlights information that users should take into account, even when skimming.
:::
```

:::note
Highlights information that users should take into account, even when skimming.
:::

## Related discussions

- [Github markdown alerts support](https://github.com/withastro/starlight/discussions/1884)
  - [remark-github-alerts](https://github.com/hyoban/remark-github-alerts/blob/main/src/index.ts)
  - [Starlight asides](https://github.com/withastro/starlight/blob/main/packages/starlight/integrations/asides.ts)
- [Improve the astro:content `<Content />` render props API](https://github.com/withastro/roadmap/discussions/769)
- [How to customize markdown with Astro components?](https://github.com/withastro/roadmap/discussions/423)
