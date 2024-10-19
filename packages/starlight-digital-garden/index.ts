import type {
  StarlightPlugin,
  StarlightUserConfig,
} from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";
import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";
import rehypeExternalLinks from "rehype-external-links";
import robotsTxt from "astro-robots-txt";
import remarkDataview from "@braindb/remark-dataview";

import { brainDbAstro, getBrainDb } from "@braindb/astro";
export { getBrainDb };

export const astroDigitalGarden = defineIntegration({
  name: "astro-digital-garden",
  optionsSchema: z
    .object({
      remarkDataview: z.boolean(),
      rehypeExternalLinks: z.union([
        z.literal("arrow"),
        z.literal("icon"),
        z.literal("off"),
      ]),
    })
    .partial()
    .optional(),
  setup({ options }) {
    return {
      hooks: {
        "astro:config:setup": ({ config, updateConfig }) => {
          const newConfig = {
            markdown: {
              remarkPlugins: [
                ...(options?.remarkDataview === true
                  ? [[remarkDataview, { getBrainDb }]]
                  : []),
                ...config.markdown.remarkPlugins,
              ],
              rehypePlugins: [
                ...(options?.rehypeExternalLinks === "off"
                  ? []
                  : [
                      [
                        rehypeExternalLinks,
                        {
                          target: "_blank",
                          rel: ["nofollow", "noopener"],
                          ...(options?.rehypeExternalLinks === "icon"
                            ? {
                                content: { type: "text", value: "" },
                                contentProperties: (x: any) => {
                                  const hostname = new URL(x.properties.href)
                                    .hostname;
                                  return {
                                    class: "external-icon",
                                    style: `--icon: url(https://external-content.duckduckgo.com/ip3/${hostname}.ico)`,
                                  };
                                },
                              }
                            : {
                                content: { type: "text", value: " ↗" }, // ⤴
                                contentProperties: {
                                  "aria-hidden": true,
                                  class: "no-select",
                                },
                              }),
                        },
                      ],
                    ]),
                ...config.markdown.rehypePlugins,
              ],
            },
          };
          updateConfig(newConfig);
        },
      },
    };
  },
});

type SDGOptions = {
  robotsTxt?: boolean;
  rehypeExternalLinks?: "arrow" | "icon";
  remarkDataview?: boolean;
  // TODO: BrainDbOptions
  // TODO: maybe options to disable previews, backlinks, wikilinks etc?
};

export default function starlightDigitalGarden(
  options?: SDGOptions
): StarlightPlugin {
  return {
    name: "starlight-digital-garden",
    hooks: {
      setup({
        config: starlightConfig,
        logger,
        updateConfig: updateStarlightConfig,
        addIntegration,
      }) {
        addIntegration(astroDigitalGarden(options));
        addIntegration(brainDbAstro());
        if (options?.robotsTxt !== false) addIntegration(robotsTxt());

        updateStarlightConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "TableOfContents"
            ),
            ...overrideStarlightComponent(
              starlightConfig.components,
              logger,
              "PageFrame"
            ),
          },
        });
      },
    },
  };
}

function overrideStarlightComponent(
  components: StarlightUserConfig["components"],
  logger: AstroIntegrationLogger,
  component: keyof NonNullable<StarlightUserConfig["components"]>
) {
  if (components?.[component]) {
    logger.warn(
      `It looks like you already have a \`${component}\` component override in your Starlight configuration.`
    );
    logger.warn(
      `To use \`starlight-digital-garden\`, either remove your override or update it to render the content from \`starlight-digital-garden/overrides/${component}.astro\`.`
    );

    return {};
  }

  return {
    [component]: `starlight-digital-garden/overrides/${component}.astro`,
  };
}
