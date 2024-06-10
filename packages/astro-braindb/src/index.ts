// import type { AstroConfig } from 'astro';
import remarkWikiLink from "@braindb/remark-wiki-link";
import { remarkDataview } from "./remarkDataview.js";
import { bdb } from "./braindb.js";

import { defineIntegration } from "astro-integration-kit";
import { z } from "astro/zod";

export default defineIntegration({
  name: "astro-digital-garden",
  optionsSchema: z.object({}).optional(),
  setup() {
    return {
      hooks: {
        "astro:config:setup": async (params) => {
          const { updateConfig } = params;
          await bdb.ready();

          const newConfig = {
            markdown: {
              remarkPlugins: [
                [remarkDataview, { bdb }],
                [
                  remarkWikiLink,
                  {
                    linkTemplate: ({
                      slug,
                      alias,
                    }: {
                      slug: string;
                      alias: string;
                    }) => {
                      const [slugWithoutAnchor, anchor] = slug.split("#");
                      const doc = bdb.documentsSync({
                        slug: slugWithoutAnchor,
                      })[0];
                      if (doc) {
                        return {
                          hName: "a",
                          hProperties: {
                            href: anchor ? `${doc.url()}#${anchor}` : doc.url(),
                          },
                          hChildren: [
                            {
                              type: "text",
                              value:
                                alias == null ? doc.frontmatter().title : alias,
                            },
                          ],
                        };
                      } else {
                        return {
                          hName: "span",
                          hProperties: {
                            class: "broken-link",
                            title: `Can't resolve link to ${slug}`,
                          },
                          hChildren: [{ type: "text", value: alias || slug }],
                        };
                      }
                    },
                  },
                ],
              ],
            },
            vite: {
              optimizeDeps: {
                exclude: ["fsevents", "@node-rs", "@napi-rs"],
              },
            },
          };
          updateConfig(newConfig);
        },
      },
    };
  },
});
