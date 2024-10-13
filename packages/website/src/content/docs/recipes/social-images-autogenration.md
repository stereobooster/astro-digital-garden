---
title: Social images autogeneration
tags: [component]
description: Automatically generate social images, aka Open Graph images and X/Twitter cards
---

**Aka** [Open Graph](https://ogp.me/) images and [X/Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) images.

## Options

The basic idea is to create an HTML or SVG "image" for a page based on metadata, such as `title`, `description`, `tags`, etc. Then, convert it to a raster image. There are several options:

- [Satori](https://github.com/vercel/satori)
- [CanvasKit - Skia](https://skia.org/docs/user/modules/canvaskit/)
- [resvg-js](https://github.com/yisibl/resvg-js)
- Headless browsers

### Satori

- Example in [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus/blob/main/src/pages/og-image/%5Bslug%5D.png.ts)
- Example in [astro-paper](https://github.com/satnaing/astro-paper/pull/15/files)

### CanvasKit

- [Astro OG Canvas](https://github.com/delucis/astro-og-canvas)

## Installation

[Full instructions for Astro OG Canvas](https://hideoo.dev/notes/starlight-og-images)

## Related

- [[seo-and-smo-meta-tags]]
- [MetaTags.io](https://metatags.io/)

## Further Improvements

The current implementation looks boring. Maybe I can:

- [ ] Generate a gradient based on tag colors
- Use "cover" images from some pages in social images, although all of them are SVGs
- It seems that `Astro OG Canvas` doesn't support emojis
- Add a logo
