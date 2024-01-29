---
title: Content graph visualization
tags: [link]
sidebar:
  label: Content graph visualization 🚧
---

## Installation

### BrainDB

```bash title="Instal dependencies…"
pnpm add @braindb/core github-slugger
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
});
```

```js
// src/lib/braindb.ts
import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
const generateSlug = (filePath: string) => {
  const withoutFileExt = filePath.replace(
    new RegExp(path.extname(filePath) + "$"),
    ""
  );
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug = rawSlugSegments
    // Slugify each route segment to handle capitalization and spaces.
    // Note: using `slug` instead of `new Slugger()` means no slug deduping.
    .map((segment) => githubSlug(segment))
    .join("/")
    .replace(/\/index$/, "");

  return slug;
};

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/docs"),
  url: (filePath, _frontmatter) => `${generateSlug(filePath)}/`,
});

bdb.start();
```

### The rest

With BrainDB it is possible to convert content to graph, for example, in JSON format and then load it in any visualization library of your choice. Here is an example of how to load data in [Graphology](https://graphology.github.io/):

```ts
// src/lib/graph.ts
import { BrainDB } from "@braindb/core";
import { bdb } from "./braindb";
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

See [graph](/graph/).

This graph is generated on the server-side with the help of Graphology and some custom code. It is too long to post it here. Check out source code, if you want to know more.

Idea was to show graph without the need for JS on the client-side. But it is hard to do. Because one need to take care of not overlaping - nodes, edges and labels. It is good enough to demonstate idea, but it needs to be reimplemented to be rendered on the client-side.

## Further improvements

- show broken links on the graph
- show tags on the graph
- create an example with client side graph
