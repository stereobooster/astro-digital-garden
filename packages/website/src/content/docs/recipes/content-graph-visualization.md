---
title: Content graph visualization
tags: [link, diagram, component]
description: Visualize the relationships between notes as a graph
---

## Installation

First, [[braindb#installation|install BrainDB]].

With BrainDB, it is possible to convert content into a graph, for example, in JSON format, and then load it into any visualization library of your choice. Here is an example of how to load data in [Graphology](https://graphology.github.io/):

```ts
// src/lib/graph.ts
import { BrainDB } from "@braindb/core";
import { getBrainDb } from "@braindb/astro";
import circular from "graphology-layout/circular";
import graphology from "graphology";
// @ts-ignore
const { MultiGraph } = graphology;

export async function toGraphologyJson(db: BrainDB) {
  const nodes = (await db.documents()).map((document) => ({
    key: document.id(),
    attributes: {
      label: document.frontmatter().title as string,
      url: document.url(),
      size: 0.05,
      // color: "#f00"
    },
  }));

  const edges = (await db.links())
    .filter((link) => link.to() !== null)
    .map((link) => ({
      source: link.from().id(),
      target: link.to()?.id(),
    }));

  return {
    attributes: { name: "g" },
    options: {
      allowSelfLoops: true,
      multi: true,
      type: "directed",
    },
    nodes,
    edges,
  };
}

export async function getGraph() {
  const graph = new MultiGraph();
  const data = await toGraphologyJson(getBrainDb());
  graph.import(data as any);
  circular.assign(graph);
  return graph;
}
```

## Example

See [[graph]].

This graph is generated on the server side with the help of Graphology and some custom code. It is too long to post here, so check out the source code if you want to know more.

The idea was to display the graph without the need for JavaScript on the client side. However, this is challenging because one needs to manage the overlapping of nodes, edges, and labels. It is good enough to demonstrate the idea, but it needs to be reimplemented for rendering on the client side.

## See also

- [[svg-pan-zoom]]

## Further improvements

- [ ] Show labels for tags on the graph.
- [ ] Create an example with [[graph-client]]
