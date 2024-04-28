import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
// import rehypeMermaid from "rehype-mermaid";
// import { astroExpressiveCode, addClassName } from "astro-expressive-code";

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Icons from "unplugin-icons/vite";

import { wikiLinkPlugin } from "@stereobooster/remark-wiki-link";
import { bdb } from "./src/lib/braindb.mjs";

await bdb.ready();

// https://astro.build/config
export default defineConfig({
  site: "https://astro-digital-garden.stereobooster.com",
  integrations: [
    // astroExpressiveCode({
    //   customConfigPreprocessors: {
    //     preprocessAstroIntegrationConfig: () => {
    //       // Add the `not-content` class to all rendered blocks to prevent them from being affected
    //       // by Starlight's default content styles
    //       const plugins = [
    //         {
    //           name: "Starlight Plugin",
    //           hooks: {
    //             postprocessRenderedBlock: ({ renderData }) => {
    //               addClassName(renderData.blockAst, "not-content");
    //             },
    //           },
    //         },
    //       ];

    //       return {
    //         themeCssSelector: (theme, { styleVariants }) => {
    //           // If one dark and one light theme are available, and the user has not disabled it,
    //           // generate theme CSS selectors compatible with Starlight's dark mode switch
    //           if (styleVariants.length >= 2) {
    //             const baseTheme = styleVariants[0]?.theme;
    //             const altTheme = styleVariants.find(
    //               (v) => v.theme.type !== baseTheme?.type
    //             )?.theme;
    //             if (theme === baseTheme || theme === altTheme)
    //               return `[data-theme='${theme.type}']`;
    //           }
    //           // Return the default selector
    //           return `[data-theme='${theme.name}']`;
    //         },
    //         plugins,
    //       };
    //     },
    //   },
    // }),
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
        // TODO: astro:page-load
        // Head: './src/components/Head.astro',
        // Sidebar: "./src/components/Sidebar.astro",
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
      // [rehypeMermaid, { strategy: "img-svg" }],
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: "append" }],
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
      exclude: ["fsevents", "@node-rs", "@napi-rs"],
    },
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
