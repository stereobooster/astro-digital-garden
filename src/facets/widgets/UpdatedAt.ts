import { panel, hierarchicalMenu } from "instantsearch.js/es/widgets";

import { collapseButtonText } from "../templates/panel";

const categoryHierarchicalMenu = panel({
  templates: {
    header: () => `Category`,
    collapseButtonText,
  },
  collapsed: () => false,
})(hierarchicalMenu);

export const updatedAt = categoryHierarchicalMenu({
  container: '[data-widget="updatedAt"]',
  attributes: ["hierarchicalUpdatedAt.lvl0", "hierarchicalUpdatedAt.lvl1", "hierarchicalUpdatedAt.lvl2"],
});
