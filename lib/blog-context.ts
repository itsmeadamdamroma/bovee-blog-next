import { getAllPosts } from './posts';

export interface BlogContext {
  posts: { title: string; slug: string; content: string; categories: string[] }[];
}

export function getBlogContext(): BlogContext {
  const posts = getAllPosts().map((p) => ({
    title: p.title,
    slug: p.slug,
    content: p.content.replace(/<[^>]+>/g, '').slice(0, 3000),
    categories: p.categories,
  }));
  return { posts };
}

export function searchBlogContext(query: string): string {
  const { posts } = getBlogContext();
  const q = query.toLowerCase();

  // Score each post by relevance
  const scored = posts.map((post) => {
    let score = 0;
    const titleMatch = post.title.toLowerCase().includes(q) ? 10 : 0;
    const contentMatch = post.content.toLowerCase().includes(q) ? 5 : 0;
    const catMatch = post.categories.some((c) => c.toLowerCase().includes(q)) ? 3 : 0;

    // Keyword matching
    const keywords = q.split(/\s+/);
    const kwMatch = keywords.filter((kw) => post.content.toLowerCase().includes(kw)).length;

    score = titleMatch + contentMatch + catMatch + kwMatch;
    return { ...post, score };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 5).filter((p) => p.score > 0);

  if (top.length === 0) {
    return '';
  }

  return top
    .map(
      (p) =>
        `---\nTitle: ${p.title}\nURL: /blog/${p.slug}\nCategories: ${p.categories.join(', ')}\nExcerpt: ${p.content.slice(0, 500)}...`
    )
    .join('\n\n');
}
