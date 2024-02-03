// @ts-nocheck
/**
 * Graphology SVG Renderer
 *
 * Copy-paste from original package to fix some things in place
 */
import helpers from "graphology-svg/helpers";
import defaults from "graphology-svg/defaults";
// import line from "graphology-svg/components/edges/line";
// import circle from "graphology-svg/components/nodes/circle";
// import nodeLabelDefault from "graphology-svg/components/nodeLabels/default";

export const { DEFAULTS } = defaults;

function nodeReducer(settings: any, node: any, attr: any) {
  return {
    ...defaults.DEFAULT_NODE_REDUCER(settings, node, attr),
    url: attr.url,
    id: node,
  };
}

function drawCircle(_settings, data) {
  const circle = `<circle cx="${data.x}" cy="${data.y}" r="${data.size}" fill="${data.color}" />`;
  if (!data.url) return circle;
  return `<a href="${helpers.escape(data.url)}" data-id="${
    data.id
  }" class="graphNode">${circle}</a>`;
}

function drawLabel(settings, data) {
  const label = `<text x="${data.x + data.size * 1.1}" y="${
    data.y + data.size / 4
  }" font-family="${helpers.escape(
    settings.font || "sans-serif"
  )}" font-size="${data.size}">${helpers.escape(data.label)}</text>`;
  if (!data.url) return "";
  return `<a href="${helpers.escape(data.url)}" class="graphLabel" id="label-${
    data.id
  }" style="display:none">${label}</a>`;
}

const marker = `<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ccc"/>
  </marker>
</defs>`;

function drawEdge(_settings, data, sourceData, targetData) {
  // return `<line
  //   x1="${sourceData.x}" y1="${sourceData.y}"
  //   x2="${targetData.x}" y2="${targetData.y}"
  //   stroke="${data.color}" stroke-width="${data.size}"
  //   marker-segment="url(#arrow)"
  // />`;

  const radius = 14;
  const length = Math.sqrt(
    Math.pow(sourceData.y - targetData.y, 2) +
      Math.pow(sourceData.x - targetData.x, 2)
  );
  const coefficientX = (sourceData.x - targetData.x) / length;
  const coefficientY = (sourceData.y - targetData.y) / length;
  const arrowX = targetData.x + coefficientX * radius;
  const arrowY = targetData.y + coefficientY * radius;

  return `<polyline points="${sourceData.x},${sourceData.y} ${arrowX},${arrowY} ${targetData.x},${targetData.y}" 
    fill="none" stroke="${data.color}" stroke-width="${data.size}"
    marker-mid="url(#arrow)"/>`;
}

const components = {
  nodes: {
    circle: drawCircle,
  },
  edges: {
    line: drawEdge,
  },
  nodeLabels: {
    default: drawLabel,
  },
};

export function renderer(graph: any, settings: any) {
  // Reducing nodes
  const nodeData = reduceNodes(graph, settings);

  // Drawing edges
  const edgesStrings = [];
  graph.forEachEdge(function (edge, attr, source, target) {
    // Reducing edge
    if (typeof settings.edges.reducer === "function")
      attr = settings.edges.reducer(settings, edge, attr);

    attr = defaults.DEFAULT_EDGE_REDUCER(settings, edge, attr);

    edgesStrings.push(
      components.edges[attr.type](
        settings,
        attr,
        nodeData[source],
        nodeData[target]
      )
    );
  });

  // Drawing nodes and labels
  // TODO: should we draw in size order to avoid weird overlaps? Should we run noverlap?
  const nodesStrings = [];
  const nodeLabelsStrings = [];
  let k;
  for (k in nodeData) {
    nodesStrings.push(
      components.nodes[nodeData[k].type](settings, nodeData[k])
    );
    nodeLabelsStrings.push(
      components.nodeLabels[nodeData[k].labelType](settings, nodeData[k])
    );
  }

  return `<svg width="${settings.width}" height="${
    settings.height
  }" viewBox="0 0 ${settings.width} ${settings.height}">
      ${marker}
      <g>${edgesStrings.join("")}</g>
      <g>${nodesStrings.join("")}</g>
      <g>${nodeLabelsStrings.join("")}</g>
    </svg>`;
}

function reduceNodes(graph, settings) {
  const width = settings.width,
    height = settings.height;

  let xBarycenter = 0,
    yBarycenter = 0,
    totalWeight = 0;

  const data = {};

  graph.forEachNode(function (node, attr) {
    // Applying user's reducing logic
    if (typeof settings.nodes.reducer === "function")
      attr = settings.nodes.reducer(settings, node, attr);

    attr = nodeReducer(settings, node, attr);
    data[node] = attr;

    // Computing rescaling items
    xBarycenter += attr.size * attr.x;
    yBarycenter += attr.size * attr.y;
    totalWeight += attr.size;
  });

  xBarycenter /= totalWeight;
  yBarycenter /= totalWeight;

  let d, ratio, n;
  let dMax = -Infinity;

  let k;

  for (k in data) {
    n = data[k];
    d = Math.pow(n.x - xBarycenter, 2) + Math.pow(n.y - yBarycenter, 2);

    if (d > dMax) dMax = d;
  }

  ratio =
    (Math.min(width, height) - 2 * settings.margin) / (2 * Math.sqrt(dMax));

  for (k in data) {
    n = data[k];

    n.x = width / 2 + (n.x - xBarycenter) * ratio;
    n.y = height / 2 + (n.y - yBarycenter) * ratio;

    n.size *= ratio; // TODO: keep?
  }

  return data;
}
