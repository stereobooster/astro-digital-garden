// [vite] Pre-transform error: Package subpath 'undefined' is not defined by "exports" in
// import { safe } from "mdast-util-to-markdown/lib/util/safe.js";
import { safe } from "../../node_modules/.pnpm/mdast-util-to-markdown@2.1.0/node_modules/mdast-util-to-markdown/lib/util/safe.js";

// interface ToMarkdownOptions {
//   aliasDivider?: string;
// }

export function toMarkdown(opts = {}) {
  const aliasDivider = opts.aliasDivider || "|";

  const unsafe = [
    {
      character: "[",
      inConstruct: ["phrasing", "label", "reference"],
    },
    {
      character: "]",
      inConstruct: ["label", "reference"],
    },
  ];

  function handler(node, _, context) {
    const exit = context.enter("wikiLink");

    const nodeValue = safe(context, node.value, { before: "[", after: "]" });
    const nodeAlias = safe(context, node.data.alias, {
      before: "[",
      after: "]",
    });

    let value;
    if (nodeAlias !== nodeValue) {
      value = `[[${nodeValue}${aliasDivider}${nodeAlias}]]`;
    } else {
      value = `[[${nodeValue}]]`;
    }

    exit();

    return value;
  }

  return {
    unsafe: unsafe,
    handlers: {
      wikiLink: handler,
    },
  };
}
