import { BrainDB } from "@braindb/core";
import { bdb } from "./braindb.mjs";
import graphology from "graphology";
import circular from "graphology-layout/circular";
// import forceAtlas2 from 'graphology-layout-forceatlas2';
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
  // forceAtlas2.assign(graph, 2000);
  return graph;
}
