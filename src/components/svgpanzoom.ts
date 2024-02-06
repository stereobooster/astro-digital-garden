import svgPanZoom from "svg-pan-zoom";

try {
  svgPanZoom(".sl-markdown-content :not(.controls) svg", {
    zoomEnabled: true,
    controlIconsEnabled: false,
  });
} catch (e) {}

try {
  svgPanZoom(".sl-markdown-content .controls svg", {
    zoomEnabled: true,
    controlIconsEnabled: true,
  });
} catch (e) {}
