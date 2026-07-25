import Link from 'next/link';
import { BookOpen, Rss } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-navy-100 dark:border-navy-700 bg-navy-50 dark:bg-navy-800/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-navy-700 dark:text-gold-400" />
              <span className="font-serif text-base font-bold text-navy-900 dark:text-white">
                Bovée <span className="text-gold-500">&</span> Thill
              </span>
            </Link>
            <p className="mt-3 text-sm text-navy-500 dark:text-navy-300 leading-relaxed">
              Authors of Business Communication Today, the world&apos;s leading
              business communication textbook, now in its 16th edition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-navy-900 dark:text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'AI Tools', href: '/tools' },
                { label: 'Textbooks', href: '/textbooks' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-500 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-navy-900 dark:text-white uppercase tracking-wider">
              Topics
            </h4>
            <ul className="space-y-2">
              {['Business Communication', 'Education', 'AI & Technology'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="text-sm text-navy-500 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-navy-900 dark:text-white uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/feed.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-navy-500 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors"
                >
                  <Rss className="h-4 w-4 text-gold-500" />
                  RSS Feed
                </a>
              </li>
              <li className="text-sm text-navy-400 dark:text-navy-400">
                Published by Pearson Education
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-100 dark:border-navy-700 pt-6 text-center text-xs text-navy-400 dark:text-navy-400">
          <p>
            © {new Date().getFullYear()} Bovée & Thill · Business Communication
            Network · Published by Pearson Education
          </p>
          <p className="mt-1">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
