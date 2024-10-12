---
title: Tasks
tableOfContents: false
prev: false
next: false
description: My todo list
---

- [ ] add grammar checker
- [ ] publish components and co, because it is getting harder and harder to re-use
  - https://starlight.astro.build/resources/plugins/
  - [ ] `LinkPreview`
  - [ ] Pan and zoom for images
  - [ ] [remark-dataview](https://github.com/stereobooster/braindb/tree/main/packages/remark-dataview) will be able to provide
    - Alphabetical index, Recently changed, Tasks, Tags page
    - shall it include wikilink as well?
  - [ ] "Snake" table of content
  - [ ] [Astro integration](https://github.com/stereobooster/braindb/tree/main/packages/braindb-astro)
    - unfortunately it is blocked by [vitejs/vite#14289](https://github.com/vitejs/vite/issues/14289)
- [ ] update section about "Ideal solution" in diagrams article
- [ ] write about `playwright` for Mermaid and Euler diagrams
- [ ] write about `not-content`
- [ ] implement [[faceted-search]]
- [ ] add [View Transitions](https://docs.astro.build/en/guides/view-transitions/)
  - see [starlight#694](https://github.com/withastro/starlight/pull/694#issuecomment-2021611520)
- [ ] implement better user action tracking (beyond page navigations)
  - if search was used
  - if external links were clicked
  - if page preview was shown
- [ ] remove H1 on tags page

## Ideas

- sidebar: show "new" (or "fresh") badge based on git update time?
- Footnotes
  - mention how footnotes can be shown on the side, like in [Tufte design](https://edwardtufte.github.io/tufte-css/)
  - https://gwern.net/sidenote

## Color for tag

I can easily generate color from tag:

```js
import ch from "color-hash";
const colorHash = new ch.default();
colorHash.hex(tag);
```

I can use it in:

- [x] color-chip near the tag or maybe color underline?
- [x] Euler diagram
- [x] content graph
- [ ] social images - to generate colorful "border"

I implemented prototype in branch [tag-color](https://github.com/stereobooster/astro-digital-garden/tree/tag-color)

## From other articles

```dataview
TASK
```
