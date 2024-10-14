import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import { starlightKatex } from "starlight-katex";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Icons from "unplugin-icons/vite";
import robotsTxt from 'astro-robots-txt';

import remarkWikiLink from "@braindb/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

import { getCache } from "@beoe/cache";
import { rehypeMermaid } from "@beoe/rehype-mermaid";
import { rehypeGraphviz } from "@beoe/rehype-graphviz";
import { rehypeGnuplot } from "@beoe/rehype-gnuplot";

import remarkDataview from "@braindb/remark-dataview";

import starlightDigitalGarden from 'starlight-digital-garden'

const cache = await getCache();

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
          "https://github.com/stereobooster/astro-digital-garden/edit/main/packages/website/",
      },
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
      // pagination doesn't make sense in the context of digital garden
      pagination: false,
      customCss: ["./src/styles/custom.css"],
      components: {
        PageFrame: "./src/components/PageFrame.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        Head: "./src/components/Head.astro",
        // Sidebar: "./src/components/Sidebar.astro",
      },
      lastUpdated: true,
      // If you want to fork this repository for personal use,
      // please remove following lines for umami analytics
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
      plugins: [starlightKatex(), starlightDigitalGarden()],
    }),
    robotsTxt()
  ],
  markdown: {
    remarkPlugins: [
      [remarkDataview, { bdb }],
      [
        remarkWikiLink,
        {
          linkTemplate: ({ slug, alias }) => {
            const [slugWithoutAnchor, anchor] = slug.split("#");
            const doc = bdb.documentsSync({ slug: slugWithoutAnchor })[0];
            if (doc) {
              return {
                hName: "a",
                hProperties: {
                  href: anchor ? `${doc.url()}#${anchor}` : doc.url(),
                },
                hChildren: [
                  {
                    type: "text",
                    value: alias == null ? doc.frontmatter().title : alias,
                  },
                ],
              };
            } else {
              return {
                hName: "span",
                hProperties: {
                  class: "broken-link",
                  title: `Can't resolve link to ${slug}`,
                },
                hChildren: [{ type: "text", value: alias || slug }],
              };
            }
          },
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeMermaid,
        { class: "not-content", cache, strategy: "img-class-dark-mode" },
      ],
      [rehypeGraphviz, { class: "not-content", cache }],
      [rehypeGnuplot, { class: "not-content", cache }],
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener"],
          content: { type: "text", value: " ↗" }, // ⤴
          contentProperties: { "aria-hidden": true, class: "no-select" },
          // content: { type: "text", value: "" },
          // contentProperties: (x) => {
          //   const hostname = new URL(x.properties.href).hostname;
          //   return {
          //     class: "external-icon",
          //     style: `--icon: url(https://external-content.duckduckgo.com/ip3/${hostname}.ico)`,
          //   };
          // },
        },
      ],
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ["fsevents", "@node-rs", "@napi-rs"],
    },
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
