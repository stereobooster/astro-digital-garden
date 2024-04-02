import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

const tooltip = document.querySelector("#linkpreview") as HTMLElement;

const elements = document.querySelectorAll(
  ".sl-markdown-content a"
) as NodeListOf<HTMLAnchorElement>;

// response may arrive after cursor left the link
let currentHref: string;
// it is anoying that preview shows up before user ends mouse movement
// if cursor stays long enough above the link - consider it as intentional
let showPreviewTimer: NodeJS.Timeout | undefined;
// if cursor moves out for a short period of time and comes back we should not hide preview
// if cursor moves out from link to preview window we should we should not hide preview
let hidePreviewTimer: NodeJS.Timeout | undefined;

function hideLinkPreview() {
  clearTimeout(showPreviewTimer);
  if (hidePreviewTimer !== undefined) return;
  hidePreviewTimer = setTimeout(() => {
    currentHref = "";
    tooltip.style.display = "";
    hidePreviewTimer = undefined;
  }, 200);
}

function clearTimers() {
  clearTimeout(showPreviewTimer);
  clearTimeout(hidePreviewTimer);
  hidePreviewTimer = undefined;
}

async function showLinkPreview(e: MouseEvent | FocusEvent) {
  const start = `${window.location.protocol}//${window.location.host}`;
  const target = e.target as HTMLElement;
  const hrefRaw = (target?.closest("a")?.href || "") as
    | string
    | SVGAnimatedString;

  let href = "";
  let local = false;
  let hash = "";
  let svg = false;
  if (typeof hrefRaw === "string") {
    href = hrefRaw;
    hash = new URL(href).hash;
    local = href.startsWith(start);
  } else {
    // disabled for now
    // href = hrefRaw.baseVal;
    // hash = new URL(href, window.location.origin).hash;
    // local = href.startsWith("/");
    // svg = true;
  }

  const hrefWithoutAnchor = href.replace(hash, "");
  const locationWithoutAnchor = window.location.href.replace(
    window.location.hash,
    ""
  );

  currentHref = href;
  if (hrefWithoutAnchor === locationWithoutAnchor || !local) {
    hideLinkPreview();
    return;
  }
  clearTimers();

  const text = await fetch(href).then((x) => x.text());
  if (currentHref !== href) return;

  showPreviewTimer = setTimeout(() => {
    if (currentHref !== href) return;
    const doc = new DOMParser().parseFromString(text, "text/html");
    const content = (doc.querySelector(".sl-markdown-content") as HTMLElement)
      ?.outerHTML;
    tooltip.innerHTML = svg
      ? `${doc.querySelector("h1")?.outerHTML}${content}`
      : content;
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
  }, 400);
}

// TODO: astro:page-load
tooltip.addEventListener("mouseenter", clearTimers);
tooltip.addEventListener("mouseleave", hideLinkPreview);

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
