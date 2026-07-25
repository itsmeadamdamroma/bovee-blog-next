import { posts, type Post } from './posts-data';

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.categories.includes(category)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  posts.forEach((p) => p.categories.forEach((c) => cats.add(c)));
  return Array.from(cats).sort();
}

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const sorted = getAllPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: index < sorted.length - 1 ? sorted[index + 1] : null,
    next: index > 0 ? sorted[index - 1] : null,
  };
}