import React, { useState } from 'react';
import { 
  Activity, 
  Database, 
  Layers, 
  GitFork, 
  FileCheck2, 
  BookOpen, 
  Menu, 
  X,
  Stethoscope,
  Download
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onDownloadDataset }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'pathways', label: 'Anatomy Pathways', icon: GitFork },
    { id: 'conditions', label: 'Systemic Conditions', icon: Layers },
    { id: 'dataset', label: 'Clinical Dataset', icon: Database, badge: '350 Pts' },
    { id: 'biomarkers', label: 'Biomarker Matrix', icon: Activity },
    { id: 'screener', label: 'Clinical Screener', icon: FileCheck2 },
    { id: 'studies', label: 'Evidence Library', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('pathways')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Denta<span className="text-teal-600">Systemic</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
                  Clinical Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Oral Health as Indicator & Driver of Systemic Pathologies
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-600 text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('dataset');
                if (onDownloadDataset) onDownloadDataset();
              }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Cohort CSV</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setActiveTab('dataset');
                setMobileMenuOpen(false);
                if (onDownloadDataset) onDownloadDataset();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Dataset (.CSV)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
