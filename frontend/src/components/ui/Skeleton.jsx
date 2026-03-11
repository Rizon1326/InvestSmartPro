export function Skeleton({ className = '' }) {
  return (
    <div
      className={`rounded-lg skeleton-shimmer ${className}`}
      style={{ minHeight: '1rem' }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3">
          <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-7 w-24 mb-2" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
