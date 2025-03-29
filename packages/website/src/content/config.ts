import { z, defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { docsLoader } from "@astrojs/starlight/loaders";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
};
