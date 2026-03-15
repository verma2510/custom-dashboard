import React from "react";
import { Card } from "./Card";
import { TrendingUp, Activity } from "lucide-react";

interface KpiProps {
  title: string;
  value: string | number;
  trend?: string;
  type?: "sum" | "avg" | "count";
}

export const Kpi: React.FC<KpiProps> = ({ title, value, trend, type }) => {
  return (
    <Card className="flex flex-col gap-4 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Activity size={80} />
      </div>
      
      <div className="flex justify-between items-start w-full relative z-10">
        <div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1 flex items-center gap-2">
            {title}
            {type && <span className="bg-slate-800 text-[10px] px-2 py-0.5 rounded-full">{type}</span>}
          </h3>
          <p className="text-3xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
            {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(2) : value}
          </p>
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center text-sm font-medium z-10 text-emerald-400 mt-2">
          <TrendingUp size={16} className="mr-1" />
          <span>{trend}</span>
        </div>
      )}
    </Card>
  );
};
