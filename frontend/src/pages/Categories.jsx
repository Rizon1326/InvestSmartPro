import { useCategories } from '../hooks/useCategories';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { FolderOpen } from 'lucide-react';
import { getCategoryIcon } from '../lib/utils';

function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:border-slate-200 transition-all">
      <div className="text-3xl mb-3">{getCategoryIcon(category.icon)}</div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{category.name}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{category.description}</p>
    </div>
  );
}

export function Categories() {
  const { categories, loading, error, refetch } = useCategories();

  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Business Categories</h2>
        <p className="text-slate-500 mt-1">Explore different business sectors to find your niche.</p>
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
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
