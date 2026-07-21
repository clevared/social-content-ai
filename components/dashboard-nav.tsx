'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Sparkles, LayoutDashboard, Shield, LogOut, User } from 'lucide-react'

export function DashboardNav({ user }: { user: any }) {
  const path = usePathname()
  return (
    <nav className="border-b border-white/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-white font-bold">SocialContent AI</span>
          </Link>
          <Link href="/dashboard" className={`flex items-center gap-1.5 text-sm transition-colors ${
            path === '/dashboard' ? 'text-white' : 'text-slate-400 hover:text-white'
          }`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className={`flex items-center gap-1.5 text-sm transition-colors ${
              path.startsWith('/admin') ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}>
              <Shield className="w-4 h-4" /> Admin
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <User className="w-4 h-4" />
            <span className="hidden sm:block">{user?.name || user?.email}</span>
            <span className="bg-purple-600/30 text-purple-300 text-xs px-2 py-0.5 rounded-full capitalize">{user?.plan || 'free'}</span>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
