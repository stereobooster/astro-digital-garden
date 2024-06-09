import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";
import type { StarlightPlugin } from "@astrojs/starlight/types";

// I can inject CSS (katex/dist/katex.min.css) only with Starlight
export const astroKatex = defineIntegration({
  name: "astro-katex",
  optionsSchema: z.object({}).optional(),
  setup() {
    return {
      hooks: {
        "astro:config:setup": async ({ config, updateConfig }) => {
          const noExternal = config.vite.ssr?.noExternal;

          const newConfig = {
            markdown: {
              remarkPlugins: [...config.markdown.remarkPlugins, remarkMath],
              rehypePlugins: [...config.markdown.remarkPlugins, rehypeKatex],
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
          // this requires katex in user project
          // how to resolve it?
          customCss: [...config.customCss, "katex/dist/katex.min.css"],
        });
        addIntegration(astroKatex());
      },
    },
  };
}
