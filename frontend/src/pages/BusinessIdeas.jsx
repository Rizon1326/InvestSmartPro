import { Link } from 'react-router-dom';
import { Plus, Search, Lightbulb, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useBusinessIdeas } from '../hooks/useBusinessIdeas';
import { RiskBadge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { formatBDT, truncate, formatDate } from '../lib/utils';

const riskBorderMap = {
  low: 'border-t-emerald-400',
  medium: 'border-t-amber-400',
  high: 'border-t-red-400',
};

function IdeaCard({ idea }) {
  const profit = Number(idea.monthly_profit || 0);
  const borderColor = riskBorderMap[idea.risk_level] || 'border-t-slate-200';

  return (
    <Link
      to={`/ideas/${idea.id}`}
      className={`block bg-white rounded-2xl border border-slate-200 border-t-4 ${borderColor} p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group no-underline`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4.5 h-4.5 text-primary-500" />
        </div>
        <ScoreGauge score={idea.feasibility_score} size="sm" />
      </div>

      <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-1">
        {idea.name}
      </h3>
      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{truncate(idea.description, 100)}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-50 rounded-lg p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Investment</p>
          <p className="text-xs font-bold text-slate-900">{formatBDT(idea.initial_investment)}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">Mo. Profit</p>
          <p className={`text-xs font-bold ${profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {formatBDT(idea.monthly_profit)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <RiskBadge level={idea.risk_level} />
        <span className="text-[10px] text-slate-400">{formatDate(idea.created_at)}</span>
      </div>
    </Link>
  );
}

export function BusinessIdeas() {
  const { ideas, loading, error, refetch } = useBusinessIdeas();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.name.toLowerCase().includes(search.toLowerCase()) ||
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
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Business Ideas</h2>
          <p className="text-slate-500 text-sm mt-1">{ideas.length} ideas — manage and analyze your business concepts</p>
        </div>
        <Link
          to="/ideas/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-sm shadow-primary-300/30 transition-all no-underline"
        >
          <Plus className="w-4 h-4" /> New Idea
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="relative sm:w-48">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="input pl-10 cursor-pointer appearance-none"
          >
            <option value="all">All Risks</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      {!loading && (search || riskFilter !== 'all') && (
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filteredIdeas.length}</span> of {ideas.length} ideas
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filteredIdeas.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title={search || riskFilter !== 'all' ? 'No matching ideas' : 'No ideas yet'}
          description={
            search || riskFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first business idea and let AI analyze it for you.'
          }
          action={
            !search && riskFilter === 'all' && (
              <Link to="/ideas/new" className="btn-primary">
                <Plus className="w-4 h-4" /> Create First Idea
              </Link>
            )
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
