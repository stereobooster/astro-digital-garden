import { configure } from "instantsearch.js/es/widgets";

// for some reason this fails in CI, but not locally
export const configuration = configure({
  // @ts-ignore
  attributesToSnippet: ["description:10"],
  // @ts-ignore
  snippetEllipsisText: "…",
  // @ts-ignore
  removeWordsIfNoResults: "allOptional",
});
