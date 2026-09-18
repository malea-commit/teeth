import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  AlertCircle, 
  HeartPulse, 
  TrendingDown, 
  Dna,
  ExternalLink,
  Activity,
  BookOpen
} from 'lucide-react';

export default function HeroSection({ setActiveTab, onSelectCondition }) {
  const highlightStats = [
    {
      value: "2.8×",
      label: "Cardiovascular Event Hazard",
      subtext: "Elevated risk in severe periodontitis vs controls (ARIC & NHANES)",
      icon: HeartPulse,
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200"
    },
    {
      value: "-0.43%",
      label: "Mean HbA1c Reduction",
      subtext: "Achieved via scaling & root planing alone (Cochrane 2022 meta-analysis)",
      icon: TrendingDown,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200"
    },
    {
      value: "90%+",
      label: "Alzheimer's Brain Gingipains",
      subtext: "Postmortem frontal cortex recovery of P. gingivalis proteases (Dominy 2019)",
      icon: Dna,
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-200"
    },
    {
      value: "350",
      label: "Multi-Marker Cohort Dataset",
      subtext: "Granular patient profiles: PPD, BOP, aMMP-8, hs-CRP, eGFR, 6-mo outcomes",
      icon: Database,
      color: "text-teal-600",
      bg: "bg-teal-50 border-teal-200"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>CLINICAL EVIDENCE BASE & EPIDEMIOLOGICAL REGISTRY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The Mouth is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">Mirror & Gateway</span> of Systemic Health
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Periodontal ulceration exposes up to <strong>72 cm²</strong> of open connective tissue—a direct portal for oral pathogens, toxic gingipains, and chronic inflammatory mediators into the systemic vascular circulation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('biomarkers');
                window.scrollTo({ top: 460, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Activity className="w-4 h-4" />
              <span>Explore Salivary Biomarkers Matrix</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                setActiveTab('studies');
                window.scrollTo({ top: 460, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>View Landmark Studies</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {highlightStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 backdrop-blur transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-3xl font-black tracking-tight ${stat.color}`}>
                    {stat.value}
                  </span>
                  <div className={`p-2 rounded-xl border ${stat.bg}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fast condition pills */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-2">Featured Pathways:</span>
          {[
            { id: 'cardiovascular', label: 'Cardiovascular Atherosclerosis' },
            { id: 'diabetes', label: 'Type 2 Diabetes (Bidirectional)' },
            { id: 'neurodegenerative', label: "Alzheimer's Gingipains" },
            { id: 'pregnancy', label: 'Adverse Pregnancy (PTLBW)' },
            { id: 'rheumatoid', label: 'RA Bacterial Citrullination' },
            { id: 'respiratory', label: 'Aspiration Pneumonia' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab('conditions');
                if (onSelectCondition) onSelectCondition(item.id);
              }}
              className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
