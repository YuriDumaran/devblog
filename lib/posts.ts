import fs from 'node:fs';
import path from 'node:path';
import type { ReactElement } from 'react';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export type PostFrontmatter = {
  title: string;
  subtitle: string;
  summary: string;
  publishedAt: string;
  tags: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type PostWithContent = {
  meta: PostMeta;
  content: ReactElement;
};

export async function getPostBySlug(slug: string): Promise<PostWithContent> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const source = await fs.promises.readFile(filePath, 'utf8');

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    meta: {
      ...frontmatter,
      slug,
    },
    content,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), 'utf8');
      const { data } = matter(raw);
      return {
        ...(data as PostFrontmatter),
        slug,
      } satisfies PostMeta;
    })
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getSiblingPosts(slug: string) {
  const posts = getAllPostsMeta();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}
