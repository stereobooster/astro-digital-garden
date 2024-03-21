import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { wikiLinkPlugin } from "@stereobooster/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: "https://astro-digital-garden.stereobooster.com",
  integrations: [
    starlight({
      title: "Astro Digital Garden",
      social: {
        github: "https://github.com/stereobooster/astro-digital-garden",
      },
      editLink: {
        baseUrl:
          "https://github.com/stereobooster/astro-digital-garden/edit/main/",
      },
      sidebar: [
        { label: "Introduction", link: "/" },
        { label: "Recently changed", link: "/recent" },
        { label: "Alphabetical index", link: "/alphabetical" },
        { label: "Tags", link: "/tags" },
        { label: "Graph", link: "/graph" },
        {
          label: "Recipes",
          // collapsed: true,
          autogenerate: {
            directory: "recipes",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        PageFrame: "./src/components/PageFrame.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
      },
      lastUpdated: true,
      head: import.meta.env.PROD
        ? [
            {
              tag: "script",
              attrs: {
                src: "https://eu.umami.is/script.js",
                "data-website-id": "2d34b0d4-893c-4348-a3e4-1f489300117c",
                defer: true,
              },
            },
          ]
        : undefined,
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkMermaidjs,
      [
        wikiLinkPlugin,
        {
          aliasDivider: "|",
          linkTemplate: ({ permalink, alias }) => {
            // TODO: permalink may contain anchor
            const doc = bdb.documentsSync({ slug: permalink })[0];
            if (doc) {
              return {
                hName: "a",
                hProperties: { href: doc.url() },
                hChildren: [
                  {
                    type: "text",
                    value:
                      permalink === alias ? doc.frontmatter().title : alias,
                  },
                ],
              };
            } else {
              return {
                hName: "span",
                hProperties: {
                  class: "broken-link",
                  title: `Can't resolve link to ${permalink}`,
                },
                hChildren: [{ type: "text", value: alias }],
              };
            }
          },
        },
      ],
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeAutolinkHeadings,
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" }, // ⤴
          contentProperties: { "aria-hidden": true, class: "no-select" },
        },
      ],
      rehypeKatex,
    ],
  },
  vite: {
    ssr: {
      noExternal: ["katex"],
    },
    optimizeDeps: {
      exclude: [
        "fsevents",
        "@node-rs/xxhash-wasm32-wasi",
        "@napi-rs/simple-git-darwin-x64",
      ],
    },
  },
});
