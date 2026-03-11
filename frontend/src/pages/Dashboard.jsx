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
  ArrowDownRight,
} from 'lucide-react';
import { useBusinessIdeas } from '../hooks/useBusinessIdeas';
import { useLessons } from '../hooks/useLessons';
import { RiskBadge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton';
import { formatBDT, truncate } from '../lib/utils';

function StatCard({ icon: Icon, label, value, change, trend, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className={`inline-flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function RecentIdeaRow({ idea }) {
  return (
    <Link
      to={`/ideas/${idea.id}`}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group no-underline"
    >
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-slate-900 truncate group-hover:text-primary-600">{idea.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{formatBDT(idea.initial_investment)} investment</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
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
    <div className="animate-fade-in space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back!</h2>
        <p className="text-slate-500 mt-1">Here's an overview of your business ideas and progress.</p>
      </div>

      {/* Stats Grid */}
      {ideasLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Lightbulb}
            label="Total Ideas"
            value={ideas.length}
            color="from-amber-400 to-orange-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Investment"
            value={formatBDT(totalInvestment)}
            color="from-primary-400 to-primary-600"
          />
          <StatCard
            icon={BarChart3}
            label="Monthly Profit"
            value={formatBDT(totalMonthlyProfit)}
            trend={totalMonthlyProfit >= 0 ? 'up' : 'down'}
            change={totalMonthlyProfit >= 0 ? 'Positive' : 'Negative'}
            color="from-emerald-400 to-green-600"
          />
          <StatCard
            icon={BookOpen}
            label="Avg. Feasibility"
            value={`${avgFeasibility}%`}
            color="from-violet-400 to-purple-600"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Ideas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Recent Business Ideas</h3>
            <Link
              to="/ideas/new"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 no-underline"
            >
              <Plus className="w-4 h-4" /> New Idea
            </Link>
          </div>
          <div className="divide-y divide-slate-50 px-3 py-2">
            {ideasLoading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            ) : ideas.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Lightbulb className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 mb-3">No business ideas yet</p>
                <Link
                  to="/ideas/new"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 no-underline"
                >
                  Create your first idea <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              ideas.slice(0, 5).map((idea) => <RecentIdeaRow key={idea.id} idea={idea} />)
            )}
          </div>
          {ideas.length > 5 && (
            <div className="px-6 py-3 border-t border-slate-100">
              <Link to="/ideas" className="text-sm text-primary-600 hover:text-primary-700 font-medium no-underline">
                View all ideas →
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions + Learning */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/ideas/new"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors no-underline"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="text-sm font-medium">New Business Idea</span>
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors no-underline"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Chat with AI</span>
              </Link>
              <Link
                to="/learning"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors no-underline"
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Continue Learning</span>
              </Link>
            </div>
          </div>

          {/* Learning Progress */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Learning Progress</h3>
            {lessonsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">{lessons.length} lessons available</span>
                </div>
                <Link
                  to="/learning"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 no-underline mt-2"
                >
                  Start learning <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
