---
title: GFM aside
tags: [markdown]
sidebar:
  label: GFM aside 🚷
---

[GitHub flavored markup supports speical style of blockquotes](https://github.com/orgs/community/discussions/16925):

```md
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
```

In Starlight one can use [Aside](https://starlight.astro.build/guides/components/#asides), but this is not a portable approach - it assumes MDX and Starlight.

```mdx
import { Aside } from "@astrojs/starlight/components";

<Aside>Highlights information that users should take into account, even when skimming.</Aside>
```

Related discussions:

- [How to customize markdown with Astro components?](https://github.com/withastro/roadmap/discussions/423)
- [Markdown Enhancements](https://github.com/withastro/roadmap/discussions/424)
