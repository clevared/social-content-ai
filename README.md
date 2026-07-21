# 🚀 SocialContent AI

AI-powered social media content creation platform built with Next.js 14, Prisma, NextAuth, and OpenAI GPT-4.

## Features
- 🤖 AI content generation (captions, scripts, threads, hashtags)
- 🌍 Bilingual: English & Arabic
- 📱 Multi-platform: Instagram, TikTok, LinkedIn, Twitter/X, Facebook, YouTube
- 🔐 Authentication (Email/Password + Google OAuth)
- 🗄️ PostgreSQL database with Prisma ORM
- 💳 Credits system (Free: 10, Pro: 200, Enterprise: Unlimited)
- 🛡️ Admin control panel (manage users, roles, plans, credits)
- 📋 Content history with delete
- 🌙 Dark mode design

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v4
- **AI**: OpenAI GPT-4o-mini
- **Styling**: Tailwind CSS + Radix UI
- **Deployment**: Vercel + Neon DB

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/clevared/social-content-ai
cd social-content-ai
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env.local
```
Fill in:
- `DATABASE_URL` → Get from [Neon](https://neon.tech) (free tier)
- `NEXTAUTH_SECRET` → Run `openssl rand -base64 32`
- `OPENAI_API_KEY` → From [OpenAI](https://platform.openai.com)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` → Optional, from [Google Console](https://console.cloud.google.com)

### 3. Setup Database
```bash
npx prisma db push
npm run db:seed
```

### 4. Run Locally
```bash
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub (done!)
2. Go to [vercel.com](https://vercel.com) → Import repo `clevared/social-content-ai`
3. Add Environment Variables in Vercel dashboard
4. Deploy!

## Admin Access
After seeding:
- **Email**: `admin@socialcontent.ai`
- **Password**: `Admin@123456`

## Database Schema
- `User` – auth, role (USER/PRO/ADMIN), plan (FREE/PRO/ENTERPRISE), credits
- `Content` – generated content linked to users
- `Account`, `Session`, `VerificationToken` – NextAuth tables
