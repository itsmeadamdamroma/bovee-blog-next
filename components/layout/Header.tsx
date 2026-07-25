'use client';

import Link from 'next/link';
import { BookOpen, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Blog', href: '/blog' },
  { label: 'Tools', href: '/tools' },
  { label: 'Textbooks', href: '/textbooks' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl shadow-sm dark:shadow-navy-800/50'
          : 'bg-white dark:bg-navy-900'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="h-7 w-7 text-navy-700 dark:text-gold-400 transition-colors group-hover:text-gold-500" />
          <span className="font-serif text-lg font-bold text-navy-900 dark:text-white">
            Bovée <span className="text-gold-500">&</span> Thill
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-navy-600 dark:text-navy-300 transition-all hover:text-navy-900 dark:hover:text-white relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-gold-500 after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}

          {/* Search */}
          <Link
            href="/blog"
            className="rounded-full p-2 text-navy-400 hover:text-navy-600 dark:text-navy-400 dark:hover:text-white transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="rounded-full p-2 text-navy-400 hover:text-navy-600 dark:text-navy-400 dark:hover:text-gold-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/blog"
            className="rounded-lg bg-navy-900 dark:bg-gold-500 px-4 py-2 text-sm font-semibold text-white dark:text-navy-900 shadow-lg shadow-navy-900/20 dark:shadow-gold-500/20 transition-all hover:bg-navy-800 dark:hover:bg-gold-400"
          >
            Read the Blog
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDark}
            className="rounded-full p-2 text-navy-400 hover:text-navy-600 dark:text-navy-400 dark:hover:text-gold-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-navy-700 dark:text-white hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-900 md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-navy-900 dark:bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-white dark:text-navy-900 mt-3"
              >
                Read the Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
