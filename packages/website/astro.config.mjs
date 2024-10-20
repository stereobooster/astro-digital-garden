import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { starlightKatex } from "starlight-katex";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Icons from "unplugin-icons/vite";

import { getCache } from "@beoe/cache";
import { rehypeMermaid } from "@beoe/rehype-mermaid";
import { rehypeGraphviz } from "@beoe/rehype-graphviz";
import { rehypeGnuplot } from "@beoe/rehype-gnuplot";

import starlightDigitalGarden from "starlight-digital-garden";

const cache = await getCache();

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
          "https://github.com/stereobooster/astro-digital-garden/edit/main/packages/website/",
      },
      lastUpdated: true,
      sidebar: [
        { label: "Introduction", link: "/" },
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
        TableOfContents: "./src/components/TableOfContents.astro",
        Head: "./src/components/Head.astro",
        // Sidebar: "./src/components/Sidebar.astro",
      },
      // If you want to fork this repository for personal use,
      // please remove following lines for analytics
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
            {
              tag: "script",
              attrs: {
                src: "https://beampipe.io/js/tracker.js",
                "data-beampipe-domain":
                  "astro-digital-garden.stereobooster.com",
                defer: true,
                async: true,
              },
            },
          ]
        : undefined,
      plugins: [
        starlightKatex(),
        starlightDigitalGarden({ remarkDataview: true }),
      ],
    }),
  ],
  markdown: {
    // remarkPlugins: [],
    rehypePlugins: [
      [
        rehypeMermaid,
        { class: "not-content", cache, strategy: "img-class-dark-mode" },
      ],
      [rehypeGraphviz, { class: "not-content", cache }],
      [rehypeGnuplot, { class: "not-content", cache }],
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "append" }],
    ],
  },
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
