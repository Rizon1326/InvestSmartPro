const variants = {
  green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  red: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  yellow: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  blue: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200',
  purple: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  slate: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
};

const dots = {
  green: 'bg-emerald-500',
  red: 'bg-red-500',
  yellow: 'bg-amber-500',
  blue: 'bg-primary-500',
  purple: 'bg-violet-500',
  slate: 'bg-slate-400',
  indigo: 'bg-indigo-500',
};

export function Badge({ children, variant = 'blue', dot = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dots[variant]} inline-block`} />}
      {children}
    </span>
  );
}

export function RiskBadge({ level }) {
  const config = {
    low: { label: 'Low Risk', variant: 'green' },
    medium: { label: 'Med Risk', variant: 'yellow' },
    high: { label: 'High Risk', variant: 'red' },
  };
  const { label, variant } = config[level] || config.medium;
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function DifficultyBadge({ level }) {
  const config = {
    beginner: { label: 'Beginner', variant: 'green' },
    intermediate: { label: 'Intermediate', variant: 'yellow' },
    advanced: { label: 'Advanced', variant: 'red' },
  };
  const { label, variant } = config[level] || config.blue;
  return <Badge variant={variant} dot>{label}</Badge>;
}

