import "./SvgPanZoomUi.css";
import { SvgPanZoomUi } from "svg-pan-zoom-gesture";

// TODO: astro:page-load
// TODO: style beoe buttons https://starlight.astro.build/guides/css-and-tailwind/
document.querySelectorAll(".beoe").forEach((container) => {
  const element = container.firstElementChild;
  if (!element) return;
  // @ts-expect-error
  new SvgPanZoomUi({ element, container }).on();
});

document
  .querySelectorAll(
    ".sl-markdown-content > img[src$='.svg' i]," +
      ".sl-markdown-content > p > img[src$='.svg' i]," +
      ".sl-markdown-content > img[src$='f=svg' i]," + // for development environment
      ".sl-markdown-content > p > img[src$='f=svg' i]," + // for development environment
      ".sl-markdown-content > img[src^='data:image/svg+xml']," +
      ".sl-markdown-content > p >img[src^='data:image/svg+xml']"
  )
  .forEach((element) => {
    if (element.parentElement?.tagName === "PICTURE") {
      element = element.parentElement;
    }
    const container = document.createElement("figure");
    container.classList.add("beoe", "not-content");
    element.replaceWith(container);
    container.append(element);
    // @ts-expect-error
    new SvgPanZoomUi({ element, container }).on();
  });

// document
//   .querySelectorAll(
//     ".sl-markdown-content > svg:not(.icon)," +
//       ".sl-markdown-content > p > svg:not(.icon)"
//   )
//   .forEach((element) => {
//     const container = document.createElement("figure");
//     container.classList.add("beoe", "not-content");
//     element.replaceWith(container);
//     container.append(element);
//     // @ts-expect-error
//     new SvgPanZoomUi({ element, container }).on();
//   });
