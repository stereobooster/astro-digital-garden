import "svg-pan-zoom-gesture/css/SvgPanZoomUi.css";
import { SvgPanZoomUi } from "svg-pan-zoom-gesture";

document.querySelectorAll(".svg-pan-zoom").forEach((container) => {
  const element = container.querySelector("svg");
  // @ts-expect-error
  new SvgPanZoomUi({ element, container }).on();
});

// TODO: astro:page-load
// TODO: style svg-pan-zoom buttons https://starlight.astro.build/guides/css-and-tailwind/
// TODO: provide container in HTML, instead of generating it on the fly
document
  .querySelectorAll(
    ".sl-markdown-content > svg:not(.icon)," +
      ".sl-markdown-content > p > svg:not(.icon)," +
      ".sl-markdown-content img[src$='.svg' i]," +
      ".sl-markdown-content img[src$='f=svg' i]," + // for development environment
      ".sl-markdown-content img[src^='data:image/svg+xml']"
  )
  .forEach((element) => {
    const container = document.createElement("figure");
    container.classList.add("svg-pan-zoom", "not-content");
    element.replaceWith(container);
    container.append(element);
    // @ts-expect-error
    new SvgPanZoomUi({ element, container }).on();
  });
