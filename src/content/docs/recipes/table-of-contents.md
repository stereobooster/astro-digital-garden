---
title: Table of contents
tags: [component, markdown]
sidebar:
  label: Table of contents 🚧
---

## Starlight

Starlight already has this feature, so no additional work required. But you can [override default one](https://starlight.astro.build/reference/overrides/#tableofcontents)

## "Snake" table of contents

See:

- https://kld.dev/building-table-of-contents/
- https://kld.dev/toc-animation/

Implemented in [the branch TOC](https://github.com/stereobooster/astro-digital-garden/tree/TOC). But build is failing with this error:

```
src/components/TOC.astro:15:7 - error ts(2322): Type '{ "stroke-linecap": string; "stroke-width": string; "stroke-dashoffset": string; "stroke-linejoin": string; class: string; fill: string; stroke: string; }' is not assignable to type 'SVGProps<SVGPathElement>'.
  Property 'class' does not exist on type 'SVGProps<SVGPathElement>'. Did you mean 'className'?

15       class="toc-marker"
         ~~~~~
```
