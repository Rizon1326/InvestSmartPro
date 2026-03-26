import { Menu, Bell, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/ideas': 'Business Ideas',
  '/ideas/new': 'New Idea',
  '/learning': 'Learning Hub',
  '/chat': 'AI Assistant',
  '/categories': 'Categories',
};

export function Navbar({ onMenuClick }) {
  const location = useLocation();

  const getPageName = () => {
    if (location.pathname.startsWith('/ideas/') && location.pathname !== '/ideas/new') {
      return 'Idea Details';
    }
    if (location.pathname.startsWith('/learning/')) {
      return 'Lesson';
    }
    return pageNames[location.pathname] || 'InvestSmart Pro';
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors bg-transparent border-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 leading-none">{getPageName()}</h1>
            <Link to="/" className="text-[11px] text-slate-400 mt-0.5 hidden sm:block no-underline hover:text-primary-500 transition-colors">InvestSmart Pro</Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all bg-transparent border-0">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-bold ml-1 cursor-pointer shadow-sm shadow-primary-300/30">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
