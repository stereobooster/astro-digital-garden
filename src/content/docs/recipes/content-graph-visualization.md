---
title: Content graph visualization
tags: [link]
---

## Installation

### BrainDB

See [[braindb]]

### The rest

With BrainDB it is possible to convert content to graph, for example, in JSON format and then load it in any visualization library of your choice. Here is an example of how to load data in [Graphology](https://graphology.github.io/):

```ts
// src/lib/graph.ts
import { BrainDB } from "@braindb/core";
import { bdb } from "./braindb.mjs";
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
  const data = await toGraphologyJson(bdb);
  graph.import(data as any);
  circular.assign(graph);
  return graph;
}
```

## Example

See [[graph]].

This graph is generated on the server-side with the help of Graphology and some custom code. It is too long to post it here. Check out source code, if you want to know more.

Idea was to show graph without the need for JS on the client-side. But it is hard to do. Because one need to take care of not overlaping - nodes, edges and labels. It is good enough to demonstate idea, but it needs to be reimplemented to be rendered on the client-side.

## See also

- [[svg-pan-zoom]]

## Further improvements

- show tags on the graph (already showing, but without text)
- create an example with client side graph
