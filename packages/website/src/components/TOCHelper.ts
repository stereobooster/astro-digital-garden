import type { Props } from "@astrojs/starlight/props";

type MarkdownHeading = Props["headings"][-1];
export type TOCItem = MarkdownHeading & {
  subheadings: TOCItem[];
};

export function buildToc(headings: MarkdownHeading[]) {
  const toc: TOCItem[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // Change 2 to 1 if your markdown includes your <h1>
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });
  return toc;
}
