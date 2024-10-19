import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import addClasses from "rehype-class-names";
import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";
import type { StarlightPlugin } from "@astrojs/starlight/types";
import * as importMetaResolve from "import-meta-resolve";

const katexCss = importMetaResolve
  .resolve("katex/dist/katex.min.css", import.meta.url)
  .replace("file://", "");

// I can inject CSS (katex/dist/katex.min.css) only with Starlight
export const astroKatex = defineIntegration({
  name: "astro-katex",
  optionsSchema: z.object({}).optional(),
  setup() {
    return {
      hooks: {
        "astro:config:setup": ({ config, updateConfig }) => {
          const noExternal = config.vite.ssr?.noExternal;

          const newConfig = {
            markdown: {
              remarkPlugins: [...config.markdown.remarkPlugins, remarkMath],
              rehypePlugins: [
                ...config.markdown.rehypePlugins,
                rehypeKatex,
                [addClasses, { ".katex": "not-content" }],
              ],
            },
            vite: {
              ssr: {
                noExternal: [
                  ...(Array.isArray(noExternal)
                    ? noExternal
                    : noExternal && noExternal !== true
                    ? [noExternal]
                    : []),
                  "katex",
                ],
              },
            },
          };
          updateConfig(newConfig);
        },
      },
    };
  },
});

export function starlightKatex(): StarlightPlugin {
  return {
    name: "starlight-digital-garden",
    hooks: {
      setup({ config, updateConfig, addIntegration }) {
        updateConfig({
          customCss: [...config.customCss, katexCss],
        });
        addIntegration(astroKatex());
      },
    },
  };
}
