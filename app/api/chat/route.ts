import { NextRequest, NextResponse } from 'next/server';
import { searchBlogContext } from '@/lib/blog-context';

const ALLOWED_ORIGINS = ['https://bovee-blog-next.vercel.app', 'http://localhost:3000'];

export async function POST(req: NextRequest) {
  const { messages, blogContext } = await req.json();
  const userMessage = messages?.[messages.length - 1]?.content;

  if (!userMessage) {
    return NextResponse.json({ error: 'No message provided' }, { status: 400 });
  }

  // Search blog for relevant context
  const relevantPosts = searchBlogContext(userMessage);
  const hasContext = relevantPosts.length > 0;

  // Try using an LLM API if key is configured
  const llmApiKey = process.env.AI_API_KEY;
  const llmModel = process.env.AI_MODEL || 'gpt-oss:20b';
  const llmEndpoint = process.env.AI_ENDPOINT || 'https://ollama.com/api/chat';
  const authHeader = process.env.AI_AUTH_HEADER || 'Authorization';

  if (llmApiKey) {
    try {
      const systemPrompt = `You are an AI assistant for the Bovée & Thill Business Communication Blog. 
You help educators and students with questions about business communication education.

${
  hasContext
    ? `Here are relevant blog posts that might help answer the question:\n${relevantPosts}`
    : ''
}

Answer based on the blog content when relevant. Be concise, helpful, and educational.
If you don't know something, say so. Always link to relevant blog posts when possible using /blog/slug URLs.`;

      const response = await fetch(llmEndpoint, {
        method: 'POST',
        headers: {
          [authHeader]: `Bearer ${llmApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: llmModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.slice(-10),
          ],
          stream: false,
        }),
      });

      const data = await response.json();

      if (data.message?.content) {
        return NextResponse.json({
          reply: data.message.content,
          sources: hasContext ? relevantPosts : null,
        });
      }

      if (data.error) {
        // Fall through to offline mode
        console.warn('LLM API error:', data.error);
      }
    } catch (err) {
      console.warn('LLM API call failed:', err);
    }
  }

  // Offline mode: search-based reply
  if (hasContext) {
    // Simple keyword-based response
    const q = userMessage.toLowerCase();

    let reply = '';

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      reply =
        "Welcome to the Bovée & Thill Business Communication Blog! I can help you find articles and resources. What topic are you interested in?";
    } else if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('chatgpt') || q.includes('gemini')) {
      reply =
        'We have several articles about AI in business communication. Here are the most relevant ones I found on our blog:';
    } else if (q.includes('textbook') || q.includes('book') || q.includes('edition') || q.includes('pearson')) {
      reply =
        'Our textbooks cover business communication comprehensively. Here are relevant articles from our blog:';
    } else if (q.includes('teach') || q.includes('educat') || q.includes('instructor') || q.includes('student') || q.includes('course')) {
      reply =
        "We have many resources for educators. Here are some articles that might help:";
    } else if (q.includes('write') || q.includes('grammar') || q.includes('email') || q.includes('message')) {
      reply =
        'Business writing is a core topic. Here are relevant articles:';
    } else {
      reply = `I found some relevant articles on our blog that might answer your question:`;
    }

    return NextResponse.json({
      reply,
      sources: relevantPosts,
      mode: 'search',
    });
  }

  // No context and no API key
  return NextResponse.json({
    reply:
      "I couldn't find specific articles matching your question on our blog. Could you try different keywords? You can also browse all our articles on the **[Blog page](/blog)**.",
    mode: 'empty',
  });
}
