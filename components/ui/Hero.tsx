'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, GraduationCap, Zap } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundImage: [
            'radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #0d9488 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, #fbbf24 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-4 py-2 text-sm font-medium text-gold-300 ring-1 ring-gold-500/30"
          >
            <Sparkles className="h-4 w-4" />
            Authors of Business Communication Today · 16th Edition
          </motion.div>

          {/* Title */}
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bovée
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="gradient-gold"
            >
              &
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Thill
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-navy-200 md:text-xl"
          >
            Expert insights on business communication education, AI-powered teaching
            tools, and resources for modern educators from the world&apos;s leading
            textbook authors.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 font-semibold text-navy-900 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400"
              >
                <BookOpen className="h-5 w-5" />
                Explore the Blog
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tools"
                className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-white/20"
              >
                <Zap className="h-5 w-5" />
                AI Teaching Tools
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-12"
          >
            {[
              { icon: BookOpen, value: '3', label: 'Textbooks' },
              { icon: GraduationCap, value: '48+', label: 'AI Tools' },
              { icon: Zap, value: '16th', label: 'Edition' },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <Icon className="mx-auto mb-2 h-6 w-6 text-gold-400" />
                <div className="font-serif text-3xl font-bold text-white">{value}</div>
                <div className="text-sm text-navy-300">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z"
            fill="#fafafa"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </section>
  );
}