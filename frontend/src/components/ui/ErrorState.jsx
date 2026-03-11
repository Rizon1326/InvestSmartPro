import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-secondary"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  );
}

