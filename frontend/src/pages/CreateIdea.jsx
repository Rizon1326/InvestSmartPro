import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useCreateIdea } from '../hooks/useBusinessIdeas';
import { useCategories } from '../hooks/useCategories';
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

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 bg-transparent border-0 p-0 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">New Business Idea</h2>
              <p className="text-sm text-slate-500">Our AI will analyze your idea and provide feedback.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Organic Tea Shop"
              required
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your business idea, target market, and value proposition..."
              required
              rows={4}
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Financial Fields */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Initial Investment (BDT) *</label>
              <input
                type="number"
                name="initial_investment"
                value={form.initial_investment}
                onChange={handleChange}
                placeholder="100000"
                required
                min="0"
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Revenue (BDT)</label>
              <input
                type="number"
                name="monthly_revenue"
                value={form.monthly_revenue}
                onChange={handleChange}
                placeholder="50000"
                min="0"
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Expenses (BDT)</label>
              <input
                type="number"
                name="monthly_expenses"
                value={form.monthly_expenses}
                onChange={handleChange}
                placeholder="30000"
                min="0"
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preview */}
          {form.monthly_revenue && form.monthly_expenses && (
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Estimated Monthly Profit:</span>{' '}
                <span className={Number(form.monthly_revenue) - Number(form.monthly_expenses) >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                  ৳{(Number(form.monthly_revenue) - Number(form.monthly_expenses)).toLocaleString()}
                </span>
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-100">
              {typeof error === 'string' ? error : 'Validation error. Please check your inputs.'}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors border-0 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create & Analyze
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
