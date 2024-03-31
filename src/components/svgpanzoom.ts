import "svg-pan-zoom-gesture/css/SvgPanZoomUi.css";
import { SvgPanZoomUi } from "svg-pan-zoom-gesture";

// TODO: astro:page-load
// TODO: style svg-pan-zoom buttons https://starlight.astro.build/guides/css-and-tailwind/
// TODO: provide container in HTML, instead of generating it on the fly
document
  .querySelectorAll(
    ".sl-markdown-content svg:not(.icon):not(.tree-icon), .sl-markdown-content img[src$='.svg' i]"
  )
  .forEach((element) => {
    const container = document.createElement("div");
    container.className = "svg-pan-zoom";
    element.replaceWith(container);
    container.append(element);
    // @ts-expect-error
    new SvgPanZoomUi({ element, container }).on();
  });
