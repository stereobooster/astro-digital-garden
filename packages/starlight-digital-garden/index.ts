import type {
  StarlightPlugin,
  StarlightUserConfig,
} from "@astrojs/starlight/types";
import type { AstroIntegrationLogger } from "astro";
import { brainDbAstro } from "@braindb/astro";

export { getBrainDb } from "@braindb/astro";

export default function starlightDigitalGarden(): StarlightPlugin {
  return {
    name: "starlight-digital-garden",
    hooks: {
      setup({
        config: starlightConfig,
        logger,
        updateConfig: updateStarlightConfig,
        addIntegration,
      }) {
        addIntegration(brainDbAstro());

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
