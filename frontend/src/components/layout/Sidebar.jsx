import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  BookOpen,
  MessageCircle,
  FolderOpen,
  X,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/ideas', label: 'Business Ideas', icon: Lightbulb },
      { to: '/categories', label: 'Categories', icon: FolderOpen },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { to: '/learning', label: 'Learning Hub', icon: BookOpen },
      { to: '/chat', label: 'AI Assistant', icon: MessageCircle },
    ],
  },
];

export function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0f172a] flex flex-col transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-900/40 group-hover:shadow-primary-500/30 transition-shadow">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">InvestSmart</span>
              <span className="ml-1 text-[10px] font-semibold text-primary-400 bg-primary-500/10 px-1.5 py-0.5 rounded-full border border-primary-500/20">PRO</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all bg-transparent border-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {navSections.map(({ label, items }) => (
            <div key={label}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-widest text-slate-600 uppercase">
                {label}
              </p>
              <div className="space-y-0.5">
                {items.map(({ to, label: itemLabel, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 no-underline relative ${
                        isActive
                          ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${ isActive ? 'text-primary-400' : '' }`} />
                        <span>{itemLabel}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
              IS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-300 truncate">InvestSmart Pro</p>
              <p className="text-[10px] text-slate-600">v1.0.0 — AI Powered</p>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>
    </>
  );
}
