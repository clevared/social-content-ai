import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Globe, Users } from 'lucide-react'

export default function HomePage() {
  const platforms = [
    { name: 'Instagram', emoji: '📸', color: 'from-pink-500 to-purple-600' },
    { name: 'TikTok', emoji: '🎵', color: 'from-black to-pink-500' },
    { name: 'LinkedIn', emoji: '💼', color: 'from-blue-600 to-blue-800' },
    { name: 'Twitter/X', emoji: '🐦', color: 'from-sky-400 to-blue-600' },
    { name: 'Facebook', emoji: '👥', color: 'from-blue-500 to-blue-700' },
    { name: 'YouTube', emoji: '▶️', color: 'from-red-500 to-red-700' },
  ]

  const features = [
    { icon: <Sparkles className="w-6 h-6" />, title: 'AI-Powered Generation', desc: 'GPT-4 creates platform-optimized content tailored to your brand voice.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Bilingual Support', desc: 'Generate content in English and Arabic with native-quality output.' },
    { icon: <Zap className="w-6 h-6" />, title: 'Multi-Platform', desc: 'Captions, hashtags, scripts, threads – all formats covered.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Secure & Private', desc: 'Your content and data are fully protected with enterprise-grade security.' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Content History', desc: 'Save, organize and reuse your best-performing content anytime.' },
    { icon: <Users className="w-6 h-6" />, title: 'Team Management', desc: 'Admin panel to manage users, plans and credits.' },
  ]

  const plans = [
    { name: 'Free', price: '$0', credits: '10 credits/mo', features: ['All platforms', 'English & Arabic', 'Content history'], popular: false },
    { name: 'Pro', price: '$19', credits: '200 credits/mo', features: ['Everything in Free', 'Priority generation', 'Export to clipboard', 'Email support'], popular: true },
    { name: 'Enterprise', price: '$79', credits: 'Unlimited', features: ['Everything in Pro', 'Team accounts', 'API access', 'Dedicated support'], popular: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          <span className="text-white font-bold text-xl">SocialContent AI</span>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/signin" className="text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors">Sign In</Link>
          <Link href="/auth/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm">Powered by GPT-4</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Create Viral
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Social Content </span>
          in Seconds
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          AI-powered content creation for Instagram, TikTok, LinkedIn & more. Generate engaging captions, hashtags, and scripts in English & Arabic.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center transition-all transform hover:scale-105">
            Start Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/auth/signin" className="border border-slate-600 hover:border-purple-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all">
            Sign In
          </Link>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <p className="text-center text-slate-400 mb-8 text-lg">Generate content for every platform</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {platforms.map((p) => (
            <div key={p.name} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-all cursor-default">
              <div className="text-3xl mb-2">{p.emoji}</div>
              <div className="text-slate-300 text-sm font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 transition-all">
              <div className="text-purple-400 mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 border transition-all ${
              plan.popular
                ? 'bg-gradient-to-b from-purple-600/30 to-purple-900/30 border-purple-500'
                : 'bg-white/5 border-white/10'
            }`}>
              {plan.popular && <div className="text-center mb-3"><span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</span></div>}
              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-1">{plan.price}<span className="text-sm text-slate-400">/mo</span></div>
              <div className="text-purple-300 text-sm mb-4">{plan.credits}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className={`block text-center py-2 rounded-xl font-medium transition-all ${
                plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border border-slate-600 hover:border-purple-500 text-slate-300'
              }`}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 text-slate-500 text-sm border-t border-white/10">
        © 2026 SocialContent AI · Built for marketing professionals
      </footer>
    </div>
  )
}
