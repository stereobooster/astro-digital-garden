---
title: Diagrams
tags: [component, diagram]
description: Overview of available options for diagrams in markdown and Astro (text-to-diagram approach)
---

There are two ways to work with diagrams:

1. Embed in markdown, in conde-fences. So called [text to diagram](https://stereobooster.com/posts/text-to-diagram/) approach. For example
   - [[mermaid-diagrams-in-markdown|Mermaid]]
   - [[gnuplot-diagram]]
   - [[graphviz-diagram]]
   - [Astro D2](https://astro-d2.vercel.app/)
2. Use as components inside MDX or Astro pages
   - [[timeline-diagram]]
   - [[euler-diagram]]
   - [[hasse-diagram]]
   - [[content-graph-visualization|Graph]]
   - [[metro-map-diagram]]

## Ideal solution

- it would be rendered as (inline) SVG on the server side
  - so no JS required on the client-side
  - people can use <kbd>Cmd</kbd> + <kbd>F</kbd> to search text
- style it with CSS-variables (or CSS-classes)
  - so it would be possible to implement dark mode without JS
- optionally add [[svg-pan-zoom|small JS to implement pan/zoom/drag]]

## Ideas

- [penrose](https://github.com/penrose/penrose)
