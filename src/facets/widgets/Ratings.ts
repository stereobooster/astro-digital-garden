import { panel, ratingMenu } from "instantsearch.js/es/widgets";

import { collapseButtonText } from "../templates/panel";

const ratingsMenu = panel({
  templates: {
    header: () => `Ratings`,
    collapseButtonText,
  },
  collapsed: () => false,
})(ratingMenu);

export const ratings = ratingsMenu({
  container: '[data-widget="ratings"]',
  attribute: "rating",
  templates: {
    // @ts-expect-error fix later
    item: ({ count, label, url, cssClasses, stars }, { html }) => html`
      <a
        class="${cssClasses.link}"
        aria-label="${label} & up"
        href="${url}"
        onClick="${(e: Event) => {
          /* To fix issue with reload */
          window.history.replaceState(null, "", url);
          e.preventDefault();
        }}"
        disabled=${count === 0}
      >
        ${stars.map(
          (star: boolean) => html`
            <svg
              class="${cssClasses.starIcon} ${star
                ? cssClasses.fullStarIcon
                : cssClasses.emptyStarIcon}"
              aria-hidden="true"
              viewbox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
              />
            </svg>
          `
        )}
        <span class="${cssClasses.count}">${count}</span>
      </a>
    `,
  },
});

export function getFallbackRatingsRoutingValue(
  value: string
): string | undefined {
  const ratingValue = Number(value);

  if (ratingValue >= 1 && ratingValue <= 4) {
    return value;
  }

  return undefined;
}
