import { sortBy as sortByWidget } from "instantsearch.js/es/widgets";

const items = [
  {
    label: "Featured",
    value: "instant_search",
  },
  {
    label: "Date ascending",
    value: "instant_search_date_asc",
  },
  {
    label: "Date descending",
    value: "instant_search_date_desc",
  },
];

export const sortBy = sortByWidget({
  container: '[data-widget="sort-by"]',
  items,
});

export function getFallbackSortByRoutingValue(
  sortByValue: string,
): string | undefined {
  if (items.map((item) => item.value).indexOf(sortByValue) !== -1) {
    return sortByValue;
  }

  return undefined;
}
