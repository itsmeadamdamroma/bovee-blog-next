"use client";

import { Hero } from '@/components/ui/Hero';
import { PostCard } from '@/components/blog/PostCard';
import { StaggerContainer, StaggerItem, FadeInUp } from '@/components/ui/animations';
import { getFeaturedPosts, getAllPosts, getAllCategories } from '@/lib/posts';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featured = getFeaturedPosts();
  const recent = getAllPosts().slice(0, 6);
  const categories = getAllCategories();

  return (
    <>
      <Hero />

      {/* Featured Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <FadeInUp>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-navy-900">
                Featured Articles
              </h2>
              <p className="mt-1 text-navy-400">
                Deep dives into business communication education
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:gap-2 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInUp>

        <StaggerContainer>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((post, i) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} index={i} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* Categories */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <h2 className="mb-8 text-center font-serif text-3xl font-bold text-navy-900">
              Explore by Topic
            </h2>
          </FadeInUp>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link
                  href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-navy-700 shadow-sm ring-1 ring-navy-100 transition-all hover:bg-navy-900 hover:text-white hover:ring-navy-900"
                >
                  {cat}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 md:p-12"
        >
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative">
            <Sparkles className="mb-4 h-8 w-8 text-gold-400" />
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
              48+ AI-Powered Teaching Tools
            </h2>
            <p className="mt-4 max-w-2xl text-navy-200">
              From Syllabus Builders to Communication Risk Radars, our AI tools help
              educators create engaging, modern business communication courses.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 font-semibold text-navy-900 shadow-xl transition-all hover:bg-gold-400"
              >
                Explore the Toolkit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Textbooks */}
      <section className="mb-16 mx-auto max-w-6xl px-4">
        <FadeInUp>
          <h2 className="mb-8 font-serif text-3xl font-bold text-navy-900">
            Pearson Textbooks
          </h2>
        </FadeInUp>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Business Communication Today', edition: '16th Edition', desc: 'The #1 business communication textbook, now with AI integration' },
            { title: 'Excellence in Business Communication', edition: 'Latest', desc: 'Excellence frameworks and modern communication practices' },
            { title: 'Business in Action', edition: 'Latest', desc: 'Active learning with real-world scenarios and industry cases' },
          ].map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-50 transition-all hover:shadow-xl"
            >
              <div className="mb-4 h-40 rounded-lg bg-gradient-to-br from-navy-100 to-navy-200" />
              <h3 className="font-serif text-lg font-bold text-navy-900">{book.title}</h3>
              <p className="text-sm font-medium text-gold-600">{book.edition}</p>
              <p className="mt-2 text-sm text-navy-400">{book.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}