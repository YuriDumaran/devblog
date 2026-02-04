import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  const formattedDate = new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
    new Date(post.publishedAt)
  );

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Read ${post.title}`}
    >
      <article className="group rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-2xl shadow-slate-950/40 transition hover:-translate-y-0.5 hover:border-accent/60">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{formattedDate}</p>
          <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
          <p className="text-sm text-slate-400">{post.subtitle}</p>
        </header>
        <p className="mt-4 text-slate-300">{post.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800/70 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
