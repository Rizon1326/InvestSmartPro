import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, CheckCircle2, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { useCreateIdea } from '../hooks/useBusinessIdeas';
import { useCategories } from '../hooks/useCategories';
import { formatBDT } from '../lib/utils';
import toast from 'react-hot-toast';

export function CreateIdea() {
  const navigate = useNavigate();
  const { create, loading, error } = useCreateIdea();
  const { categories } = useCategories();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category_id: '',
    initial_investment: '',
    monthly_revenue: '',
    monthly_expenses: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
        initial_investment: Number(form.initial_investment),
        monthly_revenue: Number(form.monthly_revenue),
        monthly_expenses: Number(form.monthly_expenses),
      };
      const result = await create(payload);
      toast.success('Business idea created! AI is analyzing...');
      navigate(`/ideas/${result.id}`);
    } catch {
      toast.error('Failed to create business idea');
    }
  };

  const isValid = form.name && form.description && form.initial_investment;
  const profit = Number(form.monthly_revenue || 0) - Number(form.monthly_expenses || 0);
  const hasFinancials = form.monthly_revenue || form.monthly_expenses;

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 bg-transparent border-0 p-0 cursor-pointer font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid lg:grid-cols-5 gap-6 max-w-5xl">
        {/* Form — 3 cols */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-violet-700 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">New Business Idea</h2>
                  <p className="text-primary-200 text-xs">AI will analyze and score your concept</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="label">Business Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Organic Tea Shop in Dhaka"
                  required
                  className="input"
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your business idea, target market, and value proposition..."
                  required
                  rows={4}
                  className="input resize-none"
                />
                <p className="text-xs text-slate-400 mt-1">{form.description.length}/500 — Be specific for better AI analysis</p>
              </div>

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select name="category_id" value={form.category_id} onChange={handleChange} className="input cursor-pointer">
                  <option value="">Select a category (optional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Financials */}
              <div>
                <label className="label">Financial Details (BDT)</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5">Initial Investment *</p>
                    <input type="number" name="initial_investment" value={form.initial_investment} onChange={handleChange}
                      placeholder="100000" required min="0" className="input" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5">Monthly Revenue</p>
                    <input type="number" name="monthly_revenue" value={form.monthly_revenue} onChange={handleChange}
                      placeholder="50000" min="0" className="input" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5">Monthly Expenses</p>
                    <input type="number" name="monthly_expenses" value={form.monthly_expenses} onChange={handleChange}
                      placeholder="30000" min="0" className="input" />
                  </div>
                </div>
              </div>

              {/* Profit Preview */}
              {hasFinancials && (
                <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                  profit >= 0
                    ? 'bg-emerald-50 border-emerald-100'
                    : 'bg-red-50 border-red-100'
                }`}>
                  {profit >= 0
                    ? <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    : <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  <p className="text-sm">
                    <span className="text-slate-600">Est. monthly profit: </span>
                    <span className={`font-bold ${profit >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {formatBDT(profit)}
                    </span>
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3.5 rounded-xl border border-red-100 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {typeof error === 'string' ? error : 'Validation error. Please check your inputs.'}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={!isValid || loading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Create & Analyze</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips sidebar — 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Tips for Better Analysis</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Be specific about your target market and location',
                'Include all startup costs in the investment field',
                'Use realistic monthly revenue estimates',
                'Account for all monthly expenses (rent, salaries, etc.)',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100 rounded-2xl p-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center mb-3">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">AI Analysis Includes</h3>
            <ul className="space-y-1.5">
              {[
                'Feasibility score (0-100)',
                'Risk level assessment',
                'Strengths & weaknesses',
                '12-month projections',
                'Expert recommendations',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


