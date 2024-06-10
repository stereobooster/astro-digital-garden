import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";

const integration = defineIntegration({
  name: "astro-digital-garden",
  optionsSchema: z.object({}).optional(),
  setup() {
    return {
      hooks: {
        "astro:config:setup": async (params) => {
         
          // updateConfig(newConfig);
        },
      },
    };
  },
});

import type { StarlightPlugin } from "@astrojs/starlight/types";

export default  function plugin(): StarlightPlugin {
  
  return {
    name: "starlight-digital-garden",
    hooks: {
      setup({ addIntegration, config, updateConfig }) {
        // addIntegration();
        const componentOverrides: typeof config.components = {};
        componentOverrides.PageFrame =
          "starlight-digital-garden/components/PageFrame.astro";
        componentOverrides.Sidebar =
          "starlight-digital-garden/components/Sidebar.astro";
        
        updateConfig({
          components: {
            ...componentOverrides,
            ...config.components,
          },
        });
      },
    },
  };
}
