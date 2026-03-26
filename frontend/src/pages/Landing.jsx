import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Lightbulb,
  BookOpen,
  MessageCircle,
  ArrowRight,
  BarChart3,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Business Simulation',
    description: 'Test your ideas with AI-powered feasibility scores, risk assessments, and actionable feedback.',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: BarChart3,
    title: 'Scenario Planning',
    description: 'Generate optimistic, realistic, and pessimistic projections. Make decisions backed by data.',
    gradient: 'from-primary-500 to-violet-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description: 'Lessons on entrepreneurship, pricing, finance, and risk management — learn at your pace.',
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: MessageCircle,
    title: 'AI Business Advisor',
    description: 'Chat with an intelligent assistant that understands the Bangladeshi market deeply.',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
];

const steps = [
  { num: '01', title: 'Describe Your Idea', desc: 'Enter your business concept, investment amount, and revenue expectations.' },
  { num: '02', title: 'Get AI Analysis', desc: 'Our AI engine evaluates feasibility, risks, and provides expert feedback.' },
  { num: '03', title: 'Run Simulations', desc: 'Test different scenarios and see projected outcomes over 12 months.' },
  { num: '04', title: 'Learn & Grow', desc: 'Use learning modules to build skills and improve your business plan.' },
];

const highlights = [
  'AI-powered business analysis',
  '12-month revenue projections',
  'Bangladesh market focused',
  'Risk & feasibility scoring',
];

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">InvestSmart<span className="text-primary-400"> Pro</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-500 transition-colors no-underline shadow-lg shadow-primary-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-8 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Business Intelligence
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="text-white">Turn Ideas Into</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-primary-300 bg-clip-text text-transparent">
              Real Ventures
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Simulate, analyze, and plan your business ventures with AI. Feasibility scores,
            financial projections, and expert guidance — built for Bangladeshi entrepreneurs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-500 transition-all shadow-xl shadow-primary-500/25 no-underline"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/learning"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white text-sm font-semibold rounded-xl hover:bg-white/10 border border-white/10 transition-all no-underline"
            >
              Browse Lessons
            </Link>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual — Mock Dashboard */}
        <div className="mt-16 max-w-xl mx-auto px-4 relative">
          <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              <div className="flex-1 mx-4 h-5 rounded-full bg-white/5 flex items-center px-3">
                <span className="text-[9px] text-slate-600">investsmart.pro/ideas/tea-stall-dhaka</span>
              </div>
            </div>
            <div className="p-5">
              {/* Metric chips */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Feasibility', value: '87%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                  { label: 'Risk Level', value: 'Low', color: 'text-primary-400', bg: 'bg-primary-400/10' },
                  { label: '12mo ROI', value: '245%', color: 'text-violet-400', bg: 'bg-violet-400/10' },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Analysis items */}
              <div className="space-y-2">
                {[
                  { label: 'AI Business Analysis', status: 'Complete', dot: 'bg-emerald-400' },
                  { label: 'Market Validation', status: 'Complete', dot: 'bg-emerald-400' },
                  { label: 'Financial Projection', status: 'Running…', dot: 'bg-primary-400 animate-pulse' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    <span className="text-xs text-slate-300 flex-1">{item.label}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* glow */}
          <div className="absolute inset-x-12 -bottom-4 h-8 bg-primary-500/25 blur-xl rounded-full -z-10" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Business Categories', value: '10+' },
              { label: 'Learning Lessons', value: '5+' },
              { label: 'AI Accuracy', value: 'Gemini' },
              { label: 'Local Currency', value: 'BDT ৳' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Everything to Launch & Grow
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              From idea validation to financial planning — all AI-powered and market-aware.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className={`group ${feat.bg} ${feat.border} border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <feat.icon className="w-5.5 h-5.5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Up and Running in Minutes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary-100 flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-sm font-black text-primary-600">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-3 -right-5 w-5 h-5 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">Ready to Build Your Future?</h2>
              <p className="text-primary-200 text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Join smart entrepreneurs using AI to validate ideas and plan their path to success.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all no-underline shadow-xl"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 no-underline mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <TrendingUp className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-base font-bold text-white">InvestSmart<span className="text-primary-400"> Pro</span></span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
                AI-powered business intelligence for Bangladeshi entrepreneurs — simulate, analyze, and launch ventures with confidence.
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-xs text-slate-400">Powered by <span className="text-white font-semibold">Gemini AI</span></span>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-5">Platform</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Dashboard', to: '/dashboard' },
                  { label: 'Business Ideas', to: '/ideas' },
                  { label: 'Learning Hub', to: '/learning' },
                  { label: 'AI Assistant', to: '/chat' },
                  { label: 'Categories', to: '/categories' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-500 hover:text-white transition-colors no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-5">Features</h4>
              <ul className="space-y-3">
                {[
                  'Feasibility Scoring',
                  'Risk Assessment',
                  'Scenario Planning',
                  '12-month Projections',
                  'AI Business Advisor',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
                    <span className="text-sm text-slate-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">&copy; 2026 InvestSmart Pro. All rights reserved.</p>
            <p className="text-xs text-slate-600">Made with <span className="text-red-400">♥</span> for Bangladeshi entrepreneurs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
