# devblog

Basic static blog built with Next.js 14, Tailwind CSS, and MDX entries stored in `content/posts`.

## Getting started

```bash
npm install
npm run dev
```

Add or update any `.mdx` file under `content/posts/` to publish a new entry. Each MDX file supports the front‑matter fields `title`, `subtitle`, `summary`, `publishedAt`, and `tags`. Listings render via `components/PostFeed.tsx`, and full entries live at `/posts/[slug]` with automatic previous/next navigation.

## Docker workflow (no local Node required)

```bash
docker compose up --build
```

The dev server is available at [http://localhost:3000](http://localhost:3000) and hot reloads as you edit files on the host machine.

## Firebase Hosting deploy

1. Build and statically export the site: `npm run static` (outputs to `out/`).
2. Log in to Firebase CLI: `firebase login`.
3. Set your project in `.firebaserc` or run `firebase use <project-id>`.
4. Deploy: `firebase deploy --only hosting`.

The provided `firebase.json` is configured for static hosting via the `out` directory.