import { z, defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
  i18n: defineCollection({ type: "data", schema: i18nSchema() }),
};
