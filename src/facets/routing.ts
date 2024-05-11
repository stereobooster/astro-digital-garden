/* eslint complexity: off */

import { history as historyRouter } from "instantsearch.js/es/lib/routers";

import {
  getFallbackHitsPerPageRoutingValue,
  getFallbackSortByRoutingValue,
} from "./widgets";

import type { UiState } from "instantsearch.js";

type RouteState = {
  query?: string;
  page?: string;
  tags?: string[];
  category?: string;
  sortBy?: string;
  hitsPerPage?: string;
};

const routeStateDefaultValues: RouteState = {
  query: "",
  page: "1",
  tags: undefined,
  category: "",
  sortBy: "instant_search",
  hitsPerPage: "20",
};

const encodedUpdatedAt = {
  Cameras: "Cameras & Camcorders",
  Cars: "Car Electronics & GPS",
  Phones: "Cell Phones",
  TV: "TV & Home Theater",
} as const;

type EncodedUpdatedAt = typeof encodedUpdatedAt;
type DecodedUpdatedAt = {
  [K in keyof EncodedUpdatedAt as EncodedUpdatedAt[K]]: K;
};

const decodedUpdatedAt = Object.keys(
  encodedUpdatedAt,
).reduce<DecodedUpdatedAt>((acc, key) => {
  const newKey = encodedUpdatedAt[key as keyof EncodedUpdatedAt];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {} as any);

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name: string): string {
  const encodedName =
    decodedUpdatedAt[name as keyof DecodedUpdatedAt] || name;

  return encodedName.split(" ").map(encodeURIComponent).join("+");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug: string): string {
  const decodedSlug =
    encodedUpdatedAt[slug as keyof EncodedUpdatedAt] || slug;

  return decodedSlug.split("+").map(decodeURIComponent).join(" ");
}

const originalWindowTitle = document.title;

const router = historyRouter<RouteState>({
  windowTitle({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : "";

    return [queryTitle, category, originalWindowTitle]
      .filter(Boolean)
      .join(" | ");
  },

  createURL({ qsModule, routeState, location }): string {
    const { protocol, hostname, port = "", pathname, hash } = location;
    const portWithPrefix = port === "" ? "" : `:${port}`;
    const urlParts = location.href.match(/^(.*?)\/search/);
    const baseUrl =
      (urlParts && urlParts[0]) ||
      `${protocol}//${hostname}${portWithPrefix}${pathname}search`;

    const categoryPath = routeState.category
      ? `${getCategorySlug(routeState.category)}/`
      : "";
    const queryParameters: Partial<RouteState> = {};

    if (
      routeState.query &&
      routeState.query !== routeStateDefaultValues.query
    ) {
      queryParameters.query = encodeURIComponent(routeState.query);
    }
    if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
    }
    if (
      routeState.tags &&
      routeState.tags !== routeStateDefaultValues.tags
    ) {
      queryParameters.tags = routeState.tags.map(encodeURIComponent);
    }
    if (
      routeState.sortBy &&
      routeState.sortBy !== routeStateDefaultValues.sortBy
    ) {
      queryParameters.sortBy = routeState.sortBy;
    }
    if (
      routeState.hitsPerPage &&
      routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
    ) {
      queryParameters.hitsPerPage = routeState.hitsPerPage;
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    });

    return `${baseUrl}/${categoryPath}${queryString}${hash}`;
  },

  parseURL({ qsModule, location }): RouteState {
    const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
    const category = getCategoryName(
      (pathnameMatches && pathnameMatches[1]) || "",
    );
    const queryParameters = qsModule.parse(location.search.slice(1));
    const {
      query = "",
      page = 1,
      tags = [],
    } = queryParameters;
    // `qs` does not return an array when there's a single value.
    const allTags = Array.isArray(tags) ? tags : [tags].filter(Boolean);
    const hitsPerPage = getFallbackHitsPerPageRoutingValue(
      queryParameters.hitsPerPage as string,
    );
    const sortBy = getFallbackSortByRoutingValue(
      queryParameters.sortBy as string,
    );

    return {
      query: decodeURIComponent(query as string),
      page: page as string,
      tags: allTags.map((tag) => decodeURIComponent(tag as string)),
      category,
      sortBy,
      hitsPerPage,
    };
  },
});

const getStateMapping = ({ indexName }: { indexName: string }) => ({
  stateToRoute(uiState: UiState): RouteState {
    const indexUiState = uiState[indexName];
    return {
      query: indexUiState.query,
      page: indexUiState.page! > 0 ? String(indexUiState.page) : undefined,
      tags: indexUiState.refinementList && indexUiState.refinementList.tag,
      category:
        indexUiState.hierarchicalMenu &&
        indexUiState.hierarchicalMenu["hierarchicalUpdatedAt.lvl0"] &&
        indexUiState.hierarchicalMenu["hierarchicalUpdatedAt.lvl0"].join("/"),
      sortBy: indexUiState.sortBy,
      hitsPerPage:
        (indexUiState.hitsPerPage && String(indexUiState.hitsPerPage)) ||
        undefined,
    };
  },

  routeToState(routeState: RouteState): UiState {
    const hierarchicalMenu: { [key: string]: string[] } = {};
    if (routeState.category) {
      hierarchicalMenu["hierarchicalUpdatedAt.lvl0"] =
        routeState.category.split("/");
    }

    const refinementList: { [key: string]: string[] } = {};
    if (routeState.tags) {
      refinementList.tag = routeState.tags;
    }

    return {
      [indexName]: {
        query: routeState.query,
        page: Number(routeState.page),
        hierarchicalMenu,
        refinementList,
        sortBy: routeState.sortBy,
        hitsPerPage: Number(routeState.hitsPerPage),
      },
    };
  },
});

const getRouting = ({ indexName }: { indexName: string }) => ({
  router,
  stateMapping: getStateMapping({ indexName }),
});

export default getRouting;
