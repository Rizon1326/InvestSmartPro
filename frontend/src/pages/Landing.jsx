import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Lightbulb,
  BookOpen,
  MessageCircle,
  ArrowRight,
  BarChart3,
  Shield,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Business Simulation',
    description: 'Test your business ideas with AI-powered analysis. Get feasibility scores, risk assessments, and actionable feedback.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Scenario Planning',
    description: 'Generate optimistic, realistic, and pessimistic projections for your venture. Make decisions with data.',
    color: 'from-primary-400 to-primary-600',
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Structured lessons on entrepreneurship, pricing, finance, and risk management. Learn at your own pace.',
    color: 'from-emerald-400 to-green-600',
  },
  {
    icon: MessageCircle,
    title: 'AI Business Advisor',
    description: 'Chat with an intelligent assistant that understands the Bangladeshi market and provides practical advice.',
    color: 'from-violet-400 to-purple-600',
  },
];

const steps = [
  { num: '01', title: 'Describe Your Idea', desc: 'Enter your business concept, investment amount, and revenue expectations.' },
  { num: '02', title: 'AI Analysis', desc: 'Our AI engine evaluates feasibility, risks, and provides expert feedback.' },
  { num: '03', title: 'Run Simulations', desc: 'Test different scenarios and see projected outcomes over 12 months.' },
  { num: '04', title: 'Learn & Grow', desc: 'Use our learning modules to build skills and improve your business plan.' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">InvestSmart</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Business Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            Turn Your Business
            <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Ideas Into Reality
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Simulate, analyze, and optimize your business ventures with AI. Built for aspiring entrepreneurs in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/25 transition-all no-underline"
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/learning"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all no-underline"
            >
              Browse Lessons
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Business Categories', value: '10+' },
            { label: 'Learning Lessons', value: '5+' },
            { label: 'AI-Powered', value: '100%' },
            { label: 'Currency', value: 'BDT' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-slate-50">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From idea validation to financial planning — all powered by artificial intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-5`}>
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Four simple steps to validate your business idea.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="text-5xl font-black text-primary-100 mb-3">{step.num}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-6 -right-4 w-6 h-6 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 sm:p-16 text-center">
          <Shield className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build Your Future?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Join InvestSmart and turn your entrepreneurial dreams into data-driven plans.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all no-underline"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">InvestSmart Pro</span>
          </div>
          <p className="text-sm text-slate-500">&copy; 2026 InvestSmart. Built for Bangladeshi entrepreneurs.</p>
        </div>
      </footer>
    </div>
  );
}
