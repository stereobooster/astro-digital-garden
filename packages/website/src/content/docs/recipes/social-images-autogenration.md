---
title: Social images autogenration
tags: [component]
description: Automatically generate social image aka open graph images, x/twitter cards
---

**aka** [open graph](https://ogp.me/) images, [x/twitter card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) images

## Options

Basic idea is to create HTML or SVG "image" for page based on metadata, like `title`, `description`, `tags` etc. And then convert it to raster image. There are several options:

- [Satori](https://github.com/vercel/satori)
- [CanvasKit - Skia](https://skia.org/docs/user/modules/canvaskit/)
- [resvg-js](https://github.com/yisibl/resvg-js)
- headless browsers

### Satori

- Example in [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/pages/og-image/%5Bslug%5D.png.ts)
- Example in [astro-paper](https://github.com/satnaing/astro-paper/pull/15/files)

### CanvasKit

- [Astro OG Canvas](https://github.com/delucis/astro-og-canvas)

## Installation

[Full instruction for Astro OG Canvas](https://hideoo.dev/notes/starlight-og-images)

## Related

- [[seo-and-smo-meta-tags]]
- https://metatags.io/

## Further improvements

Current implementation looks boring. Maybe I can:

- [ ] generate gradient based on tag colors
- Some pages have "cover" images. Can I use it in social images? Though in my case all of them are SVGs
- It seems, `Astro OG Canvas` doesn't support emojis
- add logo
