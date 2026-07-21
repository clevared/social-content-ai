'use client'
import { useState } from 'react'
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react'

const PLATFORMS = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter/X', 'Facebook', 'YouTube', 'Snapchat']
const CONTENT_TYPES = ['Caption', 'Story Script', 'Reel Script', 'Thread', 'Long Post', 'Hashtag Set', 'Bio']
const TONES = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational', 'Urgent', 'Storytelling']

export function ContentGenerator({ credits }: { credits: number }) {
  const [form, setForm] = useState({ platform: 'Instagram', contentType: 'Caption', topic: '', tone: 'Casual', language: 'en' })
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!form.topic.trim()) return
    setLoading(true); setError(''); setOutput('')
    const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Generation failed') } else { setOutput(data.output) }
  }

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const sel = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400" /> Content Generator</h2>
        <span className="text-sm text-slate-400">{credits} credits left</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Platform</label>
          <select value={form.platform} onChange={e => sel('platform', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500">
            {PLATFORMS.map(p => <option key={p} value={p} className="bg-slate-800">{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Content Type</label>
          <select value={form.contentType} onChange={e => sel('contentType', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500">
            {CONTENT_TYPES.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Tone</label>
          <select value={form.tone} onChange={e => sel('tone', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500">
            {TONES.map(t => <option key={t} value={t} className="bg-slate-800">{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Language</label>
          <select value={form.language} onChange={e => sel('language', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500">
            <option value="en" className="bg-slate-800">🇺🇸 English</option>
            <option value="ar" className="bg-slate-800">🇸🇦 Arabic</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-slate-400 text-xs mb-1 block">Topic / Brief</label>
        <textarea value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
          rows={3} placeholder="e.g. Launching a new fitness app with 30-day free trial offer..."
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 resize-none" />
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg px-4 py-2 mb-4 text-sm">{error}</div>}

      <button onClick={generate} disabled={loading || !form.topic.trim() || credits <= 0}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating…</> : <><Sparkles className="w-5 h-5" /> Generate Content</>}
      </button>

      {output && (
        <div className="mt-6 bg-slate-900/80 border border-white/10 rounded-xl p-5 relative">
          <button onClick={copy} className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{output}</pre>
        </div>
      )}
    </div>
  )
}
