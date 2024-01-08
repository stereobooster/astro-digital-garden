import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "About digital gardens",
      social: {
        github: "https://github.com/stereobooster/digital-garden",
      },
      sidebar: [{ label: "Intro", link: "/" }],
    }),
  ],
});
