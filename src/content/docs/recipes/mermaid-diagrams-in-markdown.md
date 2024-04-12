---
title: Mermaid diagrams in markdown
tags: [markdown, code-fences, diagram]
---

```mermaid
---
config:
  sankey:
    showValues: false
---
sankey-beta

Agricultural 'waste',Bio-conversion,124.729
Bio-conversion,Liquid,0.597
Bio-conversion,Losses,26.862
Bio-conversion,Solid,280.322
Bio-conversion,Gas,81.144
Biofuel imports,Liquid,35
Biomass imports,Solid,35
Coal imports,Coal,11.606
Coal reserves,Coal,63.965
Coal,Solid,75.571
District heating,Industry,10.639
District heating,Heating and cooling - commercial,22.505
District heating,Heating and cooling - homes,46.184
Electricity grid,Over generation / exports,104.453
Electricity grid,Heating and cooling - homes,113.726
Electricity grid,H2 conversion,27.14
Electricity grid,Industry,342.165
Electricity grid,Road transport,37.797
Electricity grid,Agriculture,4.412
Electricity grid,Heating and cooling - commercial,40.858
Electricity grid,Losses,56.691
Electricity grid,Rail transport,7.863
Electricity grid,Lighting & appliances - commercial,90.008
Electricity grid,Lighting & appliances - homes,93.494
Gas imports,Ngas,40.719
Gas reserves,Ngas,82.233
Gas,Heating and cooling - commercial,0.129
Gas,Losses,1.401
Gas,Thermal generation,151.891
Gas,Agriculture,2.096
Gas,Industry,48.58
Geothermal,Electricity grid,7.013
H2 conversion,H2,20.897
H2 conversion,Losses,6.242
H2,Road transport,20.897
Hydro,Electricity grid,6.995
Liquid,Industry,121.066
Liquid,International shipping,128.69
Liquid,Road transport,135.835
Liquid,Domestic aviation,14.458
Liquid,International aviation,206.267
Liquid,Agriculture,3.64
Liquid,National navigation,33.218
Liquid,Rail transport,4.413
Marine algae,Bio-conversion,4.375
Ngas,Gas,122.952
Nuclear,Thermal generation,839.978
Oil imports,Oil,504.287
Oil reserves,Oil,107.703
Oil,Liquid,611.99
Other waste,Solid,56.587
Other waste,Bio-conversion,77.81
Pumped heat,Heating and cooling - homes,193.026
Pumped heat,Heating and cooling - commercial,70.672
Solar PV,Electricity grid,59.901
Solar Thermal,Heating and cooling - homes,19.263
Solar,Solar Thermal,19.263
Solar,Solar PV,59.901
Solid,Agriculture,0.882
Solid,Thermal generation,400.12
Solid,Industry,46.477
Thermal generation,Electricity grid,525.531
Thermal generation,Losses,787.129
Thermal generation,District heating,79.329
Tidal,Electricity grid,9.452
UK land based bioenergy,Bio-conversion,182.01
Wave,Electricity grid,19.013
Wind,Electricity grid,289.366
```

Example taken from [mermaid.js.org](https://mermaid.js.org/syntax/sankey.html)

There are a lot of diagraming languages (see [text-to-diagram](https://stereobooster.com/posts/text-to-diagram/)). [Mermaid](https://mermaid.js.org/) seems to be popular (it is supported by GitHub).

## Options

There is no ideal solution so far. But here is what we can do instead:

- Client-side rendering with Mermaid
- Server-side rendering with Mermaid via headless browser
- Server-side rendering with [Pintora](https://pintorajs.vercel.app/)

See: [astro-diagrams](https://stereobooster.com/posts/astro-diagrams/)

## Server-side rendering via headless browser

- Mermaid doesn't support server-side rendering: [mermaid#3650](https://github.com/mermaid-js/mermaid/issues/3650)
- Prerendering with healdess browser: [mermaid-isomorphic](https://github.com/remcohaszing/mermaid-isomorphic)
- Related discussion in Starlight repo: [starlight#1259](https://github.com/withastro/starlight/discussions/1259)

### remark plugin

```bash title="Instal dependencies…"
pnpm add remark-mermaidjs
```

```js
// astro.config.mjs
import remarkMermaidjs from "remark-mermaidjs";

export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMermaidjs],
  },
});
```

[Author advices against using remark plugin and insists on using rehype plugin](https://github.com/remcohaszing/remark-mermaidjs/issues/23#issuecomment-1881313556).

You may need to fix some CSS for your diagrams, for example:

```css
// src/styles/custom.css
svg .node .label {
  line-height: 1.2;
}

.flowchart-link {
  stroke: var(--sl-color-white) !important;
}

.marker {
  stroke: var(--sl-color-white) !important;
  fill: var(--sl-color-white) !important;
}
```

### rehype plugin

`rehype-mermaidjs` doesn't work with Astro out of the box. Because of [remark-shiki](https://github.com/withastro/astro/blob/main/packages/markdown/remark/src/remark-shiki.ts). There are several workarounds:

- ~~use `rehype-raw`~~ (it used to work)
- ~~disable `remark-shiki` at all ([`markdown.syntaxHighlight: false`](https://docs.astro.build/en/reference/configuration-reference/#markdownsyntaxhighlight)) and use [`rehype-shikiji`](https://shikiji.netlify.app/packages/rehype)~~

There is upcoming feature to support dark mode: [rehype-mermaid#6](https://github.com/remcohaszing/rehype-mermaid/issues/6).

## Example

````md
// example.md

```mermaid
flowchart LR
    Start --> Stop
```
````

```mermaid
flowchart LR
    Start --> Stop
```
