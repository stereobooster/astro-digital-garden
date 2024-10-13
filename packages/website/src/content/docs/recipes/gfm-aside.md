---
title: GFM Aside
tags: [markdown, gfm]
description: aka admonitions, callouts
---

**aka**: admonitions, callouts

[GitHub-flavored Markdown supports a special style of blockquotes](https://github.com/orgs/community/discussions/16925):

```md
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
```

## Starlight

In Starlight, the [syntax is different](https://starlight.astro.build/guides/authoring-content/#asides):

```md
:::note
Highlights information that users should take into account, even when skimming.
:::
```

:::note
Highlights information that users should take into account, even when skimming.
:::

## Related discussions

- [GitHub Markdown Alerts Support](https://github.com/withastro/starlight/discussions/1884)
  - [remark-github-alerts](https://github.com/hyoban/remark-github-alerts/blob/main/src/index.ts)
  - [Starlight Asides](https://github.com/withastro/starlight/blob/main/packages/starlight/integrations/asides.ts)
- [Improve the Astro:Content `<Content />` Render Props API](https://github.com/withastro/roadmap/discussions/769)
- [How to Customize Markdown with Astro Components?](https://github.com/withastro/roadmap/discussions/423)
