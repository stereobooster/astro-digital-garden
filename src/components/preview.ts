import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

const tooltip = document.querySelector("#linkpreview") as HTMLElement;

const elements = document.querySelectorAll(
  ".sl-markdown-content a"
) as NodeListOf<HTMLAnchorElement>;

tooltip.addEventListener("mouseleave", hideLinkPreview);

function hideLinkPreview() {
  tooltip.style.display = "";
}

async function showLinkPreview(e: MouseEvent | FocusEvent) {
  const start = `${window.location.protocol}//${window.location.host}`;
  const target = e.target as HTMLElement;
  const href = target?.closest("a")?.href || "";
  const hash = new URL(href).hash;

  const hrefWithoutAnchor = href.replace(hash, "");
  const locationWithoutAnchor = window.location.href.replace(
    window.location.hash,
    ""
  );

  if (hrefWithoutAnchor === locationWithoutAnchor || !href.startsWith(start)) {
    hideLinkPreview();
    return;
  }

  const text = await fetch(href).then((x) => x.text());
  const doc = new DOMParser().parseFromString(text, "text/html");
  const content = (doc.querySelector(".sl-markdown-content") as HTMLElement)
  ?.outerHTML;
  tooltip.innerHTML = content;
  tooltip.style.display = "block";

  let offsetTop = 0;
  if (hash !== "") {
    const heading = tooltip.querySelector(hash) as HTMLElement | null;
    if (heading) offsetTop = heading.offsetTop;
  }
  tooltip.scroll({ top: offsetTop, behavior: "instant" });

  computePosition(target, tooltip, {
    middleware: [offset(10), autoPlacement()],
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}

const events = [
  ["mouseenter", showLinkPreview],
  ["mouseleave", hideLinkPreview],
  ["focus", showLinkPreview],
  ["blur", hideLinkPreview],
] as const;

Array.from(elements).forEach((element) => {
  events.forEach(([event, listener]) => {
    element.addEventListener(event, listener);
  });
});
