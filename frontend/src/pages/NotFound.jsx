import { Link } from 'react-router-dom';
import { Home, TrendingUp } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
      <div className="relative mb-6">
        <p className="text-[9rem] font-black text-slate-100 leading-none select-none">404</p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-xl shadow-primary-300/30">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-sm text-sm leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="btn-primary"
      >
        <Home className="w-4 h-4" /> Go to Dashboard
      </Link>
    </div>
  );
}

