'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, Clock, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const posts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    let result = posts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (activeCategory) {
      result = result.filter((p) => p.categories.includes(activeCategory));
    }

    return result;
  }, [posts, search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(0, page * perPage);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl font-bold md:text-6xl">
              Business Communication Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-navy-200 text-lg">
              Insights, analysis, and teaching resources from Bovée & Thill —
              authors of the world&apos;s leading business communication textbooks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="sticky top-16 z-40 border-b border-navy-100 dark:border-navy-700 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-xl border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-800 py-2.5 pl-10 pr-4 text-sm text-navy-900 dark:text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => { setActiveCategory(null); setPage(1); }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  !activeCategory
                    ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                    : 'bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setPage(1); }}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                      : 'bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-navy-300 dark:text-navy-600 mb-4" />
            <p className="text-lg font-medium text-navy-600 dark:text-navy-300">
              No articles found
            </p>
            <p className="text-sm text-navy-400 mt-1">Try a different search term or category</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paged.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Image */}
                    {post.image && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-navy-50 dark:bg-navy-700">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-5">
                      {/* Categories */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-gold-50 dark:bg-gold-500/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-700 dark:text-gold-300"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300 line-clamp-2">
                        {post.excerpt.replace(/<[^>]+>/g, '').slice(0, 150)}...
                      </p>

                      {/* Meta */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-navy-400 dark:text-navy-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Load more */}
            {paged.length < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy-900 dark:bg-gold-500 px-6 py-3 text-sm font-semibold text-white dark:text-navy-900 hover:bg-navy-800 dark:hover:bg-gold-400 transition-all"
                >
                  Load More Articles
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-2 text-xs text-navy-400">
                  Showing {paged.length} of {filtered.length} articles
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
