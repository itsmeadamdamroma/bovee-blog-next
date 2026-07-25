"use client";

import { getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Headphones, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { use, useState, useRef } from 'react';

function ListenButton({ text, title }: { text: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleListen = async () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }

    setLoading(true);
    try {
      // Get plain text without HTML tags, limit to first 2000 chars
      const plainText = text.replace(/<[^>]+>/g, '').slice(0, 2000);
      const res = await fetch(`/api/tts?text=${encodeURIComponent(plainText)}&voice=F1`);
      if (!res.ok) throw new Error('TTS failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setPlaying(true);
        audioRef.current.onended = () => { setPlaying(false); URL.revokeObjectURL(url); };
      }
    } catch (err) {
      console.error('TTS error:', err);
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <button
        onClick={handleListen}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-navy-200 dark:border-navy-600 px-4 py-1.5 text-sm font-medium text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-all disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : playing ? (
          <Loader2 className="h-4 w-4 animate-pulse" />
        ) : (
          <Headphones className="h-4 w-4" />
        )}
        {loading ? 'Generating...' : playing ? 'Stop' : 'Listen'}
      </button>
    </>
  );
}

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-navy-400 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6"
      >
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="rounded-md bg-navy-50 px-2 py-1 text-xs font-medium text-navy-600 hover:bg-navy-100"
            >
              {cat}
            </Link>
          ))}
        </div>

        <h1 className="font-serif text-4xl font-bold leading-tight text-navy-900 md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-navy-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
          <ListenButton text={post.content} title={post.title} />
        </div>
      </motion.header>

      {/* Gold divider */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="my-8 h-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose-bovee"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Navigation */}
      <nav className="mt-12 flex justify-between border-t border-navy-100 pt-8">
        {prev && (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-center gap-3 rounded-lg p-3 hover:bg-navy-50"
          >
            <ArrowLeft className="h-5 w-5 text-navy-400 transition-transform group-hover:-translate-x-1" />
            <div>
              <div className="text-xs text-navy-400">Previous</div>
              <div className="font-medium text-navy-900">{prev.title}</div>
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group ml-auto flex items-center gap-3 rounded-lg p-3 text-right hover:bg-navy-50"
          >
            <div>
              <div className="text-xs text-navy-400">Next</div>
              <div className="font-medium text-navy-900">{next.title}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-navy-400 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </nav>
    </article>
  );
}