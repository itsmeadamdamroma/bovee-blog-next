import Link from 'next/link';
import { BookOpen, Mail, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-gold-400" />
              <span className="font-serif text-lg font-bold text-white">
                Bovée &amp; Thill
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-navy-300">
              Insights and commentary from the authors of the world&apos;s leading
              business communication textbooks, plus complimentary resources for
              classroom use.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-gold-400">Blog</Link></li>
              <li><Link href="/tools" className="hover:text-gold-400">AI Tools</Link></li>
              <li><Link href="/about" className="hover:text-gold-400">About Authors</Link></li>
              <li><Link href="/textbooks" className="hover:text-gold-400">Textbooks</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: 'https://twitter.com/BoveeThill_Blog', label: 'Twitter' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/cbovee', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://www.youtube.com/@BoveeandThill', label: 'YouTube' },
                { icon: Instagram, href: 'https://www.instagram.com/courtlandbovee/', label: 'Instagram' },
                { icon: Mail, href: 'mailto:info@businesscommunicationnetwork.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-300 transition-colors hover:bg-gold-500 hover:text-navy-900"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6 text-center text-xs text-navy-400">
          <p>
            © {new Date().getFullYear()} Bovée &amp; Thill · Business Communication Network ·
            Published by Pearson Education
          </p>
          <p className="mt-1">
            Rebuilt with Next.js + Framer Motion · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}