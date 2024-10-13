---
title: Diagrams
tags: [component, diagram]
description: Overview of available options for diagrams in Markdown and Astro (text-to-diagram approach)
---

There are two ways to work with diagrams:

1. Embed them in Markdown using code fences. This is the so-called [text-to-diagram](https://stereobooster.com/posts/text-to-diagram/) approach. For example:
   - [[mermaid-diagrams-in-markdown|Mermaid]]
   - [[gnuplot-diagram]]
   - [[graphviz-diagram]]
   - [Astro D2](https://astro-d2.vercel.app/)
2. Use them as components inside MDX or Astro pages:
   - [[timeline-diagram]]
   - [[euler-diagram]]
   - [[hasse-diagram]]
   - [[content-graph-visualization|Graph]]
   - [[metro-map-diagram]]

## Ideal solution

- It should be rendered as (inline) SVG on the server side:
  - No JavaScript required on the client side.
  - Users can use <kbd>Cmd</kbd> + <kbd>F</kbd> to search text.
- Style it with CSS variables (or CSS classes):
  - This would allow for implementing dark mode without JavaScript.
- Optionally add [[svg-pan-zoom|small JS to implement pan/zoom/drag]].

## Ideas

- [Penrose](https://github.com/penrose/penrose)
