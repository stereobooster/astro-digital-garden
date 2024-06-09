// Create some WeakMaps to store the distances to the top and
// bottom of each link
const linkStarts = new WeakMap();
const linkEnds = new WeakMap();
const sectionsMap = new Map();

// TODO: astro:page-load
addIntersectionObserver();
addResizeObserver();

const tags = ["h2", "h3", "h4", "h5"];
function findPreviousSibling(el) {
  let result = [];
  do {
    if (tags.includes(el.tagName.toLowerCase())) result.push(el);
    if (el.previousElementSibling == null) break;
    el = el.previousElementSibling;
    if (result.length > 0 && !tags.includes(el.tagName.toLowerCase())) break;
  } while (el);
  return result;
}

function addIntersectionObserver() {
  const observer = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      const ids =
        sectionsMap.get(section.target)?.ids ||
        findPreviousSibling(section.target).map((h) => h.getAttribute("id"));
      sectionsMap.set(section.target, {
        ids,
        intersectionRatio: section.intersectionRatio,
      });
    });

    const idMap = {};
    [...sectionsMap.values()].forEach(({ ids, intersectionRatio }) => {
      ids.forEach((id) => {
        idMap[id] = (idMap[id] || 0) + intersectionRatio;
      });
    });

    Object.entries(idMap).forEach(([id, intersectionRatio]) => {
      // Get the link to this section's heading
      const link = document.querySelector(`nav.toc-new li a[href="#${id}"]`);
      if (!link) return;

      // Add/remove the .active class based on whether the
      // section is visible
      const addRemove = intersectionRatio > 0 ? "add" : "remove";
      link.classList[addRemove]("active");
    });

    updatePath();
  });

  // Observe all the sections of the article
  document
    .querySelectorAll(".sl-markdown-content > :not(h2, h3, h4, h5)")
    .forEach((section) => {
      observer.observe(section);
    });
}

function addResizeObserver() {
  if (!document.querySelector("nav.toc-new")) return;
  const observer = new ResizeObserver(() => {
    drawPath();
    updatePath();
  });
  observer.observe(document.querySelector("nav.toc-new"));
}

function drawPath() {
  const path = document.querySelector("path.toc-marker");
  const links = Array.from(document.querySelectorAll("nav.toc-new a"));
  if (!links.length || !path) return;

  // Start with an empty array of path data values (joined with
  // spaces later)
  let pathData = [];
  let left = 0; // The last x position / indentation

  // Iterate over each link to build up the pathData
  links.forEach((link, i) => {
    const x = link.offsetLeft;
    const y = link.offsetTop;
    const height = link.offsetHeight;
    if (i === 0) {
      // The top of the first link starts at 0px along the path.
      linkStarts.set(link, 0);
      // Like drawing with a pen...
      // 'M'ove to the top left of the first link,
      // and then draw a 'L'ine to the bottom left
      pathData.push("M", x, y, "L", x, y + height);
    } else {
      // If the current link is indented differently than the last,
      // then come down to the current link's top before moving
      // left or right. This ensures we get 90-degrees angle at the
      // corners.
      if (left !== x) pathData.push("L", left, y);

      // Draw a line to the top left of the current link
      pathData.push("L", x, y);

      // Apply the current path data to the path element
      path.setAttribute("d", pathData.join(" "));

      // Get the total length of the path now that it extends
      // to the top of this link, and store it in our linkStarts
      // WeakMap.
      linkStarts.set(link, path.getTotalLength());

      // Draw a line to the bottom left of the current link
      pathData.push("L", x, y + height);
    }

    // Save the current link's x position to compare with the next
    // link
    left = x;

    // Apply the current path data to the path element again
    path.setAttribute("d", pathData.join(" "));

    // Get the length of the path that now extends to the
    // bottom of this link, and store it in our linkEnds WeakMap.
    linkEnds.set(link, path.getTotalLength());
  });
}

function updatePath() {
  const path = document.querySelector("path.toc-marker");
  const pathLength = path?.getTotalLength();
  const activeLinks = document.querySelectorAll("nav.toc-new a.active");
  if (!activeLinks || !path) return;

  let linkStart = pathLength;
  let linkEnd = 0;
  activeLinks.forEach((link) => {
    // Set linkStart to the top of the earliest active link
    linkStart = Math.min(linkStart, linkStarts.get(link));
    // Set linkEnd to the bottom of the furthest active link
    linkEnd = Math.max(linkEnd, linkEnds.get(link));
  });
  // If there are no active links, hide the path
  path.style.display = activeLinks.length ? "inline" : "none";
  // FINALLY, do the thing!
  path.setAttribute(
    "stroke-dasharray",
    `1 ${linkStart} ${linkEnd - linkStart} ${pathLength}`
  );
}
