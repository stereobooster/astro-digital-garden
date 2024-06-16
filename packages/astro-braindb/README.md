# Components for astro-digital-garden

TODO:

- [ ] `astro-braindb`
  - `src/lib/braindb.mjs` maybe virtual module?
  - should be possible to pass configuation for `braindb`
  - configuration for remark/rehype plugins
- maybe better idea is to place it in `@braindb/astro`

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

```ts
addVirtualImports(params, {
  name,
  imports: {
    "virtual:astro-braindb/config": `export default ${JSON.stringify({
      foo: "bar",
      ...(options || {}),
    })}`,
  },
});
```
