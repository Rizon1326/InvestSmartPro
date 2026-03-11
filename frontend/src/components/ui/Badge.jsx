const variants = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  yellow: 'bg-amber-50 text-amber-700 border-amber-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
};

export function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function RiskBadge({ level }) {
  const config = {
    low: { label: 'Low Risk', variant: 'green' },
    medium: { label: 'Medium Risk', variant: 'yellow' },
    high: { label: 'High Risk', variant: 'red' },
  };
  const { label, variant } = config[level] || config.medium;
  return <Badge variant={variant}>{label}</Badge>;
}

export function DifficultyBadge({ level }) {
  const config = {
    beginner: { label: 'Beginner', variant: 'green' },
    intermediate: { label: 'Intermediate', variant: 'yellow' },
    advanced: { label: 'Advanced', variant: 'red' },
  };
  const { label, variant } = config[level] || config.blue;
  return <Badge variant={variant}>{label}</Badge>;
}
