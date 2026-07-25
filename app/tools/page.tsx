"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Zap } from 'lucide-react';

const toolCategories = [
  {
    title: 'AI Writing & Assessment',
    tools: [
      { name: 'Communication Risk Radar', desc: 'Identify communication risks in business scenarios', url: 'https://files.businesscommunicationnetwork.com/tools/communication_risk_radar.html' },
      { name: 'Ethics in Action (Instructor)', desc: 'Teach ethics through interactive scenarios', url: 'https://files.businesscommunicationnetwork.com/tools/ethics-in-action-instructor.html' },
      { name: 'Ethics in Action (Student)', desc: 'Student-facing ethics practice tool', url: 'https://files.businesscommunicationnetwork.com/tools/ethics-in-action-student.html' },
    ],
  },
  {
    title: 'Course Management',
    tools: [
      { name: 'Syllabus Builder', desc: 'Build your business communication syllabus in minutes', url: 'https://files.businesscommunicationnetwork.com/tools/syllabus_builder.html' },
      { name: 'Syllabus Stress Test', desc: 'Test your syllabus for gaps and improvements', url: 'https://files.businesscommunicationnetwork.com/tools/syllabus_stress_test.html' },
      { name: 'Accreditation Risk Scorecard', desc: 'Ensure accreditation compliance', url: 'https://files.businesscommunicationnetwork.com/tools/accreditation_risk_scorecard.html' },
      { name: 'Chair-Ready Course Defense Brief', desc: 'Prepare your course for review', url: 'https://files.businesscommunicationnetwork.com/tools/chair_ready_defense_brief.html' },
    ],
  },
  {
    title: 'Student Engagement',
    tools: [
      { name: 'Participation & Engagement Tracker', desc: 'Track student participation in real-time', url: 'https://files.businesscommunicationnetwork.com/tools/student-participation-engagement-tracker.html' },
      { name: 'Real-World Scenario Generator', desc: 'Generate realistic business scenarios', url: 'https://files.businesscommunicationnetwork.com/tools/scenario_generator.html' },
      { name: 'Applied Learning Activities', desc: 'Hands-on learning activities', url: 'https://files.businesscommunicationnetwork.com/tools/applied_learning_activities.html' },
      { name: 'Certificate & Digital Badge Generator', desc: 'Award students with certificates', url: 'https://files.businesscommunicationnetwork.com/tools/cert_generator_student_only.html' },
    ],
  },
  {
    title: 'AI-Powered Labs',
    tools: [
      { name: 'NeuroOptimized Learning Lab', desc: 'Neuroscience-based learning optimization', url: 'https://files.businesscommunicationnetwork.com/tools/neurooptimized-lab.html' },
      { name: 'Teaching Accelerator Assistant', desc: 'AI concierge for instructors', url: 'https://files.businesscommunicationnetwork.com/tools/bct16-instructor-concierge.html' },
      { name: 'Textbook Assistant', desc: 'AI assistant for textbook content', url: 'https://files.businesscommunicationnetwork.com/tools/bct16-textbook-assistant.html' },
      { name: 'Prompt Engineer Instructor Lab', desc: 'Learn prompt engineering for education', url: 'https://files.businesscommunicationnetwork.com/tools/prompt-engineer-lab.htm' },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-gold-500" />
          <h1 className="font-serif text-4xl font-bold text-navy-900">AI Teaching Tools</h1>
        </div>
        <p className="mt-2 max-w-2xl text-navy-400">
          48+ AI-powered tools for business communication educators. Built to enhance
          teaching, engage students, and streamline course management.
        </p>
      </motion.div>

      <div className="mt-12 space-y-12">
        {toolCategories.map((category, ci) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
          >
            <h2 className="mb-6 font-serif text-2xl font-bold text-navy-900">
              {category.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool, ti) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.05 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={tool.url}
                    target="_blank"
                    className="group block rounded-2xl bg-white p-6 shadow-md ring-1 ring-navy-50 transition-all hover:shadow-xl hover:ring-gold-200"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-navy-700">
                        {tool.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-navy-300 transition-colors group-hover:text-gold-500" />
                    </div>
                    <p className="mt-2 text-sm text-navy-400">{tool.desc}</p>
                    <div className="mt-4 h-1 w-full rounded-full bg-navy-50">
                      <motion.div
                        className="h-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}