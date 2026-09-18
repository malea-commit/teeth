import React from 'react';
import { 
  X, 
  User, 
  Activity, 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Download,
  Calendar,
  Stethoscope
} from 'lucide-react';

export default function PatientModal({ patient, onClose }) {
  if (!patient) return null;

  const getRiskColor = (tier) => {
    switch (tier) {
      case 'Critical': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Moderate': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  const getStageBadge = (stage) => {
    switch (stage) {
      case 4: return 'bg-red-600 text-white';
      case 3: return 'bg-amber-600 text-white';
      case 2: return 'bg-yellow-500 text-slate-900';
      case 1: return 'bg-teal-600 text-white';
      default: return 'bg-emerald-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">
                  Patient Case Dossier: {patient.id}
                </h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getRiskColor(patient.systemic_risk_tier)}`}>
                  {patient.systemic_risk_tier} Risk
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Demographics: {patient.age} y/o {patient.gender} • Smoking: {patient.smoking} • BMI: {patient.bmi} kg/m²
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Periodontal Staging</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-black px-2 py-0.5 rounded ${getStageBadge(patient.periodontal_stage)}`}>
                  Stage {patient.periodontal_stage}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {patient.periodontal_stage_label}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Systemic Diagnosis</span>
              <span className="text-xs font-bold text-slate-900 block mt-1">
                {patient.systemic_condition}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Vascular hs-CRP</span>
              <span className={`text-sm font-black mt-1 block ${patient.hscrp_mg_l > 3.0 ? 'text-rose-600' : patient.hscrp_mg_l > 1.0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {patient.hscrp_mg_l} mg/L
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Glycemia (HbA1c)</span>
              <span className={`text-sm font-black mt-1 block ${patient.hba1c_percent >= 6.5 ? 'text-rose-600' : patient.hba1c_percent >= 5.7 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {patient.hba1c_percent}%
              </span>
            </div>
          </div>

          {/* Section 1: Periodontal Charting & Salivary Diagnostics */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>Periodontal Examination & Salivary Biomarkers</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Mean Probing Pocket Depth</span>
                <span className="font-bold text-slate-900 text-sm">{patient.ppd_mean_mm} mm</span>
                <span className="text-[10px] text-slate-400 block">{patient.ppd_mean_mm >= 4.0 ? 'Pathologic sulcus' : 'Normal range'}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Bleeding on Probing (BOP)</span>
                <span className="font-bold text-rose-700 text-sm">{patient.bop_percent}%</span>
                <span className="text-[10px] text-slate-400 block">{patient.bop_percent >= 10 ? 'Active ulceration' : 'Healthy margin'}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Clinical Attachment Loss</span>
                <span className="font-bold text-slate-900 text-sm">{patient.cal_mean_mm} mm</span>
                <span className="text-[10px] text-slate-400 block">Cumulative bone/tissue loss</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Missing Permanent Teeth</span>
                <span className="font-bold text-slate-900 text-sm">{patient.missing_teeth} teeth</span>
                <span className="text-[10px] text-slate-400 block">Excluding 3rd molars</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Salivary P. gingivalis qPCR</span>
                <span className="font-bold text-slate-900 text-sm">{patient.pgingivalis_log} log₁₀ CFU</span>
                <span className="text-[10px] text-slate-400 block">{patient.pgingivalis_log >= 3.5 ? 'High colonization' : 'Low burden'}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Active Salivary MMP-8</span>
                <span className="font-bold text-slate-900 text-sm">{patient.salivary_mmp8_ng_ml} ng/mL</span>
                <span className="text-[10px] text-slate-400 block">{patient.salivary_mmp8_ng_ml >= 20.0 ? 'Active collagenolysis' : 'Homeostatic'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Systemic Vitals & Organ Laboratory Panels */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>Systemic Hemodynamics & Organ Function Panel</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Blood Pressure</span>
                <span className="font-bold text-slate-900 text-sm">{patient.systolic_bp} / {patient.diastolic_bp} mmHg</span>
                <span className="text-[10px] text-slate-400 block">Resting seated reading</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Renal eGFR</span>
                <span className="font-bold text-slate-900 text-sm">{patient.egfr} mL/min</span>
                <span className="text-[10px] text-slate-400 block">{patient.egfr < 60 ? 'Impaired renal function' : 'Adequate filtration'}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Adiposity / BMI</span>
                <span className="font-bold text-slate-900 text-sm">{patient.bmi} kg/m²</span>
                <span className="text-[10px] text-slate-400 block">{patient.bmi >= 30 ? 'Class I/II Obesity' : 'Non-obese'}</span>
              </div>
            </div>
          </div>

          {/* Section 3: 6-Month Periodontal Intervention Response */}
          <div className="border border-teal-200 rounded-xl p-4 bg-teal-50/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-700" />
                <span>Interventional Protocol & 6-Month Longitudinal Outcome</span>
              </h4>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${patient.periodontal_treatment_received ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {patient.periodontal_treatment_received ? 'Periodontal Therapy Performed' : 'Standard Routine Care Control'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-teal-200">
                <span className="text-slate-500 text-[11px] block">6-Month Change in hs-CRP</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-base font-black ${patient.delta_hscrp_6mo < 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {patient.delta_hscrp_6mo > 0 ? `+${patient.delta_hscrp_6mo}` : patient.delta_hscrp_6mo} mg/L
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {patient.delta_hscrp_6mo < -0.5 ? 'Significant vascular reduction' : 'Stable'}
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-teal-200">
                <span className="text-slate-500 text-[11px] block">6-Month Change in HbA1c</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-base font-black ${patient.delta_hba1c_6mo < 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {patient.delta_hba1c_6mo > 0 ? `+${patient.delta_hba1c_6mo}` : patient.delta_hba1c_6mo}%
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {patient.delta_hba1c_6mo <= -0.3 ? 'Clinically meaningful drop' : 'Stable'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Clinical Co-Management Recommendation */}
          <div className="bg-slate-900 text-white rounded-xl p-4 text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider mb-1.5">
              <Stethoscope className="w-4 h-4" />
              <span>Interprofessional Clinical Summary</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {patient.periodontal_stage >= 3 
                ? `Patient DS-${patient.id.split('-')[1]} exhibits severe destructive periodontitis with substantial systemic inflammatory burden (hs-CRP ${patient.hscrp_mg_l} mg/L). Immediate quad-scaling, subgingival antimicrobial irrigation, and cross-consultation with primary physician/specialist for ${patient.systemic_condition} optimization is urgently indicated.`
                : `Patient maintains mild-to-moderate oral parameters. Regular 6-month supportive periodontal therapy (SPT) and targeted oral hygiene home care instructions will mitigate systemic inflammatory seeding.`}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Record ID: {patient.id} • De-identified
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
