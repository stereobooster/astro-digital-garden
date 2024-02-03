import { BrainDB } from "@braindb/core";
import { bdb } from "./braindb.mjs";
import graphology from "graphology";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";
// @ts-ignore
const { MultiGraph } = graphology;

export async function toGraphologyJson(db: BrainDB) {
  const nodes = (await db.documents())
    .map((document) => ({
      key: document.id(),
      attributes: {
        label: document.frontmatter().title as string,
        url: document.url(),
        // size: 0.05,
        // color: "#f00"
      },
    }))
    .filter((x) => x.attributes.url.startsWith("/recipes"));

  const edges = (await db.links())
    .filter(
      (link) => link.to() !== null && link.to()?.url().startsWith("/recipes")
    )
    .map((link) => ({
      source: link.from().id(),
      target: link.to()?.id(),
    }));

  const tagsAll = (await db.documents())
    .map((document) => {
      const tags = document.frontmatter().tags;
      return Array.isArray(tags) ? tags : [];
    })
    .flat();

  const tagNodes = [...new Set(tagsAll)].map((tag) => ({
    key: tag,
    attributes: {
      label: tag,
      url: "",
      size: 0.4,
    },
  }));

  const tagEdges = (await db.documents())
    .map((document) => {
      const tags = document.frontmatter().tags;
      if (!Array.isArray(tags)) return [];
      return tags.map((tag) => ({
        source: tag,
        target: document.id(),
      }));
    })
    .flat();

  return {
    attributes: { name: "g" },
    options: {
      allowSelfLoops: true,
      multi: true,
      type: "directed",
    },
    nodes: [...nodes, ...tagNodes],
    edges: [...edges, ...tagEdges],
  };
}

export async function getGraph() {
  const graph = new MultiGraph();
  const data = await toGraphologyJson(bdb);
  graph.import(data as any);
  circular.assign(graph);
  forceAtlas2.assign(graph, 2000);
  return graph;
}
