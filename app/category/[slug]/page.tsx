"use client";

import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const allCats = getAllCategories();
  const catName = allCats.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

  if (!catName) notFound();

  const posts = getPostsByCategory(catName);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-900">{catName}</h1>
      <p className="mt-2 text-navy-400">{posts.length} articles</p>

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