import { NextRequest, NextResponse } from 'next/server';

// VPS Supertonic 3 TTS server
const TTS_HOST = process.env.TTS_HOST || 'http://172.232.194.199:8880';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || 'F1';
  const lang = searchParams.get('lang') || undefined;

  if (!text) {
    return NextResponse.json({ error: 'text parameter required' }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({ text, voice });
    if (lang) params.set('lang', lang);

    const response = await fetch(`${TTS_HOST}/v1/tts?${params}`, {
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'public, max-age=86400',
        'X-TTS-Model': 'supertonic-3',
      },
    });
  } catch (err: any) {
    console.error('TTS proxy error:', err);
    return NextResponse.json(
      { error: 'TTS service unavailable', details: err.message },
      { status: 503 }
    );
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30;
