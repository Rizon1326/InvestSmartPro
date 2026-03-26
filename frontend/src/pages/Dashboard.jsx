import { Link } from 'react-router-dom';
import {
  Lightbulb,
  BookOpen,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Plus,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useBusinessIdeas } from '../hooks/useBusinessIdeas';
import { useLessons } from '../hooks/useLessons';
import { RiskBadge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { Skeleton, StatCardSkeleton } from '../components/ui/Skeleton';
import { formatBDT, truncate } from '../lib/utils';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function StatCard({ icon: Icon, label, value, sub, gradient, iconBg }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {sub && (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" /> {sub}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function RecentIdeaRow({ idea }) {
  return (
    <Link
      to={`/ideas/${idea.id}`}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-primary-50/60 transition-colors group no-underline"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-100 to-violet-100 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-primary-500" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
            {truncate(idea.name, 40)}
          </p>
          <p className="text-xs text-slate-400">{formatBDT(idea.initial_investment)} invested</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
        <RiskBadge level={idea.risk_level} />
        <ScoreGauge score={idea.feasibility_score} size="sm" />
      </div>
    </Link>
  );
}

export function Dashboard() {
  const { ideas, loading: ideasLoading } = useBusinessIdeas();
  const { lessons, loading: lessonsLoading } = useLessons();

  const totalInvestment = ideas.reduce((sum, i) => sum + Number(i.initial_investment || 0), 0);
  const totalMonthlyProfit = ideas.reduce((sum, i) => sum + Number(i.monthly_profit || 0), 0);
  const avgFeasibility = ideas.length
    ? Math.round(ideas.reduce((sum, i) => sum + (i.feasibility_score || 0), 0) / ideas.length)
    : 0;

  return (
    <div className="animate-fade-in space-y-7">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-violet-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10">
          <div className="absolute right-8 top-4 w-36 h-36 bg-white rounded-full" />
          <div className="absolute right-24 bottom-2 w-20 h-20 bg-white rounded-full" />
        </div>
        <div className="relative">
          <p className="text-primary-200 text-sm font-medium mb-1">{getGreeting()},</p>
          <h2 className="text-2xl font-black tracking-tight mb-1">Welcome back!</h2>
          <p className="text-primary-200 text-sm">
            You have <span className="text-white font-bold">{ideas.length}</span> business ideas.
            {ideas.length === 0 && " Let's create your first one!"}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {ideasLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Lightbulb} label="Total Ideas" value={ideas.length} gradient="from-amber-400 to-orange-500" />
          <StatCard icon={TrendingUp} label="Total Investment" value={formatBDT(totalInvestment)} gradient="from-primary-500 to-violet-600" />
          <StatCard
            icon={BarChart3}
            label="Monthly Profit"
            value={formatBDT(totalMonthlyProfit)}
            sub={totalMonthlyProfit > 0 ? 'Positive' : undefined}
            gradient={totalMonthlyProfit >= 0 ? 'from-emerald-400 to-green-500' : 'from-red-400 to-red-500'}
          />
          <StatCard
            icon={Sparkles}
            label="Avg. Feasibility"
            value={`${avgFeasibility}%`}
            gradient="from-violet-500 to-purple-600"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Ideas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900">Recent Ideas</h3>
              <p className="text-xs text-slate-400 mt-0.5">Your latest business concepts</p>
            </div>
            <Link
              to="/ideas/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg no-underline transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> New
            </Link>
          </div>
          <div className="px-2 py-2">
            {ideasLoading ? (
              <div className="space-y-2 p-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-xl" />
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : ideas.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-600 mb-1">No ideas yet</p>
                <p className="text-xs text-slate-400 mb-4">Create your first business idea to get started.</p>
                <Link
                  to="/ideas/new"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline"
                >
                  Create now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              ideas.slice(0, 5).map((idea) => <RecentIdeaRow key={idea.id} idea={idea} />)
            )}
          </div>
          {ideas.length > 5 && (
            <div className="px-5 py-3 border-t border-slate-100">
              <Link to="/ideas" className="text-xs font-semibold text-primary-600 hover:text-primary-700 no-underline">
                View all {ideas.length} ideas &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/ideas/new"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors no-underline group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm font-semibold text-primary-700">New Business Idea</span>
                <ArrowRight className="w-4 h-4 text-primary-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors no-underline group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-sm font-semibold text-violet-700">Chat with AI</span>
                <ArrowRight className="w-4 h-4 text-violet-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/learning"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors no-underline group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold text-emerald-700">Start Learning</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Learning */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-3">Learning Hub</h3>
            {lessonsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">{lessons.length}</p>
                    <p className="text-xs text-slate-500">lessons available</p>
                  </div>
                </div>
                <Link
                  to="/learning"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 no-underline"
                >
                  Browse lessons <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
