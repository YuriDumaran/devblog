import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | devblog',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-4xl font-semibold text-white">About this space</h1>
      <p className="text-slate-300">
        I build opinionated web apps with React, Next.js, and the occasional detour into hardware. This
        blog is intentionally static so it can live anywhere—Firebase Hosting today, maybe a CDN edge
        tomorrow.
      </p>
      <p className="text-slate-300">
        Fork it, remix it, or drop a new{' '}
        <code className="rounded bg-slate-800 px-2 py-0.5">content/posts/your-note.mdx</code> file to
        publish without wiring up a CMS.
      </p>
    </section>
  );
}
