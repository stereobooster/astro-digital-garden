import { stats } from "instantsearch.js/es/widgets";

export const resultsNumberMobile = stats({
  container: '[data-widget="results-number-mobile"]',
  templates: {
    text: ({ nbHits }, { html }) => html`<strong>${nbHits}</strong> results`,
  },
});
