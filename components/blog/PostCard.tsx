'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { type Post } from '@/lib/posts-data';
import { cn, formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  index?: number;
}

export function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-navy-50 transition-all hover:shadow-2xl hover:ring-gold-200',
        featured && 'md:col-span-2 md:row-span-2'
      )}
    >
      {/* Image */}
      {post.image && (
        <div className={cn('relative overflow-hidden', featured ? 'h-72' : 'h-52')}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
          {post.featured && (
            <span className="absolute top-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
              ★ Featured
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-md bg-navy-50 px-2 py-1 text-xs font-medium text-navy-600"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={cn(
              'font-serif font-bold text-navy-900 transition-colors group-hover:text-navy-700',
              featured ? 'text-2xl' : 'text-lg'
            )}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-2 text-sm text-navy-400">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-navy-300">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        {/* Read more */}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 flex items-center gap-1 text-sm font-semibold text-teal-600 transition-all group-hover:gap-2"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Gold accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold-400 to-gold-500"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}