import PostFeed from '@/components/PostFeed';
import { getAllPostsMeta } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Latest</p>
        <h1 className="text-4xl font-semibold text-white">Build notes & release logs</h1>
        <p className="text-slate-400">
          Scroll to keep reading—entries stream in automatically without page reloads. Drop new
          files under{' '}
          <code className="mx-1 rounded bg-slate-800 px-2 py-0.5 text-xs">content/posts/*.mdx</code>
          to publish long-form notes with MDX.
        </p>
      </header>
      <PostFeed posts={posts} />
    </section>
  );
}
