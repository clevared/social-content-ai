import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ContentGenerator } from '@/components/content-generator'
import { ContentHistory } from '@/components/content-history'
import { Sparkles, Zap, FileText } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { credits: true, plan: true, name: true, _count: { select: { contents: true } } },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-slate-400">Generate engaging content for your social media platforms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-purple-600/20 p-3 rounded-lg"><Zap className="w-5 h-5 text-purple-400" /></div>
          <div><div className="text-2xl font-bold text-white">{user?.credits}</div><div className="text-slate-400 text-sm">Credits remaining</div></div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-pink-600/20 p-3 rounded-lg"><FileText className="w-5 h-5 text-pink-400" /></div>
          <div><div className="text-2xl font-bold text-white">{user?._count.contents}</div><div className="text-slate-400 text-sm">Contents created</div></div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-600/20 p-3 rounded-lg"><Sparkles className="w-5 h-5 text-green-400" /></div>
          <div><div className="text-2xl font-bold text-white capitalize">{user?.plan}</div><div className="text-slate-400 text-sm">Current plan</div></div>
        </div>
      </div>

      <ContentGenerator credits={user?.credits ?? 0} />
      <ContentHistory />
    </div>
  )
}
