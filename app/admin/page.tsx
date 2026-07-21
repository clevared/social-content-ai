import { prisma } from '@/lib/prisma'
import { AdminUsersTable } from '@/components/admin-users-table'

export default async function AdminPage() {
  const [totalUsers, totalContents, proUsers, activeToday] = await Promise.all([
    prisma.user.count(),
    prisma.content.count(),
    prisma.user.count({ where: { plan: { not: 'FREE' } } }),
    prisma.user.count({ where: { createdAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } }),
  ])

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, plan: true, credits: true, isActive: true, createdAt: true, _count: { select: { contents: true } } },
  })

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: '👥', color: 'text-blue-400' },
    { label: 'Total Contents', value: totalContents, icon: '📝', color: 'text-purple-400' },
    { label: 'Paid Users', value: proUsers, icon: '💰', color: 'text-green-400' },
    { label: 'New Today', value: activeToday, icon: '🆕', color: 'text-pink-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Control Panel</h2>
        <p className="text-slate-400">Manage users, plans and platform activity</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      <AdminUsersTable users={users} />
    </div>
  )
}
