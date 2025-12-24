import { cn } from "@/lib/utils";

interface Stat {
  name: string;
  value: number;
  maxValue: number;
  gradient: string;
}

interface StatsPanelProps {
  stats: Stat[];
  className?: string;
}

export function StatsPanel({ stats, className }: StatsPanelProps) {
  return (
    <div className={cn("glass-panel", className)}>
      <div className="panel-header">
        <span className="text-lg">📊</span>
        <span className="panel-title">Vital Signs</span>
      </div>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-item">
            <div className="stat-label">
              <span className="stat-name">
                {stat.name}
              </span>
              <span className="stat-value">
                {Math.round(stat.value)}
              </span>
            </div>
            <div className="modern-progress">
              <div 
                className={cn("modern-progress-fill bg-gradient-to-r", stat.gradient)}
                style={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
