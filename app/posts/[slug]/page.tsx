import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getPostSlugs, getSiblingPosts } from '@/lib/posts';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { meta } = await getPostBySlug(params.slug);
  return {
    title: `${meta.title} | devblog`,
    description: meta.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { meta, content } = await getPostBySlug(params.slug);
  const { previous, next } = getSiblingPosts(meta.slug);

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8">
      <BackLink />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
            new Date(meta.publishedAt)
          )}
        </p>
        <h1 className="text-4xl font-semibold text-white">{meta.title}</h1>
        <p className="text-slate-400">{meta.subtitle}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {meta.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-800 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-invert max-w-none text-lg">
        {content}
      </div>
      <PostNavigator previous={previous} next={next} />
      <BackLink />
    </article>
  );
}

function BackLink() {
  return (
    <div className="flex justify-start">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent hover:text-white"
      >
        <span aria-hidden>←</span>
        Back to feed
      </Link>
    </div>
  );
}

function PostNavigator({
  previous,
  next,
}: {
  previous: ReturnType<typeof getSiblingPosts>['previous'];
  next: ReturnType<typeof getSiblingPosts>['next'];
}) {
  return (
    <div className="flex flex-col gap-4 border-y border-slate-800 py-6 md:flex-row md:items-start md:justify-between">
      <NavigatorCard label="Previous" direction="previous" post={previous} />
      <NavigatorCard label="Next" direction="next" post={next} />
    </div>
  );
}

function NavigatorCard({
  label,
  direction,
  post,
}: {
  label: string;
  direction: 'previous' | 'next';
  post: ReturnType<typeof getSiblingPosts>['previous'];
}) {
  if (!post) {
    return (
      <div className="flex-1 rounded-2xl border border-dashed border-slate-800/70 bg-slate-900/30 p-4 text-sm text-slate-500">
        No {label.toLowerCase()} post yet.
      </div>
    );
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="flex-1 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 transition hover:border-accent"
    >
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{post.title}</p>
      <p className="text-sm text-slate-400">{post.subtitle}</p>
      <p className="mt-1 text-xs text-slate-500">
        {direction === 'previous' ? '← Earlier entry' : 'Next entry →'}
      </p>
    </Link>
  );
}
