# `starlight-digital-garden`

Astro digital garden - set of plugins (Astro, Remark, Rehype) and Astro components that I use often:

- [BrainDB](https://astro-digital-garden.stereobooster.com/recipes/braindb/)
- [Remark plugin to resolve wiki links](https://astro-digital-garden.stereobooster.com/recipes/wikilinks/)
- [Backlinks (in the left sidebar)](https://astro-digital-garden.stereobooster.com/recipes/backlinks/)
- [Link previews](https://astro-digital-garden.stereobooster.com/recipes/link-previews/)
- [Pan and zoom for diagrams](https://astro-digital-garden.stereobooster.com/recipes/svg-pan-zoom/)
- [Rehype plugin to show icon for external link](https://astro-digital-garden.stereobooster.com/recipes/icons-to-external-links/)
- `astro-robots-txt`
- [remark-dataview](https://astro-digital-garden.stereobooster.com/recipes/obsidian-dataview/) (disabled by default)

## Installation

```sh
pnpm add starlight-digital-garden @braindb/core
```

Change configuration in `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightDigitalGarden from "starlight-digital-garden";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightDigitalGarden()],
    }),
  ],
});
```

## License

Licensed under the MIT License, Copyright © stereobooster.
