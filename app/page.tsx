'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, MessageSquare, X, Minimize2 } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import PromptCards from './components/PromptCards';
import { powerPrompts } from './data/powerPrompts';
import ThirdPartyCard from './components/ThirdPartyCard';
import { codexSources, type CodexSource } from './data/codexSources';

/**
 * Deep Dive on Codex — prototype landing page
 * --------------------------------------------------
 * – Built with **shadcn/ui**, Tailwind CSS, Next.js 14 (app router)
 * – Direct OpenAI integration for Codex research assistance
 * – Chat overlay that enhances SEO content instead of hiding it
 * – Sections:
 *     1. Nav    → lightweight faux-OpenAI left rail & header
 *     2. Hero  → central prompt box (chat input)
 *     3. Content → always visible prompt cards & articles (SEO gold)
 *     4. Chat  → bottom-anchored overlay that doesn't hide content
 *
 * How back-end wiring works:
 *     • POST /api/chat → OpenAI GPT-4o-mini with embedded Codex intelligence
 */

export default function DeepDiveCodex() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<'closed' | 'minimized' | 'open'>(
    'closed'
  );
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (chatState === 'open') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatState]);

  async function handleSend() {
    if (!query.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: query };
    setMessages((m) => [...m, userMsg]);
    setQuery('');
    setIsLoading(true);
    setChatState('open');

    try {
      // Call our new Codex research API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content: `Sorry, something went wrong: ${errorData.error || 'Unknown error'}`,
          },
        ]);
        return;
      }

      // Get response from our API
      const data = await res.json();
      const assistantMsg = {
        role: 'assistant' as const,
        content: data.answer || 'No response received',
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus back to input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* --- Header ---------------------------------------------------- */}
      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image src="/openai-logo.svg" alt="OpenAI" width={100} height={24} />
        </div>
        <Button variant="outline" size="sm" className="rounded-full">
          Log in
        </Button>
      </header>

      {/* --- Side Rail (desktop) --------------------------------------- */}
      <aside className="hidden lg:block fixed left-0 top-16 w-48 pl-6 pt-10 text-sm space-y-6 h-full border-r border-gray-100">
        {[
          'Research',
          'Safety',
          'ChatGPT',
          'Sora',
          'API Platform',
          'For Business',
          'Stories',
          'Company',
          'News',
        ].map((link) => (
          <a
            key={link}
            href="#"
            className="text-gray-700 hover:text-black transition-colors block"
          >
            {link}
          </a>
        ))}
      </aside>

      {/* --- Main Content (Always Visible) ----------------------------- */}
      <div className="flex-1 lg:pl-48">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-20 min-h-[70vh]">
          <div className="w-full max-w-2xl flex flex-col items-center space-y-12">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
                Ask me about OpenAI Codex
              </h1>
              <p className="text-gray-600 text-lg">
                Get insights on user experiences, limitations, and target
                audiences
              </p>
            </div>

            <div className="w-full relative">
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Who should use Codex? What are the limitations? How do users really feel about it?"
                className="h-14 pl-6 pr-14 text-base rounded-xl border-2 border-gray-200 focus:border-gray-400 transition-colors"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!query.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">Try asking:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  'Who is the ideal user for Codex?',
                  'What are the main limitations?',
                  'How do users rate Codex vs Cursor?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prompt Cards - Always Visible for SEO */}
        <section className="px-6">
          <PromptCards category={powerPrompts[0]} />
        </section>

        {/* Article carousel - Always Visible for SEO */}
        <section className="px-6">
          <ArticlesCarousel />
        </section>

        {/* Extra padding for chat overlay */}
        <div className="h-40"></div>
      </div>

      {/* --- Chat Overlay (Bottom-anchored) ---------------------------- */}
      {chatState !== 'closed' && (
        <div
          className={`fixed bottom-0 right-4 z-50 bg-white border border-gray-200 rounded-t-xl shadow-2xl transition-all duration-300 ${
            chatState === 'open' ? 'w-96 h-[500px]' : 'w-80 h-16'
          }`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium">Codex Research</h3>
                {messages.length > 0 && (
                  <span className="text-xs text-gray-500">
                    ({messages.length / 2} questions)
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setChatState(chatState === 'open' ? 'minimized' : 'open')
                  }
                  className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatState('closed')}
                  className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages - Only show when open */}
          {chatState === 'open' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Ask me anything about Codex!</p>
                  </div>
                )}

                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        message.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 last:mb-0 ml-4 list-disc">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 last:mb-0 ml-4 list-decimal">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="mb-1">{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              code: ({ children }) => (
                                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                                  {children}
                                </code>
                              ),
                              h1: ({ children }) => (
                                <h1 className="text-base font-bold mb-2">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-sm font-bold mb-2">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm font-semibold mb-1">
                                  {children}
                                </h3>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
                <div className="flex gap-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a follow-up..."
                    className="flex-1 h-9 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!query.trim() || isLoading}
                    size="sm"
                    className="h-9 w-9 p-0"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */

// Articles carousel using real codex intelligence data
function ArticlesCarousel() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleCardExpand = (cardId: string) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <div className="space-y-8 py-16">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Expert Reviews & Analysis</h2>
        <p className="text-gray-600 text-lg">
          Real insights from developers, tech journalists, and the community
          who&apos;ve tested OpenAI Codex
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {codexSources.map((source: CodexSource) => (
          <ThirdPartyCard
            key={source.id}
            title={source.title}
            author={source.author}
            source_type={source.source_type}
            url={source.url}
            sentiment={source.sentiment}
            credibility={source.credibility}
            key_insights={source.key_insights}
            summary={source.summary}
            isExpanded={expandedCardId === source.id}
            onExpandToggle={() => handleCardExpand(source.id)}
          />
        ))}
      </div>
    </div>
  );
}
