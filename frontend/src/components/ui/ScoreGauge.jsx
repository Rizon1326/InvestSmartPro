export function ScoreGauge({ score, size = 'md' }) {
  const getColor = (s) => {
    if (s >= 75) return { stroke: '#22c55e', bg: '#f0fdf4', text: 'text-emerald-600' };
    if (s >= 50) return { stroke: '#f59e0b', bg: '#fffbeb', text: 'text-amber-600' };
    return { stroke: '#ef4444', bg: '#fef2f2', text: 'text-red-600' };
  };

  const dims = { sm: 60, md: 80, lg: 120 };
  const d = dims[size];
  const strokeWidth = size === 'lg' ? 8 : 6;
  const r = (d - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = ((score || 0) / 100) * circumference;
  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: d, height: d }}>
      <svg width={d} height={d} className="-rotate-90">
        <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <circle
          cx={d / 2}
          cy={d / 2}
          r={r}
          fill="none"
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className={`absolute text-sm font-bold ${color.text}`}>{score ?? '—'}</span>
    </div>
  );
}
