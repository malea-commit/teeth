import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Brain, 
  Baby, 
  Wind, 
  ShieldAlert, 
  Droplets, 
  Stethoscope, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Microscope, 
  FileText,
  BookmarkPlus
} from 'lucide-react';
import { systemicConditions } from '../data/conditionsData';

export default function ConditionsExplorer({ selectedConditionId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(selectedConditionId || 'cardiovascular');

  // React to parent condition selection
  React.useEffect(() => {
    if (selectedConditionId) {
      setExpandedId(selectedConditionId);
      // scroll to element if available
      const el = document.getElementById(`condition-${selectedConditionId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedConditionId]);

  const categories = ['All', 'Cardiovascular', 'Endocrine & Metabolic', 'Neurology', 'Obstetrics & Gynecology', 'Pulmonology', 'Rheumatology', 'Nephrology', 'Gastroenterology'];

  const iconMap = {
    Heart: Heart,
    Activity: Activity,
    Brain: Brain,
    Baby: Baby,
    Wind: Wind,
    ShieldAlert: ShieldAlert,
    Droplets: Droplets,
    Stethoscope: Stethoscope
  };

  const filteredConditions = systemicConditions.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]);
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.oralManifestations.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.earlyWarningSigns.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.biomarkers.some(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-white" id="systemic-conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Microscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Clinical Disease Profiles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Oral Health Indicators Across Systemic Pathologies
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Detailed clinical dossiers detailing the cellular mechanics, oral warning signs, laboratory biomarkers, and therapeutic interventions connecting oral disease to major organ dysfunction.
          </p>
        </div>

        {/* Controls: Search and Category Pills */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, oral signs, cytokines, or biomarkers (e.g., 'HbA1c', 'atherosclerosis', 'gingipain')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Conditions List / Cards */}
        <div className="space-y-6">
          {filteredConditions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold text-sm">No systemic condition matched your search criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-3 text-xs font-bold text-teal-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredConditions.map((condition) => {
              const Icon = iconMap[condition.icon] || Heart;
              const isExpanded = expandedId === condition.id;

              return (
                <div
                  key={condition.id}
                  id={`condition-${condition.id}`}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isExpanded 
                      ? 'border-teal-500/60 bg-white shadow-xl ring-1 ring-teal-500/20' 
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Card Banner / Clickable Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : condition.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                            {condition.category}
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {condition.badge}
                          </span>
                          <span className="text-[11px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {condition.oddsRatio}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">
                          {condition.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600 line-clamp-2 max-w-3xl">
                          {condition.executiveSummary}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 p-2 text-slate-400 hover:text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded In-Depth Content */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                      {/* Biological Mechanisms */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                          <Microscope className="w-4 h-4 text-teal-600" />
                          <span>Detailed Pathophysiological Mechanisms</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {condition.biologicalMechanisms.map((mech, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <h5 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">
                                  {i + 1}
                                </span>
                                {mech.title}
                              </h5>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {mech.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Manifestations & Early Signs Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Oral Manifestations */}
                        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>Clinical Oral Manifestations & Pathology</span>
                          </h4>
                          <ul className="space-y-2">
                            {condition.oralManifestations.map((m, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Early Warning Signs */}
                        <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-1.5">
                            <BookmarkPlus className="w-4 h-4 text-amber-600" />
                            <span>Early Patient & Chairside Warning Signs</span>
                          </h4>
                          <ul className="space-y-2">
                            {condition.earlyWarningSigns.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Biomarker Mapping Table */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                          Associated Biomarkers & Serum/Saliva Correlation
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                              <tr>
                                <th className="p-3">Biomarker</th>
                                <th className="p-3">Biological Role</th>
                                <th className="p-3">Oral-Systemic Link</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                              {condition.biomarkers.map((b, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                  <td className="p-3 font-bold text-teal-800 whitespace-nowrap">{b.name}</td>
                                  <td className="p-3 text-slate-600">{b.role}</td>
                                  <td className="p-3 text-slate-700 font-medium">{b.oralLink}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Interventional Evidence & Clinical Recommendations */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5 bg-teal-50 border border-teal-200 rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-1.5">
                            Therapeutic Periodontal Intervention Impact
                          </h4>
                          <p className="text-xs text-teal-950 leading-relaxed">
                            {condition.interventionalEvidence}
                          </p>
                        </div>

                        <div className="md:col-span-7 bg-slate-900 text-white rounded-xl p-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Interprofessional Clinical Recommendations</span>
                          </h4>
                          <ul className="space-y-1.5">
                            {condition.clinicalRecommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="text-teal-400 font-bold">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
