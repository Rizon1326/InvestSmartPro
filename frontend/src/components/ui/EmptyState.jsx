import { Inbox } from 'lucide-react';

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">{description}</p>}
      {action}
    </div>
  );
}

