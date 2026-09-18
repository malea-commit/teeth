import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  Printer, 
  HelpCircle,
  Heart,
  Activity,
  ShieldAlert,
  Droplets,
  Stethoscope,
  Info
} from 'lucide-react';
import { screeningQuestions } from '../data/screeningQuestions';

export default function ClinicalScreener({ onSelectCondition }) {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = screeningQuestions.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Compute Risk Metrics
  const calculateResults = () => {
    let rawScore = 0;
    let maxScore = 0;
    const conditionScores = {
      cardiovascular: 0,
      diabetes: 0,
      rheumatoid: 0,
      pregnancy: 0,
      kidney: 0,
      gastrointestinal: 0,
      respiratory: 0
    };

    screeningQuestions.forEach(q => {
      const selectedVal = answers[q.id] !== undefined ? answers[q.id] : 0;
      const qMax = Math.max(...q.options.map(o => o.value));
      rawScore += selectedVal * q.weight;
      maxScore += qMax * q.weight;

      if (q.relatedConditions) {
        q.relatedConditions.forEach(c => {
          if (conditionScores[c] !== undefined) {
            conditionScores[c] += selectedVal * q.weight;
          }
        });
      }
    });

    const normalizedScore = Math.min(100, Math.round((rawScore / maxScore) * 100));

    let riskTier = 'Low';
    let riskColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    let riskSummary = 'Low systemic risk detected based on current oral and systemic survey responses. Routine preventive dental cleanings every 6 months recommended.';

    if (normalizedScore >= 70) {
      riskTier = 'Critical';
      riskColor = 'text-rose-800 bg-rose-50 border-rose-300';
      riskSummary = 'High probability of active periodontal tissue destruction accompanied by systemic inflammatory or metabolic cross-talk. Immediate comprehensive periodontal evaluation and primary care physician workup strongly advised.';
    } else if (normalizedScore >= 45) {
      riskTier = 'High';
      riskColor = 'text-orange-800 bg-orange-50 border-orange-300';
      riskSummary = 'Moderate-to-high risk profile indicating localized chronic inflammation and potential underlying systemic susceptibility factors.';
    } else if (normalizedScore >= 20) {
      riskTier = 'Moderate';
      riskColor = 'text-amber-800 bg-amber-50 border-amber-300';
      riskSummary = 'Early warning signs of gingival inflammation or secondary risk factors present. Targeted oral hygiene reinforcement and clinical probe mapping indicated.';
    }

    // Top correlated conditions
    const sortedConditions = Object.entries(conditionScores)
      .filter(([_, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([cond]) => cond);

    return { normalizedScore, riskTier, riskColor, riskSummary, sortedConditions };
  };

  const results = calculateResults();

  const conditionLabels = {
    cardiovascular: { name: "Cardiovascular Atherosclerosis", icon: Heart, test: "hs-CRP, Lipid Profile, Blood Pressure" },
    diabetes: { name: "Type 2 Diabetes & Insulin Resistance", icon: Activity, test: "Fasting Glucose, Point-of-Care HbA1c" },
    rheumatoid: { name: "Rheumatoid Arthritis / Citrullination", icon: ShieldAlert, test: "Anti-CCP / ACPA, RF, ESR" },
    kidney: { name: "Renal Function Decline (CKD)", icon: Droplets, test: "eGFR, Serum Creatinine, Microalbuminuria" },
    gastrointestinal: { name: "IBD / Gut Dysbiosis", icon: Stethoscope, test: "Fecal Calprotectin, CBC with differential" },
    pregnancy: { name: "Obstetric Preterm Delivery Risk", icon: CheckCircle2, test: "Prenatal Periodontal Screening, GCF PGE2" },
    respiratory: { name: "Aspiration & COPD Exacerbation", icon: Info, test: "Spirometry, Sputum culture" }
  };

  const resetScreener = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentStep(0);
  };

  return (
    <section className="py-16 bg-white" id="clinical-screener">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Chairside & Self-Assessment Triage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Oral-Systemic Clinical Risk Screener
          </h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Evaluate oral symptoms, bleeding parameters, and systemic risk factors to estimate cumulative inflammatory burden, cross-organ associations, and recommended laboratory workup.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span>Assessment Progress: <strong>{answeredCount}</strong> of {totalQuestions} answered</span>
                <span className="font-bold text-teal-700">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-teal-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {screeningQuestions.map((q, idx) => {
                const currentAnswer = answers[q.id];

                return (
                  <div 
                    key={q.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {q.description}
                        </p>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pl-0 sm:pl-9">
                      {q.options.map((opt) => {
                        const isSelected = currentAnswer === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleSelectOption(q.id, opt.value)}
                            className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-500/20 shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt.label}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit / View Results Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {answeredCount < totalQuestions ? `${totalQuestions - answeredCount} questions remaining` : 'All questions answered!'}
              </span>

              <button
                disabled={answeredCount === 0}
                onClick={() => setShowResults(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Generate Clinical Risk Report</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            {/* Score & Risk Tier Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Overall Systemic Inflammatory Risk Index
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-slate-900">
                    {results.normalizedScore}
                  </span>
                  <span className="text-slate-400 text-xl font-bold">/ 100</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${results.riskColor}`}>
                    {results.riskTier} Risk Profile
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={resetScreener}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>

            {/* Narrative Interpretation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Clinical Interpretation</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {results.riskSummary}
              </p>
            </div>

            {/* Primary Systemic Risk Associations */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Key Systemic Pathways Identified for Clinical Attention
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.sortedConditions.slice(0, 4).map((cId) => {
                  const item = conditionLabels[cId];
                  if (!item) return null;
                  const Icon = item.icon;
                  return (
                    <div 
                      key={cId}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer"
                      onClick={() => onSelectCondition && onSelectCondition(cId)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">
                          {item.name}
                        </h5>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <span>Recommended Lab Test: </span>
                        <strong className="text-slate-800">{item.test}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Interprofessional Workup Checklist */}
            <div className="bg-slate-900 text-white rounded-xl p-5 text-xs space-y-3">
              <h4 className="font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Recommended Interprofessional Action Protocol</span>
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span><strong>Dental Examination:</strong> Request a full-mouth periodontal charting (6 sites per tooth) including probing pocket depths, bleeding on probing, and vertical bite wing radiographs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span><strong>Laboratory Biomarkers:</strong> Request high-sensitivity C-reactive protein (hs-CRP) and fasting HbA1c screening from your primary care physician.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span><strong>Home Care Intensification:</strong> Institute daily interdental cleaning (interdental brushes / water flosser) and tongue debridement to lower bacterial bacteremia triggers.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
