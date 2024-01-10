import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaidjs from "remark-mermaidjs";
// import rehypeRaw from "rehype-raw";
// import rehypeMermaid from "rehype-mermaid";
// import rehypeShikiji from "rehype-shikiji";

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
        {
          label: "Recipes",
          // collapsed: true,
          autogenerate: {
            directory: "recipes",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkMath,
      remarkMermaidjs
    ],
    rehypePlugins: [
      // rehypeRaw,
      // rehypeMermaid,
      // rehypeShikiji,
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
