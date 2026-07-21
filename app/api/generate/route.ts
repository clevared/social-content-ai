import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const schema = z.object({
  platform: z.string(),
  contentType: z.string(),
  topic: z.string().min(3).max(300),
  tone: z.string(),
  language: z.enum(['en', 'ar']),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || user.credits <= 0) return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { platform, contentType, topic, tone, language } = parsed.data

  const langNote = language === 'ar' ? 'Write the entire response in Arabic.' : 'Write the entire response in English.'
  const prompt = `You are an expert social media content creator. ${langNote}

Create a ${contentType} for ${platform} about: "${topic}".
Tone: ${tone}.

Provide:
1. Main content (caption/script/thread)
2. 10-15 relevant hashtags
3. Best time to post
4. A short engagement tip

Format clearly with sections.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
  })

  const output = completion.choices[0].message.content || ''

  await prisma.$transaction([
    prisma.content.create({ data: { userId: session.user.id, platform, contentType, topic, tone, language, output } }),
    prisma.user.update({ where: { id: session.user.id }, data: { credits: { decrement: 1 } } }),
  ])

  return NextResponse.json({ output })
}
