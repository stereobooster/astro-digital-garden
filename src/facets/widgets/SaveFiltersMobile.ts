import { stats } from "instantsearch.js/es/widgets";

export const saveFiltersMobile = stats({
  container: '[data-widget="save-filters-mobile"]',
  templates: {
    text: ({ nbHits }, { html }) => html`
      <button class="button button-primary">See ${nbHits} results</button>
    `,
  },
});
