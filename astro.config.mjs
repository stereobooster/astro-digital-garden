import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import { remarkModifiedTime } from "./plugins/remark-modified-time.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Astro digital garden",
      social: {
        github: "https://github.com/stereobooster/digital-garden",
      },
      sidebar: [
        { label: "Intro", link: "/" },
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
      lastUpdated: true
    }),
  ],
  markdown: {
    syntaxHighlight: false,
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
