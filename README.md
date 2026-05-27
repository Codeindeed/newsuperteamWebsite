# Superteam Nigeria Website

React, TypeScript, and Vite website for Superteam Nigeria. The site includes the homepage, product showcase, events calendar, gallery, blog/news cards, and shared layout components.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
npm run dev
```

The local dev server usually runs at `http://localhost:5173`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Use `npm run lint` and `npm run build` before pushing production-facing changes.

## Project Structure

- `src/components`: shared UI components such as buttons, header, cursor, and text effects.
- `src/pages/home/layouts`: homepage sections for hero, products, GDP, events, blog, gallery, and footer.
- `src/pages/gallery`: standalone gallery page, media data, filters, preview modal, and gallery controls.
- `src/assets`: local images, icons, logos, product images, gallery media, and graphics.
- `src/data`: shared content and image registries.
- `src/layouts`: app-level layout helpers, including the vertical scroll container.

## Content Updates

- Products: update `src/pages/home/layouts/products/data.ts` and place new images in `src/assets/products`.
- Events: update `src/pages/home/layouts/events/data.ts`. Recurring calls, one-off events, and Luma events are intentionally grouped separately.
- Gallery: update `src/pages/gallery/data.ts` and add gallery media to `src/assets/gallery`.
- News/blog cards: update the blog layout data in `src/pages/home/layouts/blog`.
- Footer/header links: update the matching layout component in `src/pages/home/layouts/footer` or `src/components/header`.

## Asset Notes

Keep images web-ready before committing. Product and gallery assets should be sized for their on-page use, with the same filenames preserved when replacing an existing image.
