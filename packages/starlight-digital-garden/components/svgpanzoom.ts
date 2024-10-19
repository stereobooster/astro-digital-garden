import "@beoe/pan-zoom/css/PanZoomUi.css";
import { PanZoomUi } from "@beoe/pan-zoom";

// TODO: astro:page-load
document.querySelectorAll(".beoe").forEach((container) => {
  const element = container.firstElementChild;
  if (!element) return;
  new PanZoomUi({
    // @ts-expect-error
    element,
    // @ts-expect-error
    container,
    classes: {
      zoomIn: "pan-zoom-button",
      reset: "pan-zoom-button",
      zoomOut: "pan-zoom-button",
      buttons: "buttons",
      tsWarning: "touchscreen-warning",
      tsWarningActive: "active",
    },
  }).on();
});

// document
//   .querySelectorAll(
//     ".sl-markdown-content img[src$='.svg' i]," +
//       ".sl-markdown-content img[src$='f=svg' i]" // for development environment
//     // ".sl-markdown-content img[src^='data:image/svg+xml']"
//   )
//   .forEach((element) => {
//     if (element.parentElement?.tagName === "PICTURE") {
//       element = element.parentElement;
//     }
//     const container = document.createElement("figure");
//     container.classList.add("beoe", "not-content");
//     element.replaceWith(container);
//     container.append(element);
//     // @ts-expect-error
//     new PanZoomUi({ element, container }).on();
//   });
