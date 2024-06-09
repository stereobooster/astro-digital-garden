# Components for astro-digital-garden

I want to extract some components to make it easier to re-use.

Examples of plugins:

- https://github.com/lorenzolewis/starlight-utils/tree/main
- https://github.com/trueberryless/starlight-view-modes/blob/main/packages/starlight-view-modes/package.json
- https://github.com/withastro/astro/blob/main/packages/integrations/sitemap/src/index.ts
- https://astro-integration-kit.netlify.app/getting-started/installation/
- https://starlight.astro.build/reference/plugins/


To compile TS

```
"types": "./dist/index.d.ts",
"exports": {
".": "./dist/index.js",
"./braindb": {
    "import": "./dist/braindb.js",
    "types": "./dist/braindb.d.ts"
},
"./katex": {
    "import": "./dist/katex.js",
    "types": "./dist/katex.d.ts"
}
},
  "scripts": {
    "prepublishOnly": "npm run build",
    "build": "rm -rf dist && tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist"
  },

```