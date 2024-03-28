---
title: Detect broken links
tags: [link]
---

## Installation

### BrainDB

See [[braindb]]

### The rest

```js
// src/lib/braindb.mjs
let unresolvedLinksCount = 0;
bdb.on("*", (action, opts) => {
  if (opts) {
    opts.document.unresolvedLinks().forEach((link) => {
      unresolvedLinksCount++;
      console.log(
        `Unresolved link: ${link.from().path()}:${link.line()}:${link.column()}`
      );
    });
  }
  // fail build if there are broken links
  if (import.meta.env.PROD && action === "ready" && unresolvedLinksCount > 0) {
    process.exit(1);
  }
});
```