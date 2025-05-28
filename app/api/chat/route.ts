import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { codexIntelligence } from '@/app/data/codexIntelligence';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt with embedded Codex intelligence
const SYSTEM_PROMPT = `You are a research assistant specializing in OpenAI Codex market intelligence. 
Your job is to help people understand:
- What users ACTUALLY think about Codex (not marketing claims)
- Who the right audience is for Codex
- Areas for improvement and limitations
- Competitive positioning vs other AI coding tools

KNOWLEDGE BASE:
You have access to comprehensive research data about Codex including:
- User reviews and hands-on experiences
- Technical capabilities and limitations
- Target audience analysis
- Community sentiment from Hacker News, tech reviewers, and early adopters
- Competitive landscape analysis
- Setup requirements and pricing

RESPONSE STYLE:
- Be analytical and honest about limitations
- Cite specific user feedback and reviews when relevant
- Focus on practical insights for decision-makers
- Distinguish between marketing claims and user reality
- Use data from the knowledge base to support your answers

CURATED RESEARCH DATA:
${JSON.stringify(codexIntelligence, null, 2)}

When users ask about recent experiences or current sentiment, acknowledge that your knowledge is based on research conducted in December 2024. For the most current information, recommend checking recent reviews and community discussions.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Call OpenAI Chat Completions API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer =
      completion.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      answer,
      timestamp: new Date().toISOString(),
      sources: ['curated_research_dec_2024'],
      model: 'gpt-4o-mini',
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key configuration' },
          { status: 401 }
        );
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
