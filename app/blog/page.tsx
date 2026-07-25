"use client";

import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { StaggerContainer, StaggerItem, FadeInUp } from '@/components/ui/animations';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <FadeInUp>
        <h1 className="font-serif text-4xl font-bold text-navy-900">Blog</h1>
        <p className="mt-2 text-navy-400">
          {posts.length} articles on business communication education, AI tools, and teaching strategies.
        </p>
      </FadeInUp>

      <StaggerContainer>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} index={i} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
}