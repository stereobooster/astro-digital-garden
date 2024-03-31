import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
const generateSlug = (filePath) => {
  const withoutFileExt = filePath.replace(
    new RegExp(path.extname(filePath) + "$"),
    ""
  );
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug = rawSlugSegments
    // Slugify each route segment to handle capitalization and spaces.
    // Note: using `slug` instead of `new Slugger()` means no slug deduping.
    .map((segment) => githubSlug(segment))
    .join("/")
    .replace(/\/index$/, "");

  return slug;
};

const start = new Date().getTime();

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/docs"),
  url: (filePath, _frontmatter) => `${generateSlug(filePath)}/`,
  git: process.cwd(),
  storeMarkdown: false,
  // need to configure caching in Netlify in order to use this
  // - https://github.com/siakaramalegos/netlify-plugin-cache-folder
  // - https://github.com/netlify/build/tree/main/packages/cache-utils
  // dbPath: process.cwd(),
});

bdb.start();

bdb.on("*", (action, opts) => {
  if (action === "ready")
    console.log(`BrainDB ready: ${new Date().getTime() - start}ms`);

  if (opts) {
    opts.document
      .unresolvedLinks()
      .forEach((link) =>
        console.log(
          `Unresolved link: ${link
            .from()
            .path()}:${link.line()}:${link.column()}`
        )
      );
  }
});
