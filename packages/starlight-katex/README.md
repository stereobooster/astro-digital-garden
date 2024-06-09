# Starlight plugin for Katex

## Starlight

### Installation

```sh
pnpm add katex starlight-katex
```

Change configuration in `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { starlightKatex } from "starlight-katex";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightKatex()],
    }),
  ],
});
```

## Astro

There is also plugin, for Asto. If you use Starlight plugin you don't need it!

### Installation

```sh
pnpm add katex starlight-katex
```

Change configuration in `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import { astroKatex } from "starlight-katex";

export default defineConfig({
  integrations: [astroKatex()],
});
```

But you also need to load CSS `katex/dist/katex.min.css`.

## Usage

Use `$<expression>$` or `$$<expression>$$`. For example,

```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are

$$
x = {-b \pm \sqrt{b^2-4ac} \over 2a}
$$
```
