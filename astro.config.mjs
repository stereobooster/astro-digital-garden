import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Publishing digital garden",
      social: {
        github: "https://github.com/stereobooster/digital-garden",
      },
      sidebar: [
        { label: "Intro", link: "/" },
        {
          label: "Recipes",
          collapsed: true,
          autogenerate: {
            directory: "recipes",
          },
        },
      ],
    }),
  ],
});
