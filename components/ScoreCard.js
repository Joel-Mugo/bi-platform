export default function ScoreCard({ title, value, subtitle }) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
    </div>
  );
}
