'use client'
import { useState } from 'react'
import { Trash2, Edit2, Check, X } from 'lucide-react'

type User = { id: string; name: string | null; email: string; role: string; plan: string; credits: number; isActive: boolean; createdAt: Date; _count: { contents: number } }

export function AdminUsersTable({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial)
  const [editing, setEditing] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<User>>({})

  const save = async (userId: string) => {
    const res = await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, ...editData }) })
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...editData } : u))
      setEditing(null)
    }
  }

  const del = async (userId: string) => {
    if (!confirm('Delete this user?')) return
    const res = await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) })
    if (res.ok) setUsers(prev => prev.filter(u => u.id !== userId))
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Users ({users.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              {['Name', 'Email', 'Role', 'Plan', 'Credits', 'Contents', 'Status', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-slate-400 text-xs font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-slate-200 text-sm">{u.name || '—'}</td>
                <td className="px-4 py-3 text-slate-400 text-sm">{u.email}</td>
                <td className="px-4 py-3">
                  {editing === u.id ? (
                    <select value={editData.role || u.role} onChange={e => setEditData(d => ({ ...d, role: e.target.value }))}
                      className="bg-slate-700 text-white text-xs rounded px-2 py-1">
                      <option value="USER">USER</option><option value="PRO">PRO</option><option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded ${ u.role === 'ADMIN' ? 'bg-red-600/20 text-red-300' : 'bg-slate-700/50 text-slate-300' }`}>{u.role}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === u.id ? (
                    <select value={editData.plan || u.plan} onChange={e => setEditData(d => ({ ...d, plan: e.target.value }))}
                      className="bg-slate-700 text-white text-xs rounded px-2 py-1">
                      <option value="FREE">FREE</option><option value="PRO">PRO</option><option value="ENTERPRISE">ENTERPRISE</option>
                    </select>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded ${ u.plan === 'FREE' ? 'bg-slate-700/50 text-slate-300' : 'bg-purple-600/20 text-purple-300' }`}>{u.plan}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === u.id ? (
                    <input type="number" value={editData.credits ?? u.credits} onChange={e => setEditData(d => ({ ...d, credits: +e.target.value }))}
                      className="bg-slate-700 text-white text-xs rounded px-2 py-1 w-20" />
                  ) : (
                    <span className="text-slate-300 text-sm">{u.credits}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-400 text-sm">{u._count.contents}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${ u.isActive ? 'bg-green-600/20 text-green-300' : 'bg-red-600/20 text-red-300' }`}>
                    {u.isActive ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {editing === u.id ? (
                      <><button onClick={() => save(u.id)} className="text-green-400 hover:text-green-300"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button></>
                    ) : (
                      <><button onClick={() => { setEditing(u.id); setEditData({}) }} className="text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => del(u.id)} className="text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
