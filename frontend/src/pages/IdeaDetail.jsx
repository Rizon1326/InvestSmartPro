import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  Play,
  TrendingUp,
  DollarSign,
  BarChart3,
  Clock,
  Trash2,
  Loader2,
  Sparkles,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useBusinessIdea, useSimulation, useScenarios, useSimulationHistory, useDeleteIdea } from '../hooks/useBusinessIdeas';
import { RiskBadge } from '../components/ui/Badge';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { PageSpinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { formatBDT, formatDate } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const CHART_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { idea, loading, error, refetch } = useBusinessIdea(id);
  const { runSimulation, loading: simLoading } = useSimulation(id);
  const { scenarios, fetchScenarios, loading: scenariosLoading } = useScenarios(id);
  const { history, refetch: refetchHistory } = useSimulationHistory(id);
  const { remove, loading: deleteLoading } = useDeleteIdea();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (loading) return <PageSpinner />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!idea) return <ErrorState message="Business idea not found" />;

  const handleSimulate = async () => {
    try {
      await runSimulation('Quick Simulation');
      toast.success('Simulation completed!');
      refetchHistory();
    } catch {
      toast.error('Simulation failed');
    }
  };

  const handleDelete = async () => {
    try {
      await remove(id);
      toast.success('Business idea deleted');
      navigate('/ideas');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleGenerateScenarios = async () => {
    try {
      await fetchScenarios();
      toast.success('Scenarios generated!');
    } catch {
      toast.error('Failed to generate scenarios');
    }
  };

  const monthlyProfit = Number(idea.monthly_revenue) - Number(idea.monthly_expenses);
  const annualProfit = monthlyProfit * 12;
  const roi = Number(idea.initial_investment) > 0
    ? ((annualProfit / Number(idea.initial_investment)) * 100).toFixed(1)
    : 0;

  const financialChartData = [
    { name: 'Revenue', monthly: Number(idea.monthly_revenue), annual: Number(idea.monthly_revenue) * 12 },
    { name: 'Expenses', monthly: Number(idea.monthly_expenses), annual: Number(idea.monthly_expenses) * 12 },
    { name: 'Profit', monthly: monthlyProfit, annual: annualProfit },
  ];

  const pieData = [
    { name: 'Revenue', value: Number(idea.monthly_revenue) || 1 },
    { name: 'Expenses', value: Number(idea.monthly_expenses) || 1 },
  ];

  // Parse AI feedback text into titled sections. Supports bold-style headings (e.g. **Strengths**) and markdown headings (#, ##)
  const parseAIFeedback = (text) => {
    if (!text) return [];
    const lines = text.split(/\r?\n/);
    const sections = [];
    let current = { title: 'Summary', content: [] };
    const headingRegex = /^\s*(?:\*{2,}|#{1,6})\s*([^:*]+?)\s*(?:\*{2,})?\s*:?\s*$/;

    for (let line of lines) {
      const m = line.match(headingRegex);
      if (m) {
        if (current.content.length) sections.push(current);
        current = { title: m[1].trim(), content: [] };
      } else {
        current.content.push(line);
      }
    }

    if (current.content.length) sections.push(current);

    return sections.map((s) => ({ title: s.title, markdown: s.content.join('\n').trim() }));
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate('/ideas')}
            className="mt-0.5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{idea.name}</h2>
              <RiskBadge level={idea.risk_level} />
            </div>
            <p className="text-sm text-slate-400">Created {formatDate(idea.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleSimulate}
            disabled={simLoading}
            className="btn-primary disabled:opacity-50"
          >
            {simLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run Simulation
          </button>
          <button
            onClick={handleGenerateScenarios}
            disabled={scenariosLoading}
            className="btn-secondary disabled:opacity-50"
          >
            {scenariosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            AI Scenarios
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all bg-transparent border-0 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <ScoreGauge score={idea.feasibility_score} size="md" />
          <p className="text-xs text-slate-500 mt-2 font-medium">Feasibility</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-primary-50 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-primary-500" />
            </div>
            <span className="text-xs text-slate-500">Investment</span>
          </div>
          <p className="text-base font-black text-slate-900 tracking-tight">{formatBDT(idea.initial_investment)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <span className="text-xs text-slate-500">Mo. Profit</span>
          </div>
          <p className={`text-base font-black tracking-tight ${monthlyProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {formatBDT(monthlyProfit)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-violet-500" />
            </div>
            <span className="text-xs text-slate-500">Annual ROI</span>
          </div>
          <p className={`text-base font-black tracking-tight ${Number(roi) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{roi}%</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-500">Risk Level</span>
          </div>
          <div className="mt-1"><RiskBadge level={idea.risk_level} /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Description & AI Feedback */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{idea.description}</p>
            {idea.category_detail && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-sm text-slate-600">
                <span>{idea.category_detail.name}</span>
              </div>
            )}
          </div>

          {idea.ai_feedback && (
            <div className="bg-gradient-to-br from-primary-50 via-violet-50 to-purple-50 rounded-2xl border border-primary-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">AI Analysis</h3>
              </div>

              <div className="space-y-4">
                {parseAIFeedback(idea.ai_feedback).map((sec, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">{sec.title}</h4>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      <ReactMarkdown>{sec.markdown || '—'}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Financial Overview</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={financialChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value) => [`৳${Number(value).toLocaleString()}`, '']}
                />
                <Bar dataKey="monthly" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Monthly" />
                <Bar dataKey="annual" fill="#22c55e" radius={[6, 6, 0, 0]} name="Annual" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => `৳${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Scenarios */}
      {scenarios && scenarios.scenarios && scenarios.scenarios.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h3 className="font-semibold text-slate-900">AI-Generated Scenarios</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {scenarios.scenarios.map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-medium text-slate-900 mb-2">{s.name}</h4>
                <div className="space-y-1.5 text-sm">
                  <p className="text-slate-600">Revenue: <span className="font-medium text-slate-900">{formatBDT(s.revenue)}</span></p>
                  <p className="text-slate-600">Expenses: <span className="font-medium text-slate-900">{formatBDT(s.expenses)}</span></p>
                  <p className="text-slate-600">Profit: <span className={`font-medium ${s.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatBDT(s.profit)}</span></p>
                  <p className="text-slate-600">ROI: <span className="font-medium text-primary-600">{s.roi}%</span></p>
                </div>
                {s.description && <p className="text-xs text-slate-500 mt-2">{s.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simulation History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900">Simulation History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-2 font-medium text-slate-500">Scenario</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500">Revenue</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500">Profit</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500">ROI</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((sim) => (
                  <tr key={sim.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-900">{sim.scenario_name}</td>
                    <td className="py-3 px-2 text-right text-slate-600">{formatBDT(sim.projected_revenue)}</td>
                    <td className={`py-3 px-2 text-right font-medium ${Number(sim.projected_profit) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatBDT(sim.projected_profit)}
                    </td>
                    <td className="py-3 px-2 text-right text-primary-600 font-medium">{sim.projected_roi}%</td>
                    <td className="py-3 px-2 text-right text-slate-400">{formatDate(sim.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">Delete Business Idea?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              This will permanently delete "{idea.name}" and all its simulations. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 btn-danger justify-center disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
