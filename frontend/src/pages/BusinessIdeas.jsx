import { Link } from 'react-router-dom';
import { Plus, Search, Lightbulb, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useBusinessIdeas } from '../hooks/useBusinessIdeas';
import { RiskBadge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { formatBDT, truncate, formatDate } from '../lib/utils';

function IdeaCard({ idea }) {
  return (
    <Link
      to={`/ideas/${idea.id}`}
      className="block bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all group no-underline"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="text-base font-semibold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
            {idea.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{truncate(idea.description, 120)}</p>
        </div>
        <ScoreGauge score={idea.feasibility_score} size="sm" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-2.5">
          <p className="text-xs text-slate-500">Investment</p>
          <p className="text-sm font-semibold text-slate-900">{formatBDT(idea.initial_investment)}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5">
          <p className="text-xs text-slate-500">Monthly Profit</p>
          <p className={`text-sm font-semibold ${Number(idea.monthly_profit) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatBDT(idea.monthly_profit)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <RiskBadge level={idea.risk_level} />
        <span className="text-xs text-slate-400">{formatDate(idea.created_at)}</span>
      </div>
    </Link>
  );
}

export function BusinessIdeas() {
  const { ideas, loading, error, refetch } = useBusinessIdeas();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.name.toLowerCase().includes(search.toLowerCase()) ||
      idea.description.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || idea.risk_level === riskFilter;
    return matchesSearch && matchesRisk;
  });

  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Business Ideas</h2>
          <p className="text-slate-500 mt-1">Manage and analyze your business concepts.</p>
        </div>
        <Link
          to="/ideas/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-sm transition-all no-underline"
        >
          <Plus className="w-4 h-4" /> New Idea
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          <option value="all">All Risks</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filteredIdeas.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title={search || riskFilter !== 'all' ? 'No ideas match your filters' : 'No business ideas yet'}
          description={search || riskFilter !== 'all' ? 'Try adjusting your search or filters.' : 'Create your first business idea to get started with AI analysis.'}
          action={
            !search && riskFilter === 'all' && (
              <Link
                to="/ideas/new"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 no-underline"
              >
                <Plus className="w-4 h-4" /> Create First Idea
              </Link>
            )
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
        </div>
      )}
    </div>
  );
}
