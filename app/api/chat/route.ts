import { NextRequest, NextResponse } from 'next/server';
import { searchBlogContext } from '@/lib/blog-context';

const ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const userMessage = messages?.[messages.length - 1]?.content;

  if (!userMessage) {
    return NextResponse.json({ error: 'No message provided' }, { status: 400 });
  }

  const nvidiaKey = process.env.NVIDIA_API_KEY;
  const relevantPosts = searchBlogContext(userMessage);
  const hasContext = relevantPosts.length > 0;

  if (nvidiaKey) {
    try {
      const systemPrompt = `You are an AI assistant for the Bovée & Thill Business Communication Blog (bovee-blog-next.vercel.app). 
You help educators and students with questions about business communication education.

You can reference articles from the blog using markdown links like: [Title](/blog/slug)

${hasContext ? `Here are relevant blog posts:\n${relevantPosts}` : ''}

Be concise, helpful, and educational. If you don't know something, say so. 
When you reference a blog post, always include the link using /blog/SLUG.`;

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${nvidiaKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'nvidia/llama-3.3-nemotron-super-49b-v1',
          messages: [
            { role: 'system', content: systemPrompt },
            ...(messages || []).slice(-8),
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      const data = await response.json();

      if (data.choices?.[0]?.message?.content) {
        return NextResponse.json({
          reply: data.choices[0].message.content,
          sources: hasContext ? relevantPosts : null,
        });
      }

      if (data.error) {
        console.warn('NVIDIA API error:', data.error);
      }
    } catch (err) {
      console.warn('NVIDIA API call failed:', err);
    }
  }

  // Fallback offline mode
  if (hasContext) {
    const q = userMessage.toLowerCase();
    let reply = '';
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      reply = "Welcome! I can help you find articles. What topic are you interested in?";
    } else if (q.includes('ai') || q.includes('chatgpt') || q.includes('gemini')) {
      reply = 'We have several articles about AI in business communication:';
    } else if (q.includes('textbook') || q.includes('edition') || q.includes('pearson')) {
      reply = 'Here are relevant articles about our textbooks:';
    } else if (q.includes('teach') || q.includes('educat') || q.includes('instructor') || q.includes('student')) {
      reply = 'Resources for educators:';
    } else {
      reply = 'I found relevant articles:';
    }
    return NextResponse.json({ reply, sources: relevantPosts, mode: 'search' });
  }

  return NextResponse.json({
    reply: "I couldn't find matching articles. Try different keywords or browse the **[Blog page](/blog)**.",
    mode: 'empty',
  });
}
