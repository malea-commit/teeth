import React from 'react';
import { Stethoscope, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span>Denta<span className="text-teal-400">Systemic</span> Intelligence</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              A comprehensive translational medical platform bridging dental clinical indicators, salivary diagnostics, and systemic pathophysiological disease states. Supporting interprofessional clinical collaboration between dental surgeons and physicians.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Clinical Cohort: 350 Phenotyped Patients (Hundreds of Patients) • AAP/EFP 2018 Staging Compliant
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('pathways')} className="hover:text-teal-400 transition-colors">
                  Anatomical Dissemination Pathways
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('conditions')} className="hover:text-teal-400 transition-colors">
                  Systemic Condition Profiles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dataset')} className="hover:text-teal-400 transition-colors text-teal-300 font-semibold">
                  Clinical Cohort Dataset (350 Pts)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('biomarkers')} className="hover:text-teal-400 transition-colors">
                  Salivary Biomarker Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('screener')} className="hover:text-teal-400 transition-colors">
                  Oral-Systemic Risk Screener
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('studies')} className="hover:text-teal-400 transition-colors">
                  Landmark Studies Library
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Disclaimers */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Medical Disclaimer</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              The information, risk calculators, and cohort datasets presented on this portal are designed exclusively for academic, educational, and clinical research exploration. They do not constitute formal medical diagnosis or replace individualized clinical evaluation by a licensed healthcare professional.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} DentaSystemic Translational Research. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Aligned with AAP, EFP, AHA & WHO Oral-Systemic Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
