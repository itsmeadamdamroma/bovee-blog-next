import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Script from 'next/script';

export const metadata = {
  title: {
    default: 'Bovée & Thill — Business Communication Blog',
    template: '%s | Bovée & Thill',
  },
  description:
    'Expert insights on business communication education, AI-powered teaching tools, and resources for modern educators from the authors of Business Communication Today.',
  keywords: [
    'business communication',
    'business education',
    'Bovée',
    'Thill',
    'communication skills',
    'AI in education',
    'teaching resources',
    'Pearson education',
  ],
  authors: [{ name: 'Bovée & Thill' }],
  openGraph: {
    title: 'Bovée & Thill — Business Communication Blog',
    description:
      'Expert insights on business communication education, AI-powered teaching tools, and resources for modern educators.',
    url: 'https://bovee-blog-next.vercel.app',
    siteName: 'Bovée & Thill',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bovée & Thill — Business Communication Blog',
    description:
      'Expert insights on business communication education from the world\'s leading textbook authors.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="application/rss+xml" title="Bovée & Thill Blog RSS" href="/feed.xml" />
        {/* Prevent FOUC with dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const dark = localStorage.getItem('darkMode') === 'true';
                if (dark) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
