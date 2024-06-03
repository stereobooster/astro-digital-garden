import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Icons from "unplugin-icons/vite";

import remarkWikiLink from "@braindb/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

import { getCache } from "@beoe/cache";
import { rehypeMermaid } from "@beoe/rehype-mermaid";
import { rehypeGraphviz } from "@beoe/rehype-graphviz";
import { rehypeGnuplot } from "@beoe/rehype-gnuplot";

import { remarkDataview } from "./src/plugins/remarkDataview.mjs";

import url from "node:url";

const cache = await getCache();

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: "https://astro-digital-garden.stereobooster.com",
  integrations: [
    starlight({
      title: "Wunder",
      social: {
        github: "https://github.com/stardoom4/nebula",
      },
      editLink: {
        baseUrl:
          "https://github.com/stardoom4/nebula/edit/main/",
      },
      sidebar: [
        { label: "Wunder", link: "/" },
        {
          label: "Celestial Entity",
          // collapsed: true,
          autogenerate: {
            directory: "Celestial-Entity",
          },
        },
        {
          label: "Notes",
          // collapsed: true,
          autogenerate: {
            directory: "science",
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
        // TODO: astro:page-load
        // Sidebar: "./src/components/Sidebar.astro",
      },
      lastUpdated: true,
    }),
  ],
  markdown: {
    remarkPlugins: [
      [remarkDataview, { bdb }],
      remarkMath,
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
      rehypeKatex,
    ],
  },
  vite: {
    ssr: {
      noExternal: ["katex"],
    },
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
