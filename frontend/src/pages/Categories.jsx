import { useCategories } from '../hooks/useCategories';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { FolderOpen } from 'lucide-react';
import { getCategoryIcon } from '../lib/utils';

// Cycle through beautiful gradient combos per card
const cardGradients = [
  'from-primary-500 to-violet-600',
  'from-emerald-500 to-green-600',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-sky-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-700',
  'from-teal-500 to-cyan-600',
  'from-orange-500 to-red-500',
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-700',
];

function CategoryCard({ category, index }) {
  const gradient = cardGradients[index % cardGradients.length];
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 text-2xl shadow-sm`}>
        {getCategoryIcon(category.icon)}
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{category.description}</p>
    </div>
  );
}

export function Categories() {
  const { categories, loading, error, refetch } = useCategories();

  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Business Categories</h2>
          <p className="text-slate-500 text-sm mt-1">Explore {loading ? '' : `${categories.length} `}business sectors to find your niche.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No categories available"
          description="Categories will appear here once they are created."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

