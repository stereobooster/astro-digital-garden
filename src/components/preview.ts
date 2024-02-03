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
  const target = e.target as HTMLElement;
  const href = target?.closest("a")?.href.replace(window.location.origin, '') || "";
  const hrefWithoutAnchor = href.split("#")[0].replace(/\/$/, "");
  const locationWithoutAnchor = window.location.pathname.replace(/\/$/, "");

  if (hrefWithoutAnchor === locationWithoutAnchor || !href.startsWith("/")) {
    hideLinkPreview();
    return;
  }

  const text = await fetch(href).then((x) => x.text());
  const doc = new DOMParser().parseFromString(text, "text/html");
  const h1 = doc.querySelector("h1")?.innerText;
  const content = (doc.querySelector(".sl-markdown-content") as HTMLElement)
    ?.innerHTML;
  tooltip.innerHTML = `<h1>${h1}</h1>${content}`;

  tooltip.style.display = "block";
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
