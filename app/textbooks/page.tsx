"use client";
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

const textbooks = [
  {
    title: 'Business Communication Today',
    edition: '16th Edition',
    desc: 'The #1 business communication textbook, now with integrated AI tools, real-world case studies, and digital-first pedagogy.',
    features: ['AI integration throughout', '19 chapters covering all aspects', '48+ companion AI tools', 'Real-world case studies'],
    color: 'from-navy-100 to-navy-200',
    link: 'https://blog.businesscommunicationnetwork.com/business-communication-today-16th-edition/',
  },
  {
    title: 'Excellence in Business Communication',
    edition: 'Latest Edition',
    desc: 'Excellence frameworks and modern communication practices for the digital workplace.',
    features: ['Excellence framework', 'Digital communication focus', 'Neuroscience-based learning', 'Engaging case studies'],
    color: 'from-gold-100 to-gold-200',
    link: 'https://blog.businesscommunicationnetwork.com/excellence-in-business-communication-transforming-business-communication-education/',
  },
  {
    title: 'Business in Action',
    edition: 'Latest Edition',
    desc: 'Active learning with real-world scenarios and industry cases.',
    features: ['Active learning approach', 'Industry case studies', 'Scenario-based learning', 'Practical application'],
    color: 'from-teal-100 to-teal-200',
    link: 'https://blog.businesscommunicationnetwork.com/engaging-minds-inspiring-success-why-excellence-in-business-communication-is-the-right-choice-for-your-course/',
  },
];

export default function TextbooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-navy-700" />
          <h1 className="font-serif text-4xl font-bold text-navy-900">Textbooks</h1>
        </div>
        <p className="mt-2 text-navy-400">Published by Pearson Education</p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {textbooks.map((book, i) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-navy-50 transition-all hover:shadow-2xl"
          >
            <div className={`h-48 bg-gradient-to-br ${book.color} flex items-center justify-center`}>
              <span className="font-serif text-6xl font-bold text-white/30">{book.edition.split(' ')[0]}</span>
            </div>
            <div className="p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900">{book.title}</h2>
              <p className="text-sm font-medium text-gold-600">{book.edition}</p>
              <p className="mt-3 text-sm text-navy-400">{book.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {book.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-navy-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={book.link}
                target="_blank"
                className="mt-6 flex items-center gap-1 text-sm font-semibold text-teal-600 transition-all hover:gap-2"
              >
                Learn more <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}