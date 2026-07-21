import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123456', 12)

  await prisma.user.upsert({
    where: { email: 'admin@socialcontent.ai' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@socialcontent.ai',
      password: hashedPassword,
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      credits: 99999,
    },
  })

  console.log('✅ Seed complete — admin@socialcontent.ai / Admin@123456')
}

main().catch(console.error).finally(() => prisma.$disconnect())
