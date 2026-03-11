import { Menu, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/ideas': 'Business Ideas',
  '/ideas/new': 'New Business Idea',
  '/learning': 'Learning Hub',
  '/chat': 'AI Assistant',
  '/categories': 'Categories',
};

export function Navbar({ onMenuClick }) {
  const location = useLocation();

  const getPageName = () => {
    if (location.pathname.startsWith('/ideas/') && location.pathname !== '/ideas/new') {
      return 'Business Idea Details';
    }
    if (location.pathname.startsWith('/learning/')) {
      return 'Lesson';
    }
    return pageNames[location.pathname] || 'InvestSmart';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors bg-transparent border-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">{getPageName()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors bg-transparent border-0">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold ml-1 cursor-pointer">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
