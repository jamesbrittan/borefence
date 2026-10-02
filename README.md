# BoreFence Website

Website for Bore Fence, built with React and Vite.

## Tech Stack

- React
- Vite
- Styled Components
- React Router
- Vitest + React Testing Library

## Development

Requires Node 22 (see `.nvmrc`).

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (once, or in watch mode)
npm test
npm run test:watch

# Lint
npm run lint

# Build for production
npm run build
```

## Deployment

This site is deployed on Netlify. The `main` branch is automatically deployed when changes are pushed, and every pull request gets a deploy preview.

### Build Settings
- Build command: `npm test && npm run build` (a failing test stops the deploy)
- Publish directory: `dist`
- Node version: 22 (set in `netlify.toml`)

### Services and gallery photos
Every Service (Fencing, Railings, …) is defined once in `src/catalogue/services.jsx`. The menu, hero links, `/services/<slug>` pages and galleries all come from there.
- **Add a gallery photo:** put the file in the Service's `imageFolder` under `public/assets/images/`, then add `{ file, alt }` to its `gallery` list. A test fails if a file is on disk but not listed, or listed but missing.
- **Add a Service:** add an entry with a new `slug`. No other files need changing.

### Images
Put image files in `public/assets/images/` and reference them through `src/images` (`imageSrc(path, { width })` or `<Img path widths sizes alt />`), never by hard-coded URL. On Netlify (`VITE_IMAGE_CDN=netlify`, set in `netlify.toml`), they're resized and served as WebP/AVIF by the Netlify Image CDN. Locally, plain files are used.

### Quote requests
The quote form submits to Netlify Forms (form name `contact`). Email notifications for new submissions are set up in the Netlify dashboard under **Site configuration → Forms → Form notifications**, not in code.

## Project docs

- `CONTEXT.md`: domain glossary (what we mean by Service, Quote request, …)
- `docs/adr/`: architecture decision records
- Work is tracked in GitHub issues
