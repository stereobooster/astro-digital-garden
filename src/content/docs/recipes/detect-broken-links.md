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
bdb.on("*", (_action, opts) => {
  if (opts) {
    opts.document
      .unresolvedLinks()
      .forEach((link) =>
        console.log(
          `Unresolved link: ${link
            .from()
            .path()}:${link.line()}:${link.column()}`
        )
      );
  }
});
```