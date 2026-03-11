export function ScoreGauge({ score, size = 'md', showLabel = true }) {
  const getColor = (s) => {
    if (s >= 75) return { stroke: '#10b981', text: '#059669', label: 'Excellent' };
    if (s >= 60) return { stroke: '#6366f1', text: '#4f46e5', label: 'Good' };
    if (s >= 40) return { stroke: '#f59e0b', text: '#d97706', label: 'Fair' };
    return { stroke: '#ef4444', text: '#dc2626', label: 'Poor' };
  };

  const dims = { sm: 52, md: 72, lg: 100 };
  const fontSizes = { sm: 10, md: 13, lg: 18 };
  const strokeWidths = { sm: 5, md: 6, lg: 7 };
  const d = dims[size];
  const sw = strokeWidths[size];
  const r = (d - sw * 2) / 2;
  const cx = d / 2;
  const cy = d / 2;
  const circumference = 2 * Math.PI * r;
  const progress = ((score || 0) / 100) * circumference;
  const color = getColor(score || 0);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: d, height: d }}>
      <svg width={d} height={d} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color.stroke}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ fontSize: fontSizes[size], color: color.text }}>
          {score ?? '—'}
        </span>
      </div>
    </div>
  );
}

