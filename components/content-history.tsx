'use client'
import { useEffect, useState } from 'react'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'

type Content = { id: string; platform: string; contentType: string; topic: string; output: string; language: string; createdAt: string }

export function ContentHistory() {
  const [items, setItems] = useState<Content[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = async () => {
    const res = await fetch('/api/content')
    const data = await res.json()
    setItems(data.contents || [])
  }

  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    await fetch('/api/content', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  if (!items.length) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">📋 Content History</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div className="flex items-center gap-3">
                <span className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded">{item.platform}</span>
                <span className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded">{item.contentType}</span>
                <span className="text-slate-300 text-sm truncate max-w-xs">{item.topic}</span>
                {item.language === 'ar' && <span className="text-xs text-amber-400">AR</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
                <button onClick={e => { e.stopPropagation(); del(item.id) }} className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                {expanded === item.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>
            {expanded === item.id && (
              <div className="px-4 pb-4 border-t border-white/10">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed pt-3">{item.output}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
