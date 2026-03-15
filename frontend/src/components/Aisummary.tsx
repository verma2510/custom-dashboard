import React from "react";
import { Sparkles, Activity } from "lucide-react";
import { Card } from "./Card";

interface AisummaryProps {
  insights: string;
}

export const Aisummary: React.FC<AisummaryProps> = ({ insights }) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 border-indigo-500/30">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="p-3 bg-indigo-500/20 rounded-xl mt-1 ring-1 ring-indigo-500/50">
          <Sparkles className="text-indigo-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
            AI-Powered Insights
          </h2>
          <div className="prose prose-invert prose-p:leading-relaxed text-slate-300">
            {insights.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-2 last:mb-0 flex gap-2">
                {paragraph.trim() && <Activity size={16} className="mt-1 flex-shrink-0 text-indigo-500/50" />}
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
