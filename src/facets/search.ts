import instantsearch from "instantsearch.js";

import getRouting from "./routing";
import {
  tags,
  updatedAt,
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  hitsPerPage,
  pagination,
  products,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
  sortBy,
} from "./widgets";

import { Facets, type Schema, TQuickscoreIndex } from "@stereobooster/facets";
import { getSearchClient } from "@stereobooster/facets-instantsearch";

const schema = {
  name: {
    type: "string",
    text: true,
  },
  description: {
    type: "string",
    text: true,
  },
  tag: {
    type: "string",
    facet: true,
    isArray: true,
  },
  updatedAt: {
    type: "string",
    isArray: true,
    facet: true,
  },
  "hierarchicalUpdatedAt.lvl0": {
    type: "string",
    facet: true,
    isObject: true,
  },
  "hierarchicalUpdatedAt.lvl1": {
    type: "string",
    facet: true,
    isObject: true,
  },
  "hierarchicalUpdatedAt.lvl2": {
    type: "string",
    facet: true,
    isObject: true,
  },
  url: {
    type: "string",
  },
} satisfies Schema;

const data = await fetch("/facets.json").then((x) => x.json());
// if there would be facets client as webworker e.g. asyncrhonious it would need separate adapter
const index = new Facets(
  { textIndex: TQuickscoreIndex, schema, idKey: "objectID" },
  data
);
const searchClient = getSearchClient(index);
const search = instantsearch({
  searchClient,
  indexName: "instant_search",
  routing: getRouting({ indexName: "instant_search" }),
  insights: false,
  future: {
    preserveSharedStateOnUnmount: true,
  },
});

search.addWidgets([
  tags,
  updatedAt,
  clearFilters,
  clearFiltersEmptyResults,
  clearFiltersMobile,
  configuration,
  hitsPerPage,
  pagination,
  products,
  resultsNumberMobile,
  saveFiltersMobile,
  searchBox,
  sortBy,
]);

export default search;
