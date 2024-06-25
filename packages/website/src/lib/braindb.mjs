import { slug as githubSlug } from "github-slugger";
import path from "node:path";
import process from "node:process";
import { BrainDB } from "@braindb/core";

// slug implementation according to Astro
// see astro/packages/astro/src/content/utils.ts
function generateSlug(filePath) {
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
}

function slugToUrl(slug) {
  if (!slug.startsWith("/")) slug = "/" + slug;
  if (!slug.endsWith("/")) slug = slug + "/";
  return slug;
}

const start = new Date().getTime();

export const bdb = new BrainDB({
  root: path.resolve(process.cwd(), "src/content/docs"),
  url: (filePath, frontmatter) => {
    if (frontmatter.slug !== undefined) return slugToUrl(frontmatter.slug);
    return slugToUrl(generateSlug(filePath));
  },
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

/**
 * Function to differentiate content pages from service pages, like
 * alphabetical index, tag list, content graph etc.
 *
 * @param {typeof require("@braindb/core").Document} doc
 * @returns {boolean}
 */
export function isContent(doc) {
  // I use tags, but it can be anything
  return doc.frontmatter().tags?.length > 0;
}
