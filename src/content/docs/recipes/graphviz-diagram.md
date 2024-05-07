---
title: Graphviz diagram
tags: [markdown, code-fences, diagram]
---

```dot
digraph finite_state_machine {
  bgcolor="transparent";
	fontname="Helvetica,Arial,sans-serif";
	node [fontname="Helvetica,Arial,sans-serif"]
	edge [fontname="Helvetica,Arial,sans-serif"]
	rankdir=LR;
	node [shape = doublecircle]; 0 3 4 8;
	node [shape = circle];
	0 -> 2 [label = "SS(B)"];
	0 -> 1 [label = "SS(S)"];
	1 -> 3 [label = "S($end)"];
	2 -> 6 [label = "SS(b)"];
	2 -> 5 [label = "SS(a)"];
	2 -> 4 [label = "S(A)"];
	5 -> 7 [label = "S(b)"];
	5 -> 5 [label = "S(a)"];
	6 -> 6 [label = "S(b)"];
	6 -> 5 [label = "S(a)"];
	7 -> 8 [label = "S(b)"];
	7 -> 5 [label = "S(a)"];
	8 -> 6 [label = "S(b)"];
	8 -> 5 [label = "S(a)"];
}
```

Example taken [here](https://graphviz.org/Gallery/directed/fsm.html)

## About

[Graphviz](https://graphviz.org/) is open source graph visualization software. On the one hand it is general diagraming tool, so it doesn't have DSL to directly express specific diagrams (let's say Hasse diagram or ER diagram). On the other hand if you don't have better solution you can always bend Graphviz to desired diagram (though it can be tedious sometimes).

## Installation

```bash title="Install dependencies…"
pnpm add @beoe/rehype-graphviz
```

**TODO**: 

- [ ] write instuction for `@beoe/rehype-graphviz`

### Dark mode

Basic dark mode can be implemented with:

```css
.graphviz {
  text {
    fill: var(--sl-color-white);
  }
  [fill="black"],
  [fill="#000"] {
    fill: var(--sl-color-white);
  }
  [stroke="black"],
  [stroke="#000"] {
    stroke: var(--sl-color-white);
  }
}
```

Plus you can pass [`class`](https://graphviz.org/docs/attrs/class/) to Edges and Nodes to implement **advanced dark mode**.

### Tips

- To remove background use `bgcolor="transparent"`

## Example

````md
```dot
digraph x {bgcolor="transparent";rankdir=LR;node [shape=box]
  Start -> Stop}
```
````

```dot
digraph x {bgcolor="transparent";rankdir=LR;node [shape=box]
  Start -> Stop}
```

Compare it to [[mermaid-diagrams-in-markdown#example|similar example in Mermaid]]
