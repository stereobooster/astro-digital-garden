/**
 * Function to differentiate content pages from service pages, like
 * alphabetical index, tag list, content graph etc.
 *
 * @param {typeof require("@braindb/core").Document} doc
 * @returns {boolean}
 */
export function isContent(doc) {
  // I use tags, but it can be anything
  return (
    doc.frontmatter().tags?.length > 0 &&
    (doc.frontmatter().draft !== true || import.meta.env.DEV)
  );
}
