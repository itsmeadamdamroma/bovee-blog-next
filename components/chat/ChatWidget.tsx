'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Loader2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string;
  mode?: string;
}

const suggestions = [
  'What is business communication?',
  'AI in business communication',
  'Teaching resources',
  'Latest textbook edition',
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "👋 Welcome! I'm the Bovée & Thill blog assistant. Ask me anything about business communication education or our articles!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      let reply = data.reply || "Sorry, I couldn't process that. Please try again.";
      if (data.sources) {
        reply += '\n\n📖 **Related articles:**';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          sources: data.sources,
          mode: data.mode,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const extractSlugs = (sources?: string): string[] => {
    if (!sources) return [];
    const slugs: string[] = [];
    const regex = /URL: \/blog\/([^\s\n]+)/g;
    let match;
    while ((match = regex.exec(sources)) !== null) {
      slugs.push(match[1]);
    }
    return [...new Set(slugs)].slice(0, 3);
  };

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all ${
          open
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 hover:bg-navy-800 dark:hover:bg-gold-400'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 shadow-2xl"
            style={{ height: 'min(600px, 80vh)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-navy-900 dark:bg-navy-800 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold-400" />
                <span className="text-sm font-semibold">Ask Bovée & Thill</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex max-w-[85%] gap-2 ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'user'
                          ? 'bg-navy-100 dark:bg-navy-700'
                          : 'bg-gold-100 dark:bg-gold-500/20'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-3.5 w-3.5 text-navy-600 dark:text-navy-300" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                            : 'bg-navy-50 dark:bg-navy-700/50 text-navy-700 dark:text-navy-200'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>

                        {/* Source links */}
                        {extractSlugs(msg.sources).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {extractSlugs(msg.sources).map((slug) => (
                              <Link
                                key={slug}
                                href={`/blog/${slug}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 rounded-full bg-white/20 dark:bg-navy-600/50 px-2.5 py-1 text-[11px] font-medium hover:bg-white/30 dark:hover:bg-navy-500/50 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {slug.slice(0, 30)}...
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-navy-50 dark:bg-navy-700/50 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-navy-400" />
                    <span className="text-sm text-navy-400">Searching blog...</span>
                  </div>
                </div>
              )}

              {/* Suggestions (only first message) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-navy-200 dark:border-navy-600 px-3 py-1.5 text-xs text-navy-500 dark:text-navy-300 hover:border-navy-400 dark:hover:border-navy-400 hover:text-navy-700 dark:hover:text-white transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-navy-100 dark:border-navy-700 px-4 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about business communication..."
                  disabled={loading}
                  className="flex-1 rounded-xl border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-700 px-4 py-2.5 text-sm text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center rounded-xl bg-navy-900 dark:bg-gold-500 px-3 text-white dark:text-navy-900 hover:bg-navy-800 dark:hover:bg-gold-400 transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-1.5 text-[10px] text-navy-300 dark:text-navy-500 text-center">
                AI-powered search of our blog content
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
