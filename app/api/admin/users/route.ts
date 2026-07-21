import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function isAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.role === 'ADMIN' ? session : null
}

export async function PATCH(req: NextRequest) {
  const session = await isAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { userId, role, plan, credits, isActive } = await req.json()
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { ...(role && { role }), ...(plan && { plan }), ...(credits !== undefined && { credits }), ...(isActive !== undefined && { isActive }) },
  })
  return NextResponse.json({ user: updated })
}

export async function DELETE(req: NextRequest) {
  const session = await isAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { userId } = await req.json()
  await prisma.user.delete({ where: { id: userId } })
  return NextResponse.json({ success: true })
}
