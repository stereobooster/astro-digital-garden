---
title: Timelime diagram
tags: [component, diagram]
---

**aka** chronology, genealogical tree, time tree, DAG (sorted by time)

## Instalation

```bash title="Instal dependencies…"
pnpm add @hpcc-js/wasm
```

```astro
// src/components/Graphviz.astro
---
import { Graphviz as GraphvizWasm } from "@hpcc-js/wasm/graphviz";
const graphviz = await GraphvizWasm.load();

interface Props {
  src: string;
}

const src = Astro.props.src; // await Astro.slots.render('default');

let svg = graphviz
  .dot(src)
  .replace(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`, "")
  .replace(
    `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
    ""
  );

const widthMatch = svg.match(/width="(\d+)([^"]+)"/);
if (widthMatch) svg = svg.replace(widthMatch[0], "");

const heightMatch = svg.match(/height="(\d+)([^"]+)"/);
if (heightMatch) svg = svg.replace(heightMatch[0], "");

// TODO: remove html comments
---

<Fragment set:html={svg} />
```

```astro
// src/components/Timeline.astro
---
import Graphviz from "./Graphviz.astro";

type TimelineItem = {
  id: string;
  year: number;
  tooltip?: string;
  class?: string;
  label?: string;
  url?: string;
  in?: string[];
  out?: string[];
};

interface Props {
  items: TimelineItem[];
  /**
   * https://www.graphviz.org/doc/info/attrs.html#d:rankdir
   */
  direction?: "TB" | "BT" | "LR" | "RL";
}

const { items, direction } = Astro.props;

const byYears: Record<string, string[]> = {};

items.forEach((item) => {
  byYears[item.year] = byYears[item.year] || [];
  byYears[item.year].push(item.id);
});

const src = `digraph timeline {
    ${direction ? `rankdir=${direction}` : ""}
    bgcolor="transparent";
    size="7,8";

    edge [style=invis];
    node [fontsize=24, shape = plaintext];

    ${Object.keys(byYears).sort().join(` -> `)}
    0[label=" "]

    node [fontsize=20, shape = box];

    ${Object.keys(byYears)
      .sort()
      .map(
        (year) =>
          `{ rank=same; "${year}" ${byYears[year].map((x) => `"${x}"`).join(" ")}; }`
      )
      .join("\n")}

    edge[style=solid];

    ${items.map((item) => `"${item.id}"[${item.url ? `URL="${item.url}"` : ""} ${item.label ? `label="${item.label}"` : ""} ${item.class ? `class="${item.class}"` : ""} ${item.tooltip ? `tooltip="${item.tooltip}"` : ""}];`).join("\n")}

    ${items.map((item) => (!item.in ? "" : item.in.map((id) => `"${id}" -> "${item.id}";`).join("\n"))).join("\n")}

    ${items.map((item) => (!item.out ? "" : item.out.map((id) => `"${item.id}" -> "${id}";`).join("\n"))).join("\n")}
}`;
---

<div class="timeline">
  <Graphviz src={src} />
</div>

<style>
  .timeline {
    text {
      fill: var(--sl-color-white);
    }
    path {
      stroke: var(--sl-color-white);
    }
    polygon {
      stroke: var(--sl-color-white);
    }
  }
</style>
```

## Example

Code: [Publications.astro](https://github.com/stereobooster/exact-online-string-matching/blob/main/src/components/Publications.astro). Online demo: [Exact Online String Matching](https://exact.stereobooster.com/).

## References

- [Timeline of web browsers](https://upload.wikimedia.org/wikipedia/commons/7/74/Timeline_of_web_browsers.svg)
- [Timelines Chart](https://github.com/vasturiano/timelines-chart)
- [Timelines and Visual Histories](http://euclid.psych.yorku.ca/SCS/Gallery/timelines.html)
