"use client";

import { useEffect, useRef, useState } from 'react';
import type { PostMeta } from '@/lib/posts';
import PostCard from './PostCard';

const BATCH_SIZE = 4;

interface PostFeedProps {
  posts: PostMeta[];
}

export default function PostFeed({ posts }: PostFeedProps) {
  const [visibleCount, setVisibleCount] = useState(Math.min(BATCH_SIZE, posts.length));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(BATCH_SIZE, posts.length));
  }, [posts.length]);

  useEffect(() => {
    if (visibleCount >= posts.length) {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, posts.length));
      }
    }, { threshold: 0.4 });

    observer.observe(sentinel);
    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [visibleCount, posts.length]);

  return (
    <div className="space-y-6">
      {posts.slice(0, visibleCount).map((post) => (
        <div key={post.slug}>
          <PostCard post={post} />
        </div>
      ))}
      <div ref={sentinelRef} />
    </div>
  );
}
