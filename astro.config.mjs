import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
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
        { label: "Tags", link: "/tags" },
        { label: "Alphabetical index", link: "/alphabetical" },
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
      },
      lastUpdated: true,
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://eu.umami.is/script.js",
            "data-website-id": "2d34b0d4-893c-4348-a3e4-1f489300117c",
            defer: true
          },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaidjs],
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
  },
});
