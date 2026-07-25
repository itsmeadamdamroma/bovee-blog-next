"use client";
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Mail, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-4xl font-bold text-navy-900">
          About the Authors
        </h1>
        <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid gap-8 md:grid-cols-2"
      >
        {/* Bovée */}
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-50">
          <div className="mb-4 h-48 rounded-xl bg-gradient-to-br from-navy-100 to-navy-200" />
          <h2 className="font-serif text-2xl font-bold text-navy-900">Courtland L. Bovée</h2>
          <p className="text-sm font-medium text-gold-600">Professor & Textbook Author</p>
          <p className="mt-4 text-sm text-navy-400">
            Co-author of Business Communication Today, Excellence in Business Communication,
            and Business in Action. Leading voice in business communication education
            with a focus on AI integration and modern pedagogy.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://www.linkedin.com/in/cbovee" className="text-navy-400 hover:text-navy-900">LinkedIn</a>
            <a href="https://www.instagram.com/courtlandbovee/" className="text-navy-400 hover:text-navy-900">Instagram</a>
          </div>
        </div>

        {/* Thill */}
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-50">
          <div className="mb-4 h-48 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200" />
          <h2 className="font-serif text-2xl font-bold text-navy-900">John V. Thill</h2>
          <p className="text-sm font-medium text-gold-600">Professor & Textbook Author</p>
          <p className="mt-4 text-sm text-navy-400">
            Co-author of the world&apos;s leading business communication textbooks.
            Dedicated to advancing communication education through practical,
            real-world examples and cutting-edge AI tools.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {[
          { icon: BookOpen, value: '3', label: 'Textbooks' },
          { icon: Award, value: '16th', label: 'Edition' },
          { icon: GraduationCap, value: '48+', label: 'AI Tools' },
          { icon: Users, value: '1M+', label: 'Students Reached' },
        ].map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-navy-50 p-6 text-center"
          >
            <Icon className="mx-auto mb-2 h-6 w-6 text-gold-500" />
            <div className="font-serif text-2xl font-bold text-navy-900">{value}</div>
            <div className="text-xs text-navy-400">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}