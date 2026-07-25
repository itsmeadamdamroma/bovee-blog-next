import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-navy-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-navy-700" />
          <span className="font-serif text-lg font-bold text-navy-900">
            Bovée <span className="gradient-gold">&</span> Thill
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {['Blog', 'Tools', 'About', 'Textbooks'].map((item) => (
            <Link
              key={item}
              href={item === 'Blog' ? '/blog' : item === 'Tools' ? '/tools' : `/${item.toLowerCase()}`}
              className="text-sm font-medium text-navy-600 transition-colors hover:text-navy-900"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/blog"
            className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-800 hover:shadow-xl"
          >
            Read the Blog
          </Link>
        </div>
      </nav>
    </header>
  );
}